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
                    label=""
                    prop="isbn">
        <el-input v-model="formSearch.isbn"
                  placeholder="请输入isbn码"
                  clearable
                  size="medium"></el-input>
      </el-form-item>
      <el-form-item class="form_input"
                    label=""
                    prop="bookName">
        <el-input v-model="formSearch.bookName"
                  placeholder="请输入图书名称"
                  clearable
                  size="medium"></el-input>
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
        <el-button icon="el-icon-delete"
                   size="small"
                   v-has="'lend-BatchReturn'"
                   @click="returnBatchBook">批量归还</el-button>
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

      <el-table-column label="当前时间"
                       width="100">
        {{dateFormat("YYYY-mm-dd",new Date())}}
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
      <el-table-column prop="lendTotalcount"
                       label="续借次数"
                       width="100">
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
    }

  },
  mounted () {
    this.getAll()
  },
  methods: {
    dateFormat (fmt, date) {
      let ret
      let opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
      };
      return fmt
    },
    onReset (val) {
      this.formSearch.lendState = ''
      this.$refs[val].resetFields()
      this.getAll()
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
        .post('/admin/lendbook/getNoReturn', data)
        .then((result) => {
          _this.tableData = result.data.list
          console.log(result.data)
          _this.pageInfo = result.data
        })
        .catch(error => {
          console.log(error)
        })
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
    returnBatchBook () {
      if (this.selected.length === 0) {
        this.$message({
          message: '请至少选择一条数据',
          type: 'warning:'
        })
        return ''
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$http
          .post('/admin/lendbook/returnBatchBook', this.selected)
          .then((result) => {
            if (result.data.code === '200') {
              _this.getAll()
              this.$message({
                type: 'success',
                message: '归还成功!'
              })
            } else {
              this.$message({
                showClose: true,
                message: '归还失败',
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
          message: '已取消归还'
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
