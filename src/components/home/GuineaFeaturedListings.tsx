import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { formatGNFDirect } from "@/lib/currency";

interface GuineaListing {
  id: string;
  title: string;
  type: string;
  pricePerNight: number; // en GNF
  priceLabel: string;
  location: string;
  rating: number;
  ratingCount: number;
  image: string;
}

// 6 annonces de démonstration — lieux guinéens réels
const guineaListings: GuineaListing[] = [
  {
    id: "kassa-kounki",
    title: "Kassa Kounki Écolodge — Île de Kassa",
    type: "Écolodge / Île",
    pricePerNight: 800_000,
    priceLabel: "nuit",
    location: "Îles de Los, Conakry",
    rating: 4.8,
    ratingCount: 124,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "villa-bel-air",
    title: "Villa Bel-Air — La plus belle plage de Guinée",
    type: "Villa / Plage",
    pricePerNight: 1_200_000,
    priceLabel: "nuit",
    location: "Bel-Air, Boké",
    rating: 4.9,
    ratingCount: 87,
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "wakanda-beach",
    title: "Wakanda Beach — Beach Club de Conakry",
    type: "Plage / Beach Club",
    pricePerNight: 150_000,
    priceLabel: "entrée journée",
    location: "Conakry",
    rating: 4.5,
    ratingCount: 312,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "radisson-blu",
    title: "Radisson Blu — Hôtel 5 étoiles Conakry",
    type: "Hôtel de luxe",
    pricePerNight: 2_500_000,
    priceLabel: "nuit",
    location: "Kaloum, Conakry",
    rating: 4.7,
    ratingCount: 456,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "geneva-club",
    title: "Geneva Night Club — La nuit à Conakry",
    type: "Night-club",
    pricePerNight: 100_000,
    priceLabel: "entrée",
    location: "Conakry",
    rating: 4.4,
    ratingCount: 198,
    image:
      "https://images.unsplash.com/photo-1571266028243-d220c6a3a6c2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "jardin-camayenne",
    title: "Jardin Botanique de Camayenne — Oasis verte",
    type: "Parc / Nature",
    pricePerNight: 50_000,
    priceLabel: "personne",
    location: "Camayenne, Conakry",
    rating: 4.6,
    ratingCount: 143,
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80",
  },
];

const GuineaFeaturedListings = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium">Coups de cœur</h2>
            <p className="text-muted-foreground mt-2 text-base">
              Les lieux préférés des voyageurs en Guinée
            </p>
          </div>
          <Link
            to="/search"
            className="text-foreground hover:underline font-medium text-lg"
          >
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guineaListings.map((listing) => (
            <Link
              to={`/search?location=${encodeURIComponent(listing.location)}`}
              key={listing.id}
              className="group bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-guinea-yellow text-guinea-yellow" />
                    {listing.rating.toFixed(1)}
                    <span className="text-text-secondary font-normal">
                      ({listing.ratingCount})
                    </span>
                  </span>
                  <span className="text-xs uppercase tracking-wide text-primary font-semibold">
                    {listing.type}
                  </span>
                </div>
                <h3 className="font-display text-xl mb-2 line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </p>
                <div className="mt-auto flex items-baseline gap-1">
                  <span className="font-bold text-lg">
                    {formatGNFDirect(listing.pricePerNight)}
                  </span>
                  <span className="text-sm text-text-secondary">
                    / {listing.priceLabel}
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

export default GuineaFeaturedListings;
