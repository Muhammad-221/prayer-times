import { Sun, Sunrise, CloudSun, Sunset, Moon, Cloud } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import pattern from "../assets/images/pattern.jpg";
import CitySelector from "../components/CitySelector"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "@/components/Container";
import { useLanguage } from "@/contexts/LangContext";

export default function HomePage(){
    const [activePrayer, setActivePrayer] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [isScroll, setIsScroll] = useState(false);
    const [time, setTime] = useState({
        current: "",
        remaining: "",
    });
    const [prayerData, setPrayerData] = useState({
        times: null,
        gregorian: null,
        hijri: null,
    });
    const { t, lang } = useLanguage();

    const prayers = [
      { id: "fajr", key: "Fajr", name: t("prayer.fajr"), icon: <Sunrise className="h-5 w-5"/>, color: "text-blue-500" },
      { id: "sunrise", key: "Sunrise", name: t("prayer.sunrise"), icon: <Sun className="h-5 w-5"/>, color: "text-yellow-500" },
      { id: "dhuhr", key: "Dhuhr", name: t("prayer.dhuhr"), icon: <CloudSun className="h-5 w-5"/>, color: "text-orange-500" },
      { id: "asr", key: "Asr", name: t("prayer.asr"), icon: <Cloud className="h-5 w-5"/>, color: "text-gray-500" },
      { id: "maghrib", key: "Maghrib", name: t("prayer.maghrib"), icon: <Sunset className="h-5 w-5"/>, color: "text-red-500" },
      { id: "isha", key: "Isha", name: t("prayer.isha"), icon: <Moon className="h-5 w-5"/>, color: "text-purple-500" },
    ];
    
    useEffect(() => {
        const fetchPrayerData = async () => {
            try {
                const response = await axios.get(
                    "https://api.aladhan.com/v1/timingsByCity",
                    {
                        params: {
                            city: selectedCity,
                            country: "Egypt",
                            method: 5,
                            
                        },
                    }
                );
                // أوقات الصلاة
                const data = response.data.data;
                // التاريخ الميلادي
                const dateString = data.date.gregorian.date;
                const [day_g, month_g, year_g] = dateString.split("-");
                const date_g = new Date(year_g, month_g - 1, day_g);
                const days_g = [t("day.sunday"), t("day.monday"), t("day.tuesday"), t("day.wednesday"), t("day.thursday"), t("day.friday"), t("day.saturday")];
                const months_g = [t("month.january"), t("month.february"), t("month.march"), t("month.april"), t("month.may"), t("month.june"), t("month.july"), t("month.august"), t("month.september"), t("month.october"), t("month.november"), t("month.december")];
                const formattedGregorianDate = `${days_g[date_g.getDay()]}, ${date_g.getDate()} ${months_g[date_g.getMonth()]} ${date_g.getFullYear()}`;
                // التاريخ الهجري
                const hijriDate = data.date.hijri.date;
                const [day_h, month_h, year_h] = hijriDate.split("-");
                const date_h = new Date(year_h, month_h - 1, day_h);
                const months_h = [t("month.moharram"), t("month.safar"), t("month.rabi1"), t("month.rabi2"), t("month.jumada1"), t("month.jumada2"), t("month.rajab"), t("month.shaban"), t("month.ramadan"), t("month.shawwal"), t("month.dhuqada"), t("month.dhulhijja")];
                const formattedHijriDate = ` ${date_h.getDate()} ${months_h[date_h.getMonth()]} ${date_h.getFullYear()} هـ`;
                setPrayerData({
                    times: data.timings,
                    hijri: formattedHijriDate,
                    gregorian: formattedGregorianDate
                });
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrayerData();
    }, [selectedCity]);

    useEffect(() => {
        if (!prayerData.times) return;

        const updateTime = () => {
            const now = new Date();
            const locale = lang === "ar" ? "ar-EG" : "en-US";

            const prayerOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
            let nextPrayerTime;
            let nextPrayerName = "";

            for (let key of prayerOrder) {
                const [hours, minutes] = prayerData.times[key].split(":");
                const pTime = new Date();
                pTime.setHours(hours, minutes, 0, 0);
                if (pTime > now) {
                    nextPrayerTime = pTime;
                    nextPrayerName = key.toLowerCase();
                    break;
                }
            }

            // لو انتهى اليوم
            if (!nextPrayerTime) {
                const [hours, minutes] = prayerData.times["Fajr"].split(":");
                nextPrayerTime = new Date();
                nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
                nextPrayerTime.setHours(hours, minutes, 0, 0);
                nextPrayerName = "fajr";
            }
            
            // بالميلي ثانية
            const diff = nextPrayerTime - now; 
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setActivePrayer(nextPrayerName);
            setTime({
                current: now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }),
                remaining: `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
            });
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [prayerData.times, lang]);
    
    useEffect(() =>{
        const handleScroll = () => window.scrollY > 50 ? setIsScroll(true) : setIsScroll(false);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[])

    return(
        <div className="min-h-screen bg-no-repeat bg-cover relative" style={{backgroundImage: `url(${pattern})`}}>
            <div className="absolute inset-0 bg-slate-950/92"></div>
            <div className="relative z-10">
                <Header scroll={isScroll}/>
                <main className="container max-w-lg mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-2 text-4xl font-bold mx-auto text-yellow-500">{t("app.title")}</h1>
                        <p className="text-slate-400 text-base font-medium">{prayerData ? prayerData.hijri : "Loading..."}</p>
                        <p className="text-slate-600 text-lg">{prayerData ? prayerData.gregorian : "Loading..."}</p>
                    </div>
                    <div className="flex items-center justify-between my-5 px-3">
                        <span className="text-slate-600 text-xl font-medium">{t("section.prayerTimes")}</span>
                        <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
                    </div>
                    <div className="py-5 my-5 bg-slate-900 border border-slate-400/20 rounded-2xl flex flex-col gap-3 items-center justify-center shadow-lg">
                        <span className="text-slate-400 text-base font-medium">{t("app.current-time")}</span>
                        <span className="glow text-5xl font-bold text-amber-300/85 md:text-6xl time-display">{time ? time.current : "Loading..."}</span>
                        <div className="mx-auto h-px w-2/3 bg-gradient-to-l from-transparent via-amber-300/30 to-transparent" />
                        <div className="text-base flex gap-2">
                            <span className="text-slate-400 font-medium">{t("countdown.remaining")} </span>
                            <span className="text-amber-300/85 font-bold">{prayers.find(p => p.id === activePrayer)?.name}</span>
                        </div>
                        <span className="text-3xl font-bold text-white">{time ? time.remaining : "Loading..."}</span>
                    </div>

                    {prayers.map((prayer) => (
                        <Card 
                            key={prayer.id} 
                            className={`transition-all duration-500 bg-slate-900 border  ${prayer.id === activePrayer ? " border border-amber-200/30" : "border-slate-400/20"}`}
                        >
                            <div className={`flex items-center gap-3 ${prayer.id === activePrayer ? 'text-amber-300/85' : 'text-slate-400'}`}>
                                <div className={`p-4 bg-slate-800 rounded-lg ${prayer.color}`}>{prayer.icon}</div>
                                <span className={`text-2xl font-medium ${prayer.id === activePrayer ? "text-amber-400" : "text-white" }`}>
                                    {prayer.name}
                                </span>
                            </div>
                            <span className={`text-2xl font-bold ${ prayer.id === activePrayer ? "text-amber-300" : "text-white" }`}>
                                {prayerData.times?.[prayer.key]}
                            </span>
                        </Card>
                    ))}
                </main>
                <Footer/>
            </div>
        </div>
    )
}