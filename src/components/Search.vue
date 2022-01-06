<template>
  <div class="m-content">
    <div>
      <el-input class="inputValue"
              placeholder="请输入搜索关键词"
              v-model="inputValue"
              clearable
      @input="searchRec()">
      </el-input>
      <el-timeline-item :timestamp="record.crtTime" placement="top" v-for="record in searchRecords"
                        icon="el-icon-hot-water" color="rgb(96 178 217)">
        <el-card class="ser-content">
          <h4 class="content">
            <router-link :to="{name: 'BlogDetail', params: {recordId: record.id}}">
              {{record.title}}-{{record.conMoney}}
            </router-link>
          </h4 >
          <p class="content">{{record.remark|ellipsis}}</p>
        </el-card>
      </el-timeline-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        inputValue:"",
        searchRecords: {}
      }
    },
    filters:{
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 15) {
          return value.slice(0,15) + '...'
        }
        return value
      }
    },
    methods: {
      searchRec(){
        const searchWord = this.inputValue
        console.log(searchWord)
        this.$axios.post('/record/search',{searchWord:searchWord},{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then((res)=> {
          var list = res.data.data;
          console.log(list)
          this.searchRecords=list;
        })

      }
    },
    created() {

    }
  }
</script>

<style scoped>

  .m-content {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .inputValue{
    width: 300px;
  }
  .ser-content{
    text-align: left;
    height: 5rem;

  }
  .content{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 0.8rem;
  }

</style>
