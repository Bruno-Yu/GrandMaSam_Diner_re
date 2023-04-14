<template>
  <main>
    <!-- headings -->
    <header class="-mx-4">
      <!-- Background image -->
      <div class="bg-amber-400 grid grid-cols-2 gap-4 pb-1">
        <div class="flex flex-col pt-28 px-20">
          <h2 class="text-4xl font-bold text-stone-700 mb-4">產品/服務列表</h2>
          <h3 class="text-2xl  font-bold text-stone-700 mb-4">廚師介紹</h3>
          <p class="leading-loose  font-bold">五腥出品，來自嘉義明雄的米其林廚師帶來的味道<br>而每份他所帶來的食物，都有屬於食材自己的故事<br>只要您用心品嘗，一定能嚐出嘉明( 嘉義民雄 )的味道</p>
        </div>
        <img class="block w-full h-[450px] object-cover"  src="@/assets/images/productsView_banner.webp" alt="productsView_banner">
      </div>
      <!-- 選項按鈕 -->
      <!-- <ul class="list-none bg-stone-900 grid grid-cols-5 gap-5 px-12 py-5">
        <li v-for="item in categories" :key="item" class="border bg-white border-gray-300 px-3 py-1.5 whitespace-nowrap rounded text-center shadow"><button type="button" class="font-bold text-xl" >{{ item }}</button></li>
      </ul> -->
      <!-- swiper -->
      <div class="px-10  bg-stone-900 py-5">
        <swiper
          :slidesPerView="4"
          :spaceBetween="25"
          :loop="true"
          :navigation="true"
          :freeMode="true"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="mySwiper"
        >
      <swiper-slide  v-for="item in categories" :key="item" class="border bg-white border-gray-300  whitespace-nowrap rounded text-center shadow"><button type="button" class="font-bold px-3 py-1.5 text-xl" >{{ item }}</button></swiper-slide>
    </swiper>

      </div>

    </header>
    <!-- Category List -->
    <div class="grid grid-cols-4 gap-4 my-7">
      <div class="col-span-1">
    <div class="relative mb-6" data-te-input-wrapper-init>
      <input
        type="text"
        class="peer block min-h-[auto] w-full rounded border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="search-box"
        placeholder="" />
      <label
        for="search-box"
        class="pointer-events-none absolute -top-1 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.2rem] peer-focus:scale-[0.6] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
        >輸入你要尋找的項目</label
      >
    </div>
      </div>
        <!-- cards -->
        <div class="col-span-3 grid grid-cols-3 gap-4">
          <div v-for=" (item) in products" :key="item.id" class="flex justify-center ">
            <div class="rounded-lg shadow-lg bg-white w-full">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light" class="relative" @click.prevent="gotoProductDetail(item.id)">
                <img class="rounded-t-lg h-40 w-full object-cover" :src="item.imageUrl" :alt="item.id" />
                <button type="button" class="absolute top-2 right-6 block h-1 w-1 shadow-transparent"><i v-if="false" class="bi-heart-fill text-red-600 text-base"></i><i v-else class="bi bi-heart text-white text-base"></i></button>
              </a>
              <div class="px-2 py-2">
                <h5 class="text-gray-900 text-xl font-bold mb-2">{{ item.title }}</h5>
                <div class="flex justify-end">
                  <button type="button"
                    class=" inline-block px-6 py-2.5 bg-amber-400 text-black font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-lg transition duration-150 ease-in-out"
                    @click.prevent="addToCart(item.id)">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- pagination -->
      <div class="flex justify-end my-3">
        <nav aria-label="Page navigation">
          <ul class="list-style-none flex">
            <li :class="{ 'hidden': !pagination.has_pre }">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Previous" @click.prevent="getProducts(page = pagination.current_page - 1, category = '')">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in pagination.total_pages" :key="page">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                :class="{ 'bg-amber-400': page === pagination.current_page }"
                href="#"
                @click.prevent="getProducts(page, category = '')"
                >{{ page }}</a
              >
            </li>
            <li :class="{ 'hidden': !pagination.has_next }">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Next"  @click.prevent="getProducts(page = pagination.current_page + 1, category = '')"
                ><span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
<!-- modal -->
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" />
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
import '@/assets/styles/categories/navigation.scss';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // const store = userStore();
    const { userStore } = useStore();
    const router = useRouter();
    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal } = useApiModal();
    const categories = ref([]);
    const products = ref([]);
    const pagination = ref([]);
    // 前往產品頁面
    function gotoProductDetail(id) {
      router.push(`./productsView/${id}`);
    }

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
    });

    return {
      products,
      pagination,
      categories,
      messageContent,
      getProducts,
      gotoProductDetail,
      addToCart,
      hideInfoModal,
      infoModal,
      modules: [Navigation, FreeMode],
      // swiper,
    }

  },
}
</script>

