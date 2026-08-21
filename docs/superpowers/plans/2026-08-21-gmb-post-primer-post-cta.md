# /gmb-post + primer post con CTA — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear el comando `/gmb-post` (post de oferta con CTA de reserva, aprobación del dueño y registro anti-duplicados) y ejecutar el primer post de agosto en las 3 sedes abiertas.

**Architecture:** Repo de operaciones (no app): el "código" son archivos de estado JSON + comandos Claude en Markdown. La publicación real la hace el MCP de Windsor.ai (connector `google_my_business`, acción `create_local_post`). Verificación = JSON que parsea, URLs públicas que devuelven 200, y el post visible en la ficha de Google.

**Tech Stack:** JSON de estado, Markdown de comandos Claude, Windsor.ai MCP, git con doble remoto (`origin`=Gitea privado, `github`=espejo público que sirve las imágenes).

## Global Constraints

- 🔴 Regla del dueño (2026-08-20): TODA publicación a Google requiere su autorización previa explícita.
- 🔴 Nada sensible en el repo jamás: el espejo GitHub es PÚBLICO.
- Naco está `pausada` (cerrada temporalmente): jamás publicar ahí.
- Enlace de reservas: `https://cibaospalaser.site.agendapro.com/do` (verificado en cibaospalaser.com el 2026-08-21).
- La oferta del mes cambia cada mes; la fuente es la memoria `csl-oferta-vigente` — nunca inventarla ni reciclar la del mes pasado.
- Anti-duplicados: nunca el mismo `tema` dos veces en la misma sede; `git pull` antes de publicar.
- Política Cibao Cloud: commit con bump SemVer + CHANGELOG y push a Gitea (`origin`); push a `github` también (sirve las imágenes).

---

### Task 1: Estado — `reservas` en config y registro `posts.json`

**Files:**
- Modify: `estado/config.json` (añadir campo de nivel superior `reservas`)
- Create: `estado/posts.json`

**Interfaces:**
- Produces: `config.reservas` (string URL) y `posts.publicados` (array de `{tema, sucursal, fecha, notas}`) — los consume el comando de Task 2.

- [ ] **Step 1: Añadir `reservas` a `estado/config.json`**

Insertar tras la línea `"cuentaGoogle": "cibaospalaser@gmail.com",`:

```json
  "reservas": "https://cibaospalaser.site.agendapro.com/do",
```

- [ ] **Step 2: Crear `estado/posts.json`**

```json
{
  "publicados": []
}
```

- [ ] **Step 3: Verificar que ambos JSON parsean**

Run: `node -e "JSON.parse(require('fs').readFileSync('estado/config.json')); JSON.parse(require('fs').readFileSync('estado/posts.json')); console.log('OK')"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add estado/config.json estado/posts.json
git commit -m "estado: enlace de reservas AgendaPro en config + registro posts.json"
```

---

### Task 2: Comando `.claude/commands/gmb-post.md`

**Files:**
- Create: `.claude/commands/gmb-post.md`

**Interfaces:**
- Consumes: `config.reservas`, `config.sucursales[*].windsorAccountId` / `pausada`, `posts.publicados` (Task 1).
- Produces: el comando `/gmb-post` que referencia Task 3 desde `/gmb-semana`.

- [ ] **Step 1: Crear el comando con este contenido exacto**

````markdown
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
````

- [ ] **Step 2: Verificar coherencia de referencias**

Run: `grep -c "posts.json" .claude/commands/gmb-post.md && grep -c "reservas" .claude/commands/gmb-post.md && ls flyers/ | head -3`
Expected: ambos grep ≥1 y el listado muestra flyers `agosto-*`.

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/gmb-post.md
git commit -m "comando /gmb-post: post con CTA de reserva, aprobación del dueño y anti-duplicados"
```

---

### Task 3: Ajustes menores — referencia en /gmb-semana, PLAN, README, CHANGELOG

**Files:**
- Modify: `.claude/commands/gmb-semana.md` (paso 6)
- Modify: `docs/PLAN.md` (checkbox Fase 3)
- Modify: `README.md` (tabla de piezas)
- Modify: `CHANGELOG.md` (v0.3.0)

**Interfaces:**
- Consumes: existencia de `/gmb-post` (Task 2).

- [ ] **Step 1: `/gmb-semana` paso 6 → referenciar `/gmb-post`**

Reemplazar la línea 18 (paso 6) por:

```markdown
6. Post opcional (semanal o quincenal, ver `docs/SEO-LOCAL.md`): correr `/gmb-post` — él trae la oferta vigente, la aprobación del dueño y el registro anti-duplicados en `estado/posts.json`.
```

- [ ] **Step 2: `docs/PLAN.md` — marcar el pendiente de Fase 3**

Cambiar:

```markdown
- [ ] Probar `create_local_post` con CTA `BOOK` apuntando a la reserva de AgendaPro
```

por:

```markdown
- [x] Probar `create_local_post` con CTA `BOOK` apuntando a la reserva de AgendaPro (comando `/gmb-post`, primer post: oferta agosto 2026)
```

(Marcar SOLO después de que Task 4 publique de verdad; si Task 4 se pospone, dejar el checkbox sin marcar en este commit.)

- [ ] **Step 3: `README.md` — fila en la tabla de piezas**

Añadir tras la fila de `/gmb-semana`:

```markdown
| `/gmb-post` | Comando Claude: post con CTA «Reservar» (AgendaPro) en las sedes abiertas, con aprobación previa |
| `estado/posts.json` | Registro de posts publicados por sede — anti-duplicados |
```

- [ ] **Step 4: `CHANGELOG.md` — v0.3.0 arriba del 0.2.0**

```markdown
## 0.3.0 — 2026-08-21

- Nuevo comando `/gmb-post`: post con la oferta vigente y CTA `BOOK` → reservas de AgendaPro (`estado/config.json` → `reservas`), aprobación previa del dueño y registro anti-duplicados en `estado/posts.json`.
- `/gmb-semana` paso 6 ahora delega en `/gmb-post`.
- Diseño y plan en `docs/superpowers/`.
```

- [ ] **Step 5: Verificar y commit**

Run: `grep -n "gmb-post" .claude/commands/gmb-semana.md README.md CHANGELOG.md`
Expected: al menos una coincidencia por archivo.

```bash
git add .claude/commands/gmb-semana.md docs/PLAN.md README.md CHANGELOG.md
git commit -m "v0.3.0 — /gmb-semana delega el post en /gmb-post; PLAN, README y CHANGELOG al día"
git push origin main && git push github main
```

---

### Task 4: Ejecutar el primer post (supervisado)

**Files:**
- Modify: `estado/posts.json` (registro de lo publicado)
- Modify: `docs/PLAN.md` (checkbox de Fase 3, si no se marcó en Task 3)

**Interfaces:**
- Consumes: el comando `/gmb-post` completo (Tasks 1-3) y la oferta vigente de agosto.

- [ ] **Step 1: Confirmar la oferta vigente**

Leer la memoria `csl-oferta-vigente` y copiar el texto EXACTO de la oferta de agosto (5=RD$8,000 · 10=RD$12,500; regular RD$2,000/área — confirmar redacción y a qué aplica cada cifra en la fuente antes de redactar).

- [ ] **Step 2: Verificar la imagen del flyer en el espejo**

Run: `curl -sI https://raw.githubusercontent.com/wrodriguez3030-del/google-my-business-cibao/main/flyers/agosto-final-4x5.png | head -5`
Expected: `HTTP/2 200` y `content-type: image/png`. Si 404: `git push github main` y reintentar.

- [ ] **Step 3: Seguir el flujo de `/gmb-post`**

Pasos 1-5 del comando: pull, sedes abiertas sin el tema `oferta-agosto-2026` (deben salir villa-olga, los-jardines y rafael-vidal), borrador de texto por sede.

- [ ] **Step 4: 🔴 Presentar el borrador al dueño y ESPERAR su OK**

Mostrar: texto por sede, imagen elegida, CTA `BOOK` → `https://cibaospalaser.site.agendapro.com/do`, sedes destino. Sin OK explícito, PARAR aquí.

- [ ] **Step 5: Publicar y registrar**

Windsor `list_actions` → schema de `create_local_post` → `execute_action` por sede aprobada. Añadir a `posts.json` solo las exitosas.

- [ ] **Step 6: Verificar en la ficha**

Confirmar que el post aparece en al menos una ficha (buscar la sede en Google Maps → sección «Novedades»/«Posts») y que el botón «Reservar» lleva a AgendaPro.

- [ ] **Step 7: Commit final y push**

```bash
git add estado/posts.json docs/PLAN.md
git commit -m "gmb: primer post oferta-agosto-2026 publicado en las sedes abiertas (Fase 3 cerrada)"
git push origin main && git push github main
```
