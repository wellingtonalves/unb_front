import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store';

Vue.use(VueRouter);

const menuInicio = 'Início',
  menuDashboard = 'Dashboard',
  menuCursos = 'Cursos',
  menuCadastrarCurso = 'Cadastrar Curso',
  menuEditarCurso = 'Editar Curso',
  menuAVA = 'AVA',
  menuCadastrarAVA = 'Cadastrar AVA',
  menuEditarAVA = 'Editar AVA',
  menuOfertas = 'Ofertas',
  menuCadastrarOferta = 'Cadastrar Oferta',
  menuEditarOferta = 'Editar Oferta',
  menuTornarOfertaExclusiva = 'Tornar Oferta Exclusiva',
  menuEditarExclusividadeOferta = 'Editar Exclusividade da Oferta',
  menuGerenciarExclusividadeOferta = 'Gerenciar Exclusividade da Oferta',
  menuAdicionarValores = 'Adicionar Valores',
  menuProgramas = 'Programas',
  menuCadastrarPrograma = 'Cadastrar Programa',
  menuEditarPrograma = 'Editar Programa',
  menuUsuarios = 'Usuários',
  menuCadastrarUsuario = 'Cadastrar Usuário',
  menuEditarUsuario = 'Editar Usuário',
  menuPerfis = 'Perfis',
  menuCadastrarPerfil = 'Cadastrar Perfil',
  menuEditarPerfil = 'Editar Perfil',
  menuPermissoes = 'Permissões',
  menuCadastrarPermissao = 'Cadastrar Permissão',
  menuEditarPermissao = 'Editar Permissão',
  menuTarefasAgendadas = 'Tarefas Agendadas',
  menuCadastrarTarefa = 'Cadastrar Tarefa',
  menuEditarTarefa = 'Editar Tarefa',
  menuControleAcessos = 'Controle de Acessos';

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
        name: menuInicio,
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
            {text: menuInicio, disabled: false, href: '/'},
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
            {text: menuInicio, disabled: false, href: '/'},
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
            {text: menuInicio, disabled: false, href: '/'},
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
              title: menuCursos,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuCursos, disabled: true, href: '/cursos'},
              ],
            },
          },
          {
            path: '/curso/create',
            component: () => import('../views/cursos/CursoCreate.vue'),
            meta: {
              title: menuCadastrarCurso,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuCursos, disabled: false, href: '/cursos'},
                {text: menuCadastrarCurso, disabled: true, href: '/cursos'},
              ],
            },
          },
          {
            path: '/curso/:id/edit',
            component: () => import('../views/cursos/CursoEdit.vue'),
            meta: {
              title: menuEditarCurso,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuCursos, disabled: false, href: '/cursos'},
                {text: menuEditarCurso, disabled: true},
              ],
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
              title: menuAVA,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuAVA, disabled: true, href: '/ava'},
              ],
            },
          },
          {
            path: '/ava/create',
            component: () => import('../views/ava/AvaCreate.vue'),
            meta: {
              title: menuCadastrarAVA,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuAVA, disabled: false, href: '/ava'},
                {text: menuCadastrarAVA, disabled: true, href: '/ava'},
              ],
            },
          },
          {
            path: '/ava/:id/edit',
            component: () => import('../views/ava/AvaEdit.vue'),
            meta: {
              title: menuEditarAVA,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuAVA, disabled: false, href: '/ava'},
                {text: menuEditarAVA, disabled: true, href: '/ava'},
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
              title: menuOfertas,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: true, href: '/ofertas'},
              ],
            },
          },
          {
            path: '/ofertas/create',
            component: () => import('../views/ofertas/OfertasCreate.vue'),
            meta: {
              title: menuCadastrarOferta,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: false, href: '/ofertas'},
                {text: menuCadastrarOferta, disabled: true, href: '/ofertas'},
              ],
            },
          },
          {
            path: '/ofertas/:id/edit',
            component: () => import('../views/ofertas/OfertasEdit.vue'),
            meta: {
              title: menuEditarOferta,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: false, href: '/ofertas'},
                {text: menuEditarOferta, disabled: true, href: '/ofertas'},
              ],
            },
          },
          {
            path: '/ofertas/:id/exclusividade',
            component: () =>
              import('../views/ofertas/Exclusividade/Exclusividade.vue'),
            meta: {
              title: menuTornarOfertaExclusiva,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: false, href: '/ofertas'},
                {text: menuTornarOfertaExclusiva, disabled: true},
              ],
            },
          },
          {
            path: '/ofertas/:id/exclusividade/:id_exclusividade/edit',
            component: () =>
              import('../views/ofertas/Exclusividade/ExclusividadeEdit.vue'),
            meta: {
              title: menuEditarExclusividadeOferta,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: false, href: '/ofertas'},
                {text: menuEditarExclusividadeOferta, disabled: true},
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
              title: menuGerenciarExclusividadeOferta,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: false, href: '/ofertas'},
                {text: menuGerenciarExclusividadeOferta, disabled: true},
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
              title: menuAdicionarValores,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuOfertas, disabled: false, href: '/ofertas'},
                {text: menuGerenciarExclusividadeOferta, disabled: true},
                {text: menuAdicionarValores, disabled: true},
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
              title: menuProgramas,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuProgramas, disabled: true, href: '/programas'},
              ],
            },
          },
          {
            path: '/programas/create',
            component: () => import('../views/programas/ProgramasCreate.vue'),
            meta: {
              title: menuCadastrarPrograma,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuProgramas, disabled: false, href: '/programas'},
                {
                  text: menuCadastrarPrograma,
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
              title: menuEditarPrograma,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuProgramas, disabled: false, href: '/programas'},
                {text: menuEditarPrograma, disabled: true, href: '/programas'},
              ],
            },
          },
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
              title: menuUsuarios,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuUsuarios, disabled: true, href: '/usuarios'},
              ],
            },
          },
          {
            path: '/usuario/create',
            component: () =>
              import('../views/controleAcesso/usuarios/UsuarioCreate.vue'),
            meta: {
              title: menuCadastrarUsuario,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuUsuarios, disabled: false, href: '/usuarios'},
                {text: menuCadastrarUsuario, disabled: true, href: '/usuarios'},
              ],
            },
          },
          {
            path: '/usuario/:id/edit',
            component: () =>
              import('../views/controleAcesso/usuarios/UsuarioEdit.vue'),
            meta: {
              title: menuEditarUsuario,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuUsuarios, disabled: false, href: '/usuarios'},
                {text: menuEditarUsuario, disabled: true, href: '/usuarios'},
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
              title: menuPerfis,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuPerfis, disabled: true, href: '/perfis'},
              ],
            },
          },
          {
            path: '/perfil/create',
            component: () =>
              import('../views/controleAcesso/perfis/PerfilCreate.vue'),
            meta: {
              title: menuCadastrarPerfil,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuPerfis, disabled: false, href: '/perfis'},
                {text: menuCadastrarPerfil, disabled: true, href: '/perfis'},
              ],
            },
          },
          {
            path: '/perfil/:id/edit',
            component: () =>
              import('../views/controleAcesso/perfis/PerfilEdit.vue'),
            meta: {
              title: menuEditarPerfil,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuPerfis, disabled: false, href: '/perfis'},
                {text: menuEditarPerfil, disabled: true, href: '/perfis'},
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
              title: menuPermissoes,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuPermissoes, disabled: true, href: '/permissoes'},
              ],
            },
          },
          {
            path: '/permissao/create',
            component: () =>
              import('../views/controleAcesso/permissoes/PermissaoCreate.vue'),
            meta: {
              title: menuCadastrarPermissao,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuPermissoes, disabled: false, href: '/permissoes'},
                {text: menuCadastrarPermissao, disabled: true},
              ],
            },
          },
          {
            path: '/permissao/:id/edit',
            component: () =>
              import('../views/controleAcesso/permissoes/PermissaoEdit.vue'),
            meta: {
              title: menuEditarPermissao,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {text: menuControleAcessos, disabled: true},
                {text: menuPermissoes, disabled: false, href: '/permissoes'},
                {text: menuEditarPermissao, disabled: true},
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
              title: menuTarefasAgendadas,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {
                  text: menuTarefasAgendadas,
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
              title: menuCadastrarTarefa,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {
                  text: menuTarefasAgendadas,
                  disabled: false,
                  href: '/tarefas-agendadas',
                },
                {
                  text: menuCadastrarTarefa,
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
              title: menuEditarTarefa,
              requiresAuth: true,
              breadcrumb: [
                {text: menuDashboard, disabled: false, href: '/'},
                {
                  text: menuTarefasAgendadas,
                  disabled: false,
                  href: '/tarefas-agendadas',
                },
                {
                  text: menuEditarTarefa,
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
