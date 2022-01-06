<template xmlns="http://www.w3.org/1999/html">
  <div>
    <Header></Header>
    <el-divider></el-divider>
    <div class="content-wrapper">
       <div class="button-list">
         <el-button @click.stop="handleShowDialog(0)" type="primary" size="medium" icon="el-icon-plus" >添加类别</el-button>
         <el-button @click.stop="handleEditStreet" type="primary" size="medium" icon="el-icon-edit" >编辑</el-button>
         <el-button @click="handleSaveStreet" type="primary" size="medium" icon="el-icon-setting" >保存</el-button>
       </div>
       <el-divider></el-divider>
       <div class="street-wrapper">
         <template v-for="(item, index) in dataList">
           <el-button class="el-button" v-if="!isEditStreet" round :key="index" >{{item.typeName}}</el-button>
           <el-input v-else-if="isEditStreet" :key="index" v-model="item.typeName"
                     style="width:300px;margin-right:5px;margin-bottom:5px;">
             <i slot="append" @click="delConType(index)" class="remove el-icon-remove"></i>
           </el-input>
         </template>
       </div>
     </div>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%">
<!--              :before-close="handleClose">-->
          <span>将同时删除该类别记录</span>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delConTypeExcute()">确 定</el-button>
  </span>
      </el-dialog>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import axios from "axios";
  import {param} from "../utils";
  export default {
    name: "BlogEdit.vue",
    components: {Header},
    data() {
      return {
        ruleForm: {
          id: '',
          title: '',
          conMoney: '',
          remark:'',
          conType:'',
          conTime:''
        },
        rules: {
        },
        dataList: [],
        listSubmit: true, // 类型名校验标志
        isAddStreet: true, // true表示是添加街道数据，false表示添加的是社区工作站的数据
        streetNameOrCommunityName: '', // 添加的时候用于保存街道的名称获取社区工作站的名称
        isEditStreet: false, // 编辑街道
        dialogVisible:false,
        delIndex:''
      };
    },
    methods: {

      handleShowDialog (flag) {
        this.dataList.push({})
        this.isEditStreet = true
       }
    ,
      updateConType () {
        this.dataList.forEach(conType => {
          console.log(conType)
        })

    },
    //删除执行
    delConTypeExcute(){
        console.log("执行删除"+this.delIndex)
        this.dataList.splice(this.delIndex,1)
        this.delIndex=''
        this.dialogVisible=false
        console.log(this.dataList)
    },
    //删除当前类别弹窗
    delConType(conIndex){
        this.dialogVisible=true;
        this.delIndex=conIndex;
        console.log("添加到全局"+this.delIndex)
    },
    handleBeforeClose (done) {
      this.dialogVisible = false
      done()
    },
    handleEditStreet () {
      this.isEditStreet = true
    },
    handleSaveStreet () {
      this.dataList.forEach(conType => {
        const typeName = conType.typeName
        if (typeName == null || typeName == '' || typeName == undefined){
          this.listSubmit = false;
          return;
        }
      })
      if (!this.listSubmit){
          console.log(this.dataList)
        this.$message.error("存在类型名为空");
          this.listSubmit = true;//重新设置为可提交状态
        return false;
      }
      this.$axios.post('/updConType',this.dataList,{
              headers: {
                  "Authorization": localStorage.getItem("token")
              }
          }
      ).then(res => {
          this.$router.go(0)
      })

    },
    enterSystem () {
      this.$router.push('/dashboard')
    }
    },
    created() {
      axios.get('/conTypeList',{
          headers: {
              "Authorization": localStorage.getItem("token")
          }
      }).then((res)=>{
        var typeMap = res.data.data;
        for (var typeCd in typeMap){
        _this.dataList.push({typeCd: typeCd, typeName: typeMap[typeCd]})
       }
      })

      const blogId = this.$route.params.blogId
      console.log(blogId)
      const _this = this
      if(blogId) {
        this.$axios.get('/blog/' + blogId).then(res => {
          const blog = res.data.data
          _this.ruleForm.id = blog.id
          _this.ruleForm.title = blog.title
          _this.ruleForm.description = blog.description
          _this.ruleForm.content = blog.content
        })
      }

    }

  }

</script>

<style scoped>
  .el-button{
    margin-top: 3px;
    margin-left: 10px;
  }
  .content-wrapper{
    text-align: center;
  }
  .remove{
    color: red;
  }
</style>
