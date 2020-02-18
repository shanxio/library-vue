<template>
  <div class="_userInfo">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form :inline="true"
             :model="formSearch"
             ref="formSearch"
             class="demo-form-inline"
             label-width="68px">

      <!-- <el-form-item class="form_input"
                    label="读者姓名"
                    prop="readerName">
        <el-input v-model="formSearch.readerName"
                  placeholder="请输入姓名"
                  clearable
                  size="medium"></el-input>
      </el-form-item>

      <el-form-item label="读者状态"
                    class="form_select">
        <el-select v-model="formSearch.readerState"
                   placeholder="用户状态"
                   size="small"
                   @change="readerStateChange">
          <el-option label="--请选择--"
                     :value="''"></el-option>
          <el-option label="正常"
                     :value='0'></el-option>
          <el-option label="禁用"
                     :value='1'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style=" left: 500px">
        <el-button type="primary"
                   size="small"
                   icon="el-icon-search"
                   @click="getAll">查询</el-button>
        <el-button type="warning"
                   @click="onReset('formSearch')"
                   size="small"
                   icon="el-icon-refresh-right">重置
        </el-button>
      </el-form-item>
      <br> -->
      <el-form-item>

        <!-- <el-button icon="el-icon-circle-plus-outline"
                   size="small"
                   @click="readerDeletebatch"
                   v-has="'reader-batchDelete'">批量删除</el-button> -->

        <el-button icon="el-icon-circle-plus-outline"
                   size="small"
                   @click="userInfoInsert"
                   v-has="'user-insert'">录入</el-button>
        <!--
        <el-button icon="el-icon-upload2"
                   size="small"
                   @click="dialogForm.dialogFormUpload=true"
                   v-has="'reader-upload'">导入Excel</el-button> -->
      </el-form-item>

    </el-form>
    <el-table :data="tableData"
              @selection-change="selectionChange"
              ref="multipleTable"
              style="width: 100%"
              max-height="400">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">

            <el-form-item label="用户照片">
              <div class="block">
                <el-image :src="props.row.userPhoto"
                          style="width: 80px;height: 80px;">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"
                       style="font-size: 40px;"></i>
                  </div>
                </el-image>
              </div>
            </el-form-item>
            <br>
            <el-form-item label="用户编号">
              <span>{{ props.row.userId }}</span>
            </el-form-item>
            <br />
            <el-form-item label="真实姓名">
              <span>{{ props.row.realName }}</span>
            </el-form-item>

            <br>
            <el-form-item label="登录名称">
              <span>{{ props.row.username }}</span>
            </el-form-item>

            <br>
            <el-form-item label="性别">
              <span>{{ props.row.userSex }}</span>
            </el-form-item>

            <br>
            <el-form-item label="用户状态">
              <span>{{ props.row.enabled==true?'正常':'禁用' }}</span>
            </el-form-item>
            <br>
            <el-form-item label="身份证号">
              <span>{{ props.row.userCard }}</span>
            </el-form-item>
            <br>
            <el-form-item label="手机号码">
              <span>{{ props.row.userPhone }}</span>
            </el-form-item>
            <br>
            <el-form-item label="用户地址">
              <span>{{ props.row.userAddress }}</span>
            </el-form-item>

            <br>
            <el-form-item label="详细地址">
              <span>{{ props.row.userFulladdress }}</span>
            </el-form-item>

            <br>
            <el-form-item label="入职日期">
              <span>{{ props.row.userEntrydate }}</span>
            </el-form-item>

            <br>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名"
                       prop="realName">
      </el-table-column>
      <el-table-column label="登录名"
                       prop="username">
      </el-table-column>
      <el-table-column label="手机号码"
                       prop="userPhone">
      </el-table-column>

      <el-table-column prop="userEntrydate"
                       label="入职日期">
      </el-table-column>
      <el-table-column prop="enabled"
                       label="用户状态"
                       :formatter="format_gender">
      </el-table-column>
      <el-table-column label="角色"
                       prop="rolesName">
      </el-table-column>

      <el-table-column label="操作"
                       width="150"
                       fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     v-has="'user-update'"
                     @click="userInfoUpload(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
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
.el-cascader-menu {
  overflow: hidden;
}
._userInfo {
  // 覆写el样式,调整输入框宽度 start
  .form_input {
    .el-form-item__content {
      width: 160px;
    }
  }

  .lable_input {
    .el-form-item__content {
      width: 250px;
    }
  }

  .form_select {
    .el-select {
      width: 150px;
    }
  }

  .el-pagination {
    padding-top: 5px;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  // 覆写el样式,调整输入框宽度 end
  .operate {
    padding-bottom: 10px;
  }
}
</style>

<script>
import axios from 'axios'
import qs from 'qs'
// import bus from '../common/bus'
export default {

  name: 'readerInfo',
  data () {
    return {
      codeImg: '',
      formLabelWidth: '120px',
      // dialogForm: { dialogFormVisible: false, dialogFormUpload: false, innerVisible: false }, // 弹出框
      selected: [], // 所有选中的行的值
      tableData: [], // 表格数据
      pageInfo: '', // 表格分页数据

      upload: {
        excelList: []
      },
      pageVo: {
        pageNum: 1,
        pageSize: 5
      },
      formSearch: {
        username: '',
        enabled: ''

      },
      rules: {

      },
      prop: {
        lazy: true,
        getByPid: {
          getByPid (node, resolve, pid) {
            axios
              .post('/admin/address/pid', qs.stringify({ pid: pid }))
              .then(res => {
                // console.log(res.data)
                const cities = res.data.data.map((value, i) => ({
                  value: value.name,
                  label: value.name,
                  pid: value.code,
                  leaf: node.level >= 2
                }))
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(cities)
              })
          }
        },
        lazyLoad (node, resolve) {
          var _this = this
          setTimeout(() => {
            if (node.level === 0) {
              _this.getByPid.getByPid(node, resolve, 0)
            } else if (node.level !== 0) {
              _this.getByPid.getByPid(node, resolve, node.data.pid)
            }
          }, 200)
        }
      }
    }
  },
  watch: {
    'formSearch.readerName' (val) {
      if (val === '') {
        this.getAll()
      }
    }
  },
  mounted () {
    this.getAll()
  },

  methods: {
    userInfoUpload (row) {
      this.$router.push({ name: 'userInfoEdit', params: { edit: '修改', userInfo: row } })
    },
    getUrl (url) {
      var _this = this
      this.$http.get(url, {
        responseType: 'arraybuffer'
      }).then(function (response) {
        if (response != null) {
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
        }
      }).then(data => {
        _this.codeImg = data
      })
      return _this.codeImg
    },
    format_gender (row, column) {
      var gender = row[column.property]
      if (gender === true) {
        return '正常'
      } else if (gender === false) {
        return '禁用'
      } else {
        return ''
      }
    },
    // 清空上传文件
    remove () {
      console.log('-----------')
      this.$refs['uploadExcel'].clearFiles()
    },
    // 提交文件
    submitUploadAsses () {
      if (this.upload.excelList.length > 0) {
        this.$refs.uploadExcel.submit()
      } else {
        this.$message({ message: '请选择上传excel表格文件', type: 'info' })
      }
    },
    // 调用  this.$refs.uploadExcel.submit()此方法就会使用自定义的上传行为
    submitUpload (context) {
      var _this = this
      let formDate = new FormData()
      formDate.append('excel', context.file)
      // 设置 请求头为多文件上传
      let config = {
        'Content-Type': 'multipart/form-data'
      }
      this.$http.post('/admin/reader/upload', formDate, config).then(response => {
        if (response.data.code === '200') {
          if (response.data.data.length !== 0) {
            this.$message({
              duration: 1000,
              message: '上传成功,但又部分数据错误请重新修改',
              type: 'info',
              onClose: function () {
                _this.dialogForm.innerVisible = true
                _this.errorData = response.data.data
              }
            })
          } else {
            this.$message({ message: '上传成功', type: 'success' })
          }
          _this.getAll()
        }
      })
    },
    // 上传文件发生，并将文件赋值
    excelUploadChange (file, fileList) {
      this.upload.excelList = fileList
    },
    // 关闭文件时发生
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.upload.excelList = fileList
    },
    handlePreview (file) { // 查看文件时发生
      console.log(file)
    },
    // 清空表单使用
    onReset (val) {
      this.$refs[val].resetFields()
    },
    // 录入用户信息
    userInfoInsert () {
      this.$router.push({ name: 'userInfoEdit', params: { edit: '录入', userInfo: '' } })
    },
    // 查询用户信息
    getAll () {
      var data = {
        pageVo: this.pageVo,
        userInfo: this.formSearch
      }
      const _this = this
      this.$http
        .post('/admin/user/getAll', data)
        .then((result) => {
          _this.tableData = result.data.list
          _this.pageInfo = result.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 编辑
    onShowEdit () {

    },

    // 获取用户状态的值
    readerStateChange (val) {
      // this.formSearch.readerState = val
      this.getAll()
    },
    // 修改用户状态
    readerStateUpdate (row) {
      var data = {
        id: row.id
        // readerState: row.readerState === '0' ? '1' : '0'
      }
      this.$confirm('是否修改状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$http
          .post('/admin//', data)
          .then((result) => {
            if (result.data.code === '200') {
              _this.getAll()
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            }
            if (result.data.code === '403') {
              this.$message({
                showClose: true,
                message: '没有权限',
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
    },

    // 删除数据
    readerDelete (row) {
      var data = {
        id: row.id
      }
      const _this = this
      this.$confirm('是否删除该读者?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .post('/admin/', _this.$qs.stringify(data))
          .then((result) => {
            if (result.data.code === '200') {
              _this.getAll()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                showClose: true,
                message: '删除失败',
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

    // 批量删除读者数据
    readerDeletebatch () {
      if (this.selected.length === 0) {
        this.$message({
          message: '请至少选择一条数据',
          type: 'warning:'
        })
        return ''
      }
      var ids = this.selected.map(item => item.id)

      this.$confirm('是否删除该读者?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$http
          .post('/admin/', ids)
          .then((result) => {
            if (result.data.code === '200') {
              _this.getAll()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                showClose: true,
                message: '删除失败',
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
    // 选中表头的复选框时获得所有的选中的数据
    selectionChange (val) {
      this.selected = val
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
