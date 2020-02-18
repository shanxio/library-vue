<template>
  <div class="_log">
    <el-table :data="tableData"
              @selection-change="selectionChange"
              ref="multipleTable"
              style="width: 100%"
              max-height="400">
      <el-table-column type="selection"
                       fixed="left"
                       v-has="'reader-batchDelete'">
      </el-table-column>
      <el-table-column prop="id"
                       label="日志编号">
      </el-table-column>
      <el-table-column prop="realName"
                       label="操作人员">
      </el-table-column>
      <el-table-column prop="operatetype"
                       label="操作类型">
      </el-table-column>
      <el-table-column prop="operatetime"
                       label="操作时间"
                       width="160px">
      </el-table-column>
      <el-table-column prop="totalTime"
                       label="操作用时/毫秒">
      </el-table-column>
      <el-table-column prop="logcontent"
                       label="日志内容"
                       width="380px">
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
      selected: [], // 所有选中的行的值
      tableData: [], // 表格数据
      pageInfo: '', // 表格分页数据
      pageVo: {
        pageNum: 1,
        pageSize: 5
      },
      formSearch: {
      }
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      const _this = this
      this.$http
        .post('/admin/log/getAll', this.pageVo)
        .then((result) => {
          _this.tableData = result.data.list
          console.log(result.data)
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
