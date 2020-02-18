<template class="_userInfoEdit">
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/bookInfo'}">图书管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/bookInfo'}">图书信息管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/bookInfoEdit'}">图书信息{{edit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <!-- 商品信息 start -->
    <div style="margin-left: 120px;margin-top: 50px;">
      <el-form :inline="true"
               :model="bookInfo"
               :rules="bookInfoRules"
               ref="bookInfoForm"
               class="demo-form-inline"
               @submit.native.prevent>

        <el-form-item label="isbn:"
                      prop="isbn"
                      :label-width="formLabelWidth">
          <el-input v-model="bookInfo.isbn"
                    placeholder="请输isbn码:"
                    size="small"
                    style="width: 300px;"
                    :disabled="isbnDisabled"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="图书名称:"
                      prop="bookName"
                      :label-width="formLabelWidth">
          <el-input v-model="bookInfo.bookName"
                    placeholder="请输入图书名称:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="作者:"
                      prop="bookAuthor"
                      :label-width="formLabelWidth">
          <el-input v-model="bookInfo.bookAuthor"
                    placeholder="请输入图书作者:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="出版社:"
                      prop="bookHouse"
                      :label-width="formLabelWidth">
          <el-input v-model="bookInfo.bookHouse"
                    placeholder="请输入出版社:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <br />

        <el-form-item label="价格:"
                      prop="bookPrice"
                      :label-width="formLabelWidth">
          <el-input v-model="bookInfo.bookPrice"
                    placeholder="请输入价格:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <br />

        <el-form-item label="库存数:"
                      prop="tmamount"
                      :label-width="formLabelWidth">
          <el-input v-model="bookInfo.tmamount"
                    placeholder="库存数:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="分类:"
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择"
                     size="small"
                     v-model="bookInfo.bookType">
            <el-option v-for="item in types"
                       :key="item.id"
                       :label="item.typeName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="状态:"
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择"
                     size="small"
                     prop="bookState"
                     v-model="bookInfo.bookState">
            <el-option label="入馆"
                       value='1'></el-option>
            <el-option label="出馆"
                       value='0'></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="出版日期:"
                      :label-width="formLabelWidth">
          <el-date-picker v-model="bookInfo.bookPublish"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="图书封面:"
                      :label-width="formLabelWidth">
          <el-upload class="upload-demo"
                     ref="uploadIcon"
                     action=""
                     :limit="1"
                     list-type="picture-card"
                     :auto-upload="false"
                     :on-preview="iconHandlePictureCardPreview"
                     :on-remove="iconHandleRemove"
                     :http-request='submitUpload'
                     :file-list="pic.iconImagelist"
                     :class="{disabled:iconUploadDisabled}"
                     :on-change="iconUploadChange"
                     :on-success='iconOnSuccess'
                     accept="image/jpeg,image/jpg,image/png">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-button style="margin-left: 10px;"
                     type="success"
                     icon="el-icon-check"
                     round
                     size="small"
                     @click="iconSubmitAssess()">上传到服务器</el-button>
          <!-- 大图查看 -->
          <el-dialog :visible.sync="pic.dialogVisible"
                     append-to-body>
            <img width="100%"
                 :src="pic.dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-form-item>
        <br />
        <el-form-item label="操作"
                      :label-width="formLabelWidth">
          <el-button type="success"
                     @click="userInfoInsert">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<style lang="scss">
.el-cascader-menu {
  overflow: hidden;
}
._userInfoEdit {
  // 覆写el样式,调整输入框宽度 start
  .form_input {
    .el-form-item__content {
      width: 160px;
    }
  }

  .lable_input {
    .el-form-item__content {
      width: 200px;
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
  data () {
    return {
      formLabelWidth: '130px',
      edit: '',
      typeId: '', // 分类选择id
      types: [],
      isbnDisabled: false,
      bookInfo: {
        id: '',
        isbn: '',
        bookName: '',
        bookAuthor: '',
        bookType: '',
        bookHouse: '',
        bookPublish: new Date(),
        bookPrice: '',
        tmamount: '',
        bookStock: '',
        bookState: '1',
        bookImage: '' // 上传图片地址
      },
      pic: {
        dialogImageUrl: '', // 大图查看路径
        dialogVisible: false, // 大图图查看弹出
        iconPath: '', // icon路径
        iconImagelist: []// 图片
      },
      bookInfoRules: {
      }

    }
  },
  mounted () {
    this.getType()
    this.edit = this.$route.params.edit

    if (this.edit === '修改') {
      this.bookInfo = Object.assign({}, this.$route.params.bookInfo)
      this.bookInfo.bookType = parseInt(this.$route.params.bookInfo.bookType)
      this.bookInfo.bookState = this.$route.params.bookInfo.bookState.toString()
      this.isbnDisabled = true
      // this.bookInfo = this.$route.params.bookInfo
      var userPhoto = this.$route.params.bookInfo.bookImage
      if (userPhoto != null) {
        this.pic.iconImagelist = [{ url: userPhoto }]// 赋值上传图片框
      }
    } else {
      this.isbnDisabled = false
    }
    console.log(this.edit)
  },
  methods: {
    getType () {
      this.$http
        .post('/admin/type/getAll')
        .then(response => {
          this.types = response.data
        })
        .catch(error => {
          console.log(error)
          // 弹出消息框
          this.$message({
            message: '服务器异常',
            type: 'error'
          })
        })
    },
    userInfoInsert () {
      if (this.edit === '修改') {
        this.$http
          .post('/admin/bookInfo/bookInfoUpdate', this.bookInfo)
          .then((result) => {
            console.log(result.data)
            if (result.data.code === '200') {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            } else {
              this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
      if (this.edit === '录入') {
        this.bookInfo.bookStock = this.bookInfo.tmamount
        this.$http
          .post('/admin/bookInfo/bookInfoInsert', this.bookInfo)
          .then(response => {
            if (response.data.code === '200') {
              // 弹出消息框
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
            }
          })
          .catch(error => {
            console.log(error)
            // 弹出消息框
            this.$message({
              message: '服务器异常',
              type: 'error'
            })
          })
      }
    },
    /* 上传 start */
    iconSubmitAssess () { // 点击上传至服务器
      if (this.pic.iconImagelist.length > 0) {
        // 图片上传
        this.$refs.uploadIcon.submit()
      } else {
        this.$message({
          message: '请选择上传图片',
          type: 'info'
        })
      }
    },
    iconHandlePictureCardPreview (file) { // 查看图片发生
      console.log('--------')
      this.pic.dialogImageUrl = file.url
      this.pic.dialogVisible = true
    },
    iconUploadChange (file, fileList) { // 添加图片发生的事件
      this.pic.iconImagelist = fileList
    },
    iconHandleRemove (file, fileList) { // 删除图片发生
      console.log(file, fileList)
      this.pic.iconImagelist = fileList
    },
    iconOnSuccess (filePath) { // 上传成功(文件上传成功的回调)
      this.bookInfo.bookImage = filePath

      console.log('上传成功之后的回调' + this.bookInfo.bookImage)
    },
    // 调用this.$refs.upload.submit()就会调用此方法
    submitUpload: function (content) { // 自定义的上传图片的方法（改变 <el-upload> 默认上传行为）
      // 1. 创建formData 利用AXIOS传递
      let formData = new FormData()
      formData.append('myFile', content.file)
      console.log(content.file)
      let config = {
        'Content-Type': 'multipart/form-data'
      }
      this.$http
        .post('/admin/file/upload', formData, config)
        .then(response => {
          console.log(response.data)
          if (response.data.code === '200') {
            // 上传成功,给logoPath赋个路径(回调上传成功)
            content.onSuccess(response.data.data)
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          }
        })
        .catch(error => {
          console.log(error)
          // 弹出消息框
          this.$message({
            message: '服务器异常',
            type: 'error'
          })
        })
    }

  },
  computed: {
    iconUploadDisabled: function () { // 是否显示bigPic上传的+号
      return this.pic.iconImagelist.length > 0
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none; /* 上传图片是否显示+ */
}
</style>
