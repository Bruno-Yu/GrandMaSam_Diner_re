<template>
  <div>
    <!-- hero section -->
    <section>
      <!-- banner pic -->
      <div
        class="bg-[url('/assets/images/index_header_banner.webp')] h-screen object-cover -mx-4 bg-center  flex flex-col justify-center items-end pr-28 pb-24 relative">
        <div class="flex flex-col max-w-lg">
          <h2 class="text-white text-7xl font-bold italic whitespace-nowrap"> 獻出你的錢包 !!! </h2>
          <h3 class="text-white text-3xl font-bold italic whitespace-nowrap"> 讓台灣再次偉大 !!!!!! </h3>
          <button type="button"
            class="inline-block rounded bg-amber-400 p-1 mt-5 uppercase leading-normal shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-500 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]">
            <span class="block text-2xl italic font-extrabold border border-gray-200 px-5 pt-1.5 pb-1  animate-pulse ">馬上行動</span>
          </button>
        </div>
        <div class="absolute bottom-20 left-5 w-1/3 bg-black/30 pl-5">
          <div class="border-l-[10px]  border-white pl-4">
            <h2 class="text-white text-5xl animate-pulse text-gray-100 whitespace-nowrap mb-4"> 品牌精神、難忘體驗 </h2>
            <h3 class="text-white text-2xl animate-pulse text-amber-400  whitespace-nowrap font-bold mb-2"> 各大KOL推薦，人生必吃餐廳 </h3>
            <p class="text-base text-white italic">榮獲餐廳各大獎項認可</p>
          </div>
          <div class="flex gap-4 mt-3">
            <img class="h-12 object-cover" src="@/assets/images/logo_5.png" alt="logo_5">
            <img class="h-12 object-cover" src="@/assets/images/logo_2.png" alt="logo_2">
            <img class="h-12 object-cover" src="@/assets/images/logo_3.png" alt="logo_3">
            <img class="h-12 object-cover" src="@/assets/images/logo_4.png" alt="logo_4">
            <img class="h-12 object-cover" src="@/assets/images/logo_1.png" alt="logo_1">
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white flex h-1/2 p-10 pt-1">
      <div class="flex flex-col  w-2/5 my-auto relative">
        <div class="rounded-full  w-[565px] h-[565px] bg-black -translate-y-12 translate-x-[75px]"></div>
        <!-- <img class="block w-full h-auto object-cover scale-[1.35]  img-filter" src="@/assets/images/index_product_intro_rotate.png" alt="index_product_intro_1"> -->
        <img class="absolute top-0  w-full h-auto object-cover animate-rotate " src="@/assets/images/index_product_intro_rotate.png" alt="index_product_rotate">
        <div class=" mt-auto flex justify-center">
            <img class="h-10 w-auto" src="@/assets/images/chilli.png" alt="chilli"> <p class="font-bold">今日特色醬汁是:</p> <div class=" border-gray-100 border shadow-inner  h-10 w-[150px] align-middle bg-amber-50 ml-1 whitespace-nowrap overflow-hidden px-2">
            <span class="text-stone-600 font-bold  marqueeStyle inline-block align-middle">胡錦醬  維尼醬  蜜汁和風醬  川辣醬  sakura醬  穿普醬  穿幫醬  胡錦醬  維尼醬  蜜汁和風醬  川辣醬  sakura醬  穿普醬  穿幫醬  胡錦醬  維尼醬  蜜汁和風醬  川辣醬  sakura醬  穿普醬  穿幫醬</span> 
          </div> 
        </div>
      </div>
      <div class="w-3/5 grid grid-cols-2 gap-4 mt-10">
        <div class="shadow-lg p-1.5">
          <div class="relative p-10 bg-[url('@/assets/images/diner_1.webp')] border border-gray-300 bg-cover h-full">
            <div class="absolute top-0 bottom-0 left-0 right-0 bg-black/60 py-10  px-20 cursor-pointer hover:invisible">
              <h3 class="mt-5 mb-10 font-bold text-3xl text-amber-400 text-center">關於我們</h3>
              <p class="leading-loose font-medium text-white">我們與各大連鎖超商合作，推出義大利麵，燉飯，炸雞及各式炸物小點系列，絕對難以滿足味蕾挑剔的您 </p>
            </div>
          </div>
        </div>
          <div class="shadow-lg p-1.5">
            <div class="relative p-10 bg-[url('@/assets/images/diner_2.webp')] border border-gray-300 bg-cover h-full">
              <div class="absolute top-0 bottom-0 left-0 right-0 bg-black/60 py-10  px-20 cursor-pointer hover:invisible">
                <h3 class="mt-5 mb-10 font-bold text-3xl text-amber-400 text-center">味道獨特</h3>
                          <p  class="leading-loose font-medium text-white"> 本集團訴求的是夢想，並不只是單純的餐飲品牌，所以我們販售給我們貴賓的餐點都有一份夢想的味道</p>
              </div>
          </div>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import atrApi from '@/assets/js/api/atrApi.js';
// import { ref, onMounted } from 'vue';
import { useApiModal } from '~~/composables/useApiModal';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default {
  setup() {
    // const store = userStore();
    // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const { userStore } = useStore();
    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal } = useApiModal();

    const cartProducts = ref([]);

    async function getCart() {
      const res = await atrApi.getCart();
      if (res.success) {
        cartProducts.value = JSON.parse(JSON.stringify(res.data.carts));

      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }

    onMounted(() => {
      getCart();
      gsap.to('.marqueeStyle', {
        xPercent: "-50",
        ease: "none",
        duration: 18,
        repeat: -1
      })
    });

    return {
      getCart,
      messageContent,
      cartProducts,
      hideInfoModal,
      infoModal
    }

  },
}
</script>

<style scoped>

.img-filter{
     -webkit-filter: brightness(50%); /* Safari */
    filter: brightness(50%);
}


</style>