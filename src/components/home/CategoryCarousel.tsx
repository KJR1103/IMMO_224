import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatGNFDirect } from "@/lib/currency";
import type { GuineaListing } from "@/data/guineaListings";

interface Props {
  title: string;
  subtitle?: string;
  listings: GuineaListing[];
  ctaHref?: string;
}

const CategoryCarousel = ({ title, subtitle, listings, ctaHref = "/search" }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1 text-base">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={ctaHref}
              className="text-foreground hover:underline font-medium text-base mr-2"
            >
              Voir tout
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={() => scrollBy(-1)}
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={() => scrollBy(1)}
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {listings.map((l) => (
            <Link
              key={l.id}
              to={`/listing/${l.id}`}
              className="group snap-start shrink-0 w-[280px] sm:w-[320px] bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={l.image}
                  alt={l.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold text-primary">
                  {l.type}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-sm mb-1.5">
                  <Star className="h-4 w-4 fill-guinea-yellow text-guinea-yellow" />
                  <span className="font-semibold">{l.rating.toFixed(1)}</span>
                  <span className="text-text-secondary">({l.ratingCount})</span>
                </div>
                <h3 className="font-display text-lg leading-tight mb-1.5 line-clamp-2">
                  {l.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3 inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {l.region}, {l.city}
                </p>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {l.shortDescription}
                </p>
                <div className="mt-auto flex items-baseline gap-1 pt-2 border-t border-card-border">
                  <span className="font-bold text-base">
                    {formatGNFDirect(l.pricePerNight)}
                  </span>
                  <span className="text-sm text-text-secondary">/ {l.priceLabel}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
