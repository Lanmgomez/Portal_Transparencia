export const normFile = (e) => {
  // AntD pode mandar array direto em alguns casos
  if (Array.isArray(e)) return e
  return e?.fileList
}

export const validateZip = (_, fileList) => {
  const file = fileList?.[0]
  if (!file) return Promise.reject(new Error('Selecione um arquivo .zip.'))

  // checagem por extensão (mais confiável na prática)
  const isZipByName = file.name?.toLowerCase().endsWith('.zip')
  // checagem por mime (nem sempre vem certo em todos os browsers)
  const isZipByType =
    file.type === 'application/zip' ||
    file.type === 'application/x-zip-compressed'

  if (!isZipByName && !isZipByType) {
    return Promise.reject(new Error('Apenas arquivos .zip são aceitos.'))
  }

  return Promise.resolve()
}
