<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../mixins/resize'
import axios from "axios";

const conType = []
const conTYpeAndNum = []
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.$axios.get('/typeList',{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then((res)=>{
        var list = res.data.data;
        for(var key in list){
          var sss={value:list[key],name:key}
          conType.push(key)
          conTYpeAndNum.push(sss)
        }
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            //data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
             data: conType
          },
          series: [
            {
              name: 'WEEKLY WRITE ARTICLES',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              // data: [
              //   { value: 320, name: 'Industries' },
              //   { value: 240, name: 'Technology' },
              //   { value: 149, name: 'Forex' },
              //   { value: 100, name: 'Gold' },
              //   { value: 59, name: 'Forecasts' }
              // ],
               data: conTYpeAndNum,
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      })

    }
  }
}
</script>
