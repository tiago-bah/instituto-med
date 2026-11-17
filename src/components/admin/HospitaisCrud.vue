<template>
  <section class="crud-page" aria-labelledby="hospitais-titulo">
    <header class="crud-heading">
      <div>
        <p class="eyebrow">CADASTRO E MANUTENÇÃO</p>
        <h2 id="hospitais-titulo">Hospitais parceiros</h2>
        <p>Cadastre, consulte, edite ou remova hospitais da listagem pública.</p>
      </div>
      <button class="primary-button" type="button" @click="abrirNovo">
        <span aria-hidden="true">＋</span> Novo hospital
      </button>
    </header>

    <p v-if="mensagem" class="feedback success" role="status">{{ mensagem }}</p>
    <p v-if="erro" class="feedback error" role="alert">{{ erro }}</p>

    <section v-if="formAberto" class="editor-card" aria-labelledby="formulario-titulo">
      <div class="editor-heading">
        <div>
          <h3 id="formulario-titulo">{{ idEditando ? 'Editar hospital' : 'Cadastrar hospital' }}</h3>
          <p>Nome, endereço e telefone são obrigatórios.</p>
        </div>
        <button class="text-button" type="button" @click="fecharFormulario">Cancelar</button>
      </div>

      <form class="hospital-form" @submit.prevent="salvar">
        <label>
          Nome do hospital <span>*</span>
          <input v-model.trim="form.nome" required maxlength="120" autocomplete="organization" />
        </label>
        <label>
          Telefone <span>*</span>
          <input v-model.trim="form.telefone" required maxlength="25" type="tel" placeholder="+55 (47) 00000-0000" />
        </label>
        <label class="wide-field">
          Endereço <span>*</span>
          <input v-model.trim="form.endereco" required maxlength="240" autocomplete="street-address" />
        </label>
        <label>
          Tipo
          <input v-model.trim="form.tipo" maxlength="60" placeholder="Geral, regional, municipal..." />
        </label>
        <label>
          Horário de atendimento
          <input v-model.trim="form.atendimento" maxlength="120" />
        </label>
        <label class="wide-field">
          Slogan
          <input v-model.trim="form.slogan" maxlength="180" />
        </label>
        <label class="wide-field">
          Descrição
          <textarea v-model.trim="form.descricao" rows="3" maxlength="1000"></textarea>
        </label>
        <label>
          Imagem (caminho ou URL)
          <input v-model.trim="form.imagem" maxlength="500" placeholder="/img/hospitais/exemplo.png" />
        </label>
        <label>
          Link do mapa
          <input v-model.trim="form.mapa" type="url" maxlength="1000" placeholder="https://..." />
        </label>
        <label>
          Profissionais
          <input v-model.trim="form.profissionais" maxlength="40" />
        </label>
        <label>
          Leitos
          <input v-model.trim="form.leitos" maxlength="40" />
        </label>
        <label>
          Especialidades
          <input v-model.trim="form.especialidades" maxlength="60" />
        </label>
        <label>
          CNPJ
          <input v-model.trim="form.cnpj" maxlength="24" />
        </label>
        <label>
          Administração
          <input v-model.trim="form.administracao" maxlength="120" />
        </label>
        <label>
          Fundação
          <input v-model="form.fundacao" type="date" />
        </label>
        <label>
          Diretor(a)
          <input v-model.trim="form.diretor" maxlength="120" />
        </label>
        <label>
          CRM
          <input v-model.trim="form.crm" maxlength="40" />
        </label>

        <div class="form-actions wide-field">
          <button class="text-button" type="button" @click="fecharFormulario">Cancelar</button>
          <button class="primary-button" type="submit" :disabled="salvando">
            {{ salvando ? 'Salvando…' : idEditando ? 'Salvar alterações' : 'Cadastrar hospital' }}
          </button>
        </div>
      </form>
    </section>

    <section v-if="hospitalSelecionado" class="detail-card" aria-live="polite">
      <div class="detail-heading">
        <div>
          <p class="eyebrow">DETALHES · ID {{ hospitalSelecionado.id }}</p>
          <h3>{{ hospitalSelecionado.nome }}</h3>
        </div>
        <button class="text-button" type="button" @click="hospitalSelecionado = null">Fechar</button>
      </div>
      <dl class="detail-grid">
        <div><dt>Endereço</dt><dd>{{ hospitalSelecionado.endereco || 'Não informado' }}</dd></div>
        <div><dt>Telefone</dt><dd>{{ hospitalSelecionado.telefone || 'Não informado' }}</dd></div>
        <div><dt>Tipo</dt><dd>{{ hospitalSelecionado.tipo || 'Não informado' }}</dd></div>
        <div><dt>Atendimento</dt><dd>{{ hospitalSelecionado.atendimento || 'Não informado' }}</dd></div>
        <div><dt>Slogan</dt><dd>{{ hospitalSelecionado.slogan || 'Não informado' }}</dd></div>
        <div><dt>Descrição</dt><dd>{{ hospitalSelecionado.descricao || 'Não informado' }}</dd></div>
        <div><dt>Profissionais</dt><dd>{{ hospitalSelecionado.profissionais || 'Não informado' }}</dd></div>
        <div><dt>Leitos</dt><dd>{{ hospitalSelecionado.leitos || 'Não informado' }}</dd></div>
        <div><dt>Especialidades</dt><dd>{{ hospitalSelecionado.especialidades || 'Não informado' }}</dd></div>
        <div><dt>CNPJ</dt><dd>{{ hospitalSelecionado.cnpj || 'Não informado' }}</dd></div>
        <div><dt>Administração</dt><dd>{{ hospitalSelecionado.administracao || 'Não informado' }}</dd></div>
        <div><dt>Fundação</dt><dd>{{ formatarData(hospitalSelecionado.fundacao) }}</dd></div>
        <div><dt>Diretor(a)</dt><dd>{{ hospitalSelecionado.diretor || 'Não informado' }}</dd></div>
        <div><dt>CRM</dt><dd>{{ hospitalSelecionado.crm || 'Não informado' }}</dd></div>
        <div class="wide-field"><dt>Mapa</dt><dd>{{ hospitalSelecionado.mapa || 'Não informado' }}</dd></div>
        <div class="wide-field"><dt>Imagem</dt><dd>{{ hospitalSelecionado.imagem || 'Não informada' }}</dd></div>
      </dl>
    </section>

    <section class="table-card">
      <div class="table-toolbar">
        <div>
          <h3>Hospitais cadastrados</h3>
          <p>{{ hospitaisFiltrados.length }} registro(s)</p>
        </div>
        <input v-model="busca" class="search-input" type="search" placeholder="Buscar por nome ou endereço" aria-label="Buscar hospitais" />
      </div>

      <div v-if="carregando" class="empty-state" role="status">Carregando hospitais…</div>
      <div v-else-if="erro && hospitais.length === 0" class="empty-state">
        <p>Não foi possível carregar os hospitais.</p>
        <button class="text-button" type="button" @click="carregarHospitais">Tentar novamente</button>
      </div>
      <div v-else-if="hospitaisFiltrados.length === 0" class="empty-state">
        {{ busca ? 'Nenhum hospital corresponde à busca.' : 'Nenhum hospital cadastrado.' }}
      </div>
      <div v-else class="table-scroll">
        <table>
          <thead>
            <tr><th>Hospital</th><th>Endereço</th><th>Telefone</th><th class="actions-column">Ações</th></tr>
          </thead>
          <tbody>
            <tr v-for="hospital in hospitaisFiltrados" :key="hospital.id">
              <td><strong>{{ hospital.nome }}</strong><small>ID {{ hospital.id }}</small></td>
              <td>{{ hospital.endereco }}</td>
              <td>{{ hospital.telefone }}</td>
              <td class="row-actions">
                <button type="button" aria-label="Consultar hospital" title="Consultar" @click="consultar(hospital.id)">Ver</button>
                <button type="button" aria-label="Editar hospital" title="Editar" @click="editar(hospital.id)">Editar</button>
                <button class="delete-action" type="button" aria-label="Excluir hospital" title="Excluir" @click="excluir(hospital)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  atualizarHospital,
  cadastrarHospital,
  excluirHospital,
  listarHospitais,
  obterHospital
} from '../../services/hospitaisApi'

const camposVazios = () => ({
  nome: '', slogan: '', telefone: '', atendimento: '', endereco: '', imagem: '', mapa: '',
  descricao: '', profissionais: '', leitos: '', especialidades: '', cnpj: '', tipo: '',
  administracao: '', fundacao: '', diretor: '', crm: ''
})

const hospitais = ref([])
const busca = ref('')
const carregando = ref(false)
const salvando = ref(false)
const erro = ref('')
const mensagem = ref('')
const formAberto = ref(false)
const idEditando = ref(null)
const hospitalSelecionado = ref(null)
const form = reactive(camposVazios())

const hospitaisFiltrados = computed(() => {
  const termo = busca.value.trim().toLocaleLowerCase('pt-BR')
  if (!termo) return hospitais.value
  return hospitais.value.filter((hospital) =>
    `${hospital.nome} ${hospital.endereco}`.toLocaleLowerCase('pt-BR').includes(termo)
  )
})

async function carregarHospitais() {
  carregando.value = true
  erro.value = ''
  try {
    hospitais.value = await listarHospitais()
  } catch (falha) {
    erro.value = falha.message
  } finally {
    carregando.value = false
  }
}

function limparFeedback() {
  erro.value = ''
  mensagem.value = ''
}

function abrirNovo() {
  limparFeedback()
  hospitalSelecionado.value = null
  idEditando.value = null
  Object.assign(form, camposVazios())
  formAberto.value = true
}

function fecharFormulario() {
  formAberto.value = false
  idEditando.value = null
  Object.assign(form, camposVazios())
}

async function consultar(id) {
  limparFeedback()
  hospitalSelecionado.value = null
  try {
    hospitalSelecionado.value = await obterHospital(id)
  } catch (falha) {
    erro.value = falha.message
  }
}

async function editar(id) {
  limparFeedback()
  try {
    const hospital = await obterHospital(id)
    hospitalSelecionado.value = null
    idEditando.value = hospital.id
    Object.assign(form, { ...camposVazios(), ...hospital, fundacao: normalizarData(hospital.fundacao) })
    formAberto.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (falha) {
    erro.value = falha.message
  }
}

async function salvar() {
  limparFeedback()
  const telefoneLimpo = form.telefone.replace(/\D/g, '')

  if (!form.nome.trim() || !form.endereco.trim() || !form.telefone.trim()) {
    erro.value = 'Preencha nome, endereço e telefone.'
    return
  }
  if (telefoneLimpo.length < 8 || telefoneLimpo.length > 15) {
    erro.value = 'Informe um telefone válido.'
    return
  }
  if (form.mapa && !form.mapa.startsWith('https://')) {
    erro.value = 'O link do mapa deve começar com https://.'
    return
  }

  const dados = Object.fromEntries(
    Object.entries(form).map(([chave, valor]) => [chave, typeof valor === 'string' ? valor.trim() : valor])
  )
  delete dados.id
  salvando.value = true

  try {
    if (idEditando.value !== null) {
      await atualizarHospital(idEditando.value, dados)
      mensagem.value = 'Hospital atualizado com sucesso.'
    } else {
      await cadastrarHospital(dados)
      mensagem.value = 'Hospital cadastrado com sucesso.'
    }
    fecharFormulario()
    await carregarHospitais()
  } catch (falha) {
    erro.value = falha.message
  } finally {
    salvando.value = false
  }
}

async function excluir(hospital) {
  if (possuiAgendamentoVinculado(hospital.nome)) {
    erro.value = 'Não é possível excluir este hospital: há agendamento(s) associado(s) a ele.'
    mensagem.value = ''
    return
  }
  if (!window.confirm(`Deseja excluir “${hospital.nome}”? Esta ação não pode ser desfeita.`)) return
  limparFeedback()
  try {
    await excluirHospital(hospital.id)
    if (hospitalSelecionado.value?.id === hospital.id) hospitalSelecionado.value = null
    mensagem.value = 'Hospital excluído com sucesso.'
    await carregarHospitais()
  } catch (falha) {
    erro.value = falha.message
  }
}

function possuiAgendamentoVinculado(nomeHospital) {
  try {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
    const normalizar = (valor) => String(valor || '').trim().toLocaleLowerCase('pt-BR')
    return agendamentos.some((agendamento) => normalizar(agendamento.hospital) === normalizar(nomeHospital))
  } catch {
    return false
  }
}

function normalizarData(data) {
  if (!data) return ''
  const iso = String(data).replaceAll('/', '-')
  const partes = iso.split('-')
  return partes[0]?.length === 4 ? iso : `${partes[2]}-${partes[1]}-${partes[0]}`
}

function formatarData(data) {
  if (!data) return 'Não informada'
  const partes = normalizarData(data).split('-')
  return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data
}

onMounted(carregarHospitais)
</script>

<style scoped>
.crud-page { display: grid; gap: 18px; }
.crud-heading, .editor-heading, .table-toolbar, .detail-heading, .panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.crud-heading { margin-bottom: 2px; }
.crud-heading h2, .editor-heading h3, .detail-heading h3, .table-toolbar h3 { margin-top: 5px; color: #17344a; font-size: 19px; }
.crud-heading p:not(.eyebrow), .editor-heading p, .table-toolbar p { margin-top: 6px; color: #85929c; font-size: 12px; line-height: 1.5; }
.eyebrow { color: var(--blue-500); font-size: 9px; font-weight: 700; letter-spacing: .13em; }
.primary-button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 40px; padding: 0 15px; border-radius: 9px; background: var(--blue-600); color: #fff; font-size: 12px; font-weight: 700; white-space: nowrap; }
.primary-button:hover { background: var(--blue-700, #075985); }
.primary-button:disabled { cursor: wait; opacity: .65; }
.text-button { color: var(--blue-600); font-size: 12px; font-weight: 700; }
.text-button:hover { text-decoration: underline; }
.feedback { padding: 12px 14px; border-radius: 9px; font-size: 13px; }
.feedback.success { background: #e9f7ef; color: #187146; }
.feedback.error { background: #fff0ef; color: #a5332b; }
.editor-card, .detail-card, .table-card { padding: 20px; border: 1px solid #e4ebf0; border-radius: 14px; background: #fff; }
.editor-heading { margin-bottom: 18px; }
.hospital-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.hospital-form label { display: grid; align-content: start; gap: 6px; color: #536775; font-size: 11px; font-weight: 700; }
.hospital-form label span { color: #c64138; }
.hospital-form input, .hospital-form textarea, .search-input { width: 100%; min-height: 38px; padding: 9px 11px; border: 1px solid #dce5eb; border-radius: 8px; background: #fff; color: #294252; font: inherit; font-size: 12px; }
.hospital-form textarea { resize: vertical; }
.hospital-form input:focus, .hospital-form textarea:focus, .search-input:focus { border-color: var(--blue-500); outline: 2px solid rgba(22,132,183,.12); }
.wide-field { grid-column: 1 / -1; }
.form-actions { display: flex; justify-content: flex-end; align-items: center; gap: 16px; padding-top: 5px; }
.detail-heading { padding-bottom: 15px; border-bottom: 1px solid #edf1f4; }
.detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 20px; margin: 16px 0 0; }
.detail-grid dt { color: #86939d; font-size: 10px; font-weight: 700; text-transform: uppercase; }
.detail-grid dd { margin: 4px 0 0; color: #304b5d; font-size: 12px; line-height: 1.5; overflow-wrap: anywhere; }
.table-toolbar { margin-bottom: 14px; }
.search-input { max-width: 280px; }
.table-scroll { width: 100%; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th { padding: 11px 10px; border-bottom: 1px solid #e7edf1; color: #82909a; font-size: 10px; font-weight: 700; text-transform: uppercase; }
td { padding: 13px 10px; border-bottom: 1px solid #edf1f4; color: #60717e; font-size: 12px; line-height: 1.45; }
tbody tr:last-child td { border-bottom: 0; }
td strong { display: block; color: #29485c; font-size: 12px; }
td small { display: block; margin-top: 3px; color: #97a3ab; font-size: 10px; }
.actions-column { text-align: right; }
.row-actions { min-width: 190px; text-align: right; white-space: nowrap; }
.row-actions button { padding: 5px 7px; color: var(--blue-600); font-size: 11px; font-weight: 700; }
.row-actions button:hover { text-decoration: underline; }
.row-actions .delete-action { color: #b23a34; }
.empty-state { padding: 28px 12px; color: #84929c; font-size: 13px; text-align: center; }
.empty-state .text-button { margin-top: 10px; }

@media (max-width: 720px) {
  .crud-heading, .table-toolbar { align-items: stretch; flex-direction: column; }
  .crud-heading .primary-button { align-self: flex-start; }
  .search-input { max-width: none; }
  .hospital-form, .detail-grid { grid-template-columns: 1fr; }
  .wide-field { grid-column: auto; }
  .editor-card, .detail-card, .table-card { padding: 15px; }
  .editor-heading { align-items: flex-start; }
}
</style>
