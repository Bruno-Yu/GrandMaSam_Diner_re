<template>
  <main>
    <div>
      <h2 class="text-5xl font-bold pt-5 pb-8 underline decoration-4 decoration-amber-400/80">後臺儀錶板</h2>
      <!-- 逐月收入表 & 累積收入表-->
      <div ref="revenueChart" class="revenueChartDom h-[500px]"></div>
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
      <div class="categoriesChart"></div>
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
// import useStore from '@/store';
// import { storeToRefs } from 'pinia';
import * as echarts from 'echarts';

definePageMeta({
  layout: 'back-layout'
});

// const { userStore } = useStore()
const revenueChartDom = ref(null);

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
  const res = await atrApi.getAdminOrders(params);
  if (res.success) {
    const sortedOrders = JSON.parse(JSON.stringify(res.orders)).filter(item => item.is_paid && (dayjs(item.paid_date * 1000).format('YYYY') === currentYear.value || dayjs(item.paid_date * 1000).format('YYYY') === preYear.value)).map(item => ({ id: item.id, year: dayjs(item.paid_date * 1000).format('YYYY'), month: dayjs(item.paid_date * 1000).format('MM'), isCurrentYear: dayjs(item.paid_date * 1000).format('YYYY') === currentYear.value, products: item.products, total: item.total, userName: item.user.name }));
    orders.value = [...orders.value, ...sortedOrders];
    const pagination = JSON.parse(JSON.stringify(res.pagination))
    if (pagination.has_next) {
      page = page + 1;
      getAllOrders();
    } else {
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

onMounted(() => {

  if (localStorage.getItem('rawOrderData')?.length) {
    orders.value = JSON.parse(localStorage.getItem('rawOrderData'));
    getMonthlyRevenue(orders.value);
    currentYearCumulativeData.value = getCumulativeRevenue(currentYearMonthlyData.value, true)
    preYearCumulativeData.value = getCumulativeRevenue(preYearMonthlyData.value, false);
    generateChartData();
    getClientSalesData();
    getCategories();
  } else {
    getAllOrders();
    getClientSalesData();
    getCategories();
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