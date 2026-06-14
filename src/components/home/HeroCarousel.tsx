import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    title: "Îles de Los",
    subtitle: "Évasion à 20 min de Conakry",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1600&q=80",
    title: "Plage de Bel-Air",
    subtitle: "La plus belle plage de Guinée",
  },
  {
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80",
    title: "Chutes de la Soumba",
    subtitle: "Nature préservée à Kindia",
  },
  {
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80",
    title: "Fouta-Djalon",
    subtitle: "Le château d'eau de l'Afrique",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    title: "Conakry by night",
    subtitle: "Hôtels, restaurants & vie nocturne",
  },
];

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div
              key={s.title}
              className="relative shrink-0 grow-0 basis-full h-full"
            >
              <img
                src={s.image}
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white animate-fade-in">
                <p className="text-sm uppercase tracking-widest opacity-90 mb-1">
                  {s.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-medium drop-shadow">
                  {s.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === selected ? "bg-white w-8" : "bg-white/50 w-2"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
