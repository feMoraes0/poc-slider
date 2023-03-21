import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'abstract',
  routes: [
    {
      name: 'first-route',
      path: '/first-route',
      component: () => import('./components/FirstRoute'),
      children: [
        {
          name: 'firstinternal',
          path: 'first-internal',
          component: () => import('./components/modal/FirstInternal'),
        },
        {
          name: 'secondinternal',
          path: 'second-internal',
          component: () => import('./components/modal/SecondInternal'),
        }
      ]
    }
  ]
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
