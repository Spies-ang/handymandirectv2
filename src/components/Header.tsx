import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">HD</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">Handyman Direct</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/book" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Post a Job</Link>
          <Link to="/contractors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Contractors</Link>
          <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://wa.me/27817533284" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" /> Chat Now
            </Button>
          </a>
          <Link to="/book">
            <Button size="sm">Post a Job</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <Link to="/" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/book" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Post a Job</Link>
          <Link to="/contractors" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>For Contractors</Link>
          <Link to="/faq" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <div className="flex gap-2 pt-2">
            <a href="https://wa.me/27817533284" target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2"><Phone className="w-4 h-4" /> Chat</Button>
            </a>
            <Link to="/book" className="flex-1" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">Post a Job</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
