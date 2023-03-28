<template>
  <main class="-mx-4 bg-white">
    <div class="grid grid-cols-3 gap-4 bg-white h-[700px] mb-2">
      <!-- card -->
      <div v-for="(item, index) in challengeListData" :key="item.code" class="relative bg-stone-800 flex flex-col h-[700px]">
        <img  class="absolute  block duration-700 delay-100 ease-out hover: w-full h-full object-cover shadow-black shadow-lg"  :class="{ '-translate-y-1/2': toggleStatus[index] }" :src="item.imgSrc" :alt="item.alt"  @click="toggleStatus[index] = !toggleStatus[index]">
          <button type="button" class="absolute bottom-1 left-1/2 -translate-x-1/2  bg-white/30  h-12 w-12 rounded-full animate-bounce" :class="{ 'hidden': toggleStatus[index] }"  @click="toggleStatus[index] = !toggleStatus[index]"><i class="bi bi-chevron-double-up text-white "></i></button>
        <div class="mt-auto bg-black p-5 h-1/2">
          <div class="bg-white/10 p-5 h-full">
            <div class="flex justify-center">
              <h4 class="inline-block text-center text-3xl font-bold text-amber-400 border-b-2 border-black pb-1 mb-5">{{ item.name }} </h4>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-3">
              <ul class="list-none text-white col-span-2  space-y-4">
                <li class="font-bold text-xl">使用說明 <br><span class="pl-1 font-normal text-xs">{{ item.description }}</span></li>
                <li class="font-bold text-xl">適用範圍 <br><span class="pl-1 font-normal text-xs">{{ item.applyRange }}</span></li>
              </ul>
              <p class="text-9xl text-amber-300">{{ item.times }}<span class=" text-sm font-bold text-white">倍券</span></p>
            </div>
            <div class="border-white border-2 border-dashed py-2 text-center text-amber-400 text-3xl mb-4">
              <p>{{ item.code }}</p>
            </div>
            <p class="text-center text-xs text-white">使用時限: {{ item.expired }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-amber-400 py-1">
      <div class="bg-black py-4 text-center">
        <h3 class="text-3xl italic text-white font-bold leading-relaxed">
          成功其實是1分的實力加上99分的心意<br>不要讓吝嗇限制了您人生的高度<br><span class="text-base font-normal not-italic text-gray-600"> 出自- 1995 五歲就會抬頭的創辦人</span>
        </h3>
      </div>
    </div>

  </main>
</template>

<script>
import atrApi from '@/assets/js/api/atrApi.js';
// import { ref, onMounted } from 'vue';
import { useApiModal } from '~~/composables/useApiModal';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import { FreeMode, Navigation } from 'swiper';

// Import Swiper styles
// import 'swiper/css';
import '@/assets/styles/categories/swiper.scss';

import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
import '@/assets/styles/categories/navigation.scss';

// data
const challengeListData = [
  {
    imgSrc: 'https://i.imgur.com/wpeIDey.jpg',
    alt: 'News_header_left',
    name: '簡易難度',
    description: '溢價購買商品，多餘的部分都會捐贈與非洲無關的辛苦作者。',
    times: 5,
    expired: '不限',
    applyRange: '不限，可使用於架上所有商品，或者作為直接捐贈使用。',
    code: '#55555555',
  },
  {
    imgSrc: 'https://i.imgur.com/1d3nEt1.jpg',
    alt: 'News_header_md',
    name: '中等難度',
    description: '溢價購買商品，多餘的部分都會捐贈與非洲無關的辛苦作者。',
    times: 6,
    expired: '不限',
    applyRange: '不限，可使用於架上所有商品，或者作為直接捐贈使用。',
    code: '#66666666',
  },
  {
    imgSrc: 'https://i.imgur.com/LvVe6MT.jpg',
    alt: 'News_header_right',
    name: '高級難度',
    description: '溢價購買商品，多餘的部分都會捐贈與非洲無關的辛苦作者。',
    times: 8,
    expired: '不限',
    applyRange: '不限，可使用於架上所有商品，或者作為直接捐贈使用。',
    code: '#88888888',
  }
];


export default {
  setup() {
    // const store = userStore();
    const toggleStatus = ref([]);

    const { userStore } = useStore();
    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal } = useApiModal();
    const categories = ref([]);
    const products = ref([]);
    const pagination = ref([]);
    // 管理員取得產品資料
    async function getProducts(page = 1, category = '') {
      const res = await atrApi.getProducts(page, category);
      if (res.success) {
        products.value = JSON.parse(JSON.stringify(res.products));
        pagination.value = JSON.parse(JSON.stringify(res.pagination));
        const originCategories = products.value.map(item => item.category)
        categories.value = originCategories.filter((item, index) => originCategories.indexOf(item) === index);
        categories.value.unshift('未亡人系列');
        categories.value.unshift('全部');
        // console.log('categories.value', categories.value);
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }

    // 加入購物車
    async function addToCart(product_id, qty = 1) {
      const data = {
        product_id, qty
      }
      const res = await atrApi.addToCart({ data });
      if (res.success) {
        // console.log(res);
        userStore.$patch((state) => { state.messageContent.message = res.message });
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
      infoModal.value.openModal();
    }

    // const swiper = new Swiper('.my-swiper', {
    //   navigation: {
    //     nextE1: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   }
    // })
    onMounted(() => {
      getProducts();
      challengeListData.forEach(() => toggleStatus.value.push(false))
    });

    return {
      products,
      pagination,
      categories,
      messageContent,
      getProducts,
      addToCart,
      hideInfoModal,
      infoModal,
      modules: [Navigation, FreeMode],
      challengeListData,
      toggleStatus,
      // swiper,
    }

  },
}
</script>

