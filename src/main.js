import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './config/routes'
import store from './store/'
import * as filters from './filters/'
import components from './components/' // 加载公共组件

import 'flex.css'
import './css/common.css'
import './less/common.less'
import './iconfont/iconfont.css'

Object.keys(components).forEach((key) => { // 注册公共组件
  Vue.component(`v-${key}`, components[key])
})
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true;

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
} 
const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior,
})

new Vue({ store, router }).$mount('#app')
