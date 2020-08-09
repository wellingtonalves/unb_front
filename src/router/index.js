import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store';

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
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          requiresAuth: true,
        },
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
              title: 'Curso',
            },
          },
          {
            path: '/curso/create',
            component: () => import('../views/cursos/CursoCreate.vue'),
            meta: {
              title: 'Cadastrar curso',
              requiresAuth: true,
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
