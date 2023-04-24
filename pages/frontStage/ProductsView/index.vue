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
      <!-- swiper -->
      <div class="bg-stone-900 py-5 ">
        <div class=" container mx-auto ">
          <div class="xl:-mx-5">
            <swiper
              :slidesPerView="4"
              :spaceBetween="10"
              :loop="true"
              :navigation="true"
              :freeMode="true"
              :pagination="{
                  clickable: true,
                }"
              :modules="modules"
              class="mySwiper"
            >
            <swiper-slide  v-for="item in categories" :key="item" class="px-7"><button type="button" class="block w-full h-full font-bold px-3 py-1.5 text-xl border bg-white border-gray-300  whitespace-nowrap rounded text-center shadow hover:bg-black hover:text-amber-400" @click="getCurrentCategoryProduct(1, item)">{{ item }}</button></swiper-slide>
          </swiper>
          </div>
      </div>
      </div>

    </header>
    <!-- Category List -->
    <div class="container mx-auto">
      <div class="grid grid-cols-4 gap-4 my-7 xl:-mx-5">
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
        <div class="relative col-span-3 grid grid-cols-3 gap-4">
          <button type="button" class="block fixed bottom-10 right-10 rounded-full bg-transparent z-50 group"   @click="toggleCartDropdown">
              <div v-if="cartProducts?.length"
    class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
    {{ cartProducts?.length }}
  </div>
            <div class="h-12 w-12 rounded-full bg-amber-400  outline outline-offset-4 outline-amber-400  cursor-pointer group-hover:bg-white group-hover:outline-offset-2 group-hover:outline-amber-500/50 " >
              <img src="@/assets/images/cart_icon.svg" alt="cart">
            </div>
          </button>
          <div ref="cartDropdown" class="
              min-w-max
              fixed
              bottom-20 right-20
              bg-white
              text-base
              hidden
              z-[1000]
              w-[20rem]
              outline outline-offset-4 outline-1 outline-black/30 
              p-4
              list-none
              text-left
              rounded-sm
              shadow
              shadow-gray-700
              mt-1
              m-0
              bg-clip-padding
            ">
              <h3 class="text-center font-bold my-2 text-lg ">購物車</h3>
              <div v-if="cartProducts">
                <ul class="border rounded p-2">
                  <li v-for="(item) in cartProducts" :key="item.id" class="flex justify-center w-full">
                    <div class="flex flex-row rounded-lg bg-white shadow  w-full">
                      <div class="p-1">
                        <img class="w-20 h-20 object-cover rounded " :src="item.product.imageUrl"
                          :alt="item.product_id" />
                      </div>
                      <div class="p-2 flex flex-col justify-start w-full relative">
                        <div class="flex justify-between items-center">
                          <div>
                            <h5 class="text-gray-900 font-medium mb-2">{{ item.product.title }}</h5>
                            <div class="flex justify-between items-center">
                              <p class="text-gray-600 text-xs">{{ dayjs().format('YYYY-MM-DD') }}</p>
                              <p class="text-gray-600 text-xs">份數 x{{ item.qty }} </p>
                            </div>
                          </div>
                          <font-awesome-icon class="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-600" icon="fa-regular fa-trash-can"
                            @click="deleteCartProduct(item.id)"></font-awesome-icon>
                        </div>
                        <p class="text absolute right-1 bottom-1">TWD {{ finalTotal }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="flex justify-between mt-2">
                  <p>共計{{ cartProducts?.length || 0 }} 件</p>
                  <button type="button"
                    class=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-black hover:shadow-lg  focus:shadow-lg focus:outline-none transition duration-150 ease-in-out"
                    @click="goToOrdersView">立即購買</button>
                </div>
              </div>
              <div v-else>
                <div class="border rounded p-2 text-center flex items-center justify-center bg-white">
                  <p>目前購物車尚無商品</p>
                </div>
              </div>
            </div>
            <card-display  v-for="(item) in products" :key="item.id" :product="item" :confirm="confirm"/>
          </div>
        </div>
        <!-- pagination -->
        <div class="flex justify-end my-3">
          <frontStageProductsViewPagination :pagination="pagination" :get-content="getProducts" :current-category="currentCategory" />
          </div>
    </div>
<!-- modal -->
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" />
  </main>
</template>

<script>
import atrApi from '@/assets/js/api/atrApi.js';
// import { ref, onMounted } from 'vue';
import dayjs from 'dayjs/esm/index.js';
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

    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal, addToCart, getCart, cartProducts, finalTotal, deleteCartProduct } = useApiModal();
    const categories = ref([]);
    const products = ref([]);
    const pagination = ref([]);
    const currentCategory = ref('');

    // 取得全部產品的類別
    async function getCategories() {
      const res = await atrApi.getNoPageProducts();
      if (res.success) {
        const allProducts = JSON.parse(JSON.stringify(res.products));
        const originCategories = allProducts.map(item => item.category);
        categories.value = originCategories.filter((item, index) => originCategories.indexOf(item) === index);
        categories.value.unshift('未亡人系列');
        categories.value.unshift('全部');
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }

    // 取得產品資料
    async function getProducts(page = 1, category = '') {
      const res = await atrApi.getProducts(page, category);
      if (res.success) {
        products.value = JSON.parse(JSON.stringify(res.products));
        pagination.value = JSON.parse(JSON.stringify(res.pagination));
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }

    function getCurrentCategoryProduct(page = 1, category = '') {

      if (category === '全部' || category === '未亡人系列') {
        currentCategory.value = '';
      } else {
        currentCategory.value = category;
      }
      getProducts(page, currentCategory.value);
    }

    const confirm = ref({
      confirmName: '加入購物車',
      confirmBtn: addToCart,
    });


    //     // 購物車下拉表單
    const cartDropdown = ref(null);
    function toggleCartDropdown() {
      cartDropdown.value.classList.toggle('hidden');
    }

    function closeCartDropdown() {
      if (cartDropdown.value.classList.contains('hidden')) {
        return;
      } else {
        cartDropdown.value.classList.add('hidden');
      }
    }

    //     // const router = useRouter();
    function goToOrdersView() {
      toggleCartDropdown();
      navigateTo({ path: '/frontStage/ordersView' });
    }

    onMounted(() => {
      getProducts();
      getCategories();
      getCart();
    });

    return {
      dayjs,
      products,
      pagination,
      categories,
      messageContent,
      currentCategory,
      getProducts,
      addToCart,
      hideInfoModal,
      confirm,
      getCurrentCategoryProduct,
      infoModal,
      modules: [Navigation, FreeMode],
      cartDropdown,
      closeCartDropdown,
      goToOrdersView,
      getCart,
      cartProducts,
      finalTotal,
      deleteCartProduct,
      toggleCartDropdown
      // swiper,
    }

  },
}
</script>

