import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['@/components/login.vue'], resolve),
      meta: { title: '登录页' }
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/components/homepage/404.vue'),
      meta: { title: '路由不存在' }
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      name: '403',
      path: '/403',
      component: () => import('@/components/homepage/403.vue'),
      meta: { title: '资源不可访问' }
    }
  ],
  mode: 'history'
})

/**
 * 全局路由守卫()
 */
// const rightPathList = ['/login', '/404', '/403']// 直接可以进入的页面
router.beforeEach((to, from, next) => {
  // debugger
  console.log('跳转到:', to.fullPath)
  var token = sessionStorage.getItem('token')
  if (!token && to.path !== '/login') { // 登陆认证校验,没登录则跳转/login
    next({ path: '/login' })
  } else {
    next()
  }
})
/**
 * 请求拦截器,添加请求头token
 */
axios.interceptors.request.use(
  config => {
    console.log('>>>请求url:', config.url)
    var headers = config.headers
    if (sessionStorage.getItem('token')) {
      headers.token = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    console.log('>>>请求异常:', error.message)
    return Promise.reject(error)
  })
// 接口请求超时设置
axios.defaults.timeout = 50000// 毫秒
/**
 * 应答拦截器,添加请求头token
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('<<<请求成功')

  if (response.data.code === '1005') {
    new Vue().$message({ type: 'error', message: response.data.msg })
    router.push('/login')
  }

  return response
}, error => {
  // Do something with response error
  console.log('<<<异常信息:', error.message)
  return Promise.reject(error)
})

// // 获取当前路由是否有权限访问
// function hasPermit (to) {
//   var hasPermit = false
//   if (to.meta && to.meta.role) {
//     var ruleList = getRuleList()
//     hasPermit = ruleList.some(rule => {
//       return to.meta.role.includes(rule)
//     })
//   }
//   return hasPermit
// }
// // 获取登陆的角色集合
// function getRuleList () {
//   var ruleList = [] // 角色数组
//   var strRule = sessionStorage.getItem('position')
//   if (strRule.indexOf('|') !== -1) {
//     ruleList = strRule.split('|')
//   } else {
//     ruleList.push(strRule)
//   }
//   return ruleList
// }

export default router
