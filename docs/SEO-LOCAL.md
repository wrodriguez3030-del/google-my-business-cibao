# Estrategia de SEO local — Cibao Spa Laser

Cómo funciona el ranking del "local pack" (los 3 resultados con mapa): Google pondera **relevancia** (qué tan bien la ficha describe lo que se busca), **distancia** (dónde está el que busca) y **prominencia** (reseñas, actividad, enlaces, fotos). La distancia no se controla; relevancia y prominencia sí — y ahí es donde ataca este proyecto.

**Honestidad primero:** nadie puede garantizar la posición #1 — quien lo prometa miente. Lo que sí está probado es que las fichas completas, activas y con reseñas respondidas desplazan a las abandonadas. Este plan ejecuta todas esas señales de forma sostenida.

## Búsquedas objetivo (medir cada mes, sin sesión iniciada)

- "depilación láser santiago" / "depilación láser [ciudad de cada sucursal]"
- "spa láser santiago"
- "centro de depilación cerca de mí" (desde la zona de cada sucursal)
- "cibao spa laser" (marca: debe salir #1 con la ficha completa)

## Señales que trabajamos, por orden de impacto

### 1. Reseñas (la señal #1 de prominencia)
- Responder **todas** en <48 h — `/gmb-resenas`. Google premia fichas que responden; las respuestas con nombre del servicio ("gracias por confiar en tu depilación láser…") suman relevancia.
- Pedir reseña a cada clienta satisfecha: enlace corto de reseña de cada sucursal impreso en QR en recepción y enviado por Julia/WhatsApp tras la cita. Flujo constante > ráfagas.
- Jamás comprar ni fabricar reseñas: Google las detecta y hunde la ficha.

### 2. Fotos frescas (este repo, cada semana)
- 1+ foto nueva por sucursal por semana vía `/gmb-semana`. Fichas con fotos recientes reciben mucho más clics y Google lo nota.
- Qué fotografiar: cabinas y equipos (categoría INTERIOR), fachada con letrero (EXTERIOR), equipo humano (TEAMS), procedimientos y resultados con consentimiento (AT_WORK).
- Reglas técnicas en `banco-imagenes/README.md`.

### 3. Publicaciones con botón de reserva
- 1 post semanal o quincenal (`create_local_post`) con CTA `BOOK` → enlace de reservas de AgendaPro.
- Contenido: la oferta del mes (ver memoria de ofertas — cambia cada mes), servicios destacados, antes/después.

### 4. Ficha 100 % completa (manual en business.google.com, una vez)
- **Categoría principal**: la más específica que exista (p. ej. "Centro de depilación láser"); secundarias: "Spa médico", "Centro de estética".
- **Servicios**: cada servicio con su descripción y precio "desde" — cada uno es una palabra clave.
- **Descripción** (750 car.): qué, dónde, para quién, con las búsquedas objetivo escritas de forma natural (vía `update_location`).
- **Atributos**: cita previa, accesibilidad, formas de pago.
- **Q&A**: sembrar las 5-8 preguntas que la gente hace por WhatsApp (¿duele?, ¿precio?, ¿cuántas sesiones?) y responderlas como negocio.
- **Horarios** exactos + especiales de feriados (vía Windsor) — una ficha marcada "podría estar cerrado" pierde clics.

### 5. Consistencia NAP (Nombre, Dirección, Teléfono)
- Idénticos en: ficha Google, cibaospalaser.com, Instagram/Facebook, Apple Maps.
- El sitio web debe enlazar la ficha de Maps de cada sucursal y tener una página por sucursal con su dirección escrita en texto (no solo imagen) — pendiente coordinar con `cibaospalaser-web`.

### 6. Apple Maps (Fase 6 del plan)
- Apple Business Connect es gratis y casi ningún negocio local lo trabaja: presencia fácil de ganar. Siri, iPhone Maps e Instagram tiran de ahí.

## Cadencia

| Frecuencia | Acción | Herramienta |
|-----------|--------|-------------|
| Semanal | Foto nueva por sucursal | `/gmb-semana` |
| Semanal/quincenal | Post con CTA de reserva | `/gmb-semana` (paso opcional) |
| <48 h | Responder reseñas nuevas | `/gmb-resenas` |
| Mensual | Actualizar oferta del mes en posts | `/gmb-semana` |
| Mensual | Medir posiciones y métricas de ficha | manual / Windsor `get_data` |
| Trimestral | Revisar categorías, servicios, Q&A | manual |
