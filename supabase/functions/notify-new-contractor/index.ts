import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate the caller is using the service role key
  const authHeader = req.headers.get("Authorization");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!authHeader || !serviceRoleKey || authHeader !== `Bearer ${serviceRoleKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not set" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await req.json();
    const record = payload.record;

    const companyName = escapeHtml(record.company_name || "Unknown");
    const trades = escapeHtml((record.trade_categories || []).join(", ") || "Not specified");
    const coverageArea = record.company_address
      ? escapeHtml(`${record.company_address} (${record.coverage_radius_km || 25}km radius)`)
      : "Not specified";

    // 1. Email admin about new contractor application
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Handyman Direct <notifications@handymandirect.co.za>",
        to: ["info@handymandirect.co.za"],
        subject: `New Contractor Application — ${companyName}`,
        html: `
          <h2>New Contractor Application</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${companyName}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Trades</td><td style="padding:8px;border-bottom:1px solid #eee;">${trades}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Coverage Area</td><td style="padding:8px;border-bottom:1px solid #eee;">${coverageArea}</td></tr>
          </table>
          <p style="margin-top:20px;">
            <a href="https://handymandirectv2.lovable.app/admin/contractors" style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Review in Admin Panel</a>
          </p>
        `,
      }),
    });

    if (!adminEmailRes.ok) {
      const err = await adminEmailRes.text();
      console.error("Failed to send admin email:", err);
    } else {
      await adminEmailRes.text();
      console.log("Admin notification email sent");
    }

    // 2. Get contractor's email from profiles table
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;

    const profileRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?user_id=eq.${record.user_id}&select=email,full_name`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      }
    );
    const profiles = await profileRes.json();
    const contractorEmail = profiles?.[0]?.email;
    const contractorName = escapeHtml(profiles?.[0]?.full_name || "there");

    if (contractorEmail) {
      const contractorEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Handyman Direct <notifications@handymandirect.co.za>",
          to: [contractorEmail],
          subject: "Application Received — Handyman Direct",
          html: `
            <h2>Hi ${contractorName},</h2>
            <p>Thank you for applying to join <strong>Handyman Direct</strong> as a contractor!</p>
            <p>We've received your application for <strong>${companyName}</strong> and our team will review it within <strong>24–48 hours</strong>.</p>
            <p>Once approved, you'll receive an email with access to your contractor dashboard where you can start receiving job leads.</p>
            <p>If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:info@handymandirect.co.za">info@handymandirect.co.za</a>.</p>
            <p>Best regards,<br/>The Handyman Direct Team</p>
          `,
        }),
      });

      if (!contractorEmailRes.ok) {
        const err = await contractorEmailRes.text();
        console.error("Failed to send contractor email:", err);
      } else {
        await contractorEmailRes.text();
        console.log("Contractor confirmation email sent to", contractorEmail);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in notify-new-contractor:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
