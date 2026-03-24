import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  "app.title": { ar: "مواقيت الصلاة", en: "Prayer Times" },
  "app.current-time": { ar: "الوقت الحالي", en: "Current Time" },
  "prayer.fajr": { ar: "الفجر", en: "Fajr" },
  "prayer.sunrise": { ar: "الشروق", en: "Sunrise" },
  "prayer.dhuhr": { ar: "الظهر", en: "Dhuhr" },
  "prayer.asr": { ar: "العصر", en: "Asr" },
  "prayer.maghrib": { ar: "المغرب", en: "Maghrib" },
  "prayer.isha": { ar: "العشاء", en: "Isha" },
  "countdown.remaining": { ar: "الوقت المتبقي حتى صلاة", en: "Time remaining until prayer" },
  "countdown.hours": { ar: "ساعة", en: "hrs" },
  "countdown.minutes": { ar: "دقيقة", en: "min" },
  "countdown.seconds": { ar: "ثانية", en: "sec" },
  "section.prayerTimes": { ar: "أوقات الصلاة", en: "Prayer Times" },
  "city.select": { ar: "اختر المدينة", en: "Select City" },
  "city.search": { ar: "ابحث عن مدينة...", en: "Search city..." },
  "city.cairo": { ar: "القاهرة", en: "Cairo" },
  "city.alexandria": { ar: "الإسكندرية", en: "Alexandria" },
  "city.giza": { ar: "الجيزة", en: "Giza" },
  "city.mansoura": { ar: "المنصورة", en: "Mansoura" },
  "city.suez": { ar: "السويس", en: "Suez" },
  "city.port-said": { ar: "بورسعيد", en: "Port Said" },
  "city.luxor": { ar: "الأقصر", en: "Luxor" },
  "city.aswan": { ar: "أسوان", en: "Aswan" },
  "city.tanta": { ar: "طنطا", en: "Tanta" },
  "city.asyut": { ar: "أسيوط", en: "Asyut" },
  "city.fayoum": { ar: "الفيوم", en: "Fayoum" },
  "city.zagazig": { ar: "زقازيق", en: "Zagazig" },
  "nav.times": { ar: "المواقيت", en: "Times" },
  "month.january": { ar: "يناير", en: "January" },
  "month.february": { ar: "فبراير", en: "February" },
  "month.march": { ar: "مارس", en: "March" },
  "month.april": { ar: "أبريل", en: "April" },
  "month.may": { ar: "مايو", en: "May" },
  "month.june": { ar: "يونيو", en: "June" },
  "month.july": { ar: "يوليو", en: "July" },
  "month.august": { ar: "أغسطس", en: "August" },
  "month.september": { ar: "سبتمبر", en: "September" },
  "month.october": { ar: "أكتوبر", en: "October" },
  "month.november": { ar: "نوفمبر", en: "November" },
  "month.december": { ar: "ديسمبر", en: "December" },
  "day.sunday": { ar: "الأحد", en: "Sunday" },
  "day.monday": { ar: "الاثنين", en: "Monday" },
  "day.tuesday": { ar: "الثلاثاء", en: "Tuesday" },
  "day.wednesday": { ar: "الأربعاء", en: "Wednesday" },
  "day.thursday": { ar: "الخميس", en: "Thursday" },
  "day.friday": { ar: "الجمعة", en: "Friday" },
  "day.saturday": { ar: "السبت", en: "Saturday" },
  "month.moharram": { ar: "محرم", en: "Muharram" },
  "month.safar": { ar: "صفر", en: "Safar" },
  "month.rabi1": { ar: "ربيع أول", en: "Rabi' al-Awwal" },
  "month.rabi2": { ar: "ربيع ثاني", en: "Rabi' al-Thani" },
  "month.jumada1": { ar: "جماد أول", en: "Jumada al-Awwal" },
  "month.jumada2": { ar: "جماد ثاني", en: "Jumada al-Thani" },
  "month.rajab": { ar: "رجب", en: "Rajab" },
  "month.shaban": { ar: "شعبان", en: "Shaban" },
  "month.ramadan": { ar: "رمضان", en: "Ramadan" },
  "month.shawwal": { ar: "شوال", en: "Shawwal" },
  "month.dhuqada": { ar: "ذو القعدة", en: "Dhu al-Qi'dah" },
  "month.dhulhijja": { ar: "ذو الحجة", en: "Dhu al-Hijjah" },
  "nav.qibla": { ar: "القبلة", en: "Qibla" },
  "nav.athkar": { ar: "الأذكار", en: "Athkar" },
  "nav.settings": { ar: "الإعدادات", en: "Settings" },
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("app-lang") || "ar";
  });

  const isRTL = lang === "ar";

  useEffect(() => {
    localStorage.setItem("app-lang", lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.style.fontFamily = isRTL
      ? "'IBM Plex Sans Arabic', sans-serif"
      : "'Inter', 'IBM Plex Sans Arabic', sans-serif";
  }, [lang, isRTL]);

  const t = (key) => {
    return translations[key]?.[lang] || key;
  };

  const setLang = (newLang) => {
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};