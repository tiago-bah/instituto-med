<template>
  <main class="admin-page">
    <div class="admin-layout">
      <aside class="admin-sidebar" aria-label="Administração do site">
        <div class="sidebar-heading">
          <span class="sidebar-mark" aria-hidden="true">IM</span>
          <div>
            <strong>Administração</strong>
            <span>Painel do site</span>
          </div>
        </div>

        <p class="sidebar-label">GERENCIAR</p>
        <nav class="sidebar-nav">
          <button
            v-for="item in menu"
            :key="item.id"
            type="button"
            class="sidebar-link"
            :class="{ active: secaoAtiva === item.id }"
            :aria-current="secaoAtiva === item.id ? 'page' : undefined"
            @click="secaoAtiva = item.id"
          >
            <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
            <span v-if="item.id === 'inicio'" class="nav-chevron" aria-hidden="true">›</span>
          </button>
        </nav>

        <RouterLink to="/" class="back-home">
          <span aria-hidden="true">←</span> Voltar ao site
        </RouterLink>
      </aside>

      <section class="admin-main">
        <header class="page-heading">
          <div>
            <p class="eyebrow">INSTITUTO MED / ADMIN</p>
            <h1>{{ tituloSecao }}</h1>
            <p class="page-description">{{ descricaoSecao }}</p>
          </div>
          <span class="admin-avatar" aria-label="Administrador">A</span>
        </header>

        <template v-if="secaoAtiva === 'inicio'">
          <div class="welcome-card">
            <div>
              <span class="welcome-tag">PAINEL DE CONTROLE</span>
              <h2>Gerencie o conteúdo do Instituto Med</h2>
              <p>Escolha uma área no menu para consultar e administrar os dados do site.</p>
            </div>
            <span class="welcome-symbol" aria-hidden="true">✚</span>
          </div>

          <div class="section-title">
            <div>
              <h2>Áreas de gerenciamento</h2>
              <p>Acesse os módulos disponíveis no painel.</p>
            </div>
          </div>

          <div class="module-grid">
            <button
              v-for="item in modulos"
              :key="item.id"
              class="module-card"
              type="button"
              @click="secaoAtiva = item.id"
            >
              <span class="module-icon" aria-hidden="true">{{ item.icon }}</span>
              <strong>{{ item.label }}</strong>
              <span>{{ item.description }}</span>
              <span class="module-action">Abrir gerenciamento <b aria-hidden="true">→</b></span>
            </button>
          </div>
        </template>

        <HospitaisCrud v-else-if="secaoAtiva === 'hospitais'" />

        <section v-else class="management-panel">
          <div class="panel-heading">
            <div>
              <h2>{{ tituloSecao }}</h2>
              <p>{{ ajudaSecao }}</p>
            </div>
            <RouterLink :to="linkSecao" class="open-module">Abrir módulo <span aria-hidden="true">↗</span></RouterLink>
          </div>

          <div class="module-summary">
            <span class="summary-icon" aria-hidden="true">{{ itemAtivo.icon }}</span>
            <div>
              <strong>{{ itemAtivo.label }}</strong>
              <p>{{ itemAtivo.description }}</p>
            </div>
          </div>

          <div class="module-note">
            <span class="note-icon" aria-hidden="true">i</span>
            <p>
              Este é um atalho para a tela pública correspondente. O CRUD administrativo desta
              entidade ainda não está integrado ao painel.
            </p>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import HospitaisCrud from '../components/admin/HospitaisCrud.vue'

const menu = [
  { id: 'inicio', label: 'Visão geral', icon: '⌂' },
  { id: 'hospitais', label: 'Hospitais', icon: '✚', description: 'Hospitais parceiros e informações de atendimento.', to: '/hospitais' },
  { id: 'consultas', label: 'Consultas', icon: '▣', description: 'Agendamentos e solicitações de atendimento.', to: '/minhasconsultas' },
  { id: 'usuarios', label: 'Usuários', icon: '♙', description: 'Perfis e informações de usuários cadastrados.', to: '/perfil' },
  { id: 'vacinas', label: 'Vacinas', icon: '♡', description: 'Catálogo de vacinas e caderneta digital.', to: '/caderneta' }
]

const modulos = menu.filter((item) => item.id !== 'inicio')
const secaoAtiva = ref('inicio')
const itemAtivo = computed(() => menu.find((item) => item.id === secaoAtiva.value) || menu[0])
const tituloSecao = computed(() => secaoAtiva.value === 'inicio' ? 'Visão geral' : itemAtivo.value.label)
const descricaoSecao = computed(() => secaoAtiva.value === 'inicio'
  ? 'Administre os principais conteúdos e registros da plataforma.'
  : secaoAtiva.value === 'hospitais'
    ? 'Gerencie os hospitais exibidos na página pública.'
    : `Acesso à tela atual de ${itemAtivo.value.label.toLowerCase()}.`)
const ajudaSecao = computed(() => secaoAtiva.value === 'hospitais'
  ? 'Cadastro, consulta, edição e exclusão de hospitais.'
  : `O CRUD administrativo de ${itemAtivo.value.label.toLowerCase()} ainda não está integrado ao painel.`)
const linkSecao = computed(() => itemAtivo.value.to || '/')
</script>

<style scoped>
.admin-page {
  min-height: 62vh;
  padding: 36px 32px 64px;
  background: #f4f7fa;
}

.admin-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 28px;
  width: min(100%, 1280px);
  min-height: 580px;
  margin: 0 auto;
}

.admin-sidebar {
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border: 1px solid #e5ebf0;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(19, 55, 81, .045);
}

.sidebar-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px 24px;
  border-bottom: 1px solid #edf1f4;
}

.sidebar-mark, .admin-avatar {
  display: grid;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 13px;
  background: var(--blue-600);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.sidebar-heading div { display: grid; gap: 4px; }
.sidebar-heading strong { color: #17344a; font-size: 14px; }
.sidebar-heading div span { color: #81909c; font-size: 12px; }
.sidebar-label { margin: 25px 10px 10px; color: #9aa7b1; font-size: 10px; font-weight: 700; letter-spacing: .13em; }
.sidebar-nav { display: grid; gap: 5px; }

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 44px;
  padding: 0 11px;
  border-radius: 10px;
  color: #60717e;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  transition: color .2s ease, background .2s ease;
}

.sidebar-link:hover { background: #f3f8fb; color: var(--blue-600); }
.sidebar-link.active { background: #eaf4fa; color: var(--blue-600); }
.nav-icon { display: grid; width: 22px; place-items: center; font-size: 18px; }
.nav-chevron { margin-left: auto; font-size: 20px; }

.back-home {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: auto 10px 4px;
  padding-top: 22px;
  color: #748490;
  font-size: 12px;
  font-weight: 600;
}
.back-home:hover { color: var(--blue-600); }

.admin-main { min-width: 0; padding: 8px 0; }
.page-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 28px; }
.eyebrow { color: var(--blue-500); font-size: 10px; font-weight: 700; letter-spacing: .13em; }
.page-heading h1 { margin-top: 8px; color: #17344a; font-size: clamp(27px, 3vw, 36px); }
.page-description { margin-top: 8px; color: #7c8a95; font-size: 14px; line-height: 1.5; }
.admin-avatar { flex-basis: 40px; width: 40px; height: 40px; border: 3px solid #fff; border-radius: 50%; background: #dcecf5; color: var(--blue-600); box-shadow: 0 2px 10px rgba(16, 54, 82, .1); }

.welcome-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  min-height: 180px;
  padding: 30px 34px;
  overflow: hidden;
  border-radius: 18px;
  background: linear-gradient(115deg, var(--blue-700, #075985), var(--blue-500, #1684b7));
  color: #fff;
}
.welcome-tag { font-size: 10px; font-weight: 700; letter-spacing: .15em; opacity: .75; }
.welcome-card h2 { margin-top: 12px; font-size: clamp(21px, 2.5vw, 28px); }
.welcome-card p { max-width: 550px; margin-top: 9px; color: rgba(255,255,255,.8); font-size: 14px; line-height: 1.6; }
.welcome-symbol { color: rgba(255,255,255,.2); font-size: 92px; line-height: 1; }

.section-title { display: flex; justify-content: space-between; align-items: end; margin: 32px 0 16px; }
.section-title h2, .panel-heading h2 { color: #17344a; font-size: 19px; }
.section-title p, .panel-heading p { margin-top: 6px; color: #85929c; font-size: 13px; }
.module-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.module-card {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: start;
  column-gap: 14px;
  row-gap: 7px;
  min-height: 148px;
  padding: 20px;
  border: 1px solid #e4ebf0;
  border-radius: 14px;
  background: #fff;
  text-align: left;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.module-card:hover { transform: translateY(-2px); border-color: #b5d7e8; box-shadow: 0 9px 24px rgba(19,55,81,.07); }
.module-icon, .summary-icon { display: grid; width: 42px; height: 42px; place-items: center; grid-row: span 3; border-radius: 12px; background: #eaf4fa; color: var(--blue-600); font-size: 20px; }
.module-card > strong { align-self: center; padding-top: 2px; color: #21445b; font-size: 15px; }
.module-card > span:not(.module-icon):not(.module-action) { color: #7a8994; font-size: 12px; line-height: 1.5; }
.module-action { display: flex; justify-content: space-between; align-items: center; margin-top: 7px; color: var(--blue-600); font-size: 11px; font-weight: 700; }
.module-action b { font-size: 16px; }

.management-panel { min-height: 300px; padding: 26px; border: 1px solid #e4ebf0; border-radius: 16px; background: #fff; }
.panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid #edf1f4; }
.open-module { padding: 10px 14px; border-radius: 8px; background: var(--blue-600); color: #fff; font-size: 12px; font-weight: 700; white-space: nowrap; }
.open-module:hover { background: var(--blue-700, #075985); }
.module-summary { display: flex; align-items: center; gap: 15px; margin-top: 24px; padding: 18px; border-radius: 12px; background: #f7fafc; }
.summary-icon { flex: 0 0 42px; }
.module-summary strong { color: #21445b; font-size: 14px; }
.module-summary p { margin-top: 5px; color: #7a8994; font-size: 12px; }
.module-note { display: flex; align-items: flex-start; gap: 11px; margin-top: 18px; padding: 14px; border: 1px solid #e6eef3; border-radius: 10px; }
.note-icon { display: grid; flex: 0 0 20px; width: 20px; height: 20px; place-items: center; border-radius: 50%; background: #eaf4fa; color: var(--blue-600); font-size: 12px; font-weight: 700; }
.module-note p { color: #758590; font-size: 12px; line-height: 1.6; }

@media (max-width: 900px) {
  .admin-layout { grid-template-columns: 210px minmax(0, 1fr); gap: 18px; }
  .admin-page { padding-right: 20px; padding-left: 20px; }
  .module-grid { grid-template-columns: 1fr; }
}

@media (max-width: 680px) {
  .admin-page { padding: 20px 14px 40px; }
  .admin-layout { grid-template-columns: 1fr; }
  .admin-sidebar { padding: 14px; }
  .sidebar-heading { padding-bottom: 14px; }
  .sidebar-label { margin-top: 16px; }
  .sidebar-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sidebar-link { gap: 8px; padding: 0 8px; font-size: 11px; }
  .back-home { margin: 14px 8px 2px; padding-top: 13px; border-top: 1px solid #edf1f4; }
  .admin-main { padding: 4px 2px; }
  .page-heading { margin-bottom: 18px; }
  .welcome-card { min-height: 160px; padding: 23px; }
  .welcome-symbol { font-size: 64px; }
  .management-panel { padding: 18px; }
  .panel-heading { align-items: flex-start; flex-direction: column; }
}
</style>
