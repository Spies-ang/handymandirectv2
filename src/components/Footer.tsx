import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logoImg} alt="Handyman Direct" className="h-10" />
          </div>
          <p className="text-sm opacity-70">Connecting South Africans with trusted, verified tradesmen since day one.</p>
          <p className="text-sm opacity-70 mt-2">Rietsanger Ave, Centurion, Gauteng</p>
        </div>

        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wide opacity-80">Services</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/trade/builder" className="hover:opacity-100 transition-opacity">Builders</Link></li>
            <li><Link to="/trade/plumber" className="hover:opacity-100 transition-opacity">Plumbers</Link></li>
            <li><Link to="/trade/electrician" className="hover:opacity-100 transition-opacity">Electricians</Link></li>
            <li><Link to="/trade/painter" className="hover:opacity-100 transition-opacity">Painters</Link></li>
            <li><Link to="/trade/roofer" className="hover:opacity-100 transition-opacity">Roofers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wide opacity-80">Areas</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/area/centurion" className="hover:opacity-100 transition-opacity">Centurion</Link></li>
            <li><Link to="/area/pretoria" className="hover:opacity-100 transition-opacity">Pretoria</Link></li>
            <li><Link to="/area/johannesburg" className="hover:opacity-100 transition-opacity">Johannesburg</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wide opacity-80">Contact</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="tel:0817533284" className="hover:opacity-100 transition-opacity">081 753 3284</a></li>
            <li><a href="tel:0658500989" className="hover:opacity-100 transition-opacity">065 850 0989</a></li>
            <li><Link to="/contractors" className="hover:opacity-100 transition-opacity">Join as Contractor</Link></li>
            <li><Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/20 mt-8 pt-6 text-sm opacity-60 text-center">
        © {new Date().getFullYear()} Handyman Direct. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
