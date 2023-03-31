<template>
  <main class="-mx-4 bg-white">
    <!-- header -->
    <section class="relative py-5 px-5 grid grid-cols-2 gap-4 mt-14 z-20 overflow-hidden mb-5">
      <div class="absolute w-[500px] h-screen bg-stone-100 bottom-14  right-[320px] -skew-x-12 z-0"></div>
      <div class="absolute w-[500px] h-screen bg-black/10 top-10  right-[260px] -skew-x-12 z-0"></div>
      <div class="absolute w-[500px] h-screen bg-amber-400 top-0  right-[300px] -skew-x-12 z-0"></div>
      <div class="absolute w-[500px] h-[45px] bg-black/90 top-3  right-[580px] -skew-x-12 z-10"></div>
      <div class="absolute w-[600px] h-[40px] bg-black/10 top-20  right-[400px] -skew-x-12 z-10"></div>
      <div class="absolute w-[500px] h-[60px] bg-black/90 bottom-3  right-[100px] -skew-x-12 z-10"></div>

      <div class="relative bg-transparent">
        <div class="absolute w-[50%] h-[25vw] rounded-[50px] top-[11vh] left-[12vw]  bg-gradient-to-r  from-stone-700 to-transparent" ></div>
        <img class="relative object-cover rounded-[50px] w-[60%] h-auto brightness-75 sepia ml-5" src="@/assets/images/News_banner.webp" alt="News_banner">
      </div>
      <div class="relative flex flex-col justify-center px-10 z-20">
        <p class="text-2xl font-[800] italic leading-10  mb-2">我們深信信教一事，不宜於喧嘩，不宜於妄自尊大，不宜於說大話；<br>卻應是一件平心靜氣，溫文儒雅，但也堅決毫不妥協的事情。</p>
        <p class="text-sm text-gray-600 italic"> - 2020 / 5 / 28 拜燈教主 </p>
        <div class="flex justify-end items-center mt-5 pr-28">
          <i class="inline-block mr-6 animate-ping bi bi-arrow-right-circle-fill text-neutral-950 z-10"></i>
          <button type="button" class="relative block bg-black -skew-x-12 text-white font-bold py-4 px-8 shadow-amber-400" @click.prevent="btnStatus = !btnStatus"> 最新消息公告 </button>
        </div>
        <p class="text-right text-xs pr-32 text-neutral-600 mt-2">點擊看更多</p>
      </div>
    </section>
    <!-- 公告 swiper -->
    <section class="bg-white relative overflow-hidden transition-[height] duration-700 ease-in-out" :class="{ 'h-[220px]': btnStatus, 'overflow-visible': btnStatus }" >
      <div class="absolute bottom-0 left-0 right-0 min-h-[200px] px-10  bg-black/90 py-5 z-40 " >
        <swiper
          :slidesPerView="5"
          :spaceBetween="25"
          :navigation="true"
          :autoplay="true"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="swiper"
        >
      <swiper-slide  v-for="item in articles" :key="item.id" class="border bg-white border-gray-300 whitespace-nowrap rounded text-center shadow  brightness-50 hover:brightness-100 hover:z-50  "> <NuxtLink class="block relative h-[200px]  w-full hover:h-[600px] hover:w-[700px]  duration-700 ease-in-out" to="#"><img :src="getArticlePic(item.id)" class="absolute img-fluid block object-cover h-full w-full "  :alt="item.title" /> <p class="absolute block bottom-2 left-1 font-bold text-white px-3 bg-black/60">{{ item.title }} </p></NuxtLink> </swiper-slide>
    </swiper>
      </div>
    </section>
  </main>
</template>
<script>
import atrApi from '@/assets/js/api/atrApi.js';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';

// Import Swiper styles
// import 'swiper/css';
import '@/assets/styles/categories/swiper.scss';
import 'swiper/css/free-mode';
import '@/assets/styles/categories/navigation.scss';

// articles 圖片 & 文章對應
const articlesPics = [
  {
    id: '-N-tl8D5WkaIJ1frNRRB',
    image: 'https://i.imgur.com/JJIHxqo.jpg'
  },
  {
    id: '-N-qk3J_UqL6i1RH6BRz',
    image: 'https://i.imgur.com/pHhKGN5.jpg'
  },
  {
    id: '-N-qjhkvfCqcb-6Mx1G-',
    image: 'https://i.imgur.com/Z708ufn.jpg'
  },
  {
    id: '-N-qjTKf-jAcAT4ND249',
    image: 'https://i.imgur.com/cCwvJha.jpg'
  },
  {
    id: '-N-qjOg2fvc8GOSgmkrN',
    image: 'https://i.imgur.com/nVyT0mA.jpg'
  },
  {
    id: '-N-qjALHXwnpNgIrpokr',
    image: 'https://i.imgur.com/ydGbX1J.jpg'
  },
]


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {

    const articles = ref([]);
    const pagination = ref([]);
    const btnStatus = ref(false);
    function getArticlePic(id) {
      return articlesPics.filter((ele) => ele.id === id)[0].image;
    }
    async function getArticles() {
      const res = await atrApi.getArticles();
      if (res.success) {
        articles.value = res.articles;
        pagination.value = res.pagination;
      }
    }
    onMounted(() => getArticles());

    return {
      btnStatus,
      articles,
      pagination,
      modules: [Navigation, Autoplay],
      getArticles,
      getArticlePic,
    }
  }
}
</script>

