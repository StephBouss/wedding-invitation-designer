import { createFileRoute } from "@tanstack/react-router";
import couronne from "@/assets/couronne.png.asset.json";
import photoCouple from "@/assets/photo-couple.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aude & Guy Raymond — Faire-part de mariage coutumier" },
      {
        name: "description",
        content:
          "Mariage coutumier d'Aude TCHANGO et Guy Raymond KOFFI — 24 octobre 2026, 12h30, domicile familial à Port-Gentil.",
      },
      { property: "og:title", content: "Aude & Guy Raymond — Mariage coutumier" },
      {
        property: "og:description",
        content: "24 octobre 2026 à partir de 12h30, domicile familial à Port-Gentil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const programme = [
  { heure: "13h00", texte: "Arrivée et installation de la famille de la future mariée" },
  { heure: "13h30", texte: "Arrivée et installation de la famille du futur marié" },
  { heure: "14h00", texte: "Début des pourparlers" },
  { heure: "17h00", texte: "Photos avec les Mariés" },
  { heure: "18h30", texte: "Début du Banquet" },
  { heure: "21h00", texte: "Sortie du Gâteau" },
  { heure: "22h00", texte: "Bal" },
];

const contacts = [
  { nom: "Marina", tel: "062 68 52 21" },
  { nom: "Nancy", tel: "+225 07 78 57 55 00" },
  { nom: "Sandra", tel: "077 26 65 14" },
  { nom: "Marie Aimée", tel: "+225 08 40 52 40" },
];

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-deep sm:w-24" />
      <span className="text-gold-deep text-lg">❧</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-deep sm:w-24" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center font-serif text-3xl font-semibold tracking-wide text-primary sm:text-4xl">
      {children}
    </h2>
  );
}

function Index() {
  return (
    <main className="paper min-h-screen overflow-x-hidden">
      {/* En-tête : couronne + annonce des familles */}
      <header className="mx-auto max-w-3xl px-6 pt-12 pb-16 text-center sm:pt-16">
        <img
          src={couronne.url}
          alt="Couronne florale tropicale avec le monogramme A G R"
          className="float-soft mx-auto w-64 animate-fade-in sm:w-80 md:w-96"
        />
        <Reveal delay={100}>
          <div className="mt-8 space-y-1 font-serif text-xl leading-relaxed sm:text-2xl">
            <p>
              Monsieur et Madame{" "}
              <span className="text-gold-deep font-semibold">TCHANGO Gabriel</span>,
            </p>
            <p>leurs Clans et Familles,</p>
          </div>

          <p className="my-6 font-script text-4xl text-primary">&amp;</p>

          <div className="space-y-1 font-serif text-xl leading-relaxed sm:text-2xl">
            <p className="text-primary">Les Familles</p>
            <p className="text-gold-deep font-semibold">
              KOFFI d&apos;EBRAH <span className="text-foreground font-normal">et</span>
            </p>
            <p className="text-gold-deep font-semibold">KOFFI Jules d&apos;ABOUDE-MANDEKE</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-xl font-hand text-lg leading-relaxed text-primary sm:text-xl">
            Ont le bonheur de vous faire part de la célébration du mariage coutumier de leurs
            enfants
          </p>

          <div className="mt-8">
            <h1 className="shimmer-text font-script text-5xl leading-tight text-primary sm:text-6xl md:text-7xl">
              Aude <span className="align-middle">&amp;</span> Guy Raymond
            </h1>
          </div>

          <Countdown />
        </Reveal>
      </header>

      {/* Date, heure, lieu */}
      <section className="border-y border-border bg-secondary/60 px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-hand text-xl text-primary">Qui se tiendra le</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
            <Reveal delay={80}>
              <p className="font-serif text-5xl font-bold text-primary">24</p>
              <p className="mt-1 font-serif text-sm tracking-[0.25em] uppercase text-muted-foreground">
                Octobre 2026
              </p>
            </Reveal>
            <Reveal delay={160} className="sm:border-x sm:border-border">
              <p className="font-serif text-sm text-muted-foreground">à partir de</p>
              <p className="font-serif text-5xl font-bold text-primary">12h30</p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-serif text-sm text-muted-foreground">Au domicile familial à</p>
              <p className="mt-1 font-serif text-3xl font-bold text-primary">Port-Gentil</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Photo du couple */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <figure className="group relative mx-auto w-full max-w-sm">
              <div
                className="absolute -inset-3 rounded-sm border border-gold-deep/60 transition-all duration-500 group-hover:-inset-4"
                aria-hidden="true"
              />
              <img
                src={photoCouple.url}
                alt="Aude et Guy Raymond en tenue traditionnelle akan"
                className="relative w-full rounded-sm object-cover shadow-[var(--shadow-elegant)] transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </figure>
          </Reveal>
          <Reveal delay={140} className="text-center md:text-left">
            <SectionTitle>Les Mariés</SectionTitle>
            <p className="mt-6 font-hand text-lg leading-relaxed text-primary sm:text-xl">
              Nous serons heureux de partager avec vous cette journée, merci pour votre affection et
              vos délicates attentions.
            </p>
            <p className="mt-6 font-serif text-lg text-muted-foreground">
              Aude TCHANGO &amp; Guy Raymond KOFFI
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programme */}
      <section className="border-y border-border bg-card px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionTitle>Programme</SectionTitle>
            <Ornament />
          </Reveal>
          <ol className="mt-8 space-y-5">
            {programme.map((item, i) => (
              <Reveal key={item.heure} delay={i * 70}>
                <li className="flex items-baseline gap-5 border-b border-border/70 pb-4 transition-transform duration-300 hover:translate-x-1">
                  <span className="w-20 shrink-0 font-serif text-2xl font-bold text-primary">
                    {item.heure}
                  </span>
                  <span className="font-serif text-lg leading-snug">{item.texte}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Participation */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionTitle>Participation</SectionTitle>
            <Ornament />
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {contacts.map((c, i) => (
              <Reveal key={c.nom} delay={i * 80}>
                <li className="rounded-sm border border-gold-deep/40 bg-card px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <p className="font-serif text-lg text-gold-deep">{c.nom}</p>
                  <a
                    href={`tel:${c.tel.replace(/\s/g, "")}`}
                    className="font-serif text-xl font-bold text-primary hover:underline"
                  >
                    {c.tel}
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>


      <footer className="border-t border-border px-6 py-10 text-center">
        <p className="font-script text-3xl text-primary">Aude &amp; Guy Raymond</p>
        <p className="mt-2 font-serif text-sm tracking-[0.2em] uppercase text-muted-foreground">
          24 Octobre 2026 — Port-Gentil
        </p>
      </footer>
    </main>
  );
}
