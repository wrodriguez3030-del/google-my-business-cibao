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

## Fase 6 — Apple Maps ⏳ (avanzada 2026-08-20)

- [x] Cuenta Apple Business "Cibao Spa Laser" creada (business.apple.com); las 4 fichas YA EXISTEN en Apple Maps auto-generadas, listas para reclamar
- [x] Villa Olga reclamada por el asistente: dirección confirmada (Calle Monseñor Hugo Polanco Brito, Santiago), categoría "Servicio de depilación láser", marca "Cibao Spa Laser" + web, "organización propietaria"
- [x] Método de verificación elegido: verificación de la ORGANIZACIÓN (cubre las 4 sedes, tarda hasta 5 días); método 1 = dominio con TXT generado: `apple-domain-verification=vcRO8heX4wOcF6NE` en `cibaospalaser.com`
- [ ] 🔴 BLOQUEO: el DNS de cibaospalaser.com está en Vercel pero en la cuenta de OTRA persona (la de wrodriguez3030-4801 solo tiene el .com.do) — pedir a quien la maneja que agregue ese TXT, o traer el dominio a la cuenta propia
- [ ] Método 2 = subir un documento del negocio: RNC / licencia comercial / contrato del local (lo aporta el dueño)
- [ ] "Enviar a revisión" cuando los 2 métodos estén listos
- [ ] Reclamar las otras 3 sedes (Los Jardines, Naco, Rafael Vidal) — con la organización verificada no piden verificación extra
- [ ] Corregir en Apple el horario (muestra 9-17 y sáb-dom cerrado; el real es L-V 9-20, sáb 8-16) y cargar fotos del banco

## Criterio de éxito

- Fotos nuevas publicadas cada semana sin fallos, cola avanzando
- Todas las reseñas respondidas en <48 h
- Ficha 100 % completa en Google y presente en Apple Maps
- Seguimiento mensual: posición en el local pack para las búsquedas objetivo (ver SEO-LOCAL) y métricas de la ficha (búsquedas, llamadas, clics a reservar)
