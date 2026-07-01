import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import { trades } from "@/data/seoData";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logoImg} alt="Handyman Direct" className="h-10" />
          </div>
          <p className="text-sm opacity-70">Connecting South Africans with trusted, verified tradesmen since day one.</p>
          <p className="text-sm opacity-70 mt-2">South Africa</p>
        </div>

        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wide opacity-80">Trades</h4>
          <ul className="text-sm opacity-70 grid grid-cols-2 gap-x-4 gap-y-2">
            {trades.map((t) => (
              <li key={t.slug}>
                <Link to={`/trade/${t.slug}`} className="hover:opacity-100 transition-opacity">
                  {t.name}s
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wide opacity-80">Areas</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/area/pretoria" className="hover:opacity-100 transition-opacity">Pretoria</Link></li>
            <li><Link to="/area/durban" className="hover:opacity-100 transition-opacity">Durban</Link></li>
            <li><Link to="/area/cape-town" className="hover:opacity-100 transition-opacity">Cape Town / Stellenbosch</Link></li>
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
