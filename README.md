# Google My Business Cibao

Operación de SEO local de **Cibao Spa Laser** y sus sucursales: subir el perfil de Google Business (y Apple Maps) a las primeras posiciones de búsqueda local.

No es una app web — es un repo de operaciones: banco de imágenes versionado, cola de publicación semanal, comandos de Claude y la estrategia documentada. **No usa puerto local.**

## Qué hace

| Pieza | Para qué |
|-------|----------|
| `banco-imagenes/` | Fotos organizadas por sucursal, listas para publicar (ver su README) |
| `estado/cola.json` | Qué foto se publicó, cuándo y en qué sucursal — la cola avanza sola |
| `estado/config.json` | Espejo GitHub, fotos por semana y mapeo sucursal → cuenta Windsor |
| `scripts/siguiente-lote.mjs` | Elige las próximas fotos a publicar y arma sus URL públicas |
| `scripts/marcar-publicada.mjs` | Registra en la cola una foto ya publicada |
| `/gmb-semana` | Comando Claude: publica el lote semanal en Google Business vía Windsor |
| `/gmb-post` | Comando Claude: post con CTA «Reservar» (AgendaPro) en las sedes abiertas, con aprobación previa |
| `estado/posts.json` | Registro de posts publicados por sede — anti-duplicados |
| `/gmb-resenas` | Comando Claude: lee reseñas sin responder y redacta respuestas |
| `docs/SEO-LOCAL.md` | Estrategia completa para subir posiciones en el "local pack" |
| `docs/PLAN.md` | Plan por fases y su estado real |

## Flujo semanal

1. Deja fotos nuevas en `banco-imagenes/<sucursal>/` cuando quieras (no hace falta cada semana: la cola aguanta meses).
2. Corre `/gmb-semana` en Claude Code — elige las siguientes fotos, verifica sus URL públicas, las sube al perfil vía Windsor y avanza la cola.
3. `/gmb-resenas` cuando haya reseñas nuevas.

## Publicación: Windsor.ai (MCP)

El conector `google_my_business` de Windsor expone: `upload_media` (fotos a la galería), `create_local_post` (publicaciones con CTA), `reply_to_review`, `update_location`, horarios regulares/especiales y estado abierto/cerrado. Las fotos deben ser **JPG/PNG, mínimo 250×250 px y 10 KB, en URL pública** — por eso este repo se espeja en GitHub (Gitea es privado/Tailscale).

## Remotos

- `origin` → Gitea `ARB/google-my-business-cibao` (primario, política Cibao Cloud)
- `github` → espejo público **solo para servir las imágenes** por `raw.githubusercontent.com`

⚠️ Por eso: **nada sensible en este repo, nunca** — todo lo que se commitea queda público en el espejo.
