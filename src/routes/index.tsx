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
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const frame = document.querySelector<HTMLElement>("[data-parallax]");
      if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = frame.getBoundingClientRect();
      const shift = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.04;
      frame.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
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
          <a href="#biografie" onClick={close}>
            Biografie
          </a>
          <a href="#boeken" onClick={close}>
            Boeken
          </a>
          <a href="#connect" onClick={close}>
            Connect
          </a>
        </nav>
      </header>

      <main id="inhoud">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-name">
            Ries van Alphen
          </h1>
          <div className="hero-rule" aria-hidden="true" />
          <p className="hero-sub">Televisiepersoonlijkheid & Volkszanger</p>
          <a className="ghost" href="#boeken">
            Boeken
          </a>
        </section>

        <section className="section" id="biografie" aria-labelledby="bio-title">
          <div className="split">
            <div className="prose" data-reveal>
              <p className="eyebrow">Biografie</p>
              <h2 id="bio-title">Van televisie naar het levenslied</h2>
              <p>
                Ries van Alphen is televisiepersoonlijkheid en volkszanger uit Utrecht. Zijn pad
                loopt van de camera naar het podium.
              </p>
              <p>
                Bij Kopen Zonder Kijken stond hij voor een landelijk publiek. Voor SLAM! maakte hij
                straatinterviews die mensen bleven delen. Direct, nieuwsgierig en zonder omweg.
              </p>
              <p>
                Nu zingt hij het Nederlandse levenslied. Warm, helder en met de zaal mee. Dat is
                het werk waar hij nu voor staat.
              </p>
            </div>
            <figure className="portrait" data-reveal>
              <img
                data-parallax
                src="/ries.jpg"
                width={387}
                height={516}
                alt="Portret van Ries van Alphen."
              />
            </figure>
          </div>
        </section>

        <section className="section book" id="boeken" aria-labelledby="boek-title" data-reveal>
          <p className="eyebrow">Boekingen</p>
          <h2 id="boek-title">Beschikbaar voor exclusieve optredens en evenementen.</h2>
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
