<template class="_userInfoEdit">
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userInfo'}">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userInfo'}">员工信息管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/userInfoEdit'}">员工信息{{edit}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <!-- 商品信息 start -->
    <div style="margin-left: 120px;margin-top: 50px;">
      <el-form :inline="true"
               :model="userInfo"
               :rules="userRules"
               ref="userForm"
               class="demo-form-inline"
               @submit.native.prevent>

        <el-form-item label="登录名:"
                      prop="username"
                      :label-width="formLabelWidth">
          <el-input v-model="userInfo.username"
                    placeholder="请输入登录名:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="真实姓名:"
                      prop="realName"
                      :label-width="formLabelWidth">
          <el-input v-model="userInfo.realName"
                    placeholder="请输入真实姓名:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="身份证号:"
                      prop="userCard"
                      :label-width="formLabelWidth">
          <el-input v-model="userInfo.userCard"
                    placeholder="请输入真实身份证号:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="手机号码:"
                      prop="userPhone"
                      :label-width="formLabelWidth">
          <el-input v-model="userInfo.userPhone"
                    placeholder="请输入手机号码:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <br />
        <el-form-item label="登陆密码:"
                      prop="userPhone"
                      :label-width="formLabelWidth"
                      v-if="this.edit==='录入'?true:false">
          <el-input v-model="userInfo.password"
                    placeholder="请输入登录密码:"
                    size="small"
                    style="width: 300px;"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="角色:"
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择"
                     size="small"
                     prop=""
                     v-model="role"
                     multiple>
            <el-option v-for="item in roles"
                       :key="item.roleId"
                       :label="item.roleName"
                       :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="性别:"
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择"
                     size="small"
                     prop="userSex"
                     v-model="userInfo.userSex">
            <el-option label="男"
                       value='男'></el-option>
            <el-option label="女"
                       value='女'></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="入职日期:"
                      :label-width="formLabelWidth">
          <el-date-picker v-model="userInfo.userEntrydate"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="是否禁用:"
                      :label-width="formLabelWidth">

          <el-switch v-model="userInfo.enabled"
                     active-color="#dcdfe6"
                     inactive-color="#409eff"
                     :active-value="0"
                     :inactive-value="1">
          </el-switch>
        </el-form-item>
        <br />
        <el-form-item label="用户照片:"
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
        <el-form-item label="地址"
                      prop="address"
                      :label-width="formLabelWidth">
          <el-cascader :props="prop"
                       ref="cascaderAddr"
                       size="small"
                       v-model="address"
                       @change="handleAddressFun"></el-cascader>
        </el-form-item>
        <br />
        <el-form-item label="详细地址:"
                      prop="userFulladdress"
                      class="my-el-form-item"
                      :label-width="formLabelWidth">
          <el-input maxlength="50"
                    show-word-limit
                    :autosize="{ minRows: 2, maxRows: 5}"
                    type="textarea"
                    v-model="userInfo.userFulladdress"
                    style="width: 350px;"></el-input>
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
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      formLabelWidth: '130px',
      edit: '',
      role: [], // 设定默认值
      roles: [],
      address: [], // 设定默认值
      userInfo: {
        ids: [],
        userId: '',
        userCard: '',
        username: '',
        realName: '',
        userSex: '',
        userPhone: '',
        password: '',
        userEntrydate: new Date(),
        userAddress: '',
        userFulladdress: '',
        userPhoto: '', // 上传图片地址
        enabled: '0' // 是否禁用
      },
      userInfoEdit: {},
      pic: {
        dialogImageUrl: '', // 大图查看路径
        dialogVisible: false, // 大图图查看弹出
        iconPath: '', // icon路径
        iconImagelist: []// 图片
      },
      userRules: {
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
  mounted () {
    this.edit = this.$route.params.edit
    this.getRoles()
    if (this.edit === '修改') {
      // // -------赋值
      // var userInfoEdit = this.$route.params.userInfo
      // this.userId = userInfoEdit.userId
      // this.userCard = userInfoEdit.userCard
      // this.username = this.$route.params.userInfo.username

      // this.realName = userInfoEdit.realName
      // this.userSex = userInfoEdit.userSex
      // this.userPhone = userInfoEdit.userPhone
      // this.userEntrydate = userInfoEdit.userEntrydate
      // this.userFulladdress = userInfoEdit.userFulladdress
      this.userInfo = this.$route.params.userInfo
      // -------------------------角色赋值
      var roleId = this.$route.params.userInfo.roleId.split(',')
      let dataIntArr = []// 保存转换后的整型字符串
      roleId.forEach(item => {
        dataIntArr.push(+item)
      })
      this.role = dataIntArr
      // -------------------------
      this.address = this.$route.params.userInfo.userAddress.split('-')
      console.log('图片底子' + this.$route.params.userInfo.userPhoto)
      var userPhoto = this.$route.params.userInfo.userPhoto
      if (userPhoto != null) {
        this.pic.iconImagelist = [{ url: userPhoto }]// 赋值上传图片框
      }
      // ------------------------------
      this.userInfo.enabled = this.$route.params.userInfo.enabled === true ? 1 : 0
    }
    console.log(this.edit)
  },
  methods: {
    userInfoInsert () {
      // console.log(JSON.stringify(this.userInfo.ids))
      // if (this.address === '') {
      //   this.address = this.$refs['cascaderAddr'].inputValue.trim().split('/').join('-')
      // }
      console.log(this.userInfo.enabled)

      console.log('--------------')
      console.log(this.userInfo)
      if (this.edit === '修改') {
        this.userInfo.ids = this.role
        console.log(this.userInfo.ids)
        this.$http
          .post('/admin/user/userInfoUpdate', this.userInfo)
          .then(response => {
            if (response.data.code === '200') {
              // 弹出消息框
              this.$message({
                message: '添加成功',
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
      if (this.edit === '录入') {
        this.userInfo.ids = this.role
        this.$http
          .post('/admin/user/userInfoInsert', this.userInfo)
          .then(response => {
            if (response.data.code === '200') {
              // 弹出消息框
              this.$message({
                message: '添加成功',
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
    getRoles () {
      this.$http
        .post('/admin/role/getRoles')
        .then(response => {
          this.roles = response.data
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
      this.userInfo.userPhoto = filePath
      console.log('上传成功之后的回调' + this.userInfo.userPhoto)
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
    },
    handleAddressFun: function (val) {
      this.userInfo.userAddress = val.toString().split(',').join('-')
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
