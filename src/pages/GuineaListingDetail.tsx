import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Utensils,
  Waves,
  Wind,
  Dumbbell,
  Music,
  Trees,
  Check,
  Calendar as CalendarIcon,
  MessageCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import Footer from "@/components/Footer";
import { guineaListings } from "@/data/guineaListings";
import { formatGNFDirect } from "@/lib/currency";
import { cn } from "@/lib/utils";

// Static demo reviews
const demoReviews = [
  {
    id: 1,
    name: "Aïssatou Diallo",
    avatar: "AD",
    date: "Il y a 2 semaines",
    rating: 5,
    text: "Magnifique séjour, accueil exceptionnel et cadre paradisiaque. Je recommande vivement à toute personne qui cherche à se ressourcer en Guinée.",
  },
  {
    id: 2,
    name: "Mamadou Bah",
    avatar: "MB",
    date: "Il y a 1 mois",
    rating: 5,
    text: "Excellent rapport qualité-prix. Le personnel est aux petits soins et l'emplacement est parfait. À refaire sans hésiter !",
  },
  {
    id: 3,
    name: "Fatoumata Camara",
    avatar: "FC",
    date: "Il y a 2 mois",
    rating: 4,
    text: "Très bonne expérience dans l'ensemble. Les photos sont fidèles à la réalité. Petit bémol sur le Wi-Fi un peu lent.",
  },
  {
    id: 4,
    name: "Ibrahima Sow",
    avatar: "IS",
    date: "Il y a 3 mois",
    rating: 5,
    text: "Un vrai coup de cœur ! Cuisine délicieuse, vues à couper le souffle. Une parenthèse magique en Guinée.",
  },
];

// Amenity icon mapping
const amenityIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("wi-fi")) return Wifi;
  if (l.includes("parking") || l.includes("voiturier")) return Car;
  if (l.includes("restaurant") || l.includes("cuisine")) return Utensils;
  if (l.includes("piscine") || l.includes("plage")) return Waves;
  if (l.includes("climatisation")) return Wind;
  if (l.includes("sport") || l.includes("tennis") || l.includes("gym")) return Dumbbell;
  if (l.includes("dj") || l.includes("musique") || l.includes("karaoké")) return Music;
  if (l.includes("jardin") || l.includes("nature")) return Trees;
  return Check;
};

const GuineaListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = guineaListings.find((l) => l.id === id);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMsg, setContactMsg] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-medium mb-4">Lieu introuvable</h1>
          <p className="text-muted-foreground mb-8">
            Cette annonce n'existe pas ou a été retirée.
          </p>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Build gallery (use gallery + image, dedupe)
  const photos = Array.from(
    new Set([listing.image, ...(listing.gallery || [])])
  );
  const totalPhotos = photos.length;

  const nights =
    dateRange?.from && dateRange?.to
      ? Math.max(
          1,
          Math.round(
            (dateRange.to.getTime() - dateRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const subtotal = nights * listing.pricePerNight;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleReserve = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Sélectionnez vos dates",
        description: "Choisissez une date d'arrivée et de départ.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Demande de réservation envoyée",
      description: `${listing.title} • ${nights} ${
        listing.priceLabel === "nuit" ? "nuit(s)" : listing.priceLabel
      } • ${formatGNFDirect(total)}`,
    });
  };

  const handleContact = () => {
    if (!contactName || !contactPhone || !contactMsg) {
      toast({
        title: "Champs requis",
        description: "Merci de remplir nom, téléphone et message.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message envoyé",
      description: "L'hôte vous recontactera très rapidement.",
    });
    setContactOpen(false);
    setContactMsg("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6 pb-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          <span className="mx-2">›</span>
          <span>{listing.category}</span>
          <span className="mx-2">›</span>
          <span className="text-foreground">{listing.city}</span>
        </nav>

        {/* Title row */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-guinea-yellow text-guinea-yellow" />
                <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  · {listing.ratingCount} avis
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {listing.region}, {listing.city}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {listing.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Heart className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        </div>

        {/* Photo carousel */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[2.2/1] bg-muted mb-8">
          <img
            src={photos[photoIndex]}
            alt={`${listing.title} - photo ${photoIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          {totalPhotos > 1 && (
            <>
              <button
                onClick={() =>
                  setPhotoIndex((i) => (i - 1 + totalPhotos) % totalPhotos)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPhotoIndex((i) => (i + 1) % totalPhotos)}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition"
                aria-label="Photo suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                {photoIndex + 1} / {totalPhotos}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === photoIndex ? "bg-white w-6" : "bg-white/60 w-2"
                    )}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-medium mb-3">À propos de ce lieu</h2>
              <p className="text-base leading-relaxed text-foreground/90 mb-3">
                {listing.shortDescription}
              </p>
              <p className="text-base leading-relaxed text-foreground/80">
                {listing.description}
              </p>
            </section>

            <hr className="border-card-border" />

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Ce que ce lieu offre</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.amenities.map((a) => {
                  const Icon = amenityIcon(a);
                  return (
                    <div
                      key={a}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg bg-card-bg border border-card-border"
                    >
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm">{a}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <hr className="border-card-border" />

            {/* Availability */}
            <section>
              <h2 className="text-2xl font-medium mb-1">Disponibilités</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Sélectionnez vos dates pour vérifier la disponibilité
              </p>
              <div className="bg-card-bg border border-card-border rounded-2xl p-4 inline-block">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={fr}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="p-0"
                />
              </div>
            </section>

            <hr className="border-card-border" />

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-medium mb-1 inline-flex items-center gap-2">
                <Star className="h-6 w-6 fill-guinea-yellow text-guinea-yellow" />
                {listing.rating.toFixed(1)} · {listing.ratingCount} avis
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Les voyageurs ont adoré ce lieu
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {demoReviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-card-bg border border-card-border rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        {r.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < r.rating
                              ? "fill-guinea-yellow text-guinea-yellow"
                              : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: booking widget */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-card-border rounded-2xl shadow-sm p-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold">
                  {formatGNFDirect(listing.pricePerNight)}
                </span>
                <span className="text-muted-foreground text-sm">
                  / {listing.priceLabel}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm mb-5">
                <Star className="h-4 w-4 fill-guinea-yellow text-guinea-yellow" />
                <span className="font-semibold">
                  {listing.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  · {listing.ratingCount} avis
                </span>
              </div>

              {/* Date picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full border border-card-border rounded-xl p-3 text-left mb-2 hover:border-primary transition">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-1">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      Arrivée — Départ
                    </div>
                    <div className="text-sm font-medium">
                      {dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, "dd MMM", {
                            locale: fr,
                          })} → ${format(dateRange.to, "dd MMM yyyy", {
                            locale: fr,
                          })}`
                        : "Sélectionner"}
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={fr}
                    disabled={(d) =>
                      d < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>

              {/* Guests */}
              <div className="border border-card-border rounded-xl p-3 mb-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Visiteurs
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {guests} visiteur{guests > 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    >
                      −
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => setGuests((g) => Math.min(20, g + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                className="w-full rounded-xl h-12 text-base mb-2"
                onClick={handleReserve}
              >
                Réserver
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl h-12 text-base"
                onClick={() => setContactOpen(true)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter l'hôte
              </Button>

              {/* Price breakdown */}
              {nights > 0 && (
                <div className="mt-5 pt-5 border-t border-card-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      {formatGNFDirect(listing.pricePerNight)} × {nights}{" "}
                      {listing.priceLabel === "nuit"
                        ? `nuit${nights > 1 ? "s" : ""}`
                        : listing.priceLabel}
                    </span>
                    <span>{formatGNFDirect(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frais de service IMMO 224</span>
                    <span>{formatGNFDirect(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-card-border">
                    <span>Total</span>
                    <span>{formatGNFDirect(total)}</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center mt-4 inline-flex items-center justify-center gap-1 w-full">
                <Shield className="h-3 w-3" />
                Vous ne serez pas débité immédiatement
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Contact host dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contacter l'hôte</DialogTitle>
            <DialogDescription>
              Posez vos questions sur {listing.title}. L'hôte vous répondra
              rapidement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label htmlFor="ct-name">Nom complet</Label>
              <Input
                id="ct-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>
            <div>
              <Label htmlFor="ct-phone">Téléphone (+224)</Label>
              <Input
                id="ct-phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+224 6XX XX XX XX"
              />
            </div>
            <div>
              <Label htmlFor="ct-msg">Votre message</Label>
              <Textarea
                id="ct-msg"
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Bonjour, je souhaiterais avoir plus d'informations…"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleContact}>Envoyer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GuineaListingDetail;
