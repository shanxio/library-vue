<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/readerInfo'}">读者信息管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/readerInfoInsert'}">读者信息录入</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    {{this.$route.params.msg}}
    <button @click="a">saf</button>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    console.log(this.$route.params.msg)
    this.msg = this.$route.params.msg
  },
  methods: {
    a () {
      alert(this.msg)
    }
  }

}
</script>
