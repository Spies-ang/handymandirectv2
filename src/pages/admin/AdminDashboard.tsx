import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";

const adminLinks = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/jobs", label: "Jobs" },
  { to: "/admin/contractors", label: "Contractors" },
  { to: "/admin/credits", label: "Credits" },
  { to: "/admin/invoices", label: "Invoices" },
  { to: "/admin/reviews", label: "Reviews" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="Handyman Direct" className="h-10" />
            <span className="text-xs font-medium bg-destructive text-destructive-foreground px-2 py-0.5 rounded">ADMIN</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {adminLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === l.to ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground"}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="rounded-full"><User className="w-5 h-5" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={async () => { await signOut(); navigate("/"); }} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1"><div className="container py-8">{children}</div></main>
      <Footer />
    </div>
  );
};

const AdminDashboard = () => (
  <AdminLayout>
    <h1 className="font-display text-2xl font-bold mb-6">Admin Dashboard</h1>
    <div className="grid md:grid-cols-3 gap-4">
      {adminLinks.slice(1).map(l => (
        <Link key={l.to} to={l.to}>
          <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
            <p className="font-display font-bold">{l.label}</p>
            <p className="text-sm text-muted-foreground">Manage {l.label.toLowerCase()}</p>
          </div>
        </Link>
      ))}
    </div>
  </AdminLayout>
);

export { AdminLayout };
export default AdminDashboard;
