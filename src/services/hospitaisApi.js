const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function requisicao(endpoint, opcoes = {}) {
  let resposta

  try {
    resposta = await fetch(`${API_URL}${endpoint}`, {
      ...opcoes,
      headers: {
        ...(opcoes.body ? { 'Content-Type': 'application/json' } : {}),
        ...opcoes.headers
      }
    })
  } catch {
    throw new Error('Não foi possível conectar à API. Confira se o servidor está iniciado.')
  }

  if (!resposta.ok) {
    const erro = new Error(
      resposta.status === 404
        ? 'Hospital não encontrado.'
        : `A API retornou um erro (${resposta.status}).`
    )
    erro.status = resposta.status
    throw erro
  }

  if (resposta.status === 204) return null

  const tipoConteudo = resposta.headers.get('content-type') || ''
  return tipoConteudo.includes('application/json') ? resposta.json() : null
}

export function listarHospitais() {
  return requisicao('/hospitais')
}

export function obterHospital(id) {
  return requisicao(`/hospitais/${encodeURIComponent(id)}`)
}

export function cadastrarHospital(dados) {
  return requisicao('/hospitais', {
    method: 'POST',
    body: JSON.stringify(dados)
  })
}

export function atualizarHospital(id, dados) {
  return requisicao(`/hospitais/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  })
}

export function excluirHospital(id) {
  return requisicao(`/hospitais/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  })
}
