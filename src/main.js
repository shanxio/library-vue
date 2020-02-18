/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store'
import ElementUI from 'element-ui'
// 自定义样式
import '../static/theme/theme-black/index.css'
// 使用ElementUI
Vue.use(ElementUI)
import router from './router'
// 引入axios
import axios from 'axios'
// axios.defaults.withCredentials = true
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8080'// 端口设置
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
import permission from './directive'

// import '../plugins/jquery-3.3.1.min.js'
import jquery from 'jquery'
Vue.prototype.$ = jquery
import '../plugins/jquery.ztree.core'
import '../plugins/jquery.ztree.excheck'
console.log(permission)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
