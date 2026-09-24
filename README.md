# Ries van Alphen

Website van Ries van Alphen, volkszanger uit Utrecht.

## Publiceren op Netlify

Koppel deze GitHub-repo in Netlify. Sleep de bronmap niet naar Netlify: dan wordt er niet gebouwd.

Netlify leest [netlify.toml](netlify.toml). Controleer bij het aanmaken:

| Instelling | Waarde |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22` |

De site is een server-app. Netlify zet de functies zelf in `.netlify/functions-internal`. Laat het functions-pad leeg.
