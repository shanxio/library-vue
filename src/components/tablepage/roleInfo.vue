<template>
  <div class="_log">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色信息管理</el-breadcrumb-item>
      </el-breadcrumb>
      <br />
      <el-container style="height: 500px; border: 1px solid #eee">

        <el-container>
          <el-header style="text-align: left; font-size: 12px; padding: 20px;">
            <el-form :inline="true"
                     :model="formSearch"
                     ref="formSearch"
                     class="demo-form-inline"
                     label-width="68px"
                     style="">

              <el-form-item class="form_input"
                            prop="
                            roleName">
                <el-input v-model="formSearch.roleName"
                          placeholder="请输角色名称"
                          clearable
                          size="medium"></el-input>
              </el-form-item>

              <el-form-item style=" left: 500px">
                <el-button type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="getAll">查询</el-button>
              </el-form-item>
              <el-form-item>

                <el-button icon="el-icon-circle-plus-outline"
                           size="small"
                           @click="dialogForm.dialogFormVisible=true"
                           v-has="'role-insert'">录入</el-button>
              </el-form-item>

            </el-form>
          </el-header>

          <el-main>
            <el-table :data="tableData"
                      :inline="true"
                      @selection-change="selectionChange"
                      ref="multipleTable">

              <el-table-column label="选择"
                               width="70"
                               header-align="center"
                               align="center">
                <template slot-scope="scope">
                  <el-radio class="radio"
                            v-model="radio"
                            :label="scope.$index"
                            @change.native="getRoleMenus(scope.$index,scope.row)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="roleId"
                               label="角色编号"
                               width="100px">
              </el-table-column>
              <el-table-column prop="roleName"
                               label="角色名称"
                               width="100px">
              </el-table-column>

              <el-table-column prop="roleTag"
                               label="角色标识符"
                               width="150px">
              </el-table-column>
              <el-table-column prop="roleDescription"
                               label="角色说明"
                               width="200px">
              </el-table-column>

              <el-table-column label="操作"
                               width="150"
                               fixed="right">
                <template slot-scope="scope">
                  <el-button size="small"
                             @click="roleInfoDelete(scope)"
                             v-has="'role-delete'">删除</el-button>
                  <el-button size="small"
                             @click="roleInfoUpdateShow(scope)"
                             v-has="'role-update'">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
        <el-aside width="200px">
          <el-divider>菜单</el-divider>
          <el-tree :data="menusData"
                   show-checkbox
                   node-key="id"
                   ref="menusTree"
                   default-expand-all
                   @current-change="checkMenus"
                   :props="defaultProps">
          </el-tree>
          <el-divider></el-divider>
          <el-button @click="authorization"
                     v-has="'role-auth'">授权</el-button>
          <el-button v-has="'role-auth'">取消</el-button>
        </el-aside>
        <el-aside width="200px">
          <el-divider>按钮</el-divider>
          <el-tree :data="btnRoleData"
                   show-checkbox
                   node-key="id"
                   ref="btnsTree"
                   default-expand-all
                   @check="checkBtns"
                   :props="defaultProps">
          </el-tree>
          <el-divider></el-divider>
          <el-button @click="saveBtn"
                     v-has="'role-auth'">保存</el-button>
          <el-button v-has="'role-auth'">取消</el-button>
        </el-aside>
      </el-container>

    </div>

    <!-- 录入 -->
    <el-dialog :title="dialogForm.title"
               :visible.sync="dialogForm.dialogFormVisible"
               width="40%"
               @close="onReset">
      <el-form :model="roleInfo"
               :inline="true"
               ref="roleInfoForm">
        <el-form-item label="角色名称"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="roleName">
          <el-input v-model="roleInfo.roleName"
                    clearable></el-input>
        </el-form-item>
        <br>
        <br>
        <el-form-item label="角色标识符"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="roleTag">
          <el-input v-model="roleInfo.roleTag"
                    clearable></el-input>
        </el-form-item>
        <br>
        <br>

        <el-form-item label="角色描述"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="roleDescription">
          <el-input v-model="roleInfo.roleDescription"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="-"
                      :label-width="formLabelWidth">

          <el-button @click="onReset">重置</el-button>
          <el-button type="primary"
                     @click="roleInsert">确 定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <!-- 表格 -->

    <el-pagination :data="pageInfo.navigatepageNums"
                   :current-page="pageInfo.pageNum"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   :page-sizes="[5, 10]"
                   :page-size="pageInfo.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<style lang="scss">
._log {
  // 覆写el样式,调整输入框宽度 start
  .form_input {
    .el-form-item__content {
      width: 220px;
    }
  }

  .form_select {
    .el-select {
      width: 220px;
    }
  }

  .el-pagination {
    padding-top: 5px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  // 覆写el样式,调整输入框宽度 end
  .operate {
    padding-bottom: 10px;
  }
}
</style>
<script>
export default {
  data () {
    return {
      formLabelWidth: '120px',
      radio: '',
      menusData: [], // 所有的菜单
      btnsData: [], // 所有的按钮
      btnRoleData: [], // 点击菜单时展示的按钮
      saveBtns: [], // 保存所有的权限
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selected: [], // 所有选中的行的值
      tableData: [], // 表格数据
      pageInfo: '', // 表格分页数据
      dialogForm: { dialogFormVisible: false, title: '录入角色信息' },
      pageVo: {
        pageNum: 1,
        pageSize: 5
      },
      formSearch: {
        roleName: ''
      },
      roleInfo: {
        roleId: '',
        roleName: '',
        roleTag: '',
        roleDescription: ''
      },
      roleTag: '',
      menuId: 0,
      saveBtnsObject: []
    }
  },
  watch: {
    'formSearch.roleName' (val) {
      if (val === '') {
        this.getAll()
      }
    }
  },
  mounted () {
    this.getAll()
    this.getMensTree()
    this.getBtnsTree()
  },
  methods: {
    onReset () {
      this.$refs['roleInfoForm'].resetFields()
    },
    authorization () {
      if (this.roleTag !== '') {
        var menus = this.$refs.menusTree.getCheckedKeys().concat(this.$refs.menusTree.getHalfCheckedKeys())
        var btns = this.saveBtns
        var nodeInfo = menus.concat(btns)
        var data = {
          roleTag: this.roleTag,
          nodeInfos: nodeInfo
        }
        console.log(data)
        var _this = this
        this.$http
          .post('/admin/role/auth', data)
          .then((result) => {
            if (result.data.code) {
              _this.$message({ type: 'success', message: result.data.msg })
            }
          })
      } else {
        this.$message({ type: 'danger', message: '请选择角色' })
      }
    },
    generateBtn () {
      var btns = this.btnsData
      var array = []
      for (var i = 0; i < btns.length; i++) {
        if (this.menuId === btns[i].pid) {
          array.push(btns[i].id)
        }
      }
      return array
    },
    btnPush (array) {
      for (var i = 0; i < array.length; i++) {
        this.saveBtns.push(array[i])
      }
      this.saveBtns = this.unique(this.saveBtns)
    },
    deleteBtn (array) {
      for (var i = 0; i < array.length; i++) {
        if (this.saveBtns.indexOf(array[i]) !== -1) {
          this.saveBtns.splice(this.saveBtns.indexOf(array[i]), 1)
        }
      }
    },
    saveBtn () {
      var data = this.$refs.btnsTree.getCheckedKeys().concat(this.$refs.btnsTree.getHalfCheckedKeys())
      var btns = this.generateBtn()
      if (data.length !== 0 && this.menuId !== 0) {
        this.btnPush(data)// 添加数据
        var delArray = this.deleteArray(btns, data)
        this.deleteBtn(delArray)
      } else {
        this.deleteBtn(btns)
      }
      if (this.menuId !== 0) {
        this.$message({ type: 'success', message: '保存成功' })
      }
    },
    // 连个数组调出不同的数据
    deleteArray (array, data) {
      return array.concat(data).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    // 生成对应页面的按钮
    checkMenus (val, node) {
      this.menuId = val.id
      this.btnRoleData = [] // 清空页面的按钮
      var btnsData = this.btnsData // 所有按钮
      for (var i = 0; i < btnsData.length; i++) {
        if (btnsData[i].pid === val.id) {
          this.btnRoleData.push(btnsData[i])
        }
      }
      if (this.roleTag !== '') {
        this.$refs.btnsTree.setCheckedKeys(this.unique(this.saveBtns))
      }
    },
    checkBtns () {

    },
    // 该角色的按钮权限
    getRoleBtns (roleTag) {
      // var arr = []
      var _this = this
      this.$http
        .post('/admin/nodeInfo/btnRoleTree', _this.$qs.stringify({ roleTag: roleTag }))
        .then((result) => {
          _this.saveBtns = []
          var btns = result.data
          for (var i = 0; i < btns.length; i++) {
            _this.saveBtns.push(btns[i].id)
          }
          // _this.saveBtnsObject = result.data
        })
    },
    // 数组去除重复
    unique (arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) { // 第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    // 所有的菜单
    getMensTree () {
      var _this = this
      this.$http
        .post('/admin/nodeInfo/tree')
        .then((result) => {
          _this.menusData = result.data
        })
    },
    // 所有按钮的权限
    getBtnsTree () {
      var _this = this
      this.$http
        .get('/admin/nodeInfo/btnTree')
        .then((result) => {
          console.log(result.data)
          _this.btnsData = result.data
        })
    },
    // 查找该角色的菜单权限
    getRoleMenus (index, row) {
      this.saveBtns = [] // 清除对应的按钮全系
      this.btnRoleData = [] // 清空对应页面的按钮
      this.roleTag = row.roleTag // 标记
      this.getRoleBtns(row.roleTag) // 生成对应角色按钮权限
      var _this = this
      this.$http
        .post('/admin/nodeInfo/roleTree', _this.$qs.stringify({ roleTag: row.roleTag }))
        .then((result) => {
          var arr = []
          _this.getMenusCheck(arr, result.data)
          this.$refs.menusTree.setCheckedNodes(arr)
        })
    },
    // 菜单选中
    getMenusCheck (arr, result) {
      for (var i = 0; i < result.length; i++) {
        var menus = result[i]
        if (menus.children && menus.children.length > 0) {
          this.getMenusCheck(arr, menus.children)
        }
        if (menus.pid !== 0) {
          arr.push(menus)
        }
      }
    },
    // 删除角色
    roleInfoDelete (scope) {
      console.log(scope.row.roleId)
      const _this = this
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http
          .post('/admin/role/roleInfoDelete', _this.$qs.stringify({ roleId: scope.row.roleId }))
          .then((result) => {
            if (result.data.code === '200') {
              _this.getAll()
              this.$message({
                type: 'success',
                message: result.data.msg
              })
            } else {
              this.$message({
                showClose: true,
                message: result.data.msg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 弹窗修改
    roleInfoUpdateShow (scope) {
      this.dialogForm.title = '编辑信息' // 显示弹框
      this.dialogForm.dialogFormVisible = true // 显示弹框
      this.roleInfo = Object.assign({}, scope.row)
    },
    // 添加或修改角色
    roleInsert () {
      if (this.dialogForm.title === '编辑信息') {
        console.log(this.roleInfo)
        this.$confirm('确认修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const _this = this
          this.$http
            .post('/admin/role/roleInfoUpdate', this.roleInfo)
            .then((result) => {
              if (result.data.code === '200') {
                _this.getAll()
                this.$message({
                  type: 'success',
                  message: result.data.msg
                })
              } else {
                this.$message({
                  showClose: true,
                  message: result.data.msg,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
      } else {
        this.$confirm('确认录入', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const _this = this
          this.$http
            .post('/admin/role/roleInfoInsert', this.roleInfo)
            .then((result) => {
              if (result.data.code === '200') {
                _this.getAll()
                this.$message({
                  type: 'success',
                  message: '录入成功!'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '录入失败',
                  type: 'error'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消录入'
          })
        })
      }
    },
    // 查询所有的数据
    getAll () {
      const _this = this
      var data = {
        roleName: this.formSearch.roleName,
        pageVo: this.pageVo
      }
      this.$http
        .post('/admin/role/getAll', data)
        .then((result) => {
          _this.tableData = result.data.list
          console.log(result)
          _this.pageInfo = result.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 选中表头的复选框时获得所有的选中的数据
    selectionChange (val) {
      this.selected = val
    },
    // 当页码发生改变
    currentChange (val) {
      this.pageVo.pageNum = val
      this.getAll()
    },
    // 当行数发生改变时
    sizeChange (val) {
      this.pageVo.pageSize = val
      this.getAll()
    }
  }
}
</script>
<style>
.el-header {
  line-height: 60px;
}

.el-aside {
  color: white;
}
</style>
