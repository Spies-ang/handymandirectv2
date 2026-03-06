import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const postJobPath = user && role === "customer" ? "/dashboard/post-job" : "/signup";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const dashboardPath = role === "contractor" ? "/contractor/dashboard" : role === "admin" ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Handyman Direct" className="h-12" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to={postJobPath} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Post a Job</Link>
          <Link to="/contractors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Contractors</Link>
          <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">{profile?.full_name || "Account"}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate(dashboardPath)}>
                  My Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="gap-1">
                    Sign Up <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/signup")}>
                    I need a handyman
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/contractor/signup")}>
                    I'm a contractor
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <Link to="/" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to={postJobPath} className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Post a Job</Link>
          <Link to="/contractors" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>For Contractors</Link>
          <Link to="/faq" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <div className="flex flex-col gap-2 pt-2">
            {user ? (
              <>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { navigate(dashboardPath); setMenuOpen(false); }}>
                  My Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-destructive" onClick={() => { handleSignOut(); setMenuOpen(false); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" className="w-full" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Sign Up (Customer)</Button>
                </Link>
                <Link to="/contractor/signup" className="w-full" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Sign Up (Contractor)</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
