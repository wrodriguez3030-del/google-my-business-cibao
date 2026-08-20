#!/usr/bin/env node
// Elige las próximas fotos a publicar (por sucursal, en orden, sin repetir)
// y arma su URL pública en el espejo GitHub. Imprime JSON por stdout.
import { readFile, readdir, stat } from 'node:fs/promises'
import { join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const BANCO = join(RAIZ, 'banco-imagenes')
const EXTENSIONES = new Set(['.jpg', '.jpeg', '.png'])
const TAMANO_MINIMO = 10 * 1024

const CATEGORIAS_POR_PREFIJO = {
  interior: 'INTERIOR',
  exterior: 'EXTERIOR',
  equipo: 'TEAMS',
  trabajo: 'AT_WORK',
}

async function listarFotos(directorio) {
  const entradas = await readdir(directorio, { withFileTypes: true, recursive: true })
  return entradas
    .filter((e) => e.isFile() && EXTENSIONES.has(extname(e.name).toLowerCase()))
    .map((e) => relative(BANCO, join(e.parentPath, e.name)))
    .sort()
}

function categoriaDe(nombreArchivo) {
  const prefijo = nombreArchivo.split('-')[0].toLowerCase()
  return CATEGORIAS_POR_PREFIJO[prefijo] ?? 'ADDITIONAL'
}

function urlPublica(config, rutaRelativa) {
  const ruta = rutaRelativa.split('/').map(encodeURIComponent).join('/')
  return `https://raw.githubusercontent.com/${config.espejoGithub}/${config.rama}/banco-imagenes/${ruta}`
}

async function main() {
  const config = JSON.parse(await readFile(join(RAIZ, 'estado/config.json'), 'utf8'))
  const cola = JSON.parse(await readFile(join(RAIZ, 'estado/cola.json'), 'utf8'))

  if (!config.espejoGithub) {
    throw new Error('estado/config.json: falta espejoGithub — sin él no hay URL pública')
  }

  const yaPublicadas = new Set(cola.publicadas.map((p) => p.archivo))
  const todas = await listarFotos(BANCO)
  const pendientes = todas.filter((f) => !yaPublicadas.has(f))

  const porSucursal = pendientes.reduce((acc, archivo) => {
    const sucursal = archivo.includes('/') ? archivo.split('/')[0] : 'general'
    return { ...acc, [sucursal]: [...(acc[sucursal] ?? []), archivo] }
  }, {})

  const cuota = config.fotosPorSemanaPorSucursal ?? 1
  const lote = []
  for (const [sucursal, archivos] of Object.entries(porSucursal)) {
    if (config.sucursales[sucursal]?.pausada) continue
    for (const archivo of archivos.slice(0, cuota)) {
      const info = await stat(join(BANCO, archivo))
      lote.push({
        sucursal,
        archivo,
        categoria: categoriaDe(archivo.split('/').pop()),
        url: urlPublica(config, archivo),
        windsorAccountId: config.sucursales[sucursal]?.windsorAccountId ?? null,
        advertencia: info.size < TAMANO_MINIMO ? `pesa ${info.size} B (<10 KB): Google la rechazará` : null,
      })
    }
  }

  process.stdout.write(JSON.stringify({ lote, pendientesTotal: pendientes.length }, null, 2) + '\n')
}

main().catch((error) => {
  process.stderr.write(`Error: ${error.message}\n`)
  process.exit(1)
})
