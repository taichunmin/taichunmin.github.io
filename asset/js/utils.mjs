import _ from 'lodash'
import JSON5 from 'json5'
import Papa from 'papaparse'

/** Swal showLoading */
export function showLoading (opts = {}) {
  const { Swal } = window
  opts = {
    allowOutsideClick: false,
    showConfirmButton: false,
    ...opts,
  }
  if (Swal.isVisible()) return Swal.update(_.omit(opts, ['progressStepsDistance']))
  Swal.fire({ ...opts, didRender: () => { Swal.showLoading() } })
}

/** JSON5.parse with default value */
export function parseJson5OrDefault (str, defaultVal) {
  try {
    return JSON5.parse(str)
  } catch (err) {
    return defaultVal
  }
}

export async function getJson (url, cachetime = 3e4) {
  if (_.isString(url)) url = new URL(url)
  url.searchParams.set('cachebust', Math.trunc(Date.now() / cachetime))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return await res.json()
}

export async function getCsv (url, cachetime = 3e4) {
  const { fetch } = window
  const tmp = new URL(url)
  tmp.searchParams.set('cachebust', Math.trunc(Date.now() / cachetime))
  const res = await fetch(tmp.href)
  if (!res.ok) throw new Error(`Failed to fetch ${tmp.href}`)
  return Papa.parse(await res.text(), { encoding: 'utf8', header: true })?.data ?? []
}

export async function btnCopy (text, container = null) {
  container ??= document.body
  const dom = document.createElement('textarea')
  dom.value = text = `${text}`
  container.appendChild(dom)
  dom.select()
  dom.setSelectionRange(0, 1e6) // For mobile devices
  document.execCommand('copy')
  container.removeChild(dom)
}

export async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
