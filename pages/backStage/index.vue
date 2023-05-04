<template>
  <main>
    <div>
      <h2 class="text-5xl font-bold pt-5 pb-8 underline decoration-4 decoration-amber-400/80">後臺儀錶板</h2>
      <!-- 逐月收入表 & 累積收入表-->
      <div ref="revenueChart" class="revenueChartDom h-[250px]"></div>
    </div>
    <h1>這是後台首頁</h1>
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
import useStore from '@/store';
// import { storeToRefs } from 'pinia';
import * as echarts from 'echarts';

// const isSame = require('dayjs/plugin/isSame');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
definePageMeta({
  layout: 'back-layout'
});

const { userStore } = useStore()
const revenueChartDom = ref(null);

// revenue chart's option
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      },
    }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['monthlyRevenue', 'cumulativeRevenue']
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
      name: 'monthlyRevenue',
      min: 0,
      // max: 250,
      // interval: 50,
      axisLabel: {
        formatter: '{value} TWD'
      }
    },
    {
      type: 'value',
      name: 'cumulativeRevenue',
      min: 0,
      // max: 25,
      // interval: 5,
      axisLabel: {
        formatter: '{value} TWD'
      }
    }
  ],
  series: [
    {
      name: 'cumulativeRevenue',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + 'TWD';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'monthlyRevenue',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + 'TWD';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};

const { catchErrorToast } = useApiModal();

// 受限於 api 原先設計，因而這邊取值會需要打較多次 api 

const orders = ref([]);
// const hasNext = true;
let page = 1;
const currentYear = ref(dayjs().format('YYYY'));
const preYear = ref((Number(currentYear) - 1).toString());
const currentYearMonthlyData = ref([]);
const currentYearCumulativeData = ref([]);
const preYearMonthlyData = ref([]);
const preYearCumulativeData = ref([]);


function getMonthlyRevenue(data) {
  for (let i = 1; i <= 12; i++) {
    // i 代表月份
    // 尋找 data 中與該月份&該年相同的部分，並做該月份資料的累加
    data.forEach(item => {
      if (Number(item.month === i) && item.isCurrentYear) {
        currentYearMonthlyData.value[i - 1] += item.total;
      } else if (Number(item.month === i)) {
        preYearMonthlyData.value[i - 1] += item.total;
      }
    })
    // 若 data 中無該月份或是年的資料，則帶入 0
    currentYearMonthlyData.value[i - 1] = currentYearMonthlyData.value[i - 1] || 0;
    preYearMonthlyData.value[i - 1] = preYearMonthlyData.value[i - 1] || 0;
  }
}

function getCumulativeRevenue(monthlyArr) {
  const sortedArr = monthlyArr[0];
  for (let i = 1; i < 12; i++) {
    sortedArr[i] = sortedArr[i - 1] + monthlyArr[i]
  }
  return sortedArr;
}


// 產生圖表

function generateChartData() {
  const revenueChart = echarts.init(document.querySelector('.revenueChartDom'), null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

  if (option && typeof option === 'object') {
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
    console.log('backStage', orders.value, pagination);
    if (pagination.has_next) {
      page = page + 1;
      getAllOrders();
    } else {
      // 取完後先將 raw data 存在 store 中，避免需多次 打api 浪費效能
      userStore.$patch((state) => {
        state.rawOrderData = orders.value;
      })

      // 取完 原始值後進行處理
      //  分年，分月份將每個月個別銷售，以及累積銷售算出
      getMonthlyRevenue(orders.value);
      currentYearCumulativeData.value = getCumulativeRevenue(currentYearMonthlyData.value)
      preYearCumulativeData.value = getCumulativeRevenue(preYearMonthlyData.value)
      generateChartData();
    }
  } else {
    catchErrorToast(res.response.data.message)
  }
}


// 取訂單資料


onMounted(() => {

  if (userStore.rawOrderData.length) {
    generateChartData()
  } else {
    getAllOrders();
  }


  // if (option && typeof option === 'object') {
  //   revenueChart.setOption(option);
  // }

  // window.onresize = function () {
  //   revenueChart.resize();
  // };
})

</script>


<style scoped>
  .form-switch .form-check-input:checked {
    background-color: #f6bd03e4;
    border-color: black;
    /* background-position: right center; */
}

</style>