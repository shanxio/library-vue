<template>
  <!--login外框-->
  <div class="_login">
    <!--login内框-->
    <div class="login_inner">
      <el-form class="form"
               ref="form"
               :model="formLogin">
        <el-form-item>
          <h2 class="title">图书管理系统</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.loginName"
                    placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.password"
                    placeholder="密码"
                    type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="formLogin.captcha"
                    style="width:50%;float: left;"
                    placeholder="验证码"></el-input>
          <el-image style="height: 40px;width: 130px;"
                    :src="codeImg"
                    @click="getUrl"
                    ref="img"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="doLogin()">登陆</el-button>
          <div v-show="this.errorInfo.isShowError"
               class="error">{{this.errorInfo.text}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      codeImg: 'http://localhost:8080/captcha.jpg',
      formLogin: {
        loginName: 'zjx',
        password: '123456',
        captcha: ''
      },
      key: '',
      errorInfo: {
        text: '登陆失败,请重试',
        isShowError: false // 显示错误提示
      }
    }
  },
  mounted () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      this.codeImg = 'http://localhost:8080/captcha.jpg?' + Math.random()
    },
    doLogin () {
      var data = {
        captcha: this.formLogin.captcha,
        username: this.formLogin.loginName,
        password: this.formLogin.password
      }
      // 登陆成功跳转主页
      var _this = this

      this.$http.create({ withCredentials: true })
        .post('/userLogin', this.$qs.stringify(data))
        .then(response => {
          console.log(response.data.code)
          if (response.data.code === '200') {
            // 保存用户令牌
            sessionStorage.setItem('token', response.data.token)
            // 保存用户角色信息
            sessionStorage.setItem('roles', response.data.data)
            // 添加路由
            this.$store.dispatch('add_Routes', response.data.routers)
            // 生成菜单
            this.$store.dispatch('add_Menus', response.data.menus)
            // 保存用户登录名称
            sessionStorage.setItem('userName', response.data.name)
            // 保存按钮的信息
            this.$store.dispatch('add_Permissions', response.data.btns)
            _this.$router.replace({ path: '/index' })
            _this.$message({ type: 'success', message: '登录成功' })
          }
          if (response.data.code === '400') {
            _this.$message({ type: 'error', message: '用户名称或密码错误' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
._login {
  // border:1px solid red;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login_inner {
    // border:1px solid green;
    width: 460px;
    height: 350px;
    margin-top: -150px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 25px #cac6c6;
    .form {
      // border:1px solid blue;
      width: 300px;
      margin-top: 30px;
      text-align: center;
      .title {
        color: #505458;
      }
    }
    .error {
      color: red;
    }
  }
}
</style>
