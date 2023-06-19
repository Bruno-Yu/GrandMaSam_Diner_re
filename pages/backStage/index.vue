<template>
  <main>
    <div>
      <h2 class="text-5xl font-bold pt-5 pb-8 underline decoration-4 decoration-amber-400/80">後臺儀錶板</h2>

      <!-- 逐月收入表 & 累積收入表-->
      <div ref="revenueChart" class="revenueChartDom h-[500px]">
        <loading :active="isRevenueChartLoading"
        :can-cancel="false"
        :on-cancel="onCancel"
        :is-full-page="false"/>
      </div>
    </div>
    <div class="grid grid-cols-3">
  <!-- 使用者購買排名 ( 累積 )  -->
  <div>    
    <section
      class="rounded-md p-2 text-center shadow-lg md:text-left h-[330px] overflow-y-scroll"
      >
      <div class="max-w-3xl border min-h-[310px]">
      <!-- 單張卡片 -->
        <template v-for="(client, index)  in clientSalesData"  :key="index" >
          <div
            class="m-4 block rounded-lg bg-white p-6 shadow border dark:bg-neutral-800 dark:shadow-black/20" >
            <!--Testimonial-->
            <div class="md:flex md:flex-row">
              <div
                class="mx-auto mb-6 flex items-center justify-center md:mx-0 w-12 lg:mb-0">
                  <i class="bi bi-person-circle block text-4xl mb-5"></i>
              </div>
              <div class="md:ml-6 flex justify-between gap-6 w-full">
                <div>
                  <p
                    class="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                    {{ client.userName }}
                  </p>
                  <p
                    class="mb-0 font-semibold text-neutral-500 dark:text-neutral-400">
                    No. {{ index + 1 }}
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex flex-col items-center rounded-full border h-20 w-20 pt-1.5">
                    <p class="text-sm font-bold mb-2 text-center"> All <br> Amount</p>
                    <p class="text-xs">{{ client.total }}</p>
                  </div>
                  <div class="flex flex-col items-center  rounded-full border h-20 w-20 pt-1.5">
                    <p class="text-sm font-bold  mb-2 text-center"> This <br> Month</p>
                    <p class="text-xs">{{ client.thisMonthSalesData }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        </div>
      </section>
  </div>
  <!-- 每月各類別計量圓餅圖 -->
    <div class="col-span-2">
      <!-- <div class="categoriesChart"></div> -->
      <div class="stackChart h-[400px] w-[700px]" ></div>
    </div>
</div>

    <!-- 產品種類購買排名 ( 累積 ) -->
    <!-- <info-modal class="infoModal" ref="infoModal" :content="messageContent" @delete-product="deleteAdminShown"
      @hide-modal="hideInfoModal" /> -->
      <!-- 各產品類別佔總收入圓餅圖 -->
      <!-- 依據 email 計算個人所下訂的金額，計算單月以及累積 -->

  </main>
</template>

<script setup>
import atrApi from '@/assets/js/api/atrApi.js';
import { useApiModal } from '~~/composables/useApiModal';
import dayjs from 'dayjs/esm/index.js';
// import { useLoading } from 'vue-loading-overlay'
// import useStore from '@/store';
// import { storeToRefs } from 'pinia';
import * as echarts from 'echarts';

definePageMeta({
  layout: 'back-layout'
});

// const { userStore } = useStore()
const revenueChartDom = ref(null);
// loading
const isRevenueChartLoading = ref(false);

// 受限於 api 原先設計，因而這邊取值會需要打較多次 api 

const orders = ref([]);
// const hasNext = true;
let page = 1;
const currentYear = ref(dayjs().format('YYYY'));
const preYear = ref((Number(currentYear) - 1).toString());
const currentYearMonthlyData = ref([0]);
const currentYearCumulativeData = ref([]);
const preYearMonthlyData = ref([0]);
const preYearCumulativeData = ref([]);

// revenue chart's option
function setOption(currentYearCumulativeData, currentYearMonthlyData) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        },
      }
    },
    // toolbox: {
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    legend: {
      data: ['每月營業額', '累積營業額']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '累積營業額',
        min: 0,
        axisLabel: {
          formatter: '{value} TWD'
        }
      },
      {
        type: 'value',
        name: '每月營業額',
        min: 0,
        axisLabel: {
          formatter: '{value} TWD'
        }
      }
    ],
    series: [
      {
        name: '累積營業額',
        type: 'bar',
        color: ['rgb(251 191 36)'],
        tooltip: {
          valueFormatter: function (value) {
            return value + 'TWD';
          }
        },
        data: currentYearCumulativeData
      },
      {
        name: '每月營業額',
        type: 'line',
        yAxisIndex: 1,
        color: ['rgb(55 48 163)'],
        tooltip: {
          valueFormatter: function (value) {
            return value + 'TWD';
          }
        },
        data: currentYearMonthlyData
      }
    ]
  }
}

const { catchErrorToast } = useApiModal();




function getMonthlyRevenue(data) {
  for (let i = 0; i < 12; i++) {
    currentYearMonthlyData.value[i] = 0;
    preYearMonthlyData.value[i] = 0
    // i 代表月份
    // 尋找 data 中與該月份&該年相同的部分，並做該月份資料的累加
    data.forEach(item => {
      if (((Number(item.month) - 1) === i) && item.isCurrentYear) {
        currentYearMonthlyData.value[i] += item.total;
      } else if (((Number(item.month) - 1) === i) && !item.isCurrentYear) {
        preYearMonthlyData.value[i] += item.total;
      }
    })
    // 若 data 中無該月份或是年的資料，則帶入 0
    currentYearMonthlyData.value[i] = currentYearMonthlyData.value[i] ? currentYearMonthlyData.value[i] : 0;
    preYearMonthlyData.value[i] = preYearMonthlyData.value[i] ? preYearMonthlyData.value[i] : 0;
  }
}

function getCumulativeRevenue(monthlyArr, isThisYear) {
  // console.log('monthlyArr', monthlyArr)
  const sortedArr = [Number(monthlyArr[0])];
  let limit
  if (isThisYear) {
    limit = Number(dayjs().format('MM'));
  } else {
    limit = 12
  }
  for (let i = 1; i < limit; i++) {
    sortedArr[i] = Number(sortedArr[i - 1]) + Number(monthlyArr[i])
  }
  while (limit < 12) {
    sortedArr.push(0);
    limit++
  }
  return sortedArr;
}


// 產生圖表

function generateChartData() {
  const revenueChart = echarts.init(document.querySelector('.revenueChartDom'), null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

  if (currentYearCumulativeData.value.length && currentYearMonthlyData.value.length) {
    const option = setOption(currentYearCumulativeData.value, currentYearMonthlyData.value)
    revenueChart.setOption(option);
  }

  window.onresize = function () {
    revenueChart.resize();
  };
}

async function getAllOrders() {
  // 年份取兩年

  const params = { page };
  isRevenueChartLoading.value = true;
  const res = await atrApi.getAdminOrders(params);
  if (res.success) {
    const sortedOrders = JSON.parse(JSON.stringify(res.orders)).filter(item => item.is_paid && (dayjs(item.paid_date * 1000).format('YYYY') === currentYear.value || dayjs(item.paid_date * 1000).format('YYYY') === preYear.value)).map(item => ({ id: item.id, year: dayjs(item.paid_date * 1000).format('YYYY'), month: dayjs(item.paid_date * 1000).format('MM'), isCurrentYear: dayjs(item.paid_date * 1000).format('YYYY') === currentYear.value, products: item.products, total: item.total, userName: item.user.name }));
    orders.value = [...orders.value, ...sortedOrders];
    const pagination = JSON.parse(JSON.stringify(res.pagination))
    if (pagination.has_next) {
      page = page + 1;
      getAllOrders();
    } else {
      isRevenueChartLoading.value = false;
      // 取完後先將 raw data 存在 localStorage 中，避免需多次 打api 浪費效能
      localStorage.setItem('rawOrderData', JSON.stringify(orders.value));
      // 取完 原始值後進行處理
      //  分年，分月份將每個月個別銷售，以及累積銷售算出
      getMonthlyRevenue(orders.value);

      currentYearCumulativeData.value = getCumulativeRevenue(currentYearMonthlyData.value, true)
      preYearCumulativeData.value = getCumulativeRevenue(preYearMonthlyData.value, false)

      generateChartData();
    }
  } else {
    isRevenueChartLoading.value = false;
    catchErrorToast(res.response.data.message)
  }
}

const clientSalesData = ref([]);
// 整理 今年 & 去年 個別使用者的當月購買量 & 累積購買量
function getClientSalesData() {
  if (orders.value && orders.value?.length) {
    // 當月
    let thisMonth = dayjs().format('MM');
    let allUsersList = ([...new Set(orders.value.map(item => item.userName))]);
    clientSalesData.value = allUsersList.map(item => ({ userName: item, total: 0, isCurrentYear: true, thisMonth, thisMonthSalesData: 0 }));
    // 以使用者區分
    orders.value.forEach((item, index) => {
      // item.userName
      clientSalesData.value.forEach((client) => {
        if (client.userName === item.userName && client.isCurrentYear === item.isCurrentYear) {
          client.total += item.total;
          if (client.thisMonth === item.month) {
            client.thisMonthSalesData += item.total;
          }
        }
      })
    })
    clientSalesData.value.sort((a, b) => b.total - a.total)
  }
}

const categoriesChart = ref(null);

// 不同 categories 產品銷收比例 今年累計與 全部累計
function getCategories() {
  if (orders.value && orders.value?.length) {
    console.log('orders.value', orders.value);

  }
}

function setPieChartOption() {
  return {
    title: {
      text: 'Nightingale Chart',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: [
        'rose1',
        'rose2',
        'rose3',
        'rose4',
        'rose5',
        'rose6',
        'rose7',
        'rose8'
      ]
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Radius Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['25%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 33, name: 'rose 2' },
          { value: 28, name: 'rose 3' },
          { value: 22, name: 'rose 4' },
          { value: 20, name: 'rose 5' },
          { value: 15, name: 'rose 6' },
          { value: 12, name: 'rose 7' },
          { value: 10, name: 'rose 8' }
        ]
      },
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: [
          { value: 30, name: 'rose 1' },
          { value: 28, name: 'rose 2' },
          { value: 26, name: 'rose 3' },
          { value: 24, name: 'rose 4' },
          { value: 22, name: 'rose 5' },
          { value: 20, name: 'rose 6' },
          { value: 18, name: 'rose 7' },
          { value: 16, name: 'rose 8' }
        ]
      }
    ]
  }
}

//   loading 設置
// const $loading = useLoading({
//   // options
// })

// const params = {
//   color: '#000000',
//   loader: 'spinner',
//   width: 64,
//   height: 64,
//   backgroundColor: '#ffffff',
//   opacity: 0.5,
//   zIndex: 999,
//   container: null
// }
// const loader = ref(null)

// function loaderShow() {
//   loader.value = $loading.show(params)
// }
// function loaderHide() {
//   loader.value.hide()
// }

/////////////////////////////////////


// var data = [];
// var startTime = 0;
// var categories = ['companyC', 'companyB', 'companyA'];
// var types = [
//   { name: 'category_1', color: '#7b9ce1' },
//   { name: 'category_2', color: '#bd6d6c' },
//   { name: 'category_3', color: '#75d874' },
//   { name: 'category_4', color: '#e0bc78' },
//   { name: 'category_5', color: '#dc77dc' },
//   { name: 'category_6', color: '#72b362' }
// ];

// var heightList = [10, 10, 40];
// var step = 14399285;
// // Generate mock data
// categories.forEach(function (category, index) {
//   var baseTime = startTime;
//   for (var i = 0; i < 6; i++) {
//     var typeItem = types[i];
//     var duration = Math.round(Math.random() * 100);
//     console.log(index, baseTime, (baseTime += duration), duration)
//     data.push({
//       name: typeItem.name,
//       value: [index, baseTime, (baseTime += duration), duration],
//       itemStyle: {
//         normal: {
//           color: typeItem.color
//         }
//       }
//     });
//     baseTime += Math.round(Math.random() * 20);
//   }
// });
// function renderItem(params, api) {
//   console.log('params', params);
//   console.log('api', api)
//   console.log('api.value(0)', api.value(0));
//   console.log('api.value(1)', api.value(1));
//   console.log('api.value(2)', api.value(2));
//   console.log('api.value(3)', api.value(3));
//   console.log('api.value(4)', api.value(4));
//   console.log('api.coord([api.value(0),api.value(0)]);', api.coord([api.value(0), api.value(0)]));
//   console.log('api.coord([api.value(0),api.value(1)])', api.coord([api.value(0), api.value(1)]));
//   console.log('api.coord([api.value(0),api.value(2)])', api.coord([api.value(0), api.value(2)]));
//   console.log('api.coord([api.value(0),api.value(3)])', api.coord([api.value(0), api.value(3)]));

//   console.log('api.coord([api.value(1),api.value(1)])', api.coord([api.value(1), api.value(1)]));
//   var categoryIndex = api.value(0);
//   var start = api.coord([api.value(1), categoryIndex]);
//   var end = api.coord([api.value(2), categoryIndex]);
//   var height = api.size([0, 1])[1] * 0.6;
//   var width = end[0] - start[0];
//   console.log('height', height)
//   let heightIndex;
//   if (params.dataIndex < 6) {
//     heightIndex = 0;
//   } else if (params.dataIndex < 12) {
//     heightIndex = 1;
//   } else if (params.dataIndex < 18) {
//     heightIndex = 2;
//   }
//   console.log('')
//   var rectShape = echarts.graphic.clipRectByRect(
//     {
//       x: start[0],
//       y: start[1] - height / 2,
//       width: end[0] - start[0],
//       height: heightList[heightIndex],
//     },
//     {
//       x: params.coordSys.x,
//       y: params.coordSys.y,
//       width: params.coordSys.width,
//       height: params.coordSys.height
//     }
//   );
//   return (
//     rectShape && {
//       type: 'rect',
//       transition: ['shape'],
//       shape: rectShape,
//       style: api.style()
//     }
//   );
// }

// const options = {
//   tooltip: {
//   },
//   title: {
//     text: 'Profile',
//     left: 'center'
//   },
//   dataZoom: [
//     {
//       type: 'slider',
//       filterMode: 'weakFilter',
//       showDataShadow: false,
//       top: 400,
//       labelFormatter: ''
//     },
//     {
//       type: 'inside',
//       filterMode: 'weakFilter'
//     }
//   ],
//   grid: {
//     height: 180,
//   },
//   xAxis: {
//     min: startTime,
//   },
//   yAxis: {
//     data: categories
//   },
//   series: [
//     {
//       type: 'custom',
//       renderItem: renderItem,
//       itemStyle: {
//         opacity: 0.8
//       },
//       encode: {
//         x: [1, 2],
//         y: 0
//       },
//       data: data
//     }
//   ]
// };


// const options = {
//   legend: {},
//   tooltip: {},
//   dataset: {
//     source: [
//       ['company', 'category_A', 'category_B', 'category_C'],
//       ['sub_company_A', [43.3, [10, 20, 30]], 85.8, 93.7],
//       ['sub_company_B', [83.1, [10, 20, 30]], 73.4, 55.1],
//       ['sub_company_D', [86.4, [10, 20, 30]], 65.2, 82.5],
//       ['sub_company_E', [72.4, [10, 20, 30]], 53.9, 39.1]
//     ]
//   },
//   xAxis: {},
//   yAxis: { type: 'category' },
//   // Declare several bar series, each will be mapped
//   // to a column of dataset.source by default.
//   // visualMap: {
//   //   show: false,
//   //   // dimension: 2, // 指向第三列（列序號從 0 開始記，所以設定為 2）。
//   //   // min: 2, // 需要給出數值範圍，最小數值。
//   //   // max: 15, // 需要給出數值範圍，最大數值。
//   //   // inRange: {
//   //   //   // 氣泡尺寸：5 畫素到 60 畫素。
//   //   //   symbolSize: [5, 60]
//   //   // }
//   // },
//   series: [
//     {
//       type: 'bar',
//       stack: 'total'
//     },
//     { type: 'bar', stack: 'total' },
//     { type: 'bar', stack: 'total' },
//     {
//       type: 'bar',
//       stack: 'total2'
//     },
//     { type: 'bar', stack: 'total2' },
//     { type: 'bar', stack: 'total2' }
//   ]
// };





// const options = {
//   legend: {},
//   tooltip: {},
//   dataset: {
//     source: [
//       ['company', 'category_A', 'category_B', 'category_C'],
//       ['sub_company_A', 43.3, 85.8, 93.7],
//       ['sub_company_B', 83.1, 73.4, 55.1],
//       ['sub_company_D', 86.4, 65.2, 82.5],
//       ['sub_company_E', 72.4, 53.9, 39.1]
//     ]
//   },
//   xAxis: { type: 'category' },
//   yAxis: {  },
//   // Declare several bar series, each will be mapped
//   // to a column of dataset.source by default.
//   // visualMap: {
//   //   show: false,
//   //   // dimension: 2, // 指向第三列（列序號從 0 開始記，所以設定為 2）。
//   //   // min: 2, // 需要給出數值範圍，最小數值。
//   //   // max: 15, // 需要給出數值範圍，最大數值。
//   //   // inRange: {
//   //   //   // 氣泡尺寸：5 畫素到 60 畫素。
//   //   //   symbolSize: [5, 60]
//   //   // }
//   // },
//   series: [
//     {
//       type: 'bar',
//       stack: 'total'
//     },
//     { type: 'bar', stack: 'total' },
//     { type: 'bar', stack: 'total' },
//     {
//       type: 'bar',
//       stack: 'total2'
//     },
//     { type: 'bar', stack: 'total2' },
//     { type: 'bar', stack: 'total2' }
//   ]
// };

// Define the custom series data
// var seriesData = [
//   [120, 200, 150, 80, 70],
//   [220, 100, 120, 150, 80],
//   [320, 150, 200, 100, 90],
//   [120, 300, 250, 180, 120]
// ];

// // Create a custom series using the renderItem function
// var customSeries = seriesData.map(function (data, index) {
//   return {
//     type: 'custom',
//     renderItem: function (params, api) {
//       console.log('data', data, 'index', index)
//       console.log('params', params)
//       console.log('api', api);
//       var categoryIndex = api.value(0);
//       console.log('api.value(0)', api.value(0));
//       console.log('api.value(1)', api.value(1));
//       console.log('api.value(2)', api.value(2));
//       console.log('api.value(3)', api.value(3));
//       console.log('api.value(4)', api.value(4));

//       var start = api.coord([api.value(1), categoryIndex]);
//       var end = api.coord([api.value(2), categoryIndex]);
//       console.log('api.size([0, 1])', api.size([0, 1]))
//       console.log('api.size([0, 2])', api.size([0, 2]))
//       var height = api.size([0, 1])[1] * 0.8;

//       return {
//         type: 'rect',
//         shape: {
//           x: start[0],
//           y: start[1] - height / 2,
//           width: end[0] - start[0],
//           height: height
//         },
//         style: api.style()
//       };
//     },
//     data: data.map(function (value, categoryIndex) {
//       return [categoryIndex, value, value + (index > 0 ? seriesData[index - 1][categoryIndex] : 0)];
//     }),
//     encode: {
//       x: [1, 2],
//       y: 0
//     },
//     barWidth: 60
//   };
// });




// Configure the chart options
// var options = {
//   title: {
//     text: 'Stacked Bar Chart (Custom Series)'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
//   },
//   series: customSeries
// };

// Define the custom series data
// Define the custom series data
// var seriesData = [
//   [120, 200, 150, 80, 70],
//   [220, 100, 120, 150, 80],
//   [320, 150, 200, 100, 90],
//   [120, 300, 250, 180, 120]
// ];

// // Calculate the cumulative values for each category
// var cumulativeData = seriesData.reduce(function (result, data) {
//   return data.map(function (value, index) {
//     return result[index] ? result[index] + value : value;
//   });
// }, []);

// // Calculate the maximum cumulative value
// var maxCumulative = Math.max(...cumulativeData);

// // Create a custom series using the renderItem function
// var customSeries = seriesData.map(function (data, index) {
//   return {
//     type: 'custom',
//     renderItem: function (params, api) {
//       var categoryIndex = api.value(0);
//       var start = api.coord([0, categoryIndex]);
//       var end = api.coord([api.value(1), categoryIndex]);
//       var width = (end[0] - start[0]) * 0.8; // Adjust the width as per your preference
//       var height = api.size([1, 0])[0] * 0.6;

//       return {
//         type: 'rect',
//         shape: {
//           x: start[0] + (end[0] - start[0] - width) / 2,
//           y: start[1] - height / 2,
//           width: width,
//           height: height
//         },
//         style: api.style()
//       };
//     },
//     data: data.map(function (value, categoryIndex) {
//       return [categoryIndex, cumulativeData[categoryIndex] - value, cumulativeData[categoryIndex]];
//     }),
//     encode: {
//       x: [1, 2],
//       y: 0
//     }
//   };
// });

// // Configure the chart options
// var options = {
//   title: {
//     text: 'Stacked Bar Chart (Custom Series)'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
//   },
//   series: customSeries
// };
// Define the series data
// var seriesData = [
//   [120, 200, 150, 80, 70],
//   [220, 100, 120, 150, 80],
//   [320, 150, 200, 100, 90],
//   [120, 300, 250, 180, 120]
// ];

// // Configure the chart options
// var options = {
//   title: {
//     text: 'Stacked Bar Chart'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
//   },
//   series: seriesData.map(function (data, index) {
//     // console.log('index', index);
//     // const width = index === -1 ? 30 : 15;
//     return [{
//       type: 'bar',
//       stack: 'stacked',
//       data: data,
//       barWidth: 40,
//     },
//     {
//       type: 'bar',
//       stack: 'stacked2',
//       data: data,
//       barWidth: 20,
//     }
//     ];
//   }),
//   // barWidth: 20 // Adjust the bar width as per your preference
// };

// var seriesData = [
//   [120, 200, 150, 80, 70],
//   [220, 100, 120, 150, 80],
//   [320, 150, 200, 100, 90],
//   [120, 300, 250, 180, 120]
// ];

// // Generate the series for the stacked bar chart
// var series = seriesData.map(function (data, index) {
//   var barWidth = (index <= 4) ? 30 : 50; // Set custom bar width for the third series
//   return {
//     name: 'Series ' + (index + 1),
//     type: 'bar',
//     stack: 'stacked',
//     barWidth: barWidth,
//     data: data
//   };
// });

// // Configure the chart options
// var options = {
//   title: {
//     text: 'Stacked Bar Chart'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
//   },
//   series: series
// };

// Example data for the stacked bar chart

// var seriesData = [
//   [120, 200, 150, 80, 70],
//   [220, 100, 120, 150, 80],
//   [320, 150, 200, 100, 90],
//   [120, 300, 250, 180, 120]
// ];

// // Generate the series for the stacked bar chart
// var series = seriesData.map(function (data, index) {
//   return {
//     type: 'custom',
//     renderItem: function (params, api) {
//       var categoryIndex = api.value(0);
//       var value = api.value(1);
//       var start = api.coord([categoryIndex, 0]);
//       var end = api.coord([categoryIndex, value]);
//       var height = api.size([0, value])[1] * 0.6; // Adjust the height of the bars
//       var width = (index === 2) ? 30 : 20; // Set custom width for the third series

//       return {
//         type: 'rect',
//         shape: {
//           x: start[0] - width / 2,
//           y: end[1],
//           width: width,
//           height: height
//         },
//         style: api.style()
//       };
//     },
//     data: data
//   };
// });

// // Configure the chart options
// var options = {
//   title: {
//     text: 'Stacked Bar Chart'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   xAxis: {
//     type: 'category',
//     data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: series
// };

const options = {
  legend: {},
  tooltip: {},
  // 'column': 預設值。系列被安放到 dataset 的行上面。
  // row': 系列被安放到 dataset 的列上面。
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
    ]
  },
  xAxis: [
    { type: 'category', gridIndex: 0 },
    { type: 'category', gridIndex: 1 }
  ],
  yAxis: [
    { gridIndex: 0 },
    { gridIndex: 1 }
  ],
  grid: [
    { bottom: '55%' },
    { top: '55%' }
  ],
  series: [
    // 這幾個系列會在第一個直角座標系中，每個系列對應到 dataset 的每一列。
    { type: 'bar', seriesLayoutBy: 'column' },
    { type: 'bar', seriesLayoutBy: 'column' },
    { type: 'bar', seriesLayoutBy: 'column' },
    // 這幾個系列會在第二個直角座標系中，每個系列對應到 dataset 的每一行。
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
  ]
};


onMounted(() => {
  const stackChartData = echarts.init(document.querySelector('.stackChart'));
  // console.log('data', data)
  // console.log('categories', categories);

  stackChartData.setOption(options);



  if (localStorage.getItem('rawOrderData')?.length) {
    orders.value = JSON.parse(localStorage.getItem('rawOrderData'));
    getMonthlyRevenue(orders.value);
    currentYearCumulativeData.value = getCumulativeRevenue(currentYearMonthlyData.value, true)
    preYearCumulativeData.value = getCumulativeRevenue(preYearMonthlyData.value, false);
    generateChartData();
    getClientSalesData();
    // getCategories();
  } else {
    getAllOrders();
    getClientSalesData();
    // getCategories();
  }
})

</script>


<style scoped>
  .form-switch .form-check-input:checked {
    background-color: #f6bd03e4;
    border-color: black;
    /* background-position: right center; */
}

</style>