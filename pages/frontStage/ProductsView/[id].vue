<template>
  <main class="container mx-auto">
    <div class="grid grid-cols-2 gap-6 mt-24 mb-10">
      <!-- 產品 swiper -->
      <div class="h-[520px] w-full">
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
        :spaceBetween="10"
        :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2"
      >
      <swiper-slide  v-for="item in productImages" :key="item" >
        <img class="object-cover  w-full aspect-[4/2] border-4 border-amber-400" :src="item" :alt="item">
      </swiper-slide>
      </swiper>
        <swiper
            @swiper="setThumbsSwiper"
            :slidesPerView="4"
            :spaceBetween="0"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper mt-2 bg-black/95 p-2"
          >
          <swiper-slide class="p-2"  v-for="item in productImages" :key="item" >
            <img class="object-cover h-full aspect-[4/2] border border-gray-200" :src="item" :alt="item">
          </swiper-slide>
      </swiper>
      </div>
      <div class="flex flex-col">
        <!-- breadcrumb-->
        <nav class="w-full rounded-md">
          <ol class="list-reset flex items-center">
            <li>
              <NuxtLink
                to='/frontStage/productsView'
                class="text-base font-bold underline decoration-solid"
                >商店</NuxtLink  
              >
            </li>
            <li>
              <span class="mx-2  text-base font-bold text-neutral-500 dark:text-neutral-400">/</span>
            </li>
            <li ><p class="text-base font-bold text-neutral-500 dark:text-neutral-400 ">{{ `${product.category}介紹` }}</p></li>
          </ol>
        </nav>
        <h1 class="text-4xl font-bold my-6">{{ product.title }}</h1>
        <p class="text-base text-right line-through text-neutral-500 mt-5">{{ product.origin_price }}</p>
        <p class="text-2xl font-bold text-right ">{{ `TWD ${product.price}` }} <span class='text-lg' >{{ ` / ${product.unit}` }}</span></p>
        <div class="grid grid-cols-2 gap-4 my-6">
          <!-- 加減處 -->
          <div
            class="inline-flex rounded shadow-gray-500 overflow-hidden shadow transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
            <button
              type="button"
              class="inline-block rounded-full text-center"
              @click="productQty = productQty - 1"
              :disabled="productQty === 1"
              >
              <i class="bi bi-dash mx-2"></i>
            </button>
            <input
              type="number"
              min="1" 
              :max="product.num"
              :value="productQty"
              class="border-0 text-black text-center text-lg bg-primary w-full pt-2.5 font-medium uppercase leading-normal 
              transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 
              focus:outline-none focus:ring-0 active:bg-primary-700"
              readonly="readonly"
              />
            <button
              type="button"
              class="inline-block rounded-full text-center"
              @click="productQty = productQty + 1"
              :disabled="productQty === product.num"
              >
              <i class="bi bi-plus mx-2"></i>
            </button>
          </div>
          <button
            type="button"
            class="inline-block rounded bg-amber-400 px-6 pb-2 pt-2.5 text-base font-bold leading-normal shadow-[0_4px_9px_-4px_#3b71ca] 
            transition duration-150 ease-in-out hover:bg-black hover:text-white 
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            @click="addToCart(product.id, productQty)"
            >
            加入購物車
          </button>
        </div>
        <div class="my-4">
          <h3 class="text-2xl font-bold mb-2">商品規格</h3>
          <p class="text-neutral-500">{{ product.content }}</p>
        </div>
        <div class="mb-4">
          <h3 class="text-2xl font-bold mb-1">商品描述</h3>
          <p class="text-neutral-500">{{ product.description }}</p>
        </div>
      </div>
    </div>
    <div class="border rounded px-4 py-4 mb-10">
      <h3 class="font-bold mb-4 text-3xl">購買須知</h3>
      <p class="text-neutral-500" v-html="purchaseNotice" />
    </div>
    <!-- 猜你喜歡 -->
    <div class="py-4 mb-10">
      <h3 class="font-bold mb-4 text-3xl">猜你喜歡</h3>
        <div class="px-4  bg-stone-200 py-5">
        <swiper
          :slidesPerView="4"
          :spaceBetween="25"
          :navigation="true"
          :autoplay="true"
          :modules="modules"
          class="likesSwiper"
        >
        <template v-if="sameCategoryProducts.length">
            <swiper-slide  v-for="(item, index) in sameCategoryProducts" :key="index" ><card-display :product="item" :confirm="confirm" /></swiper-slide>
        </template>
      </swiper>
    </div>
    </div>
<!-- modal -->
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" />
  </main>
</template>

<script>
import atrApi from '@/assets/js/api/atrApi.js';
import { useApiModal } from '~~/composables/useApiModal';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
;

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper'


const purchaseNoticeData = '寄送時間： 預計訂單成立後 7 個工作天內送達不含週六日及國定假日。如廠商有約定日將於約定日期內送達，約定日期需於訂單成立後 14天內。\n送貨方式： 透過宅配或是郵局送達。\n消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與 E - mail 均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。\n送貨範圍： 限台灣本島地區。注意！收件地址請勿為郵政信箱。若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址\n關於退貨: 由於本公司所販售的商品皆屬易於腐敗且保存期限較短之商品，依據消費者保護法之規定，將無法享有七天猶豫期之權益且不得辦理退貨。'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // const store = userStore();
    const { userStore } = useStore();
    const route = useRoute();
    const router = useRouter();
    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal, addToCart } = useApiModal();
    const product = ref({});
    const productImages = ref([]);
    const productQty = ref(1);
    const sameCategoryProducts = ref([]);
    const purchaseNotice = ref('');
    // bannerSwiper
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    // 管理員取得單一產品資料
    async function getProduct(id) {
      const res = await atrApi.getProduct(id);
      if (res.success) {
        product.value = JSON.parse(JSON.stringify(res.product));
        productImages.value = JSON.parse(JSON.stringify(res.product.imagesUrl))
        productImages.value.unshift(res.product.imageUrl);
        // console.log('productImages.value', res.product.imagesUrl)
        // console.log('categories.value', categories.value);
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message });
          // infoModal.value.openModal();
          router.push('/notFound');
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }


    // 取得產品資料
    async function getCategoryProducts() {
      const res = await atrApi.getNoPageProducts();
      if (res.success) {
        const products = JSON.parse(JSON.stringify(res.products));
        sameCategoryProducts.value = products.filter((item) => item.category === product.value.category);
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }

    const confirm = ref({
      confirmName: '加入購物車',
      confirmBtn: addToCart,
    });

    onMounted(() => {
      // console.log(`$route.params ${route.params.id}`);
      if (route.params.id) {
        getProduct(route.params.id);
        getCategoryProducts();
      }
      purchaseNotice.value = purchaseNoticeData.replace(/\n/g, '<br /><br />');
    });

    return {
      thumbsSwiper,
      setThumbsSwiper,
      purchaseNotice,
      product,
      productQty,
      productImages,
      messageContent,
      getProduct,
      addToCart,
      hideInfoModal,
      confirm,
      sameCategoryProducts,
      infoModal,
      modules: [Navigation, FreeMode, Thumbs, Autoplay],
      likesModules: [Navigation, Autoplay],
      // swiper,
    }

  },
}
</script>

