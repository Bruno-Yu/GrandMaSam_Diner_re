<template>
  <div class="default-layout relative">
    <!-- front navbar -->
    <nav class="
          fixed
          let-0
          right-0
          top-0
          h-[85px]
          w-full
          flex flex-wrap
          items-center
          justify-between
          py-4
          bg-white/0
          text-gray-500
          group
          hover:shadow-lg
          transition ease-in-out delay-250  -translate-y-[60px] 
          hover:translate-y-0
          hover:bg-white/99
          hover:cursor-pointer
          focus:translate-y-0
          hover:bg-white/95
          navbar navbar-expand-lg navbar-light
          z-50
          ">
      <div class="container-fluid w-full flex flex-wrap items-center px-6">
        <button class="
              navbar-toggler
              text-gray-500
              border-0
              hover:shadow-none hover:no-underline
              py-2
              px-2.5
              bg-transparent
              focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
            " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="w-6" role="img"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
            </path>
          </svg>
        </button>
        <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <NuxtLink class="
                  hidden
                  group-hover:block
                  hover:text-gray-900
                  focus:text-gray-900
                  mt-2
                  lg:mt-0
                  mr-auto
                " to="/frontStage" exact-active-class="no-active" >
            <p class=" text-gray-900 text-3xl font-serif">GRANDMA SAM DINER</p>
            <p class=" text-gray-900 text-base text-center font-serif"> LET MAKE AMERICA GREAT AGAIN</p>
          </NuxtLink>
          <!-- Left links -->
          <ul class="navbar-nav flex flex-col pl-0 list-style-none ms-auto">
            <li class="nav-item p-2">
              <NuxtLink class="nav-link text-gray-500  text-base hover:text-amber-400 focus:text-amber-400 p-0"
                to="/frontStage"><i class="bi bi-journals"></i> 故事 </NuxtLink>
            </li>
            <li class="nav-item p-2">
              <NuxtLink class="nav-link text-gray-500 text-base hover:text-amber-400 focus:text-amber-400 p-0"
                to="/frontStage/productsView" ><i class="bi bi-shop"></i> 商店 </NuxtLink>
            </li>
            <li class="nav-item p-2">
              <NuxtLink class="nav-link text-gray-500 text-base hover:text-amber-400 focus:text-amber-400 p-0"
                to="/frontStage/challengesView"><i class="bi bi-flag"></i> 挑戰 </NuxtLink>
            </li>
            <!-- <li class="nav-item p-2">
            <RouterLink class="nav-link text-gray-500 hover:text-amber-400 focus:text-amber-400 p-0" to="shoppingCart">購物車
            </RouterLink>
          </li> -->
            <li class="nav-item  p-2 dropdown relative">
              <a class="dropdown-toggle pr-2 lg:px-2 text-base text-gray-500 hover:text-amber-400 focus:text-amber-400 transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                href="#" type="button" id="dropdownMenuButton1" aria-expanded="false"
                @click.prevent="toggleCartDropdown"><i class="bi bi-suit-heart"></i> <span class="pl-1">收藏</span>
              </a>
            </li>
            <!-- <RouterLink class="nav-link text-gray-500 hover:text-amber-400 focus:text-amber-400 p-0" to="shoppingCart">購物車
            </RouterLink> -->
            <li class="nav-item p-2">
              <NuxtLink class="nav-link text-base text-gray-500 hover:text-amber-400 focus:text-amber-400 p-0"
                to="/frontStage/ordersView" ><i class="bi bi-bag"></i> 訂購 </NuxtLink>
            </li>
            <li class="nav-item p-2">
              <NuxtLink class="nav-link text-base text-gray-500 hover:text-amber-400 focus:text-amber-400 p-0"
                to="/frontStage/billboardView"><i class="bi bi-megaphone"></i> 公告 </NuxtLink>
            </li>
            <li class="nav-item p-2">
              <NuxtLink class="nav-link text-base text-gray-500 hover:text-amber-400 focus:text-amber-400 p-0"
                to="/frontStage/loginView"><i class="bi bi-person"></i> 登入 </NuxtLink>
            </li>
            <!-- <li class="nav-item p-2">
            <a class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">註冊</a>
          </li> -->
          </ul>
          <!-- Left links -->
        </div>
      </div>
    </nav>
    <!-- 內容 -->
    <div class="w-full">
      <toastMessages />
      <slot />
    </div>
    <!-- footer -->
    <footer class="bg-black py-10">
      <NuxtLink class=" 
                                                                                block
                                                                                my-2
                                                                                lg:mt-0
                                                                                mr-auto
                                                                              " to="/" exact-active-class="no-active">
        <p class="text-amber-400 text-3xl
                                                                                font-serif text-center">GRANDMA SAM DINER
        </p>
        <p class="text-amber-400 text-base text-center
                                                                                font-serif"> LET MAKE AMERICA GREAT AGAIN
        </p>
      </NuxtLink>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="mb-2">
          <h5 class="font-serif font-bold text-center text-white mb-2">聯絡我們</h5>
          <div class="flex flex-col justify-center item-center">
            <ul class="list-none flex gap-4 mx-auto mb-1.5">
              <li>
                <NuxtLink to=""><i class="bi bi-facebook text-xl text-amber-400"></i></NuxtLink>
              </li>
              <li>
                <NuxtLink to=""><i class="bi bi-instagram  text-xl text-amber-400"></i></NuxtLink>
              </li>
              <li>
                <NuxtLink to=""><i class="bi bi-twitter  text-xl text-amber-400"></i></NuxtLink>
              </li>
            </ul>
            <ul class="list-none mx-auto">
              <li class="text-white text-sm mb-0.5">
                <i class="bi bi-buildings-fill text-amber-400 text-sm pr-1"></i> 公司: 山姆大嬸餐飲投機無限公司
              </li>
              <li class="text-white text-sm mb-0.5">
                <i class="bi bi-telephone-inbound text-amber-400 text-sm pr-1"></i> 訂位服務專線: ( 0204 ) 5487487
              </li>
              <li class="text-white text-sm mb-0.5">
                <i class="bi bi-phone text-amber-400 text-sm pr-1"></i> 電話: ( 02 ) 2311 3731
              </li>
              <li class="text-white text-sm mb-0.5">
                <i class="bi bi-cursor-fill text-amber-400 text-sm pr-1"></i> 地址: 100台北市中正區中山南路21號
              </li>
              <li class="text-white text-sm mb-0.5">
                <i class="bi bi-clock text-amber-400 text-sm pr-1"></i> 營業時間: 24 hrs
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-2">
          <h5 class="font-serif font-bold text-center text-white mb-2">關於作品</h5>
          <div class="flex flex-col justify-center item-center  border border-white max-w-md mx-auto px-2 py-4">
            <p class="text-sm text-white mb-2">此網頁並非商業使用，僅作為個人學習、娛樂以及六角作業繳交使用，若需要引用或作為商業用途，請先諮詢六角學院</p>
            <p class="text-sm text-white mb-2">此作內容全是杜撰，也無任何隱射之意，若有雷同處純屬巧合，若有冒犯之處還請海函</p>
          </div>
        </div>
      </div>
      <p class="mx-auto py-3 text-sm text-gray-400 border-0 text-center"> Copyright © 2023 Grandma-Sam-Diner. All rights
        reserved. </p>
      <p class="mx-auto py-3 text-xs text-gray-600 border-0 text-center"> 版權所有，翻印舅舅，一位很愛翻印的舅舅 </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<script setup>
// import { useApiModal } from '~~/composables/useApiModal';
// import { onMounted, ref } from 'vue';
// // import { useRouter } from 'vue-router';

// const { getCart, cartProducts, finalTotal, deleteCartProduct } = useApiModal();

// //     // 購物車下拉表單
// const cartDropdown = ref(null);
// function toggleCartDropdown() {
//   cartDropdown.value.classList.toggle('hidden');
// }

// function closeCartDropdown() {
//   if (cartDropdown.value.classList.contains('hidden')) {
//     return;
//   } else {
//     cartDropdown.value.classList.add('hidden');
//   }
// }

// //     // const router = useRouter();
// function goToOrdersView() {
//   toggleCartDropdown();
//   navigateTo({ path: '/orders' });
// }

// onMounted(() => {
//   getCart();
// });

</script>




<style scoped lang="scss" src="@/assets/styles/default_layout.scss" />
