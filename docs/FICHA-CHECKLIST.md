# Checklist manual — ficha 100 % completa (business.google.com)

Lo que Windsor **no** cubre; se hace a mano con la sesión de `cibaospalaser@gmail.com`. Estado al 2026-08-21 (diagnóstico vía Windsor `get_data`).

## 1. Categorías secundarias — Rafael Vidal y Villa Olga ✅ (2026-08-21)

HECHO por el navegador con la cuenta cibaospalaser: las 5 categorías de Los Jardines (Spa, Esteticista, Esteticista facial, Clínica dermatológica, Servicio de eliminación de tatuajes) añadidas en Rafael Vidal y Villa Olga. Google las dejó «pendientes de revisión» (~10 min) — verificar luego que aparezcan.

La categoría principal de Rafael Vidal SÍ es «Centro de depilación láser» (el inglés era solo el locale de la API — verificado en el panel).

Ojo del panel: el grupo de ubicaciones solo se ve entrando con la cuenta cibaospalaser (`/u/1/` si es la 2ª sesión del navegador) y eligiendo el grupo «Cibao Spa Laser Centro de Depilacion» en el desplegable; con la cuenta personal la lista muestra OTROS negocios (Naco, «Cibao Plaza», «Ebra & Skin»).

## 2. Servicios con precio «desde» (las 3 sedes abiertas) ⏳ (avanzado 2026-08-21)

Cada servicio publicado es una palabra clave. El precio es el REGULAR (RD$2,000/área/sesión), nunca el de oferta (la oferta va en los posts de `/gmb-post`).

- [x] **Rafael Vidal**: «Depilación Láser» (custom, sección principal) y «Laser hair removal» (sección Skin care clinic) con **Desde RD$2,000** + descripción GentleYAG; **Hollywood Peel** añadido. Ya tenía Masajes, Faciales, depilación brasileña, Wax.
- [x] **Villa Olga**: «Depilación láser» (estructurado, sección principal) con **Desde RD$2,000** + descripción.
- [ ] **Villa Olga**: añadir servicios custom: Masajes, Tratamientos faciales, Hollywood Peel, Eliminación de tatuajes (el modal de Google se colgó — reintentar).
- [ ] **Los Jardines**: precio «Desde RD$2,000» en su servicio de depilación láser + añadir Tratamientos faciales y Hollywood Peel (ya tiene Masajes).

🔧 Cómo operar el modal de servicios (aprendido 2026-08-21): las capturas de pantalla salen a escala — **coordenadas SIEMPRE por JS** (`getBoundingClientRect` del iframe [mismo origen] + del elemento) y clic real ahí; los botones de la página exterior se abren con `focus()` + tecla Enter; el diálogo «¿Descartar cambios?» se resuelve con `.click()` JS directo sobre su botón dentro del iframe; el dropdown de precio se abre con clic real y la opción «Desde» se clica por coordenada JS.

## 3. Atributos

Cita previa obligatoria · formas de pago aceptadas · accesibilidad · los demás que el panel ofrezca y apliquen.

## 4. Q&A — ❌ YA NO EXISTE (verificado 2026-08-21)

**Google retiró la función de Preguntas y respuestas de todos los perfiles**: descontinuada el 3-nov-2025, los hilos públicos desaparecieron de Search y Maps en dic-2025, sustituida por respuestas de IA («Ask Maps» con Gemini). No se puede sembrar Q&A en ninguna ficha — comprobado en vivo: la sección no aparece ni en Search ni en Maps.

**Alternativa** (para que la IA de Google encuentre las respuestas): las respuestas aprobadas (duele/sesiones/precio/hombres/rasurada/agendar) se colocan donde Gemini sí lee — la descripción de la ficha (hecho), las descripciones de servicios (hecho en el láser), un post FAQ vía `/gmb-post` (tema `faq-depilacion-laser`, pendiente de OK del dueño) y una página de preguntas frecuentes en cibaospalaser.com (pendiente, con el tercero que administra la web).

## Pendiente aparte (no es de la ficha)

⚠️ La web cibaospalaser.com muestra teléfonos viejos: Rafael Vidal sale con el WhatsApp (809) 502-0500 y Villa Olga con (849) 539-8905, pero los correctos son los de las fichas Google — (809) 226-0500 y (809) 583-0500 (confirmado 2026-08-21). Corregirlo con quien administra el sitio (está en el Vercel de un tercero). La consistencia NAP pesa para el ranking.
