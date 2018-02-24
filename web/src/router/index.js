import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import carousel from '@/components/carousel/carousel.vue'



Vue.use(Router)
Vue.use(ElementUI)
export default new Router({
  routes: [
    {
      path: '/carousel',
      name: '',
      component: carousel
    }
  ]
})
