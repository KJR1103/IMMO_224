import { useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { AuthDialog } from "./AuthDialog";

const Footer = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  const navigationLinks = [
    { label: "Réserver maintenant", to: "/search" },
    { label: "Questions fréquentes", to: "/faq" },
  ];

  const supportLinks = [
    { label: "Centre d'aide", to: "/help-center" },
    { label: "Support", to: "/support" },
  ];

  return (
    <>
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="bg-card-bg rounded-3xl p-8 md:p-12 lg:p-16">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <img src="/favicon.png" alt="IMMO 224" className="h-12 w-12 rounded-xl" />
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-guinea-green">IMMO</span>
                  <span className="text-guinea-red"> 2</span>
                  <span className="text-guinea-yellow">2</span>
                  <span className="text-guinea-green">4</span>
                </span>
              </Link>

              {/* Link Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
                <div>
                  <h3 className="font-bold text-base mb-2">Navigation</h3>
                  <div className="w-12 h-1 bg-primary mb-4"></div>
                  <ul className="space-y-2">
                    {navigationLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">Hôtes</h3>
                  <div className="w-12 h-1 bg-primary mb-4"></div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/become-host"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        Devenir hôte
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setAuthDialogOpen(true)}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        Se connecter
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">Support</h3>
                  <div className="w-12 h-1 bg-primary mb-4"></div>
                  <ul className="space-y-2">
                    {supportLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section - Copyright */}
            <div className="text-center pt-8 border-t border-card-border">
              <p className="text-text-secondary">
                © {new Date().getFullYear()} IMMO 224 — Guinée. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};

export default Footer;
