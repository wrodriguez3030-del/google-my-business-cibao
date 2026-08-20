# /gmb-mes — Vigilancia mensual de posiciones y salud de fichas

Chequeo defensivo mensual (primera semana del mes). El objetivo es detectar regresiones ANTES de que cuesten el #1. Regla de oro: este comando **solo mide y reporta** — nunca edita fichas.

## Pasos

1. **Salud por Windsor** — `get_data` sobre `google_my_business` con: `location_title`, `location_open_info_status`, `location_metadata_has_voice_of_merchant`, `location_metadata_duplicate_location`, `location_metadata_has_pending_edits`, `location_metadata_has_google_updated`, `review_average_rating_total`, `review_total_count` (tabla Reviews para los dos últimos).
   - 🔴 `has_voice_of_merchant` = False → ficha suspendida: parar todo, capturar evidencia, avisar al dueño HOY (protocolo en `docs/DEFENSA-POSICIONES.md`).
   - 🟡 `has_google_updated` = True → Google aplicó ediciones de terceros: revisarlas en business.google.com con el dueño antes de aceptar/rechazar.
2. **Posición en el mapa** — en Chrome, buscar `https://www.google.com/maps/search/depilacion+laser/@19.4543202,-70.6801689,14z` y anotar: posición de cada sede en la lista, quién está por encima, y rating/reseñas de The Wellness House.
3. **Registrar** — añadir una fila por sede en `estado/mediciones.md` (fecha, posición, rating, reseñas, notas). Comparar contra el mes anterior y la línea base del 20/08/2026.
4. **Commit + push** a origin y github.
5. **Reporte al dueño**: qué se sostiene, qué bajó, qué acción defensiva toca (más reseñas en X sede, foto pendiente, etc.). Sin cambios en fichas — cualquier corrección se propone, no se ejecuta.
