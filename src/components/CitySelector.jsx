import { useEffect, useState } from "react";
import { MapPin, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LangContext";

const cityKeys = [
  "cairo", "alexandria", "giza", "mansoura", "suez", 
  "port-said", "luxor", "aswan", "tanta", "asyut", "fayoum", "zagazig"
];
export default function CitySelector({ selectedCity, onCityChange }){
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { t, lang } = useLanguage();

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      onCityChange(savedCity);
    }else{
      onCityChange("cairo")
      localStorage.setItem("selectedCity", "cairo");
    }
  }, []);

  const cities = cityKeys.map((key) => ({
    id: key,
    nameAr: t(`city.${key}`),
    nameEn: t(`city.${key}`),
    primary: lang === "ar" ? t(`city.${key}`) : t(`city.${key}`),
  }));

  const filtered = cities.filter((c) => {
    return (
      c.nameAr.includes(search) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase())
    );
  });

  const selected = cities.find((c) => c.id === selectedCity);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 shadow-prayer transition-all hover:shadow-lg"
      >
        <MapPin className="h-4 w-4 text-green-800" />
        <span className="text-sm font-medium text-white">{selected?.primary || t("city.select")}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 z-10 w-64 rounded-xl bg-slate-900 border border-border shadow-lg animate-slide-up overflow-hidden ltr:left-0 rtl:right-0">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("city.search")}
                className="w-full rounded-lg bg-slate-900 ps-9 pe-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto p-1">
            {filtered.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  onCityChange(city.id);
                  localStorage.setItem("selectedCity", city.id);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  city.id === selectedCity ? "bg-slate-800" : "hover:bg-slate-800"
                )}
              >
                <MapPin className="h-4 w-4 shrink-0 text-green-800" />
                <p className="font-medium text-white">{city.primary}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

