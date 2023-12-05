import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (ssrContext) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: routes(ssrContext),

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const { store } = ssrContext

  Router.beforeEach((to, from, next) => {
    const pathsThatRequireLogin = [
      '/login',
      '/register',
      '/forgotten_password',
      'reset_password',
      '/dashboard'
    ]
    const isPathThatRequireLogin = pathsThatRequireLogin.includes(to.path)
    const logged = store.getters['userStore/authStatus']

    if (!logged && isPathThatRequireLogin) {
      next('/login')
    } else {
      next()
    }
  })

  return Router
}
