<template>
  <div class="mcontaner">
    <Header></Header>
    <Search></Search>
    <div class="block">

      <el-row :gutter="32">

        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>
      <div class="radio">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>
      <el-timeline :reverse="reverse">

        <el-timeline-item :timestamp="record.crtTime" placement="top" v-for="record in records"
        icon="el-icon-hot-water" color="rgb(96 178 217)">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {recordId: record.id}}">
                {{record.conMoney}}
              </router-link>
            </h4>
            <p>{{record.conMoney}}</p>
          </el-card>
        </el-timeline-item>

      </el-timeline>

      <el-pagination class="mpage"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page>
      </el-pagination>

    </div>

  </div>
</template>

<script>
  import Header from "../components/Header";
  import Search from "../components/Search";
  import BarChart from './TodoList/BarChart';
  import PieChart from './TodoList/PieChart';
  import RaddarChart from './TodoList/RaddarChart';
  import axios from "axios";


  export default {
    name: "Blogs.vue",
    components: {Header,Search,BarChart,PieChart,RaddarChart},
    data() {
      return {
        reverse: true,
        records: {},
        currentPage: 1,
        total: 0,
        pageSize: 5
      }
    },
    methods: {
      page(currentPage) {
        const _this = this
        _this.$axios.get("/recordsByPage?currentPage=" + currentPage).then(res => {
          console.log(res)
          _this.records = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size

        })
      }
    },
    created() {
      this.page(1)

    }
  }
</script>

<style scoped>

  .mpage {
    margin: 0 auto;
    text-align: center;
  }

</style>
