import * as echarts from 'echarts';

export default defineNuxtPlugin(({ vueApp }) => {
  // console.log('app', app);
  vueApp.use(echarts);
})
