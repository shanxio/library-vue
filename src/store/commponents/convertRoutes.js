import { lazy } from './lazyLoading'
/**
 * 拼接动态路由
 */
export default (routerList, routeHideList, sysMenuList) => {
  toRoutes(routerList, routeHideList, sysMenuList)
}
// routerList 显示路由 ，routerHideList 隐藏路由，sysMenuList 菜单路由
function toRoutes (routerList, routeHideList, sysMenuList) {
  if (sysMenuList) {
    for (var i = 0; i < sysMenuList.length; i++) {
      // 每个url
      var sysMenuNode = sysMenuList[i]
      if (sysMenuNode.nodeUrl !== '#') {
        // 获取路由的url地址
        var code = sysMenuNode.nodePath

        var routeNode = {
          name: code,
          path: '/' + code,
          component: lazy(code),
          meta: { title: sysMenuNode.nodeDescription }
        }
        routerList.push(routeNode)
      } else {
        // 子节点存在
        // if (sysMenuNode.sysMenuVoChild && sysMenuNode.sysMenuVoChild.length > 0) {
        //   toRoutes(routerList, routeHideList, sysMenuNode.sysMenuVoChild)
        // }
      }
    }
  }
}
