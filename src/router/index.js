import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import {ROUTER_CONSTANTS} from './router.constants';

Vue.use(VueRouter);

const routes = [
  {
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
    children: [
      {
        path: '/',
        name: ROUTER_CONSTANTS.menuInicio,
        component: () => import('../views/Home.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/dashboard',
        name: ROUTER_CONSTANTS.menuDashboard,
        component: () => import('../views/Dashboard.vue'),
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
            {text: ROUTER_CONSTANTS.menuCursos, disabled: false, href: '/'},
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
            {text: ROUTER_CONSTANTS.menuCursos, disabled: false, href: '/'},
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
            {text: ROUTER_CONSTANTS.menuCursos, disabled: false, href: '/'},
            {
              text: 'Perguntas Frequentes',
              disabled: true,
              href: '/perguntas-frequentes',
            },
          ],
        },
      },

      {
        path: '/meus-dados',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'meus-dados',
            component: () => import('../views/meusDados/MeusDadosEdit.vue'),
            meta: {
              requiresAuth: true,
              title: 'Meus Dados',
              breadcrumb: [
                {
                  text: 'Início',
                  disabled: false,
                  href: '/',
                },
                {
                  text: 'Meus Dados',
                  disabled: true,
                  href: '/meus-dados',
                },
              ],
            },
          },
          {
            path: '/meus-dados/alterar-email',
            name: 'alterar-email',
            component: () => import('../views/meusDados/MeusDadosEdit.vue'),
            meta: {
              requiresAuth: true,
              title: 'Alterar Email',
              breadcrumb: [
                {
                  text: 'Início',
                  disabled: false,
                  href: '/',
                },
                {
                  text: 'Alterar Email',
                  disabled: true,
                  href: '/meus-dados/alterar-email',
                },
              ],
            },
          },
          {
            path: '/meus-dados/alterar-senha',
            name: 'alterar-senha',
            component: () => import('../views/meusDados/MeusDadosEdit.vue'),
            meta: {
              requiresAuth: true,
              title: 'Alterar Senha',
              breadcrumb: [
                {
                  text: 'Início',
                  disabled: false,
                  href: '/',
                },
                {
                  text: 'Alterar Senha',
                  disabled: true,
                  href: '/meus-dados/alterar-senha',
                },
              ],
            },
          },
        ],
      },
      {
        path: '/cursos',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'curso',
            component: () => import('../views/cursos/Curso.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuCursos,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuCursos,
                  disabled: true,
                  href: '/cursos',
                },
              ],
            },
          },
          {
            path: '/curso/create',
            component: () => import('../views/cursos/CursoCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarCurso,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuCursos,
                  disabled: false,
                  href: '/cursos',
                },
                {
                  text: ROUTER_CONSTANTS.menuCadastrarCurso,
                  disabled: true,
                  href: '/cursos',
                },
              ],
            },
          },
          {
            path: '/curso/:id/edit',
            component: () => import('../views/cursos/CursoEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarCurso,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuCursos,
                  disabled: false,
                  href: '/cursos',
                },
                {text: ROUTER_CONSTANTS.menuEditarCurso, disabled: true},
              ],
            },
          },
          {
            path: '/curso/:id',
            component: () => import('../views/cursos/CursoDetail.vue'),
            meta: {
              requiresAuth: false
            },
          },
        ],
      },
      {
        path: '/ava',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'ava',
            component: () => import('../views/ava/Ava.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuAVA,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuAVA, disabled: true, href: '/ava'},
              ],
            },
          },
          {
            path: '/ava/create',
            component: () => import('../views/ava/AvaCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarAVA,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuAVA, disabled: false, href: '/ava'},
                {
                  text: ROUTER_CONSTANTS.menuCadastrarAVA,
                  disabled: true,
                  href: '/ava',
                },
              ],
            },
          },
          {
            path: '/ava/:id/edit',
            component: () => import('../views/ava/AvaEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarAVA,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuAVA, disabled: false, href: '/ava'},
                {
                  text: ROUTER_CONSTANTS.menuEditarAVA,
                  disabled: true,
                  href: '/ava',
                },
              ],
            },
          },
        ],
      },
      {
        path: '/ofertas',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'oferta',
            component: () => import('../views/ofertas/Ofertas.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuOfertas,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: true,
                  href: '/ofertas',
                },
              ],
            },
          },
          {
            path: '/ofertas/create',
            component: () => import('../views/ofertas/OfertasCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarOferta,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: false,
                  href: '/ofertas',
                },
                {
                  text: ROUTER_CONSTANTS.menuCadastrarOferta,
                  disabled: true,
                  href: '/ofertas',
                },
              ],
            },
          },
          {
            path: '/ofertas/:id/edit',
            component: () => import('../views/ofertas/OfertasEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarOferta,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: false,
                  href: '/ofertas',
                },
                {
                  text: ROUTER_CONSTANTS.menuEditarOferta,
                  disabled: true,
                  href: '/ofertas',
                },
              ],
            },
          },
          {
            path: '/ofertas/:id/exclusividade',
            component: () =>
              import('../views/ofertas/Exclusividade/Exclusividade.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuTornarOfertaExclusiva,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: false,
                  href: '/ofertas',
                },
                {
                  text: ROUTER_CONSTANTS.menuTornarOfertaExclusiva,
                  disabled: true,
                },
              ],
            },
          },
          {
            path: '/ofertas/:id/exclusividade/:id_exclusividade/edit',
            component: () =>
              import('../views/ofertas/Exclusividade/ExclusividadeEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarExclusividadeOferta,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: false,
                  href: '/ofertas',
                },
                {
                  text: ROUTER_CONSTANTS.menuEditarExclusividadeOferta,
                  disabled: true,
                },
              ],
            },
          },
          {
            path: '/ofertas/:id/gerenciar-exclusividade',
            component: () =>
              import(
                '../views/ofertas/Exclusividade/GerenciarExclusividade.vue'
              ),
            meta: {
              title: ROUTER_CONSTANTS.menuGerenciarExclusividadeOferta,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: false,
                  href: '/ofertas',
                },
                {
                  text: ROUTER_CONSTANTS.menuGerenciarExclusividadeOferta,
                  disabled: true,
                },
              ],
            },
          },
          {
            path:
              '/ofertas/:id/gerenciar-exclusividade/:id_exclusividade/create',
            component: () =>
              import(
                '../views/ofertas/Exclusividade/GerenciarExclusividadeCreate.vue'
              ),
            meta: {
              title: ROUTER_CONSTANTS.menuAdicionarValores,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuOfertas,
                  disabled: false,
                  href: '/ofertas',
                },
                {
                  text: ROUTER_CONSTANTS.menuGerenciarExclusividadeOferta,
                  disabled: true,
                },
                {text: ROUTER_CONSTANTS.menuAdicionarValores, disabled: true},
              ],
            },
          },
        ],
      },
      {
        path: '/programas',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'programa',
            component: () => import('../views/programas/Programas.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuProgramas,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuProgramas,
                  disabled: true,
                  href: '/programas',
                },
              ],
            },
          },
          {
            path: '/programas/create',
            component: () => import('../views/programas/ProgramasCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarPrograma,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuProgramas,
                  disabled: false,
                  href: '/programas',
                },
                {
                  text: ROUTER_CONSTANTS.menuCadastrarPrograma,
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
              title: ROUTER_CONSTANTS.menuEditarPrograma,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuProgramas,
                  disabled: false,
                  href: '/programas',
                },
                {
                  text: ROUTER_CONSTANTS.menuEditarPrograma,
                  disabled: true,
                  href: '/programas',
                },
              ],
            },
          },
          {
            path: '/programa/:id',
            component: () => import('../views/programas/ProgramasDetail.vue'),
            meta: {
              requiresAuth: false
            },
          },
          {
            path: '/catalogo-programas',
            component: () => import('../views/programas/ProgramasAll.vue'),
            meta: {
              requiresAuth: false,
              title: 'Catálogo de Programas'
            },
          }
        ],
      },
      {
        path: '/usuarios',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'usuario',
            component: () =>
              import('../views/controleAcesso/usuarios/Usuario.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuUsuarios,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuUsuarios,
                  disabled: true,
                  href: '/usuarios',
                },
              ],
            },
          },
          {
            path: '/usuario/create',
            component: () =>
              import('../views/controleAcesso/usuarios/UsuarioCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarUsuario,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuUsuarios,
                  disabled: false,
                  href: '/usuarios',
                },
                {
                  text: ROUTER_CONSTANTS.menuCadastrarUsuario,
                  disabled: true,
                  href: '/usuarios',
                },
              ],
            },
          },
          {
            path: '/usuario/:id/edit',
            component: () =>
              import('../views/controleAcesso/usuarios/UsuarioEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarUsuario,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuUsuarios,
                  disabled: false,
                  href: '/usuarios',
                },
                {
                  text: ROUTER_CONSTANTS.menuEditarUsuario,
                  disabled: true,
                  href: '/usuarios',
                },
              ],
            },
          },
        ],
      },
      {
        path: '/perfis',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'perfil',
            component: () =>
              import('../views/controleAcesso/perfis/Perfil.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuPerfis,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuPerfis,
                  disabled: true,
                  href: '/perfis',
                },
              ],
            },
          },
          {
            path: '/perfil/create',
            component: () =>
              import('../views/controleAcesso/perfis/PerfilCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarPerfil,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuPerfis,
                  disabled: false,
                  href: '/perfis',
                },
                {
                  text: ROUTER_CONSTANTS.menuCadastrarPerfil,
                  disabled: true,
                  href: '/perfis',
                },
              ],
            },
          },
          {
            path: '/perfil/:id/edit',
            component: () =>
              import('../views/controleAcesso/perfis/PerfilEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarPerfil,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuPerfis,
                  disabled: false,
                  href: '/perfis',
                },
                {
                  text: ROUTER_CONSTANTS.menuEditarPerfil,
                  disabled: true,
                  href: '/perfis',
                },
              ],
            },
          },
        ],
      },
      {
        path: '/permissoes',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'permissao',
            component: () =>
              import('../views/controleAcesso/permissoes/Permissao.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuPermissoes,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuPermissoes,
                  disabled: true,
                  href: '/permissoes',
                },
              ],
            },
          },
          {
            path: '/permissao/create',
            component: () =>
              import('../views/controleAcesso/permissoes/PermissaoCreate.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuCadastrarPermissao,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuPermissoes,
                  disabled: false,
                  href: '/permissoes',
                },
                {text: ROUTER_CONSTANTS.menuCadastrarPermissao, disabled: true},
              ],
            },
          },
          {
            path: '/permissao/:id/edit',
            component: () =>
              import('../views/controleAcesso/permissoes/PermissaoEdit.vue'),
            meta: {
              title: ROUTER_CONSTANTS.menuEditarPermissao,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {text: ROUTER_CONSTANTS.menuControleAcessos, disabled: true},
                {
                  text: ROUTER_CONSTANTS.menuPermissoes,
                  disabled: false,
                  href: '/permissoes',
                },
                {text: ROUTER_CONSTANTS.menuEditarPermissao, disabled: true},
              ],
            },
          },
        ],
      },
      {
        path: '/tarefas-agendadas',
        component: () => import('../components/Layout/RouterViewComponent.vue'),
        children: [
          {
            path: '',
            name: 'tarefa-agendada',
            component: () =>
              import('../views/tarefas_agendadas/TarefaAgendada.vue'),
            meta: {
              requiresAuth: true,
              title: ROUTER_CONSTANTS.menuTarefasAgendadas,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuTarefasAgendadas,
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
              title: ROUTER_CONSTANTS.menuCadastrarTarefa,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuTarefasAgendadas,
                  disabled: false,
                  href: '/tarefas-agendadas',
                },
                {
                  text: ROUTER_CONSTANTS.menuCadastrarTarefa,
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
              title: ROUTER_CONSTANTS.menuEditarTarefa,
              requiresAuth: true,
              breadcrumb: [
                {
                  text: ROUTER_CONSTANTS.menuDashboard,
                  disabled: false,
                  href: '/',
                },
                {
                  text: ROUTER_CONSTANTS.menuTarefasAgendadas,
                  disabled: false,
                  href: '/tarefas-agendadas',
                },
                {
                  text: ROUTER_CONSTANTS.menuEditarTarefa,
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
  if (!requiresAuth && !localStorage.getItem('token')) {
    next();
    return;
  }

  await new Promise(resolve => {
    if (
      store.getters.isAuthenticated === false &&
      !localStorage.getItem('token')
    ) {
      next('/');
      return;
    }
    if (store.getters.isAuthenticated === true) {
      next();
      return;
    }
    resolve();
  });

  await new Promise(() => {
    store
      .dispatch('setAuthenticated', {
        access_token: localStorage.getItem('token'),
      })
      .then(() => {
        next();
      })
      .catch(() => {
        next('/');
      });
  });
});

export default router;
