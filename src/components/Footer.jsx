export default function Footer() {
    return(
        <footer className="h-24 flex flex-col gap-3 items-center mt-10 animate-fade-up-delay-5">
          <div className="mx-auto h-px w-1/2 bg-gradient-to-l from-transparent via-amber-300/30 to-transparent" />
          <div className="text-center">
            <p className="mt-4 font-display text-base text-muted-foreground/60">
              ﴿ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾
            </p>
            <p className="mt-1 font-body text-sm text-muted-foreground/40">
              سورة النساء - ١٠٣
            </p>
          </div>
        </footer>
    )
}