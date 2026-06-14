import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import DiscoverBanner from "@/components/home/DiscoverBanner";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/Footer";
import DestinationAutocomplete from "@/components/search/DestinationAutocomplete";
import GuineaDestinations from "@/components/home/GuineaDestinations";
import GuineaCategories from "@/components/home/GuineaCategories";
import WhyImmo224 from "@/components/home/WhyImmo224";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import { listingsByCategory } from "@/data/guineaListings";

const Home = () => {
  const navigate = useNavigate();
  const searchFormRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    locationSearch: "",
    city_id: null as string | null,
    state_region_id: null as string | null,
    country_id: null as string | null,
    guests: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleScrollToSearch = () => {
    searchFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    searchFormRef.current?.classList.add("search-highlight");
    setTimeout(() => {
      searchFormRef.current?.classList.remove("search-highlight");
    }, 2000);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.locationSearch) params.set("location", searchQuery.locationSearch);
    if (searchQuery.city_id) params.set("city_id", searchQuery.city_id);
    if (searchQuery.state_region_id) params.set("state_region_id", searchQuery.state_region_id);
    if (searchQuery.country_id) params.set("country_id", searchQuery.country_id);
    if (dateRange?.from) params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange?.to) params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));
    if (searchQuery.guests && searchQuery.guests !== "0") params.set("guests", searchQuery.guests);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-guinea-red" />
                  <span className="h-2 w-2 rounded-full bg-guinea-yellow" />
                  <span className="h-2 w-2 rounded-full bg-guinea-green" />
                  Bienvenue en Guinée
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight">
                  Explorez, Réservez,<br />
                  <span className="text-primary">Vivez la Guinée</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  La marketplace pour réserver hébergements, plages, îles, hôtels
                  et expériences à travers la Guinée.
                </p>

                {/* Search Box */}
                <div
                  ref={searchFormRef}
                  className="rounded-xl sm:rounded-full border bg-white p-3 my-8 transition-shadow duration-500 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-1">
                    {/* Destination */}
                    <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 h-[42px] min-w-0 w-full sm:w-auto">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <DestinationAutocomplete
                        value={searchQuery.location}
                        onChange={(destination) =>
                          setSearchQuery({
                            ...searchQuery,
                            location: destination.displayText,
                            locationSearch: destination.searchValue,
                            city_id: destination.city_id || null,
                            state_region_id: destination.state_region_id || null,
                            country_id: destination.country_id || null,
                          })
                        }
                        placeholder="Où ? (Conakry, Îles de Los...)"
                        className="h-[42px]"
                      />
                    </div>

                    <div className="hidden sm:block h-6 w-px bg-border" />

                    {/* Dates */}
                    <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 h-[42px] min-w-0 w-full sm:w-auto">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "flex-1 justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-sm",
                              !dateRange?.from && "text-muted-foreground"
                            )}
                          >
                            {dateRange?.from ? (
                              dateRange.to ? (
                                `${format(dateRange.from, "dd MMM")} - ${format(dateRange.to, "dd MMM")}`
                              ) : (
                                format(dateRange.from, "dd MMM yyyy")
                              )
                            ) : (
                              <span>Arrivée — Départ</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center" sideOffset={12}>
                          <CalendarComponent
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            numberOfMonths={2}
                            initialFocus
                            className="p-4"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="hidden sm:block h-6 w-px bg-border" />

                    {/* Guests */}
                    <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 h-[42px] min-w-0 w-full sm:w-auto">
                      <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "flex-1 justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-sm",
                              (!searchQuery.guests || searchQuery.guests === "0") &&
                                "text-muted-foreground"
                            )}
                          >
                            {searchQuery.guests && searchQuery.guests !== "0"
                              ? `${searchQuery.guests} visiteur${Number(searchQuery.guests) !== 1 ? "s" : ""}`
                              : "Visiteurs"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-6" align="end" sideOffset={12}>
                          <div className="flex items-center justify-between">
                            <span className="text-base font-semibold">Visiteurs</span>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => {
                                  const current = Number(searchQuery.guests) || 0;
                                  if (current > 0) {
                                    setSearchQuery({
                                      ...searchQuery,
                                      guests: String(current - 1),
                                    });
                                  }
                                }}
                                disabled={!searchQuery.guests || Number(searchQuery.guests) <= 0}
                              >
                                <span className="text-lg">−</span>
                              </Button>
                              <span className="text-2xl font-semibold w-12 text-center">
                                {searchQuery.guests || "0"}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => {
                                  const current = Number(searchQuery.guests) || 0;
                                  if (current < 16) {
                                    setSearchQuery({
                                      ...searchQuery,
                                      guests: String(current + 1),
                                    });
                                  }
                                }}
                                disabled={
                                  !!searchQuery.guests && Number(searchQuery.guests) >= 16
                                }
                              >
                                <span className="text-lg">+</span>
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Search Button */}
                    <Button
                      className="rounded-full h-[42px] px-6 flex-shrink-0 w-full sm:w-auto"
                      onClick={handleSearch}
                    >
                      Rechercher
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block relative w-[1000px] h-[720px] lg:-mr-[calc((100vw-var(--container-padding,1rem))-max(0px,(100vw-1400px)/2))]">
              <img
                src={heroImage}
                alt="Plage des Îles de Los, Guinée"
                className="w-full h-full object-cover rounded-3xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations populaires */}
      <GuineaDestinations />

      {/* Types d'expériences */}
      <GuineaCategories />

      {/* Coups de cœur */}
      <GuineaFeaturedListings />

      {/* Bannière découvrir */}
      <DiscoverBanner onExploreClick={handleScrollToSearch} />

      {/* Pourquoi IMMO 224 */}
      <WhyImmo224 />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
