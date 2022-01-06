<template>
  <div>
    <Header></Header>

    <div class="mblog">
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit', params: {recordId: record.id}}" >
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <h2> {{ record.title }}</h2>
      <h4> {{ record.conMoney }}</h4>
      <h4> {{ record.conTime }}</h4>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="record.remark"></div>

    </div>

  </div>
</template>

<script>
  import 'github-markdown-css'
  import Header from "../components/Header";

  export default {
    name: "BlogDetail.vue",
    components: {Header},
    data() {
      return {
        record: {
          id: "",
          title: "",
          conMoney:"",
          conTime: "",
          remark:"",
          crtTime:"",
          updTime:""
        },
        ownBlog: false
      }
    },
    created() {
      const recordId = this.$route.params.recordId
      const _this = this
      this.$axios.get('/record/' + recordId).then(res => {
        const record = res.data.data
        console.log(record)
        _this.record.id = record.id
        _this.record.title = record.title
        _this.record.conMoney = record.conMoney
        _this.record.conTime = record.conTime
        _this.record.remark = record.remark
        _this.record.crtTime = record.crtTime
        _this.record.updTime = record.updTime

        var MardownIt = require("markdown-it")
        var md = new MardownIt()

        var result = md.render(record.remark)
        _this.record.remark = result
        //_this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
        _this.ownBlog = true
      })
    }
  }
</script>

<style scoped>
  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }

</style>
