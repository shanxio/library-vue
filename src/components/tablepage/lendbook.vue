<template>
  <div class="_lendbook">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>借阅信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form :inline="true"
             :model="formSearch"
             ref="formSearch"
             class="demo-form-inline"
             label-width="68px">

      <el-form-item class="form_input"
                    label="图书名称"
                    prop="bookName">
        <el-input v-model="formSearch.bookName"
                  placeholder="请输入图书名称"
                  clearable
                  size="medium"></el-input>
      </el-form-item>
      <el-form-item class="form_input"
                    label="isbn"
                    prop="isbn">
        <el-input v-model="formSearch.isbn"
                  placeholder="请输入isbn码"
                  clearable
                  size="medium"></el-input>
      </el-form-item>
      <el-form-item class="form_input"
                    label="读者编号"
                    prop="readerId">
        <el-input v-model="formSearch.readerId"
                  placeholder="请输入读者编号"
                  clearable
                  size="medium"></el-input>
      </el-form-item>
      <!-- <el-form-item label="用户状态"
                    class="form_select">
        <el-select v-model="formSearch.lendState"
                   placeholder="用户状态"
                   size="small"
                   @change="lendStateChange">
          <el-option label="--请选择--"
                     :value="''"></el-option>
          <el-option label="归还"
                     :value='0'></el-option>
          <el-option label="未归还"
                     :value='1'></el-option>
        </el-select>
      </el-form-item> -->
      <br>
      <el-form-item>
        <el-button icon="el-icon-circle-plus-outline"
                   size="small"
                   v-has="'lend-insert'"
                   @click="insertShow">录入</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-delete"
                   size="small"
                   v-has="'lend-batchDelete'"
                   @click="lendBookDeletebatch">批量删除</el-button>
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
    </el-form>
    <el-table :data="tableData"
              @selection-change="selectionChange"
              ref="multipleTable"
              style="width: 100%"
              max-height="400">

      <el-table-column v-if="false"
                       prop="id"
                       label="id">
      </el-table-column>
      <el-table-column type="selection"
                       width="55"
                       prop="lendState">
      </el-table-column>
      <el-table-column fixed
                       prop="isbn"
                       label="isbn码"
                       width="150">
      </el-table-column>
      <el-table-column prop="bookName"
                       label="图书信息"
                       width="120">
      </el-table-column>
      <el-table-column prop="bookAuthor"
                       label="作者"
                       width="120">
      </el-table-column>
      <el-table-column prop="readerId"
                       label="读者编号"
                       width="100">
      </el-table-column>
      <el-table-column prop="readerName"
                       label="读者姓名"
                       width="100">
      </el-table-column>
      <el-table-column prop="lendDate"
                       label="借阅时间"
                       width="100">
      </el-table-column>
      <el-table-column prop="lendDay"
                       label="借阅天数"
                       width="100">
      </el-table-column>

      <el-table-column prop="lendMoney"
                       label="借阅金额/元"
                       width="100">
      </el-table-column>
      <el-table-column prop="totalcount"
                       label="距归还时间"
                       width="100">
        <template slot-scope="props">
          <span>{{yuqi(props.row.lendDate,props.row.lendDay) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lendTotalcount"
                       label="续借次数"
                       width="100">
      </el-table-column>

      <el-table-column label="操作"
                       width="150"
                       fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="success"
                     v-has="'lend-countUpdate'"
                     @click="onShowEdit (scope.row)">续借</el-button>

          <el-button size="mini"
                     type="success"
                     v-has="'lend-return'"
                     @click="returnBook(scope.row)">归还</el-button>

          <!-- <el-button size="mini"
                     @click="onShowEdit(scope.row,scope.$index)">编辑</el-button> -->
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
    <!-- 录入 ，编辑 -->
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible"
               width="55%"
               @close='onResetForm'>
      <el-form :model="lendbook"
               :inline="true"
               ref="bookInfoForm">

        <el-form-item label="isbn"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="isbn">
          <el-input v-model="lendbook.isbn"
                    :disabled='isDisabledBookInfo'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-circle-plus-outline"
                     size="small"
                     type="success"
                     @click="bookInfoQuery">查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning"
                     @click="onResetBookInfo"
                     size="small"
                     icon="el-icon-refresh-right">重置</el-button>
        </el-form-item>
        <el-form-item>

          <label ref="bookInfoTitle"
                 style="color: green;"></label>
        </el-form-item>
        <el-form-item label="图书名称"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="bookName">
          <el-input v-model="lendbook.bookName"
                    :disabled='isDisabledBookInfo'></el-input>
        </el-form-item>
        <el-form-item label="图书作者"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="bookAuthor">
          <el-input v-model="lendbook.bookAuthor"
                    :disabled='isDisabledBookInfo'></el-input>
        </el-form-item>

      </el-form>
      <el-form :model="lendbook"
               :inline="true"
               ref="readerInfoForm">
        <el-form-item label="读者编号"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerId">
          <el-input v-model="lendbook.readerId"
                    :disabled='isDisabledReaderInfo'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-circle-plus-outline"
                     size="small"
                     type="success"
                     @click="readerInfoQuery">查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning"
                     @click="onResetReaderInfo"
                     size="small"
                     icon="el-icon-refresh-right">重置</el-button>
        </el-form-item>
        <el-form-item>

          <label ref="readerTitle"
                 style="color: green;"></label>
        </el-form-item>
        <el-form-item label="
                      读者姓名"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="readerName">
          <el-input v-model="lendbook.readerName"
                    :disabled='isDisabledReaderInfo'></el-input>
        </el-form-item>
        <el-form-item label="借阅天数"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="lendDay">
          <el-select placeholder="请选择"
                     size="small"
                     prop="lendDay"
                     v-model="lendbook.lendDay"
                     @change="lendCountMoney">
            <el-option label="10天"
                       value='10'></el-option>
            <el-option label="30天"
                       value='20'></el-option>
            <el-option label="60天"
                       value='60'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借书金额"
                      :label-width="formLabelWidth"
                      class="lable_input"
                      prop="lendMoney">
          <el-input v-model="lendbook.lendMoney"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="onResetForm">取 消</el-button>
        <el-button type="primary"
                   @click="lendbookInsert">确 定</el-button>
      </div>
    </el-dialog>
    <!-- --------------------- -->
  </div>
</template>

<style lang="scss">
._lendbook {
  // 覆写el样式,调整输入框宽度 start
  .form_input {
    .el-form-item__content {
      width: 150px;
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
export default {
  name: 'lendbook',
  data () {
    return {
      title: '添加借阅信息',
      isDisabledBookInfo: false,
      isDisabledReaderInfo: false,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      selected: [],
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      pageInfo: '',
      formSearch: {
        bookName: '',
        isbn: '',
        readerId: ''
      },
      lendbook: {
        id: '',
        isbn: null,
        bookName: null,
        bookAuthor: null,
        readerId: null,
        readerName: null,
        lendDay: 10,
        lendMoney: 10
      }
    }
  },
  watch: {
    'formSearch.bookName' (val) {
      if (val === '') {
        this.getAll()
      }
    },
    'formSearch.isbn' (val) {
      if (val === '') {
        this.getAll()
      }
    },
    'formSearch.readerId' (val) {
      if (val === '') {
        this.getAll()
      }
    }

  },
  mounted () {
    this.getAll()
  },
  methods: {
    yuqi (date, day) {
      var d = (parseInt(date.split('-')[2]) + day) - parseInt(new Date().getDate())
      if (d < 0) {
        return '逾期'
      } else {
        return d
      }
    },
    insertShow () {
      this.title = '添加借阅信息'
      this.dialogFormVisible = true
    },
    lendCountMoney (val) {
      this.lendbook.lendMoney = val
    },
    onReset (val) {
      this.formSearch.lendState = ''
      this.$refs[val].resetFields()
      this.getAll()
    },
    onResetBookInfo () {
      this.$refs['bookInfoForm'].resetFields()
      this.$refs.bookInfoTitle.innerHTML = ''
      this.isDisabledBookInfo = false
      this.getAll()
    },
    onResetReaderInfo () {
      this.$refs['readerInfoForm'].resetFields()
      this.$refs.readerTitle.innerHTML = ''
      this.isDisabledReaderInfo = false
    },
    onResetForm () {
      this.onResetBookInfo()
      this.onResetReaderInfo()
      this.dialogFormVisible = false
    },
    returnBook (row) {
      this.lendbook = row
      // var _this = this
      this.$http
        .post('/admin/lendbook/returnBook', this.lendbook)
        .then((result) => {
          if (result.data.code === '200') {
            this.getAll()
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: 'success'
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
    },
    bookInfoQuery () {
      var _this = this
      var data = {
        isbn: this.lendbook.isbn
      }
      this.$http
        .post('/admin/bookInfo/getIsbn', this.$qs.stringify(data))
        .then((result) => {
          if (result.data.code === '200') {
            _this.isDisabledBookInfo = true // 禁用输入框
            _this.$refs.bookInfoTitle.style.color = 'green'
            _this.$refs.bookInfoTitle.innerHTML = '<i class="el-icon-check">通过信息验证!</i>'
            _this.lendbook.isbn = result.data.data.isbn
            _this.lendbook.bookName = result.data.data.bookName
            _this.lendbook.bookAuthor = result.data.data.bookAuthor
          } else {
            _this.$refs.bookInfoTitle.style.color = 'red'
            _this.$refs.bookInfoTitle.innerHTML = '<i class="el-icon-close">查无此书!</i>'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    readerInfoQuery () {
      var _this = this
      var data = {
        id: this.lendbook.readerId
      }
      this.$http
        .post('/admin/reader/getById', this.$qs.stringify(data))
        .then((result) => {
          if (result.data.code === '200') {
            _this.$refs.readerTitle.style.color = 'green'
            _this.$refs.readerTitle.innerHTML = '<i class="el-icon-check">通过信息验证!</i>'
            _this.isDisabledReaderInfo = true
            _this.lendbook.readerId = result.data.data.id
            console.log(result.data.data)
            _this.lendbook.readerName = result.data.data.readerName
          } else {
            _this.$refs.readerTitle.style.color = 'red'
            _this.$refs.readerTitle.innerHTML = '<i class="el-icon-close">查无此人!</i>'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    lendbookInsert () {
      if (this.title === '续借') {
        this.$confirm('确认续借', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const _this = this
          this.$http
            .post('/admin/lendbook/lendTotalcountUpdate', this.lendbook)
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
            message: '已取消续借'
          })
        })
      } else {
        if (this.isDisabledReaderInfo === true && this.isDisabledBookInfo === true) {
          this.$confirm('确认录入', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const _this = this
            this.$http
              .post('/admin/lendbook/lendBookInsert', this.lendbook)
              .then((result) => {
                if (result.data.code === '200') {
                  _this.getAll()
                  _this.onResetForm()
                  _this.dialogFormVisible = true
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
              message: '已取消录入'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '请重新查询'
          })
        }
      }
    },
    getAll () {
      var data = {
        lend: this.formSearch,
        pageVo: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      const _this = this
      this.$http
        .post('/admin/lendbook/getAll', data)
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
    onShowEdit (row) {
      this.title = '续借'
      this.dialogFormVisible = true
      this.lendbook.id = row.id.toString()
      this.lendbook.readerId = row.readerId.toString()
      this.lendbook.readerName = row.readerName.toString()
      this.lendbook.isbn = row.isbn.toString()
      this.lendbook.bookName = row.bookName.toString()
      this.lendbook.bookAuthor = row.bookAuthor.toString()
      this.isDisabledBookInfo = true
      this.isDisabledReaderInfo = true
    },

    lendStateChange (val) {
      this.formSearch.lendState = val
      this.getAll()
    },
    currentChange (val) {
      this.pageNum = val
      this.getAll()
    },
    sizeChange (val) {
      this.pageSize = val
      this.getAll()
    },
    // 批量删除数据
    lendBookDeletebatch () {
      if (this.selected.length === 0) {
        this.$message({
          message: '请至少选择一条数据',
          type: 'warning:'
        })
        return ''
      }
      var ids = this.selected.map(item => item.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$http
          .post('/admin/lendbook/lendBookBatchDelete', ids)
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
