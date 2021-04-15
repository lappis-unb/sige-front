export default function (ssrContext) {
  const routes = [
    {
      path: '',
      component: () => import('layouts/MainLayout.vue'),
      beforeEnter (to, from, next) {
        const { store } = ssrContext
        const logged = store.getters['userStore/authStatus']
        if (logged) {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        { path: '/', name: '/', component: () => import('pages/Index.vue') },
        { path: '/about', name: 'about', component: () => import('pages/About.vue') },
        { path: '/edit', name: 'edit', component: () => import('pages/UserEdit.vue') },
        { path: '/total_cost', name: 'total_cost', component: () => import('pages/TotalCost.vue') },
        { path: '/transductor_list', name: 'transductor_list', component: () => import('pages/TransductorList.vue') },
        { path: '/transductor/:id', name: 'transductor', component: () => import('pages/Transductor.vue') },
        { path: '/energy_consumption', name: 'energy_consumption', component: () => import('pages/EnergyConsumptionCurve.vue') },
        { path: '/reports', name: 'reports', component: () => import('pages/Reports.vue') },
        { path: '/manageInstallations', name: 'manageInstallations', component: () => import('pages/ManageInstallations.vue') },
        { path: '/campi', name: 'campi', component: () => import('pages/Campi/Campi.vue') },
        { path: '/group_type', name: 'group_type', component: () => import('pages/Groups/GroupType.vue') },
        { path: '/groups', name: 'groups', component: () => import('pages/Groups/Groups.vue') },
        { path: '/slaves', name: 'slaves', component: () => import('pages/Slave/Slaves.vue') },
        { path: '/transductors', name: 'transductors', component: () => import('pages/Transductor/TransductorsCRUD.vue') }

      ]
    },
    {
      path: '',
      component: () => import('layouts/AuthLayout.vue'),
      beforeEnter (to, from, next) {
        const { store } = ssrContext
        const logged = store.getters['userStore/authStatus']
        if (logged) {
          next('/login')
        } else {
          next()
        }
      },
      children: [
        { path: '/login', name: 'login', component: () => import('pages/Login.vue') },
        { path: '/register', name: 'register', component: () => import('pages/Register.vue') },
        { path: '/forgotten_password', name: 'forgotten_password', component: () => import('pages/ForgottenPassword.vue') },
        { path: '/reset_password/:token', name: 'reset_password', component: () => import('pages/ResetPassword.vue') }
      ]
    },
    { path: '/dashboard', name: 'dashboard', component: () => import('pages/DashboardBase.vue') }
  ]

  // Always leave this as last one
  if (process.env.MODE !== 'ssr') {
    routes.push({
      path: '*',
      component: () => import('pages/Error404.vue')
    })
  }

  return routes
}
