<template>
  <main>
    <!-- breadcrumb -->
    <!-- product's id code -->
    <!-- swiper -->
    <div class="h-[350px] w-full">
      <swiper
          @swiper="setBannerSwiper"
          :loop="true"
          :slidesPerView="4"
          :spaceBetween="10"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper"
        >
        <swiper-slide  v-for="item in productImages" :key="item" >
          <img class="object-cover h-full" :src="item" :alt="item">
        </swiper-slide>
    </swiper>
    </div>
    <!-- title & price -->
    <div class="grid grid-cols-2 gap-4 mt-10">

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
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper';

// Import Swiper styles
// import 'swiper/css';
import '@/assets/styles/categories/swiper.scss';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import '@/assets/styles/categories/navigation.scss';


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
    const { hideInfoModal, infoModal } = useApiModal();
    const product = ref({});
    const productImages = ref([]);

    // bannerSwiper
    let bannerSwiper;
    const setBannerSwiper = (swiper) => {
      bannerSwiper = swiper;
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

    onMounted(() => {
      console.log(`$route.params ${route.params.id}`);
      if (route.params.id) {
        getProduct(route.params.id);
      }
    });

    return {
      bannerSwiper,
      setBannerSwiper,
      product,
      productImages,
      messageContent,
      getProduct,
      addToCart,
      hideInfoModal,
      infoModal,
      modules: [Navigation, FreeMode, Thumbs],
      // swiper,
    }

  },
}
</script>

