
/**
 * 动态添加菜单
 * author:qlx
 */
const addMenus = {
  state: {
    menuList: []
  },
  getters: {
    getMenuList: state => {
      return state.menuList
    }
  },
  mutations: {
    add_Menus (state, param) {
      if (param) {
        var menuList = []
        menuList.push({
          icon: 'el-icon-tickets',
          index: '#1',
          title: '系统首页',
          subs: [{
            icon: 'el-icon-tickets',
            index: 'index',
            title: '首页',
            subs: []
          }]
        })
        _addMenu(menuList, param)
        state.menuList = menuList
      }
      function _addMenu (menuList, params) {
        for (var i = 0; i < params.length; i++) {
          var menu = {
            icon: 'el-icon-tickets',
            index: '1',
            title: '工作台',
            subs: []
          }

          var menuParam = params[i]
          // menu.icon = menuParam.menuIcon
          // menu.index=menuParam.orderBy;
          // url地址
          menu.index = menuParam.nodeIndex
          menu.title = menuParam.nodeDescription
          // 只涉及二级菜单
          if (menuParam.child && menuParam.child.length > 0) {
            _addMenu(menu.subs, menuParam.child)
          }
          menuList.push(menu)
        }

        console.log('树形菜单结构：' + JSON.stringify(menuList))
      }
    }
  },
  actions: {
    add_Menus ({ commit }, param) {
      commit('add_Menus', param)
    }
  }
}
export default addMenus
