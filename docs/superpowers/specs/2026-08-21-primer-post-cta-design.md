# Diseño — Primer post con CTA de reserva (`/gmb-post`)

Fecha: 2026-08-21 · Estado: aprobado por el operador

## Objetivo

Cerrar el pendiente de Fase 3 del `docs/PLAN.md` (probar `create_local_post` con CTA `BOOK`) y dejarlo como pieza repetible: un comando `/gmb-post` que publica el post de la oferta vigente en las sedes abiertas, con aprobación previa del dueño y registro anti-duplicados.

## Componentes

### 1. Enlace de reservas en `estado/config.json`

Nuevo campo de nivel superior:

```json
"reservas": "https://cibaospalaser.site.agendapro.com/do"
```

Es el destino del CTA `BOOK`. Fuente: botones «Agendar cita» de cibaospalaser.com (verificado 2026-08-21). Hasta ahora el enlace no estaba escrito en ningún archivo del repo.

### 2. Registro `estado/posts.json`

Misma filosofía que `cola.json`:

```json
{
  "publicados": [
    {
      "tema": "oferta-agosto-2026",
      "sucursal": "villa-olga",
      "fecha": "<ISO>",
      "notas": "<id o referencia devuelta por Windsor>"
    }
  ]
}
```

Regla dura: **nunca publicar el mismo `tema` dos veces en la misma sede**. El `tema` sigue el patrón `oferta-<mes>-<año>` para posts de oferta; otros temas usan un slug descriptivo.

### 3. Comando `.claude/commands/gmb-post.md`

Flujo (espejo del estilo de `/gmb-semana`):

1. `git pull` (anti-duplicados multi-máquina) y working tree limpio.
2. Leer `config.json`: solo sedes **sin `pausada`** (Naco queda fuera sola) y el enlace `reservas`.
3. Leer `posts.json` y calcular qué sedes aún no tienen el tema del mes.
4. Verificar la **oferta vigente del mes** — cambia cada mes, nunca reciclar la anterior.
5. Redactar el texto (keywords locales + oferta + sede) y elegir imagen (flyer 4x5 del mes); verificar su URL pública en raw.githubusercontent.com con `curl -sI` → 200 e imagen.
6. 🔴 **AUTORIZACIÓN OBLIGATORIA**: presentar borrador completo (texto, imagen, CTA, sedes destino) y esperar el OK explícito del dueño. Sin aprobación no se publica nada.
7. Por sede aprobada: Windsor `execute_action`, connector `google_my_business`, acción `create_local_post`, CTA `BOOK` → `reservas`, `language_code: "es"`.
8. Registrar en `posts.json` **solo lo publicado con éxito**; commit + push a `origin` y `github`.
9. Resumen: qué se publicó, dónde, qué falló.

### 4. Ajustes menores

- Paso 6 de `/gmb-semana` pasa a referenciar `/gmb-post` (sin lógica duplicada).
- `docs/PLAN.md`: marcar el checkbox de `create_local_post` en Fase 3.
- `CHANGELOG.md`: v0.3.0.
- `README.md`: fila de `/gmb-post` en la tabla de piezas.

## Manejo de errores

- Imagen sin 200 → corregir el push al espejo antes de publicar; nunca publicar con URL rota.
- Fallo de Windsor en una sede → seguir con las demás, registrar solo las exitosas, reportar el fallo.
- Oferta del mes desconocida o dudosa → preguntar antes de redactar, jamás inventarla.

## Verificación

- El primer post (oferta agosto: 5 sesiones RD$8,000 · 10 = RD$12,500) aparece en la ficha de Google de las 3 sedes abiertas con botón «Reservar» funcionando hacia AgendaPro.
- `posts.json` refleja lo publicado y el repo queda pusheado a ambos remotos.
