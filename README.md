# Instituto Med

O **Instituto Med** é uma aplicação web voltada à área da saúde. O projeto foi desenvolvido por estudantes do segundo ano do ensino médio do Instituto Federal Catarinense (IFC) com o propósito de aproximar usuários de serviços de saúde públicos e privados.

## Tema e objetivo do projeto

O tema do projeto é **saúde conectada**. Seu objetivo é centralizar informações e serviços de saúde em uma interface simples e acessível, permitindo que o usuário consulte hospitais e profissionais, agende atendimentos, acompanhe informações de vacinação e mantenha seus dados de saúde organizados sem sair de casa.

## Funcionalidades planejadas

Durante o planejamento, foram propostas as seguintes funcionalidades:

- gestão e consulta de hospitais parceiros;
- fluxograma inteligente de atendimentos;
- agendamento de consultas, exames e vacinação;
- caderneta médica e de vacinação digital;
- cadastro, autenticação e gerenciamento do perfil do usuário;
- notificações e lembretes automáticos;
- divulgação de notícias e conteúdos relacionados à saúde;
- apresentação de médicos e instituições parceiras.

## Funcionalidades desenvolvidas

Na versão atual, foram efetivamente desenvolvidas:

- página inicial institucional, com apresentação do projeto, profissionais, parceiros, notícias, perguntas frequentes e newsletter;
- cadastro de usuários com validação de campos e armazenamento local dos dados;
- login, controle de sessão e proteção de páginas que exigem autenticação;
- painel do usuário;
- visualização, edição e exclusão do perfil, além do encerramento da sessão;
- CRUD de hospitais integrado à API local JSON Server, com cadastro, listagem, consulta por ID, edição e exclusão;
- página pública de hospitais com busca, e página de detalhes carregadas pela API;
- formulário de agendamento de atendimento, com seleção de consulta, data, período, hospital e médico;
- caderneta de vacinação com pesquisa e filtros por público (gestantes, crianças, adolescentes, adultos e idosos);
- visualização de detalhes das vacinas e registro de vacinação;
- páginas institucionais de atendimento, consultas, vacinas, fluxograma e apresentação da equipe;
- navegação responsiva entre as páginas.

O projeto funciona principalmente como um **protótipo front-end**. O CRUD de hospitais usa JSON Server e persiste seus dados no arquivo local `db.json`. Os dados de cadastro e sessão ainda são mantidos no `localStorage` do navegador. Alguns recursos planejados permanecem demonstrativos ou incompletos, especialmente notificações automáticas, newsletter, links de redes sociais, integração real com hospitais e persistência centralizada de consultas e registros médicos.

## Dificuldades encontradas

As principais dificuldades enfrentadas pelo grupo foram:

- integrar páginas produzidas por diferentes integrantes e manter um padrão visual e estrutural;
- organizar componentes, rotas, arquivos e estilos durante a evolução do projeto;
- corrigir conflitos e inconsistências após a união das diferentes partes do código;
- implementar cadastro, autenticação, sessão e edição de perfil sem um back-end, recorrendo ao armazenamento local do navegador;
- conectar caderneta, perfil, agendamentos e demais páginas em um fluxo de navegação coerente;
- conciliar o escopo inicialmente planejado com o tempo disponível para o desenvolvimento.

## Divisão das atividades

A divisão principal das responsabilidades foi:

| Integrante | Responsabilidade no projeto | Principais contribuições no desenvolvimento |
| --- | --- | --- |
| Ana Júlia Bonfim Moraes | Design e identidade visual | páginas de atendimento e caderneta de vacinação |
| Giovana Letícia Bandoch | Design e identidade visual | páginas de hospitais e detalhes dos hospitais |
| Hanna Julia Schroeder | Administração e modelagem lógica de dados | perfil, edição de perfil, integração dos dados de cadastro e organização de rotas e arquivos, fluxograma, pagina de vacinas |
| Lucas Pereira de Oliveira | Análise de requisitos | estrutura inicial de cadastro, login e painel do usuário |
| Nicholas Oyafuso | Projeto Código | página inicial, autenticação, integração de componentes e ajustes gerais |
| Tiago Cardoso | Projeto e modelo conceitual de dados | página “Sobre nós” e apresentação da equipe |

Além das responsabilidades individuais, o grupo trabalhou coletivamente na integração, revisão e correção das funcionalidades.

## Autoavaliação

**Nota atribuída pelo grupo: 7,0 a 9,9**

### Justificativa

O grupo considera que o resultado atende bem à proposta de criar uma plataforma de saúde organizada, visualmente coerente e com diferentes fluxos navegáveis. Foram entregues funcionalidades relevantes, como cadastro, login, perfil, hospitais, agendamento e caderneta de vacinação, demonstrando a aplicação prática de Vue.js, componentização, rotas e armazenamento local.

A nota não é máxima porque a aplicação ainda é um protótipo front-end: não possui back-end, banco de dados real, integração efetiva com instituições de saúde nem todos os recursos automáticos previstos. Também há oportunidades de melhoria na padronização do código, na acessibilidade, nos testes e no acabamento de algumas páginas. Mesmo com essas limitações, o projeto apresenta uma base funcional e consistente, além de cumprir grande parte dos objetivos propostos.

## Tecnologias utilizadas

- Vue.js 3;
- Vue Router;
- Vite;
- JavaScript;
- HTML e CSS;
- Bootstrap;
- `localStorage` para persistência local de dados.

## Como ver o projeto

[Acesse o site do Instituto Med](instituto-med.surge.sh)

## Desenvolvimento local

Instale as dependências com `npm install`. Para carregar o CRUD de hospitais, inicie a API e o site em terminais separados:

```bash
npm run api
npm run dev
```

A API usa JSON Server 0.17.4 e o arquivo `db.json`, disponível em `http://localhost:3000/hospitais`. O painel de administração fica em `http://localhost:5173/admin`; a listagem pública e os detalhes dos hospitais também consomem a API.



