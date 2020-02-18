<template>
  <div>
    <h1>欢迎登陆图书管理系统</h1>
    <el-tree :data="data"
             show-checkbox
             node-key="id"
             ref="tree"
             default-expand-all
             :default-checked-keys="[6,7]"
             :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'tree',
  data () {
    return {
      data: '2'
      // data: []
    }
  },
  // defaultProps: {
  //   children: 'children',
  //   label: 'label'
  // },
  mounted () {
    // var _this = this
    // this.$http
    //   .post('/admin/nodeInfo/tree', this.$qs.stringify({ roleId: 1 }))
    //   .then((result) => {
    //     _this.data = result.data
    //   })
  },
  methods: {
    // a () {
    //   var data = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
    //   alert(data)
    // }
  }
}
</script>
