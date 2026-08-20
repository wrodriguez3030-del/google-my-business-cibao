# Plan de implementación — Google My Business Cibao

Objetivo: colocar a Cibao Spa Laser y sus sucursales en las primeras posiciones de la búsqueda local de Google, y presente en Apple Maps.

Grupo de ubicaciones: https://business.google.com/groups/113578702847257069963/locations

## Fase 1 — Cimientos del repo ✅ (2026-08-19)

- [x] Estructura: banco de imágenes, cola, config, scripts, comandos Claude
- [x] Documentación: README, SEO-LOCAL, este plan
- [x] Repo en Gitea `ARB/google-my-business-cibao` (origin) + espejo GitHub (github)

## Fase 2 — Conectar Windsor ✅ (2026-08-19)

- [x] Conector `google_my_business` autorizado con `cibaospalaser@gmail.com` (contraseña y 2FA los puso el dueño; el grupo de ubicaciones enlazado estaba VACÍO — las fichas viven directo en esa cuenta)
- [x] Las 4 sucursales seleccionadas en Windsor y **Write actions encendido** (sin ese interruptor Claude solo lee)
- [x] `estado/config.json` → mapeo carpeta ↔ `locations/<id>` de las 4 sucursales
- [x] Carpetas por sucursal en `banco-imagenes/`: villa-olga, los-jardines, naco, rafael-vidal

## Fase 3 — Primera publicación supervisada

- [ ] Poner 3-5 fotos reales en el banco (ver reglas en `banco-imagenes/README.md`)
- [ ] Correr `/gmb-semana` con supervisión: subir foto, confirmar que aparece en la ficha, cola avanzada
- [ ] Probar `create_local_post` con CTA `BOOK` apuntando a la reserva de AgendaPro

## Fase 4 — Cadencia semanal

- [ ] `/gmb-semana` cada semana (manual al principio; cuando esté estable, valorar rutina programada)
- [ ] `/gmb-resenas`: responder toda reseña en <48 h (las respuestas se aprueban antes de publicarse)

## Fase 5 — Optimización de ficha (una vez conectado Windsor)

- [ ] Descripción de 750 caracteres con palabras clave locales (`update_location`)
- [ ] Sitio web y teléfono correctos y consistentes con cibaospalaser.com
- [ ] Horarios regulares exactos + horarios especiales de feriados RD
- [ ] Lo que Windsor no cubre (categorías, servicios, atributos, Q&A) se hace a mano en business.google.com con la guía de `docs/SEO-LOCAL.md`

## Fase 6 — Apple Maps (manual, sin API)

- [ ] Entrar a https://businessconnect.apple.com con el Apple ID del dueño
- [ ] "Add a business" → buscar si Apple ya tiene la ficha (suele existir auto-generada) → reclamarla; si no existe, crearla
- [ ] Verificación: Apple valida por teléfono de la sucursal o por documento
- [ ] Cargar por sucursal: nombre exacto, dirección, teléfono, horario, categoría, fotos (mismo banco de imágenes), enlace de reservas
- [ ] Repetir para cada sucursal

## Criterio de éxito

- Fotos nuevas publicadas cada semana sin fallos, cola avanzando
- Todas las reseñas respondidas en <48 h
- Ficha 100 % completa en Google y presente en Apple Maps
- Seguimiento mensual: posición en el local pack para las búsquedas objetivo (ver SEO-LOCAL) y métricas de la ficha (búsquedas, llamadas, clics a reservar)
