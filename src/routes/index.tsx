import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

const MAIL = "riesvanalphen.contact@gmail.com";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/ries.vanalphen" },
  { label: "TikTok", href: "https://www.tiktok.com/@ries.vanalphen" },
  { label: "Threads", href: "https://www.threads.com/@ries.vanalphen" },
  { label: "LinkedIn", href: "https://nl.linkedin.com/in/ries-vanalphen" },
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
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
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
        <a className="wordmark" href="#top" onClick={close}>
          Ries van Alphen
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
          <a href="#over-mij" onClick={close}>
            Over mij
          </a>
          <a href="#boek-mij" onClick={close}>
            Boek mij
          </a>
          <a href="#connect" onClick={close}>
            Volg mij
          </a>
        </nav>
      </header>

      <main id="inhoud">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-name">
            Ries van Alphen
          </h1>
          <div className="hero-rule" aria-hidden="true" />
          <p className="hero-sub">Jouw volkszanger voor een onvergetelijke avond.</p>
          <a className="ghost" href="#boek-mij">
            Boek mij direct
          </a>
        </section>

        <section className="section bio" id="over-mij" aria-labelledby="bio-title">
          <div className="split">
            <div className="prose" data-reveal>
              <p className="eyebrow">Mijn verhaal</p>
              <h2 id="bio-title" className="quote">
                Van de straat naar het podium, de connectie met de mensen staat altijd voorop.
              </h2>
              <p>
                Jullie kennen me misschien van mijn avontuur in Kopen Zonder Kijken, of van de tijd
                dat ik met een microfoon in de hand voor SLAM! de straat op ging om de meest
                uiteenlopende mensen te spreken. Die momenten hebben me gevormd, maar mijn ware
                passie heb ik altijd gevonden in de muziek.
              </p>
              <p>
                Tegenwoordig sta ik met trots op het podium als volkszanger. Ik zing het
                Nederlandse levenslied recht uit het hart. Geen afstandelijkheid, maar samen met
                de hele zaal lachen, zingen en een sfeer neerzetten die je raakt. Dat is wat ik
                doe, en dat is waar ik voor leef.
              </p>
            </div>
            <figure className="portrait" data-reveal>
              <img
                src="/ries.jpg"
                width={387}
                height={516}
                alt="Ries van Alphen."
              />
            </figure>
          </div>
        </section>

        <section className="section book" id="boek-mij" aria-labelledby="boek-title" data-reveal>
          <p className="eyebrow">Boekingen</p>
          <h2 id="boek-title">Zin in een feestje of zoek je de juiste sfeer voor jouw evenement?</h2>
          <p className="book-lead">Neem direct contact met mij op.</p>
          <a className="mail" href={`mailto:${MAIL}?subject=${encodeURIComponent("Boeking Ries van Alphen")}`}>
            {MAIL}
          </a>
        </section>

        <footer className="site-footer" id="connect">
          <a className="wordmark" href="#top">
            Ries van Alphen
          </a>
          <ul className="socials">
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="colophon">© {new Date().getFullYear()} · Utrecht</p>
        </footer>
      </main>
    </>
  );
}
