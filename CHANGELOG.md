# Changelog

## 0.3.0 — 2026-08-21

- Nuevo comando `/gmb-post`: post con la oferta vigente y CTA `BOOK` → reservas de AgendaPro (`estado/config.json` → `reservas`), aprobación previa del dueño y registro anti-duplicados en `estado/posts.json`.
- `/gmb-semana` paso 6 ahora delega en `/gmb-post`.
- Diseño y plan en `docs/superpowers/`.

## 0.2.0 — 2026-08-20

- Windsor conectado (4 sucursales, write ON) y verificación de Apple enviada con documentos; 4 sedes reclamadas en Apple Maps con direcciones alineadas a Google.
- Naco confirmada cerrada temporalmente: pausada en la cola y marcada cerrada en Google y Apple.
- **Plan de defensa de posiciones** (`docs/DEFENSA-POSICIONES.md`): línea base #1 en "depilación láser" (Santiago), regla de no tocar lo que funciona, frentes de reseñas/actividad/vigilancia/consistencia.
- Nuevo comando `/gmb-mes` (vigilancia mensual solo-lectura) y registro `estado/mediciones.md` con la línea base.

## 0.1.0 — 2026-08-19

- Estructura inicial del repo de operaciones SEO local: banco de imágenes por sucursal, cola de publicación (`estado/cola.json` + `config.json`), scripts `siguiente-lote.mjs` y `marcar-publicada.mjs`.
- Comandos Claude: `/gmb-semana` (fotos + post semanal vía Windsor `google_my_business`) y `/gmb-resenas` (respuestas a reseñas con aprobación previa).
- Documentación: `docs/PLAN.md` (6 fases, incluye Apple Business Connect) y `docs/SEO-LOCAL.md` (estrategia completa del local pack).
- Remotos: Gitea `ARB/google-my-business-cibao` (origin) + espejo público en GitHub para servir las imágenes por `raw.githubusercontent.com`.
