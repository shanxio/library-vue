<template>
  <div class="_tablepage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form :inline="true"
             :model="formSearch"
             ref="formSearch"
             class="demo-form-inline"
             label-width="68px">

      <!-- <el-form-item label="批量操作">
        <el-select v-model="batch"
                   placeholder="状态">
          <el-option label="批量删除"
                     :value='0'></el-option>
          <el-option label="批量增加"
                     :value='1'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">操作</el-button>

      </el-form-item> -->
      <br>
      <el-form-item class="form_input"
                    label="图书名称"
                    prop="bookName">
        <el-input v-model="formSearch.bookName"
                  placeholder="请输入图书名称"
                  clearable></el-input>
      </el-form-item>
      <el-form-item class="form_date"
                    label="出版时间"
                    prop="createDate">
        <el-date-picker v-model="createDate"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSearch">查询</el-button>
        <el-button type="warning"
                   @click="onReset"
                   plain>重置</el-button>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button icon="el-icon-circle-plus-outline"
                   size="small"
                   v-has="'book-insert'"
                   @click="bookInfoInsert">录入</el-button>
        <el-button icon="el-icon-download"
                   v-has="'book-download'"
                   size="small"
                   @click="download">下载</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              style="width: 100%"
              max-height="400">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="图书封面">
              <div class="block">
                <el-image :src="props.row.bookImage"
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
            <el-form-item label="编号:">
              <span>{{ props.row.id}}</span>
            </el-form-item>
            <br>
            <el-form-item label="isbn:">
              <span>{{ props.row.id}}</span>
            </el-form-item>
            <br>
            <el-form-item label="图书名称:">
              <span>{{ props.row.bookName}}</span>
            </el-form-item>
            <br>
            <el-form-item label="作者:">
              <span>{{ props.row.bookAuthor}}</span>
            </el-form-item>
            <br>
            <el-form-item label="价格:">
              <span>{{ props.row.bookPrice}}</span>
            </el-form-item>
            <br>
            <el-form-item label="总价格:">
              <span>{{ props.row.bookPrice*props.row.tmamount}}</span>
            </el-form-item>
            <br>
            <el-form-item label="库存册数:">
              <span>{{ props.row.tmamount}}</span>
            </el-form-item>
            <br>
            <el-form-item label="现存册数:">
              <span>{{ props.row.bookStock}}</span>
            </el-form-item>
            <br>
            <el-form-item label="状态:">
              <span>{{ props.row.bookState==1?'入馆':'入馆'}}</span>
            </el-form-item>
            <br>
            <el-form-item label="图书类型:">
              <span>{{ props.row.typeName}}</span>
            </el-form-item>
            <br>
            <el-form-item label="出版日期:">
              <span>{{ props.row.bookPublish}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="isbn"
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

      <el-table-column prop="typeName"
                       label="图书类型"
                       width="120">
      </el-table-column>
      <el-table-column prop="tmamount"
                       label="库存册数"
                       width="100">
      </el-table-column>
      <el-table-column prop="bookStock"
                       label="现存册数"
                       width="100">
      </el-table-column>
      <el-table-column prop="bookState"
                       label="状态"
                       width="120"
                       :formatter="format_gender">
      </el-table-column>
      <el-table-column label="操作"
                       width="300">
        <template slot-scope="scope">
          <el-button size="mini"
                     v-has="'book-update'"
                     @click="onShowEdit(scope.row,scope.$index)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     v-has="'book-delete'"
                     @click="handleDelete(scope.row.isbn)">删除</el-button>
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
._tablepage {
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
  name: 'bookInfo',

  data () {
    return {
      batch: 0,
      show: false,
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      pageInfo: '',
      createDate: '',
      formSearch: {
        bookName: '',
        bookAuthor: '',
        bookType: '',
        bookStock: '',
        bookState: '',
        startDate: null, // 开始时间
        endDate: null
      },
      formEdit: {
        id: '',
        isbn: '',
        bookName: '',
        bookAuthor: '',
        bookType: '',
        bookPublish: '',
        bookPrice: '',
        tmamount: '',
        bookStock: '',
        bookState: ''
      },
      formEditRules: {
      }
    }
  },
  watch: {
    'formSearch.bookName' (val) {
      if (val === '') {
        this.getAll()
      }
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    // 录入用户信息
    bookInfoInsert () {
      this.$router.push({ name: 'bookInfoEdit', params: { edit: '录入', userInfo: '' } })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    getAll () {
      var data = {
        bookInfo: this.formSearch,
        pageVo: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      const _this = this
      this.$http
        .post('/admin/bookInfo/getAll', data)
        .then((result) => {
          _this.tableData = result.data.list
          _this.pageInfo = result.data
          console.log(result.data.navigatepageNums)
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
    handleDelete (val) {
      console.log(val)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$http
          .get('/admin/bookInfo/bookInfoDeleteById?isbn=' + val)
          .then((result) => {
            console.log(result.data)
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
    format_gender (row, column) {
      var gender = row[column.property]
      if (gender === 1) {
        return '入馆'
      } else if (gender === 0) {
        return '出馆'
      } else {
        return ''
      }
    },
    onShowEdit (row, column) {
      this.$router.push({ name: 'bookInfoEdit', params: { edit: '修改', bookInfo: row } })
      // this.formEdit = Object.assign({}, rowData)
    },
    onReset () {
      this.$refs['formSearch'].resetFields()
      this.formSearch.startDate = null
      this.formSearch.endDate = null
      this.getAll()
      // 重置
    },
    onSearch () {
      if (this.createDate !== '') {
        this.formSearch.startDate = this.createDate[0]
        this.formSearch.endDate = this.createDate[1]
      }
      this.getAll()
    },
    download () {
      this.$http.post('/admin/bookInfo/download', {}, { responseType: 'blob' })// 设置响应数据类型
        .then(res => {
          if (res.status === 200) {
            // 获取后台的文件名
            var filename = res.headers['content-disposition'].split(',')[0].split(';')[1].split('=')[1]
            // var filename = '123'
            let url = window.URL.createObjectURL(new Blob([res.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', filename) // 自定义下载文件名（如exemple.txt）
            document.body.appendChild(link)
            link.click()
          }
        })
    }

  }
}
</script>
