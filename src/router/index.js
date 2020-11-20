import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store';

Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '',
    component: () => import('../components/Layout/Main.vue'),
    children: [{
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/conheca-a-escola',
        name: 'Conheça a Escola',
        component: () => import('../views/ConhecaEscola.vue'),
        meta: {
          requiresAuth: false,
          title: 'Conheça a Escola',
          breadcrumb: [
            {text: 'Início', disabled: false, href: '/'},
            {
              text: 'Conheça a Escola',
              disabled: true,
              href: '/conheca-a-escola',
            },
          ],
        },
      },
      {
        path: '/adesao-institucional',
        name: 'Adesão Institucional',
        component: () => import('../views/AdesaoInstitucional.vue'),
        meta: {
          requiresAuth: false,
          title: 'Adesão Institucional',
          breadcrumb: [
            {text: 'Início', disabled: false, href: '/'},
            {
              text: 'Adesão Institucional',
              disabled: true,
              href: '/adesao-institucional',
            },
          ],
        },
      },
      {
        path: '/perguntas-frequentes',
        name: 'Perguntas Frequentes',
        component: () => import('../views/PerguntasFrequentes.vue'),
        meta: {
          requiresAuth: false,
          title: 'Perguntas Frequentes',
          breadcrumb: [
            {text: 'Início', disabled: false, href: '/'},
            {
              text: 'Perguntas Frequentes',
              disabled: true,
              href: '/perguntas-frequentes',
            },
          ],
        },
      },

      {
        path: '/usuario',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            redirect: '/usuario/meus-dados'
          },
          {
            path: '/usuario/meus-dados',
            component: () =>
              import('../views/meus_dados/PerfilPersist.vue'),
            meta: {
              requiresAuth: true,
              title: 'Meus Dados',
              breadcrumb: [{
                  text: 'Início',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Meus Dados',
                  disabled: true,
                  href: '/usuario/meus-dados'
                },
              ],
            },
          },
          {
            path: '/usuario/meus-dados/:view',
            component: () =>
              import('../views/meus_dados/PerfilPersist.vue'),
            meta: {
              requiresAuth: true,
              title: 'Alterar Email',
              breadcrumb: [{
                  text: 'Início',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Alterar Email',
                  disabled: true,
                  href: '/usuario/meus-dados/alterar_email'
                },
              ],
            },
          }
        ]
      },
      {
        path: '/cursos',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'curso',
            component: () => import('../views/cursos/Curso.vue'),
            meta: {
              requiresAuth: true,
              title: 'Cursos',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Cursos',
                  disabled: true,
                  href: '/cursos'
                },
              ],
            },
          },
          {
            path: '/curso/create',
            component: () => import('../views/cursos/CursoCreate.vue'),
            meta: {
              title: 'Cadastrar curso',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Cursos',
                  disabled: false,
                  href: '/cursos'
                },
                {
                  text: 'Cadastrar curso',
                  disabled: true,
                  href: '/cursos'
                },
              ],
            },
          },
          {
            path: '/curso/:id/edit',
            component: () => import('../views/cursos/CursoEdit.vue'),
            meta: {
              title: 'Editar curso',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Cursos',
                  disabled: false,
                  href: '/cursos'
                },
                {
                  text: 'Editar curso',
                  disabled: true,
                  href: '/cursos'
                },
              ],
            },
          },
        ],
      },
      {
        path: '/ava',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'ava',
            component: () => import('../views/ava/Ava.vue'),
            meta: {
              requiresAuth: true,
              title: 'Ava',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Ava',
                  disabled: true,
                  href: '/ava'
                },
              ],
            },
          },
          {
            path: '/ava/create',
            component: () => import('../views/ava/AvaCreate.vue'),
            meta: {
              title: 'Cadastrar AVA',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Ava',
                  disabled: false,
                  href: '/ava'
                },
                {
                  text: 'Cadastrar AVA',
                  disabled: true,
                  href: '/ava'
                },
              ],
            },
          },
          {
            path: '/ava/:id/edit',
            component: () => import('../views/ava/AvaEdit.vue'),
            meta: {
              title: 'Editar AVA',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'AVA',
                  disabled: false,
                  href: '/ava'
                },
                {
                  text: 'Editar AVA',
                  disabled: true,
                  href: '/ava'
                },
              ],
            },
          },
        ],
      },
      {
        path: '/ofertas',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'oferta',
            component: () => import('../views/ofertas/Ofertas.vue'),
            meta: {
              requiresAuth: true,
              title: 'Ofertas',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Ofertas',
                  disabled: true,
                  href: '/ofertas'
                },
              ],
            },
          },
          {
            path: '/ofertas/create',
            component: () => import('../views/ofertas/OfertasCreate.vue'),
            meta: {
              title: 'Cadastrar Oferta',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Ofertas',
                  disabled: false,
                  href: '/ofertas'
                },
                {
                  text: 'Cadastrar Oferta',
                  disabled: true,
                  href: '/ofertas'
                },
              ],
            },
          },
          {
            path: '/ofertas/:id/edit',
            component: () => import('../views/ofertas/OfertasEdit.vue'),
            meta: {
              title: 'Editar Oferta',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Ofertas',
                  disabled: false,
                  href: '/ofertas'
                },
                {
                  text: 'Editar Oferta',
                  disabled: true,
                  href: '/ofertas'
                },
              ],
            },
          },
          {
            path: '/ofertas/:id/exclusividade',
            component: () =>
              import('../views/ofertas/ExclusividadeOfertas.vue'),
            meta: {
              title: 'Exclusividade Oferta',
              requiresAuth: true,
              breadcrumb: [
                {text: 'Dashboard', disabled: false, href: '/'},
                {text: 'Ofertas', disabled: false, href: '/ofertas'},
                {
                  text: 'Exclusividade Oferta',
                  disabled: true,
                  href: '/ofertas',
                },
              ],
            },
          },
        ],
      },
      {
        path: '/programas',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'oferta',
            component: () => import('../views/programas/Programas.vue'),
            meta: {
              requiresAuth: true,
              title: 'Programas',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Programas',
                  disabled: true,
                  href: '/programas'
                },
              ],
            },
          },
          {
            path: '/programas/create',
            component: () => import('../views/programas/ProgramasCreate.vue'),
            meta: {
              title: 'Cadastrar Programa',
              requiresAuth: true,
              breadcrumb: [
                {text: 'Dashboard', disabled: false, href: '/'},
                {text: 'Programas', disabled: false, href: '/programas'},
                {
                  text: 'Cadastrar Programa',
                  disabled: true,
                  href: '/programas',
                },
              ],
            },
          },
          {
            path: '/programas/:id/edit',
            component: () => import('../views/programas/ProgramasEdit.vue'),
            meta: {
              title: 'Editar Programa',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Programas',
                  disabled: false,
                  href: '/programas'
                },
                {
                  text: 'Editar Programa',
                  disabled: true,
                  href: '/programas'
                },
              ],
            },
          },
        ],
      },
      {
        path: '/usuarios',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'usuario',
            component: () =>
              import('../views/controleAcesso/usuarios/Usuario.vue'),
            meta: {
              requiresAuth: true,
              title: 'Usuários',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Usuários',
                  disabled: true,
                  href: '/usuarios'
                },
              ],
            },
          },
          {
            path: '/usuario/create',
            component: () =>
              import('../views/controleAcesso/usuarios/UsuarioCreate.vue'),
            meta: {
              title: 'Cadastrar usuário',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Usuários',
                  disabled: false,
                  href: '/usuarios'
                },
                {
                  text: 'Cadastrar usuário',
                  disabled: true,
                  href: '/usuarios'
                },
              ],
            },
          },
          {
            path: '/usuario/:id/edit',
            component: () =>
              import('../views/controleAcesso/usuarios/UsuarioEdit.vue'),
            meta: {
              title: 'Editar usuário',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Usuários',
                  disabled: false,
                  href: '/usuarios'
                },
                {
                  text: 'Editar usuário',
                  disabled: true,
                  href: '/usuarios'
                },
              ],
            },
          },
        ],
      },
      {
        path: '/perfis',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'perfil',
            component: () =>
              import('../views/controleAcesso/perfis/Perfil.vue'),
            meta: {
              requiresAuth: true,
              title: 'Perfis',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Perfis',
                  disabled: true,
                  href: '/perfis'
                },
              ],
            },
          },
          {
            path: '/perfil/create',
            component: () =>
              import('../views/controleAcesso/perfis/PerfilCreate.vue'),
            meta: {
              title: 'Cadastrar perfil',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Perfis',
                  disabled: false,
                  href: '/perfis'
                },
                {
                  text: 'Cadastrar perfil',
                  disabled: true,
                  href: '/perfis'
                },
              ],
            },
          },
          {
            path: '/perfil/:id/edit',
            component: () =>
              import('../views/controleAcesso/perfis/PerfilEdit.vue'),
            meta: {
              title: 'Editar perfil',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Perfis',
                  disabled: false,
                  href: '/perfis'
                },
                {
                  text: 'Editar perfil',
                  disabled: true,
                  href: '/perfis'
                },
              ],
            },
          },
        ],
      },
      {
        path: '/permissoes',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'permissao',
            component: () =>
              import('../views/controleAcesso/permissoes/Permissao.vue'),
            meta: {
              requiresAuth: true,
              title: 'Permissões',
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Permissões',
                  disabled: true,
                  href: '/permissoes'
                },
              ],
            },
          },
          {
            path: '/permissao/create',
            component: () =>
              import('../views/controleAcesso/permissoes/PermissaoCreate.vue'),
            meta: {
              title: 'Cadastrar permissão',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Permissões',
                  disabled: false,
                  href: '/permissoes'
                },
                {
                  text: 'Cadastrar permissão',
                  disabled: true,
                  href: '/permissoes',
                },
              ],
            },
          },
          {
            path: '/permissao/:id/edit',
            component: () =>
              import('../views/controleAcesso/permissoes/PermissaoEdit.vue'),
            meta: {
              title: 'Editar permissão',
              requiresAuth: true,
              breadcrumb: [{
                  text: 'Dashboard',
                  disabled: false,
                  href: '/'
                },
                {
                  text: 'Controle de acessos',
                  disabled: true
                },
                {
                  text: 'Permissões',
                  disabled: false,
                  href: '/permissoes'
                },
                {
                  text: 'Editar permissão',
                  disabled: true,
                  href: '/permissoes'
                },
              ],
            },
          },
        ],
      },
      {
        path: '/tarefas-agendadas',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [{
            path: '',
            name: 'tarefa-agendada',
            component: () =>
              import('../views/tarefas_agendadas/TarefaAgendada.vue'),
            meta: {
              requiresAuth: true,
              title: 'Tarefas Agendadas',
              breadcrumb: [
                {text: 'Dashboard', disabled: false, href: '/'},
                {
                  text: 'Tarefas Agendadas',
                  disabled: true,
                  href: '/tarefa-agendada',
                },
              ],
            },
          },
          {
            path: '/tarefa-agendada/create',
            component: () =>
              import('../views/tarefas_agendadas/TarefaAgendadaCreate.vue'),
            meta: {
              title: 'Cadastrar tarefa',
              requiresAuth: true,
              breadcrumb: [
                {text: 'Dashboard', disabled: false, href: '/'},
                {
                  text: 'Tarefas Agendadas',
                  disabled: false,
                  href: '/tarefas-agendadas',
                },
                {
                  text: 'Cadastrar tarefa',
                  disabled: true,
                  href: '/tarefas-agendadas',
                },
              ],
            },
          },
          {
            path: '/tarefa-agendada/:id/edit',
            component: () =>
              import('../views/tarefas_agendadas/TarefaAgendadaEdit.vue'),
            meta: {
              title: 'Editar tarefa',
              requiresAuth: true,
              breadcrumb: [
                {text: 'Dashboard', disabled: false, href: '/'},
                {
                  text: 'Tarefas Agendadas',
                  disabled: false,
                  href: '/tarefas-agendadas',
                },
                {
                  text: 'Editar tarefa',
                  disabled: true,
                  href: '/tarefas-agendadas',
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;

  if (!requiresAuth) {
    next();
    return;
  }

  await new Promise(resolve => {
    // if (store.getters.isAuthenticated === 'false') {
    //TODO - trocar pra linha de cima
    if (localStorage.getItem('isAuthenticated') === 'false') {
      next('/login');
      return;
    }

    resolve();
    next();
  });
});

export default router;