# /gmb-resenas — Responder reseñas de Google Business

Lee las reseñas del perfil de Cibao Spa Laser y publica respuestas del dueño vía Windsor (`google_my_business`).

## Pasos

1. Windsor `get_data` sobre `google_my_business`, tabla de reseñas (Reviews), para cada cuenta conectada. Filtrar las que no tienen respuesta del dueño.
2. Redactar una respuesta por reseña, en español, cálida y profesional, firmada como el negocio:
   - Agradecer siempre con el nombre de la clienta si aparece.
   - Mencionar el servicio de forma natural ("gracias por confiar en tu depilación láser") — suma relevancia SEO.
   - Reseñas negativas: agradecer, disculparse sin excusas, ofrecer resolverlo por el WhatsApp del negocio. Nunca discutir, nunca dar datos de la clienta ni detalles clínicos (son datos de salud).
   - Corta: 2-4 frases.
3. **Presentar todas las respuestas al usuario y esperar su aprobación** — las respuestas son públicas y `reply_to_review` reemplaza cualquier respuesta anterior. No publicar nada sin el visto bueno.
4. Aprobadas → `execute_action reply_to_review` con `review_id` y `comment`, en la cuenta de la sucursal correcta.
5. Resumen: cuántas respondidas, cuántas pendientes, promedio de estrellas por sucursal.
