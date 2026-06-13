import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Conakry",
    tagline: "La capitale animée",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    listingCount: 124,
  },
  {
    name: "Îles de Los",
    tagline: "Évasion insulaire",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
    listingCount: 38,
  },
  {
    name: "Boké",
    tagline: "Plages et lagunes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    listingCount: 27,
  },
  {
    name: "Faranah",
    tagline: "Nature et tradition",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    listingCount: 19,
  },
];

const GuineaDestinations = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium">
              Destinations populaires
            </h2>
            <p className="text-muted-foreground mt-2 text-base">
              Découvrez les régions incontournables de la Guinée
            </p>
          </div>
          <Link
            to="/search"
            className="text-foreground hover:underline font-medium text-lg"
          >
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              to={`/search?location=${encodeURIComponent(dest.name)}`}
              className="group bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="p-4 pb-0">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                <p className="text-text-secondary font-sans text-base mb-1">
                  {dest.tagline}
                </p>
                <p className="text-text-secondary font-sans text-sm mb-6">
                  {dest.listingCount} annonces
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 font-semibold text-foreground group-hover:gap-3 transition-all">
                    Explorer
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuineaDestinations;
