<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 存放的初始化数据
      chartInstane: null,
      // 从服务器上面获取到的所有数据
      allData: null,
    };
  },
  // 取消事件的监听
  destroyed() {
    // 使用removeEventListener取消
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 初始图表化实例对象
    initChart() {
      //赋值给chartInstane初始化对象值
      //注意要获取到dom元素根据设置的ref需要加$refs不然会报错
      this.chartInstane = this.$echarts.init(this.$refs.hot_ref);
      // 初始化图表的配置
      const initOption = {};
      // 吧初始化图表赋值给initOption
      this.chartInstane.setOption(initOption);
    },
    //  获取用户的数据
    async getData() {
      // 使用this.$http.get()获取后台的数据
      const { data: ret } = await this.$http.get("hotproduct");
      console.log(ret);
      // 对allData进行赋值
      this.allData = ret;
      // 调用更新图表的数据
      this.updateChart();
    },
    // 处理更新后图标的数据
    updateChart() {
      // 用来处理数据
      const dataOption = {};
      this.chartInstane.setOption(dataOption);
    },
    // 适配器大小的监听
    screenAdapter() {
      // 设置一个空的用来处理适配的方案
      const adapterOption = {};
      // 吧定义好的数据存放到adapterOption
      this.chartInstane.setOption(adapterOption);
    },
  },
  created() {},
  mounted() {
    // 调用初始化的图表数据
    this.initChart();
    // 在调用用户的数据
    this.getData();
    // 使用window监听适配
    window.addEventListener("resize", this.screenAdapter);
    // 主动触发屏幕大小的适配
    this.screenAdapter();
    // 完成屏幕适配需要再次调用
    this.chartInstane.resize();
  },
  components: {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>
