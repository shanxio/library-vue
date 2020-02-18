/**
 *
 * 懒加载动态路由
 */
function lazy (code) {
  // return  resolve => require(["@/components/" + name + ".vue"], resolve)
  return getComponetByPath('/' + code)
}
function getComponetByPath (path) {
  for (var i = 0; i < dynamicRouter.length; i++) {
    var route = dynamicRouter[i]
    if (route.path === path) {
      return route.component
    }
  }
}
/**
 * 路由定义
 * path跟配置里的资源标示对应,同时跟url地址对应
 */
const dynamicRouter = [

  {
    path: '/bookInfo',
    component: resolve => require(['@/components/tablepage/bookInfo.vue'], resolve)
  },
  {
    path: '/lendbook',
    component: resolve => require(['@/components/tablepage/lendbook.vue'], resolve)
  },
  {
    path: '/readerInfo',
    component: resolve => require(['@/components/tablepage/readerInfo.vue'], resolve)

  },
  {
    path: '/readerInfoInsert',
    component: resolve => require(['@/components/tablepage/readerInfoEdit.vue'], resolve)

  },
  {
    path: '/userInfoEdit',
    component: resolve => require(['@/components/tablepage/userInfoEdit .vue'], resolve)

  },
  {
    path: '/userInfo',
    component: resolve => require(['@/components/tablepage/userInfo.vue'], resolve)

  },
  {
    path: '/log',
    component: resolve => require(['@/components/tablepage/log.vue'], resolve)

  },
  {
    path: '/roleInfo',
    component: resolve => require(['@/components/tablepage/roleInfo.vue'], resolve)

  },
  {
    path: '/bookInfoEdit',
    component: resolve => require(['@/components/tablepage/bookInfoEdit.vue'], resolve)

  },
  {
    path: '/noReturnBook',
    component: resolve => require(['@/components/tablepage/noReturnBook.vue'], resolve)

  },
  {
    path: '/returnBook',
    component: resolve => require(['@/components/tablepage/returnBook.vue'], resolve)

  }
]
export { lazy }
