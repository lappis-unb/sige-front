import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

// Cria uma função auxiliar para verificar se a rota requer autenticação
function isAuthRequired(routeName) {
  const publicRoutes = ['login', 'register', 'forgotten_password', 'reset_password', 'dashboard', 'home'];
  return !publicRoutes.includes(routeName);
}

// Função para criar o roteador
export default function (ssrContext) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: routes(ssrContext),
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  const { store } = ssrContext;

  // Middleware global de autenticação
  Router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['userStore/authStatus'];

    if (!isLoggedIn && isAuthRequired(to.name)) {
      next('/login');
    } else {
      next();
    }
  });

  return Router;
}
