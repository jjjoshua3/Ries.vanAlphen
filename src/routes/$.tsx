import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [{ title: "Oei, deze pagina bestaat (nog) niet — Ries van Alphen" }],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <>
      <header className="site-header is-scrolled">
        <a className="brand" href="/">
          <span className="mark" aria-hidden="true">
            RvA
          </span>
          <span className="brand-name">Ries van Alphen</span>
        </a>
        <a className="lost-home" href="/">
          Naar de homepage
        </a>
      </header>
      <main className="lost">
        <div className="lost-grid">
          <figure className="blob-shot">
            <img
              src="/ries-404.jpg"
              width={447}
              height={447}
              alt="Ries van Alphen met een zonnebril en een wit T-shirt, buiten op een feest."
            />
            <figcaption className="sign">oei</figcaption>
          </figure>
          <div>
            <p className="kicker">404</p>
            <h1>Oei, deze pagina bestaat (nog) niet.</h1>
            <p className="lost-lead">
              Het adres klopt niet. Of de pagina is er nog niet. Geen zorgen. Ga terug naar de
              homepage. Daar staat Ries wel.
            </p>
            <a className="cta" href="/">
              Terug naar de homepage
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
