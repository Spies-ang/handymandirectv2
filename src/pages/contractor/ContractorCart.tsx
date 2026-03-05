import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, ArrowLeft } from "lucide-react";

const PRICE_PER_CREDIT = 25;

const ContractorCart = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(10);
  const [agreed, setAgreed] = useState(false);
  const [showPaymentMsg, setShowPaymentMsg] = useState(false);

  const total = credits * PRICE_PER_CREDIT;

  return (
    <ContractorLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">
          Buy Credits
          <span className="block h-0.5 w-16 bg-primary rounded-full mt-1" />
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="max-w-lg">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Please input a credit amount:</Label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Credits:</span>
              <Input
                type="number"
                min={1}
                value={credits}
                onChange={(e) => setCredits(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24"
              />
              <span className="text-sm">=</span>
              <span className="font-bold text-lg">R{total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">R{PRICE_PER_CREDIT} per credit</p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} />
            <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
              I confirm that the order details above are correct and that I've read, understand and agree to the Terms and Conditions.
            </label>
          </div>

          <Button className="w-full" disabled={!agreed} onClick={() => setShowPaymentMsg(true)}>
            Pay by card →
          </Button>

          {showPaymentMsg && (
            <div className="bg-accent border rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Payment integration coming soon</p>
                <p className="text-muted-foreground">
                  Please contact us on{" "}
                  <a href="tel:0817533284" className="text-primary font-medium">081 753 3284</a> or{" "}
                  <a href="mailto:info@handymandirect.co.za" className="text-primary font-medium">info@handymandirect.co.za</a>{" "}
                  to purchase credits manually.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ContractorLayout>
  );
};

export default ContractorCart;
