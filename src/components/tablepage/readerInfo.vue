<template>
  <div class="_readerInfo">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>读者信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form :inline="true"
             :model="formSearch"
             ref="formSearch"
             class="demo-form-inline"
             label-width="68px">

      <el-form-item class="form_input"
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
      <br>
      <el-form-item>

        <el-button icon="el-icon-circle-plus-outline"
                   size="small"
                   @click="readerDeletebatch"
                   v-has="'reader-batchDelete'">批量删除</el-button>

        <el-button icon="el-icon-circle-plus-outline"
                   size="small"
                   @click="dialogForm.dialogFormVisible=true"
                   v-has="'reader-insert'">录入</el-button>

        <el-button icon="el-icon-upload2"
                   size="small"
                   @click="dialogForm.dialogFormUpload=true"
                   v-has="'reader-upload'">导入Excel</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="tableData"
              @selection-change="selectionChange"
              ref="multipleTable"
              style="width: 100%"
              max-height="400">
      <el-table-column type="selection"
                       fixed="left"
                       width="55"
                       v-has="'reader-batchDelete'">
      </el-table-column>
      <el-table-column prop="id"
                       label="读者编号"
                       width="100">
      </el-table-column>
      <el-table-column prop="readerName"
                       label="姓名"
                       width="100">
      </el-table-column>
      <el-table-column prop="readerPhone"
                       label="手机号码"
                       width="150">
      </el-table-column>
      <el-table-column prop="readerAddress"
                       label="地址"
                       width="150">
      </el-table-column>
      <el-table-column prop="readerFullAddress"
                       label="详细地址"
                       width="100">
      </el-table-column>

      <el-table-column prop="readerMoney"
                       label="充值金额"
                       width="100">
      </el-table-column>

      <el-table-column prop="readerCard"
                       label="身份证号"
                       width="200">
      </el-table-column>
      <el-table-column prop="createDate"
                       label="创建日期"
                       width="100">
      </el-table-column>
      <el-table-column prop="readerState"
                       label="用户状态"
                       width="120"
                       :formatter="format_gender">
      </el-table-column>
      <el-table-column label="操作"
                       width="150"
                       fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     v-has="'reader-stateUpdate'"
                     type="danger"
                     v-if="scope.row.readerState === '0'"
                     @click="readerStateUpdate(scope.row)">
            禁用
          </el-button>
          <el-button size="mini"
                     v-has="'reader-stateUpdate'"
                     v-if="scope.row.readerState === '1'"
                     @click="readerStateUpdate(scope.row)">
            启用
          </el-button>
          <el-button size="mini"
                     v-has="'reader-delete'"
                     @click="readerDelete(scope.row,scope.$index)">删除</el-button>
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

    <!-- 导入Excel文件进行批量添加 -->
    <el-dialog title="导入Excel文件信息"
               :visible.sync="dialogForm.dialogFormUpload"
               width="30%"
               @close="remove">
      <el-upload class="upload-demo"
                 ref="uploadExcel"
                 action=""
                 :limit="1"
                 :on-change="excelUploadChange"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :file-list="upload.excelList"
                 :http-request='submitUpload'
                 :auto-upload="false"
                 accept=".xls,.xlsx">
        <!-- 选取文件 -->
        <el-button slot="trigger"
                   size="small"
                   type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;"
                   size="small"
                   type="success"
                   @click="submitUploadAsses">上传到服务器</el-button>

        <div slot="tip"
             class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
      </el-upload>
      <el-dialog width="75%"
                 title="错误表格数据"
                 :visible.sync="dialogForm.innerVisible"
                 append-to-body>
        <el-table :data="errorData"
                  style="width: 100%"
                  max-height="400">
          <el-table-column prop="readerName"
                           label="姓名"
                           width="100">
          </el-table-column>
          <el-table-column prop="readerPhone"
                           label="手机号码"
                           width="150">
          </el-table-column>
          <el-table-column prop="readerAddress"
                           label="地址"
                           width="150">
          </el-table-column>
          <el-table-column prop="readerFullAddress"
                           label="详细地址"
                           width="100">
          </el-table-column>

          <el-table-column prop="readerMoney"
                           label="充值金额"
                           width="100">
          </el-table-column>

          <el-table-column prop="readerCard"
                           label="身份证号"
                           width="200">
          </el-table-column>
          <el-table-column prop="createDate"
                           label="创建日期"
                           width="100">
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>
    <!-- 录入读者的信息记录 -->
    <el-dialog title="录入读者信息"
               :visible.sync="dialogForm.dialogFormVisible"
               width="50%">
      <el-form :model="readerInfo"
               :inline="true"
               ref="readerForm"
               :rules="rules">
        <el-form-item label="读者姓名"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerName"
                      clearable>
          <el-input v-model="readerInfo.readerName"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="读者手机号码"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerPhone"
                      clearable>
          <el-input v-model="readerInfo.readerPhone"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="读者身份证号"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerCard"
                      clearable>
          <el-input v-model="readerInfo.readerCard"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="读者充值金额"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerMoney"
                      clearable>
          <el-input v-model="readerInfo.readerMoney"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="读者状态"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerState"
                      clearable>
          <el-select v-model="readerInfo.readerState"
                     placeholder="用户状态"
                     size="small">
            <el-option label="正常"
                       :value='0'></el-option>
            <el-option label="禁止"
                       :value='1'></el-option>
          </el-select>
        </el-form-item>
        <br><br>
        <el-form-item label="读者地址所在"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerFullAddress"
                      clearable>
          <el-cascader :props="prop"
                       ref="cascaderAddr"
                       class="font_pla"
                       @change="handleAddressFun"></el-cascader>

        </el-form-item>
        <el-form-item label="详细地址说明"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerAddress">
          <el-input type="textarea"
                    :row="2"
                    v-model="readerInfo.readerAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary"
                   @click="readerInsert">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-cascader-menu {
  overflow: hidden;
}
._readerInfo {
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
export default {

  name: 'readerInfo',
  data () {
    return {
      formLabelWidth: '120px',
      dialogForm: { dialogFormVisible: false, dialogFormUpload: false, innerVisible: false }, // 弹出框
      selected: [], // 所有选中的行的值
      tableData: [], // 表格数据
      pageInfo: '', // 表格分页数据
      errorData: [], // 错误表格数据
      upload: {
        excelList: []
      },
      pageVo: {
        pageNum: 1,
        pageSize: 5
      },
      readerInfo: {
        readerName: '',
        readerPhone: '',
        readerAddress: '',
        readerCard: '',
        readerFullAddress: '',
        readerMoney: '',
        readerState: 0,
        createDate: new Date()
      },
      formSearch: {
        readerName: '',
        readerState: ''
      },
      rules: {
        readerName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        readerPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        readerAddress: [
          { required: true, message: '请输入详情地址', trigger: 'blur' }
        ],
        readerMoney: [
          { required: true, message: '请输入初始金额', trigger: 'blur' }
        ]
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
    format_gender (row, column) {
      var gender = row[column.property]

      if (gender === '1') {
        return '禁用'
      } else if (gender === '0') {
        return '正常'
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
    // 获取级联地址
    handleAddressFun: function (val) {
      this.readerInfo.readerFullAddress = val.toString().split(',').join('-')
      console.log(this.readerInfo.readerFullAddress)
    },
    // 录入读者信息
    readerInsert () {
      this.$refs['readerForm'].validate((valid) => {
        if (!valid) {
          this.$message({
            type: 'error',
            message: '认证不通过成功!'

          })
        } else {
          this.$confirm('确认录入', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const _this = this
            console.log(this.readerInfo)
            this.$http
              .post('/admin/reader/readerInfoInsert', this.readerInfo)
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
      })
    },
    // 查询读者信息
    getAll () {
      var data = {
        pageVo: this.pageVo,
        reader: this.formSearch
      }
      const _this = this
      this.$http
        .post('/admin/reader/getAll', data)
        .then((result) => {
          _this.tableData = result.data.list
          console.log(result.data)
          _this.pageInfo = result.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 编辑
    onShowEdit () {

    },

    // 获取读者状态的值
    readerStateChange (val) {
      this.formSearch.readerState = val
      this.getAll()
    },
    // 修改读者状态
    readerStateUpdate (row) {
      var data = {
        id: row.id,
        readerState: row.readerState === '0' ? '1' : '0'
      }
      this.$confirm('是否修改状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$http
          .post('/admin/reader/readerInfoStateUpdate', data)
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
          .post('/admin/reader/readerInfoDelete', _this.$qs.stringify(data))
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
          .post('/admin/reader/readerInfoBatchDelete', ids)
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
