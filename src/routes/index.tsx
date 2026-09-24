import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

const MAIL = "riesvanalphen.contact@gmail.com";
const MAILTO = `mailto:${MAIL}?subject=${encodeURIComponent("Boeking Ries van Alphen")}`;

const SOCIALS = [
  {
    label: "Instagram",
    note: "Foto's van optredens en losse dagen.",
    href: "https://www.instagram.com/ries.vanalphen",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    note: "Korte filmpjes. Snel en grappig.",
    href: "https://www.tiktok.com/@ries.vanalphen",
    icon: TikTokIcon,
  },
  {
    label: "Threads",
    note: "Korte berichtjes tussendoor.",
    href: "https://www.threads.com/@ries.vanalphen",
    icon: ThreadsIcon,
  },
  {
    label: "LinkedIn",
    note: "Voor boekingen en samenwerkingen.",
    href: "https://nl.linkedin.com/in/ries-vanalphen",
    icon: LinkedInIcon,
  },
] as const;

function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <a className="skip" href="#inhoud">
        Naar inhoud
      </a>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <a className="brand" href="#top" onClick={close}>
          <span className="mark" aria-hidden="true">
            RvA
          </span>
          <span className="brand-name">Ries van Alphen</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav id="site-nav" className="site-nav" aria-label="Hoofdmenu">
          <a href="#wie" onClick={close}>
            Wie is Ries
          </a>
          <a href="#boeken" onClick={close}>
            Boeken
          </a>
          <a href="#socials" onClick={close}>
            Socials
          </a>
        </nav>
      </header>

      <main id="inhoud">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <p className="hero-kicker">Volkszanger uit Utrecht</p>
          <h1 id="hero-title" className="hero-title">
            Ries
            <em>van Alphen</em>
          </h1>
          <p className="sign sign-pop">hoi!</p>
          <p className="lede">Van de straat naar het podium. Ries van Alphen brengt de gezelligheid!</p>
          <a className="cta" href="#boeken">
            Boek Ries Direct
          </a>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>SLAM! · Kopen Zonder Kijken · Levenslied · Utrecht · </span>
            <span>SLAM! · Kopen Zonder Kijken · Levenslied · Utrecht · </span>
          </div>
        </div>

        <section className="section" id="wie" aria-labelledby="wie-title">
          <h2 id="wie-title" data-reveal>
            Wie is Ries?
          </h2>
          <p className="section-lead" data-reveal>
            Een vrolijke vent uit Utrecht. Eerst op tv en op straat. Nu op het podium, met het
            Nederlandse lied.
          </p>
          <div className="bento">
            <figure className="blob-shot tile-photo" data-reveal>
              <img
                src="/ries.jpg"
                width={387}
                height={516}
                alt="Foto van Ries van Alphen."
              />
              <figcaption className="sign">dat ben ik</figcaption>
            </figure>
            <article className="tile tile-kzk" data-reveal>
              <h3>Kopen Zonder Kijken</h3>
              <p>
                Ries deed mee aan Kopen Zonder Kijken. Een tv-avontuur vol huizen, verrassingen en
                een hoop gelach.
              </p>
            </article>
            <article className="tile tile-slam" data-reveal>
              <h3>SLAM! op straat</h3>
              <p>
                Voor SLAM! deed hij straatinterviews. Korte vragen, snelle antwoorden, en mensen
                die meteen meededen.
              </p>
            </article>
            <article className="tile tile-song" data-reveal>
              <h3>Het levenslied</h3>
              <p>
                Nu zingt hij Nederlandse liedjes. Warm, hardop en met de hele zaal mee. Dat is waar
                hij het voor doet.
              </p>
              <span className="sign">gezelligheid eerst</span>
            </article>
          </div>
        </section>

        <section className="book" id="boeken" aria-labelledby="boek-title" data-reveal>
          <div>
            <h2 id="boek-title">Klaar voor een feest?</h2>
            <p>Zin in een feestje waar nog lang over nagepraat wordt? Boek Ries nu voor jouw evenement.</p>
          </div>
          <a className="cta" href={MAILTO}>
            Boek Ries Direct
          </a>
          <p className="fine">
            of stuur een mail naar <a href={`mailto:${MAIL}`}>{MAIL}</a>
          </p>
        </section>

        <section className="section" id="socials" aria-labelledby="social-title">
          <h2 id="social-title" data-reveal>
            Blijf in de loop
          </h2>
          <p className="section-lead" data-reveal>
            Bekijk zijn filmpjes. Of stuur een bericht. Hij zit op deze kanalen.
          </p>
          <ul className="socials">
            {SOCIALS.map(({ label, note, href, icon: Icon }) => (
              <li key={label} data-reveal>
                <a className="social-card" href={href} target="_blank" rel="noreferrer">
                  <span className="social-top">
                    <Icon />
                    <strong>{label}</strong>
                  </span>
                  <span>{note}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="colophon">© {new Date().getFullYear()} Ries van Alphen · Utrecht</p>
        </section>
      </main>
    </>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14.2 3.2c.5 2.5 1.9 4.2 4.3 4.6v2.5c-1.5 0-2.9-.5-4.2-1.3v6.3c0 3.4-2.6 5.9-6 5.9S2.4 18.7 2.4 15.3c0-3.3 2.5-5.8 5.8-5.9v2.7c-1.6.1-2.9 1.4-2.9 3.2 0 1.8 1.4 3.2 3.2 3.2s3.1-1.4 3.1-3.2V3.2h2.6Z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path
        strokeLinecap="round"
        d="M9.2 11.4c.5-2.7 2.1-4.4 4.5-4.4 2.5 0 4.2 1.7 4.2 4.3 0 4.6-3.4 7.2-7.6 7.2-3.6 0-6.1-2.2-6.1-5.5 0-2.6 1.5-4.5 3.8-5.1"
      />
      <path strokeLinecap="round" d="M9.6 12.2c.7 2.3 2.3 3.6 4.3 3.6 2.3 0 3.8-1.5 3.8-3.6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.7 9.2H8.4V19H5.7V9.2ZM7.05 4.6c.9 0 1.55.65 1.55 1.5S7.95 7.6 7 7.6c-.9 0-1.55-.65-1.55-1.5s.65-1.5 1.6-1.5ZM10.2 9.2h2.55v1.35h.04c.36-.67 1.23-1.38 2.54-1.38 2.72 0 3.22 1.79 3.22 4.12V19h-2.7v-5.05c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.31-1.94 2.66V19H10.2V9.2Z" />
    </svg>
  );
}
