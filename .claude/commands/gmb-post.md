# /gmb-post — Post con CTA de reserva en Google Business

Publica un post (novedad/oferta) en las fichas de Google Business de las sedes abiertas vía el conector `google_my_business` de Windsor.ai (MCP), con CTA `BOOK` hacia el enlace de reservas.

## Requisitos previos (aborta y explica si falla alguno)

1. El conector `google_my_business` debe tener cuentas conectadas en Windsor (`get_connectors`). Si no: entregar la URL de autorización (`get_connector_authorization_url`) y parar.
2. `estado/config.json` debe tener el campo `reservas` (destino del CTA) y el mapeo `sucursales`.

## Pasos

1. `git pull` en `origin` (anti-duplicados multi-máquina) y `git status` limpio.
2. Leer `estado/config.json`: sedes con `windsorAccountId` y **sin `pausada`** (Naco pausada queda fuera sola), y el enlace `reservas`.
3. Leer `estado/posts.json`. El `tema` de un post de oferta es `oferta-<mes>-<año>` (ej. `oferta-agosto-2026`). Sedes destino = sedes abiertas que NO tengan ya ese `tema` en `publicados`. Si ninguna queda, avisar y parar.
4. Verificar la **oferta vigente del mes** (memoria `csl-oferta-vigente` — cambia cada mes, nunca reciclar la del mes pasado; ante la duda, preguntar).
5. Redactar el texto del post: oferta + palabras clave locales (depilación láser, Santiago, la sede) + llamada a reservar. Elegir imagen: flyer 4x5 del mes en `flyers/`, con URL pública `https://raw.githubusercontent.com/wrodriguez3030-del/google-my-business-cibao/main/flyers/<archivo>`; verificar con `curl -sI` → 200 y `content-type` de imagen. Si da 404, falta el push al espejo `github`.
6. **🔴 AUTORIZACIÓN OBLIGATORIA (regla del dueño, 2026-08-20): presentar el borrador completo (texto, imagen, CTA con su enlace, sedes destino) y ESPERAR su OK explícito. Sin aprobación no se publica NADA. Si aprueba solo algunas sedes, publicar solo esas.**
7. Windsor `list_actions` del connector `google_my_business` para leer el schema exacto de `create_local_post`; luego, por cada sede aprobada: `execute_action` con la cuenta de esa sede, el texto, la imagen, CTA `BOOK` → `config.reservas` y `language_code: "es"`.
8. Por cada publicación exitosa, añadir a `estado/posts.json` → `publicados`:
   `{ "tema": "<tema>", "sucursal": "<carpeta>", "fecha": "<ISO ahora>", "notas": "<id o referencia devuelta por Windsor>" }`
9. Commit de `estado/posts.json` (`gmb: post <tema> en N sedes`) y push a `origin` **y a `github`**.
10. Resumen final: qué se publicó, en qué sedes, qué falló, y recordatorio de verificar que el post se ve en la ficha.

## Reglas

- Nunca publicar el mismo `tema` dos veces en la misma sede.
- Nunca publicar con una imagen cuya URL no devolvió 200.
- Si Windsor devuelve error en una sede, seguir con las demás y reportar el fallo al final.
- Registrar en `posts.json` SOLO lo publicado con éxito.
