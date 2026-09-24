import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [{ title: "Deze pagina bestaat niet — Ries van Alphen" }],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <>
      <header className="site-header is-scrolled">
        <a className="wordmark" href="/">
          Ries van Alphen
        </a>
        <a className="nav-link" href="/">
          Home
        </a>
      </header>
      <main className="lost">
        <div className="lost-grid">
          <figure className="portrait">
            <img
              src="/ries-404.jpg"
              width={447}
              height={447}
              alt="Ries van Alphen met een zonnebril en een wit T-shirt, buiten op een feest."
            />
          </figure>
          <div>
            <p className="eyebrow">404</p>
            <h1>Oei, deze pagina bestaat niet.</h1>
            <p className="lost-lead">
              Het adres klopt niet, of de pagina is er nog niet. Ga terug naar de homepage.
            </p>
            <a className="ghost" href="/">
              Home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
