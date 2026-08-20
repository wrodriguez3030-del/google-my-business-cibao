# /gmb-semana — Publicación semanal en Google Business

Publica el lote semanal de fotos (y opcionalmente un post) en el perfil de Google Business de Cibao Spa Laser vía el conector `google_my_business` de Windsor.ai (MCP).

## Requisitos previos (aborta y explica si falla alguno)

1. El conector `google_my_business` debe tener cuentas conectadas en Windsor (`get_connectors`). Si no: entregar la URL de autorización (`get_connector_authorization_url`) y parar — Fase 2 de `docs/PLAN.md`.
2. `estado/config.json` → `sucursales` debe mapear cada carpeta a un `windsorAccountId`. Si hay carpetas sin mapear, avisar y publicar solo las mapeadas.

## Pasos

1. `git status` — el working tree debe estar limpio de fotos sin commitear. Si hay fotos nuevas: commit + push a `origin` **y a `github`** (sin push al espejo no hay URL pública).
2. `node scripts/siguiente-lote.mjs` — obtiene el lote. Si `lote` está vacío: avisar que el banco se agotó y pedir fotos nuevas. Si alguna trae `advertencia`, saltarla y avisar.
3. **🔴 AUTORIZACIÓN OBLIGATORIA (regla del dueño, 2026-08-20): presentar el lote al dueño (qué foto, a qué sucursal, con qué categoría — idealmente mostrando las imágenes) y ESPERAR su OK explícito. Sin aprobación no se sube NADA a Google. Si rechaza alguna, se salta sin marcarla publicada.**
4. Verificar cada URL con `curl -sI <url>` → debe dar 200 y `content-type` de imagen. Si da 404, el push al espejo falta o falló.
5. Por cada foto aprobada: Windsor `execute_action` con connector `google_my_business`, la cuenta de su sucursal, acción `upload_media`, `photo_url` y `category` del lote.
5. Por cada publicada con éxito: `node scripts/marcar-publicada.mjs <archivo> <sucursal>`.
6. Post opcional (semanal o quincenal, ver `docs/SEO-LOCAL.md`): `create_local_post` con la oferta vigente del mes y CTA `BOOK` hacia el enlace de reservas de AgendaPro, `language_code: "es"`. La oferta cambia cada mes — verificar la vigente antes de redactar, nunca reciclar la del mes pasado.
7. Commit de `estado/cola.json` (`gmb: publicación semanal AAAA-MM-DD`) y push a ambos remotos.
8. Resumen final: qué se publicó, en qué sucursal, cuántas fotos quedan en el banco.

## Reglas

- Nunca publicar una foto cuya URL no devolvió 200.
- Nunca volver a publicar una foto que ya esté en `estado/cola.json`.
- Si Windsor devuelve error en una foto, seguir con las demás y reportar el fallo al final.
