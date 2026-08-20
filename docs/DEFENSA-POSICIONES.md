# Defensa de posiciones — Cibao Spa Laser

Situación al 20/08/2026 (línea base): buscando **"depilación láser"** en Maps centrado en Santiago, **Rafael Vidal es #1** (4,8★ · 141 reseñas) y las 3 sedes abiertas salen con pin. Este plan existe para **no perder eso**.

## Regla de oro: NO tocar lo que funciona

Cambios **solo aditivos** (fotos, posts, respuestas a reseñas). Está PROHIBIDO sin análisis previo y OK del dueño:

- ❌ Renombrar fichas — en especial el título de Rafael Vidal ("Cibao Spa Láser: Centro de Depilación Láser en Santiago"): está cargado de palabras clave y es el #1. No se toca.
- ❌ Cambiar categorías principales o secundarias.
- ❌ Reescribir descripciones que ya están publicadas.
- ❌ Mover pines o "corregir" direcciones ya alineadas (se alinearon el 20/08).
- ❌ Reabrir Naco en los mapas antes de que reabra de verdad.
- ❌ Ráfagas de reseñas, reseñas compradas o "agencias SEO" que prometen el #1 — Google penaliza y se pierde todo.
- ❌ Cambios masivos de golpe (muchos campos a la vez disparan re-revisión de la ficha).

## Frente 1 — Reseñas (el foso que nadie puede copiar)

La ventaja real sobre The Wellness House (4,7★ · 216) y el resto es el volumen y la respuesta.

| Sede | Hoy | Meta mensual |
|------|-----|--------------|
| Los Jardines | 5,0★ · 214 | +10 |
| Rafael Vidal | 4,8★ · 141 | +10 |
| **Villa Olga** | 5,0★ · **67** | **+15 (prioridad: es la más corta)** |

- Responder el **100 % en <48 h** con `/gmb-resenas` (respuestas aprobadas por el dueño, mencionando el servicio de forma natural).
- Flujo constante de reseñas nuevas: enlace corto/QR de cada sede en recepción + mensaje después de la cita (los enlaces `writereview` por sede están en la memoria del conector; Julia puede enviarlos por WhatsApp).
- Reseñas negativas: responder con calma, resolver por WhatsApp, jamás discutir en público.

## Frente 2 — Actividad semanal (ficha viva > ficha parada)

- **1 foto nueva por sede por semana** con `/gmb-semana` (pendiente: el banco de imágenes).
- **1 post quincenal** con la oferta vigente del mes y botón Reservar (AgendaPro).
- La cola nunca repite fotos; si el banco se seca, avisar al dueño en vez de reciclar.

## Frente 3 — Vigilancia mensual (detectar ataques y regresiones)

Correr **`/gmb-mes`** la primera semana de cada mes. Chequea y registra en `estado/mediciones.md`:

1. Posición para "depilación láser" (mapa centrado en Santiago) vs línea base — la meta es sostener el #1 y ver a Villa Olga/Los Jardines escalar en su zona.
2. Salud de las fichas por Windsor: `has_voice_of_merchant` (si sale False = ficha suspendida → protocolo de emergencia), duplicados, `has_google_updated` (ediciones que Google aplicó solo — terceros pueden sugerir cambios maliciosos y Google los acepta en silencio).
3. Rating y conteo de reseñas por sede vs mes anterior.
4. Competencia: reseñas de The Wellness House y cualquier ficha nueva de depilación láser que aparezca en el mapa.

**Protocolo si una ficha se suspende o pierde datos**: no hacer más cambios, documentar captura + fecha, apelar en business.google.com con el RNC a mano, avisar al dueño el mismo día.

## Frente 4 — Consistencia (no crear contradicciones)

- El sitio `cibaospalaser.com` debe mostrar exactamente las mismas direcciones y teléfonos que las fichas (pendiente coordinar; el dominio lo maneja un tercero).
- Apple Maps ya quedó alineado (en revisión). Al aprobarse: nombres alternativos por sede y fotos — nada más.
- Si algún dato cambia en la realidad (teléfono, horario), se cambia en TODOS lados la misma semana: Google, Apple, web, Instagram.

## Cadencia y responsables

| Frecuencia | Acción | Quién |
|-----------|--------|-------|
| Semanal | `/gmb-semana` (foto por sede) | Claude ejecuta |
| <48 h | `/gmb-resenas` (respuestas) | Claude redacta, dueño aprueba |
| Continua | Pedir reseñas post-cita | Recepción / Julia |
| Quincenal | Post con oferta del mes | Claude ejecuta |
| Mensual | `/gmb-mes` (medición + salud) | Claude ejecuta y reporta |
| Al reabrir Naco | Quitar pausa + reabrir en Google y Apple | Claude, con aviso del dueño |
