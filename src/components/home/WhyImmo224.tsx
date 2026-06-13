import { ShieldCheck, Sparkles, Smile } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Sécurité",
    description:
      "Paiements protégés, hôtes vérifiés et support 7j/7 pour des réservations en toute tranquillité.",
  },
  {
    icon: Sparkles,
    title: "Choix",
    description:
      "Des plages des Îles de Los aux écolodges du Fouta, accédez aux meilleures adresses de Guinée.",
  },
  {
    icon: Smile,
    title: "Simplicité",
    description:
      "Réservation en quelques clics, paiement en GNF ou XOF, et confirmation immédiate par l'hôte.",
  },
];

const WhyImmo224 = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium mb-3">
            Pourquoi IMMO 224 ?
          </h2>
          <p className="text-muted-foreground text-base">
            La première plateforme guinéenne de réservation de lieux de loisirs,
            d'hébergements et d'expériences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-card-bg border border-card-border rounded-2xl p-8 text-center"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-2">{b.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyImmo224;
