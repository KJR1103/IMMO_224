import { Waves, Trees, Hotel, UtensilsCrossed, Music, Landmark, Home, Tent, Palmtree } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: Waves, label: "Plages & Beach Clubs", query: "plage" },
  { icon: Palmtree, label: "Îles & Écolodges", query: "île" },
  { icon: Trees, label: "Parcs & Nature", query: "parc" },
  { icon: Hotel, label: "Hôtels & Resorts", query: "hôtel" },
  { icon: UtensilsCrossed, label: "Restaurants & Maquis", query: "restaurant" },
  { icon: Music, label: "Night-clubs & Bars", query: "night-club" },
  { icon: Landmark, label: "Sites culturels", query: "culture" },
  { icon: Home, label: "Villas & Maisons", query: "villa" },
  { icon: Tent, label: "Campements & Lodges", query: "campement" },
];

const GuineaCategories = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-medium">
            Types d'expériences
          </h2>
          <p className="text-muted-foreground mt-2 text-base">
            Trouvez exactement le type de lieu qui vous fait envie
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                to={`/search?location=${encodeURIComponent(cat.query)}`}
                className="group bg-white border border-card-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-sm leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GuineaCategories;
