<template>
  <section class="pt-16  -mx-4 pl-1 bg-amber-50 h-full">
    <div class="w-full flex justify-end pr-8 py-12 ">

      <div class="relative w-full  border-2 border-black  flex justify-center items-center flex-wrap h-full text-gray-800 overflow-hidden">
        <div class="absolute right-5 bottom-10 w-[150px] h-[150px]" id="container">
<div id="circle" class="relative cursor-pointer" >
  <button type="button" class="absolute right-5 top-[70px] h-16 w-16 border-black border-4 bg-amber-400 rounded-full text-3xl font-bold">
      首
  </button>
<svg class="animate-rotate-faster " version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 300 300" enable-background="new 0 0 100 100" xml:space="preserve">
    <defs>
        <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
    </defs>
    <circle cx="80" cy="80" r="75" fill="none"/>
    <g>
        <use xlink:href="#circlePath" fill="none"/>
        <text class="font-thin" fill="#000">
            <textPath xlink:href="#circlePath">按這回首頁 ! 按這回首頁 ! 按這回首頁 ! 按這回首頁 ! </textPath>
        </text>
    </g>
</svg>
</div>
</div>

        <div class="w-1/2 absolute top-0 left-0 h-full bg-black flex ">
          <p class="text-vertical text-6xl text-white pl-5 pt-6 ">眾神意象</p>
          <p class="text-vertical text-xl text-gray-400 align-bottom ml-12 pb-10 text-right">海綿寶寶於 1990 年佈道場景</p>
        </div>
        <div class="w-3/5 mb-12 md:mb-0 relative z-10">
          <img
            src="@/assets/images/login_banner.webp"
            class="w-full object-cover h-auto saturate-50" alt="Phone image" />
        </div>
        <div class="w-1/5 relative bg-amber-400  flex flex-col justify-end  h-[550px] overflow-visible">
          <div class="absolute bottom-2 flex flex-col right-11 w-[420px] h-[480px]  z-20 px-8 py-6 bg-stone-900  shadow-xl"></div>
          <div class="absolute bottom-4 flex flex-col right-14 w-[420px] h-[480px]  z-20 px-8 py-6 bg-white  shadow-xl">
            <div class="absolute -top-1 -left-1 w-10 h-10 z-20 border-stone-900  border-l-8 border-t-8"></div>
            <h2 class="text-5xl text-center font-bold  mb-5 underline decoration-4 decoration-amber-400">登入</h2>
            <!-- form -->
            <v-form class="mt-auto border p-3" ref="userInputForm"  v-slot="{ errors }" >
              <!-- Email input -->
              <div class="mb-6">
                <v-field type="text" name="帳號" id="account"  :class="{ 'is-invalid': errors['帳號'] }" rules="required|email"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入帳號" v-model="account" />
              </div>
  
              <!-- Password input -->
              <div class="mb-6">
                <v-field type="password" name="密碼" id="password"  :class="{ 'is-invalid': errors['密碼'] }" rules="required"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入密碼" v-model="password" />
              </div>
  
              <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                  <input type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-3 align-bottom bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="rememberMe" checked />
                  <label class="form-check-label inline-block text-gray-800 text-sm" for="rememberMe">記住我</label>
                </div>
                <a href="#!"
                  class="text-black text-sm hover:text-amber-400 focus:text-amber-400 active:text-amber-400 duration-200 transition ease-in-out">
                  忘記密碼</a>
              </div>
  
              <!-- Submit button -->
              <button type="button"
                class="block px-7 py-3 bg-black text-white font-bold text-lg leading-snug uppercase rounded shadow-md hover:bg-amber-400  focus:bg-amber-500 active:bg-amber-500 transition duration-150 ease-in-out w-full mb-3"
                data-mdb-ripple="true" data-mdb-ripple-color="light" @click="submit(account, password)">
                登入
              </button>
  
              <!-- <a class="px-7 py-3 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                href="#!" role="button" data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-3.5 h-3.5 mr-2">
                  <path fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>使用 facebook 登入
              </a>
              <a class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                style="background-color: #55acee" href="#!" role="button" data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-3.5 h-3.5 mr-2">
                  <path fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>使用 twitter 登入
              </a> -->
            </v-form>
            <div class="flex justify-center">
              <button type="button" class="text-center text-sm text-stone-800 my-3">註冊</button>
            </div>
          </div>
          <div class="flex justify-end">
              <p class="text-3xl text-white  text-vertical uppercase font-bold pr-3 pb-4">login</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" />
</template>

<script>

// import { ref } from 'vue';
// import { useApiModal } from '@/hooks/useApiModal';
import { useApiModal } from '~~/composables/useApiModal';
// import useStore from '@/store';
import useStore from '@/store';
import { storeToRefs } from 'pinia';



export default {
  setup() {
    // const store = userStore();
    const { userStore } = useStore()
    // console.log('store', useStore, userStore);
    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal, login } = useApiModal();

    const password = ref('');
    const account = ref('');
    const userInputForm = ref(null);

    async function submit(account, password) {
      const res = await userInputForm.value.validate();
      if (res.valid) {
        if (password.trim && account.trim) {
          login(account, password)
        }
      } else {
        userStore.$patch((state) => { state.messageContent.message = '帳密有誤' });
        infoModal.value.openModal();
      }
    }
    definePageMeta({
      layout: false
    })
    return {
      password,
      account,
      submit,
      infoModal,
      messageContent,
      hideInfoModal,
      userInputForm
    }
  }

}


</script>


<style lang="scss" scoped>
.text-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>