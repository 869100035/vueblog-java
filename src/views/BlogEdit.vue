<template>
  <div>
    <Header></Header>

    <div class="m-content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类别" prop="conType">
          <el-select v-model="ruleForm.conType" class="el-select">
            <el-option value="">请选择</el-option>
            <el-option v-for="item in dataList" :value="item.typeCd" :label="item.typeName" :key="item.typeCd"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title" >
          <el-input v-model="ruleForm.title" class="el-input"></el-input>
        </el-form-item>

        <el-form-item label="金额" prop="conMoney" >
          <el-input-number v-model="ruleForm.conMoney" :precision="2" :step="1" :min="0.01" :max="1000000" controls-position="right" class="el-input"></el-input-number>
        </el-form-item>

        <el-form-item label="时间" prop="conTime" >
          <el-date-picker  v-model="ruleForm.conTime" class="el-input"
          type="date" value-format="yyyy-MM-dd" aria-placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="备注" prop="remark" >
          <el-input type="textarea" v-model="ruleForm.remark" class="el-input"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>

      </el-form>

    </div>


  </div>
</template>

<script>
  import Header from "../components/Header";
  import axios from "axios";
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
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          remark:[
            { trequired:true,message:'请输入备注',trigger:'blur'}
          ]
        },
        dataList: []
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            const _this = this
            this.$axios.post('/record/edit', this.ruleForm, {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            }).then(res => {
              _this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/blogs")
                }
              });

            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      arrowDown() {
        this.isShowSelect = !this.isShowSelect;
      },
      select(item, index) {
        this.isShowSelect = false;
        this.unitModel = index;
        this.unitName = item.value;
      },
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

      const recordId = this.$route.params.recordId
      console.log(recordId)
      const _this = this
      if(recordId) {
        this.$axios.get('/record/' + recordId).then(res => {
          const record = res.data.data
          _this.ruleForm = record
          _this.ruleForm.conMoney = record.conMoney
        })
      }

    }

  }

</script>

<style scoped>
  .m-content {
    text-align: center;
  }
 .el-select {
   width: 240px;
   margin-right: 50px;
 }
  .el-input {
    width: 240px;
    margin-right: 50px;
  }
</style>
