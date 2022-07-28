<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, // 服务器返回的数据
      currentPage: 1, // 当前显示的页数
      totalPage: 0, // 一共有多少页
      timerId: null, // 定时器的标识
    };
  },
  // 在组件创建完成之后 进行回调函数的注册
  created() {
    this.$socket.registerCallBack("sellerData", this.getData);
  },
  mounted() {
    this.initChart();
    this.$socket.send({
      action: "getData",
      socketType: "sellerData",
      chartName: "seller",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候自动识别图表分辨率
    this.screenAdapter();
  },
  destroyed() {
    clearInterval(this.timerId);
    // 组件销毁的时候需要将监听器取消掉
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unRegisterCallBack("sellerData");
  },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.seller_ref,
        this.theme
      );
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: "▎商家销售统计",
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          // 距离是包含坐标轴上的文字
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0,
            lineStyle: {
              color: "#2D3443",
            },
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#5052EE",
                },
                {
                  offset: 1,
                  color: "#AB6EE5",
                },
              ]),
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    // 图标表的地方
    getData(ret) {
      this.allData = ret;
      // 从小到大的排序
      this.allData.sort((a, b) => {
        return b.value - a.value;
      });
      // 每5个元素显示一页
      this.totalPage =
        this.allData.length % 5 === 0
          ? this.allData.length / 5
          : this.allData.length / 5 + 1;
      this.updateChart();
      // 启动定时器
      this.startInterval();
    },
    // 更新图表，数据的分离只保留了数据
    updateChart() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.allData.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      const dataOption = {
        yAxis: {
          data: sellerNames,
        },
        series: [
          {
            data: sellerValues,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    // 定时刷新图表的数据
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateChart();
      }, 3000);
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter() {
      const titleFontSize = (this.$refs.seller_ref.offsetWidth / 100) * 3.6;
      // 分辨率大小配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
  // 页面的主题发送到vuex初始化数据里面第二个数据就是this.theme
  computed: {
    ...mapState(["theme"]),
  },
  // 监听图表
  watch: {
    theme() {
      console.log("主题切换了");
      this.chartInstance.dispose(); // 销毁当前的图表
      this.initChart(); // 重新以最新的主题名称初始化图表对象
      this.screenAdapter(); // 完成屏幕的适配
      this.updateChart(); // 更新图表的展示
    },
  },
};
</script>

<style lang="less" scoped>
</style>
