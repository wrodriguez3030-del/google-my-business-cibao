#!/usr/bin/env node
// Registra en la cola una foto ya publicada.
// Uso: node scripts/marcar-publicada.mjs <archivo-relativo> <sucursal> [notas]
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const RUTA_COLA = join(RAIZ, 'estado/cola.json')

async function main() {
  const [archivo, sucursal, notas] = process.argv.slice(2)
  if (!archivo || !sucursal) {
    throw new Error('Uso: node scripts/marcar-publicada.mjs <archivo-relativo> <sucursal> [notas]')
  }

  const cola = JSON.parse(await readFile(RUTA_COLA, 'utf8'))
  if (cola.publicadas.some((p) => p.archivo === archivo)) {
    throw new Error(`Ya estaba registrada: ${archivo}`)
  }

  const colaNueva = {
    ...cola,
    publicadas: [
      ...cola.publicadas,
      { archivo, sucursal, fecha: new Date().toISOString(), ...(notas ? { notas } : {}) },
    ],
  }

  await writeFile(RUTA_COLA, JSON.stringify(colaNueva, null, 2) + '\n', 'utf8')
  process.stdout.write(`Registrada: ${archivo} (${sucursal})\n`)
}

main().catch((error) => {
  process.stderr.write(`Error: ${error.message}\n`)
  process.exit(1)
})
