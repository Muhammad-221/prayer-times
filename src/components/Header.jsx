import { useLanguage } from "@/contexts/LangContext";
import { Button } from "./ui/button";
 
export default function Header({scroll}){
    const { t, lang, setLang } = useLanguage();

    return(
        <header className={`h-20 w-full top-0 px-5 flex justify-between items-center ${scroll ? "z-50 sticky border-b border-amber-300/30 backdrop-blur-2xl transition-all duration-700" : ""}`}>
            <h1 className={`invisible text-4xl font-bold text-yellow-600 ${scroll ? "visible transition duration-800" : ""}`}>{t("app.title")}</h1>
            <div>
                <Button 
                    onClick={() => setLang(lang === "ar" ? "en" : "ar")} 
                    className={"px-3 py-2 rounded-lg bg-slate-800 ms-auto transition duration-700"}
                >
                    <span>ع</span> 
                    / 
                    <span>EN</span>
                    {/* {theme === "dark" ? 
                        <Sun className="text-xl text-yellow-500"/> : 
                        <Moon className="text-xl text-yellow-500"/>} */}
                </Button>
            </div>
        </header>
    )
}