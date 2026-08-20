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
- [x] Verificación ENVIADA A REVISIÓN el 20/08 con DOCUMENTOS del negocio (el dueño los subió; el TXT ya no hizo falta — el bloqueo del dominio de tercero quedó sin efecto). Apple tarda hasta 5 días hábiles
- [x] Las 4 sedes reclamadas; marca unificada "Cibao Spa Laser" (el asistente la había llamado "…- Villa Olga" y se corrigió: el nombre de marca manda sobre el nombre de cada ficha)
- [x] Naco marcada CERRADA TEMPORALMENTE también en Apple (inicio 20/08/2026, fin 31/12/2026 — al reabrir, cambiar Estado a Abierto y quitar la pausa en config.json). El dueño pidió no registrarla; se explicó que la ficha ya existía en Maps diciendo "Abierto", así que reclamada+cerrada es lo correcto
- [x] Horarios correctos en Apple (L-V 9-20, sáb 8-16, dom cerrado) — venían bien de la ficha reclamada
- [x] Direcciones alineadas con Google: Villa Olga "Calle Julio García esq. Monseñor Hugo Polanco Brito" + CP 51000; Los Jardines "Calle Aquiles Ramírez No. 7" + CP 51000; Rafael Vidal + Plaza Mediterránea (unidad) + CP 51000; coordenadas intactas
- [x] Descripciones con palabras clave en Villa Olga, Los Jardines y Rafael Vidal
- [ ] Tras la aprobación (hasta 5 días): nombres alternativos por sede (p. ej. "Cibao Spa Laser Los Jardines") — Apple no dejó guardarlos con la ficha en revisión
- [ ] Cargar logotipo y foto de portada de la marca + fotos por sede (cuando llegue el banco de imágenes)

## Criterio de éxito

- Fotos nuevas publicadas cada semana sin fallos, cola avanzando
- Todas las reseñas respondidas en <48 h
- Ficha 100 % completa en Google y presente en Apple Maps
- Seguimiento mensual: posición en el local pack para las búsquedas objetivo (ver SEO-LOCAL) y métricas de la ficha (búsquedas, llamadas, clics a reservar)
