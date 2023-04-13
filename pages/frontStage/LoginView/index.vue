<template>
  <section class="pt-16  -mx-4 pl-1 bg-amber-50 h-full">
    <div class="w-full flex justify-end pr-8 py-12 ">

      <div class="relative w-full  border-2 border-black  flex justify-center items-center flex-wrap h-full text-gray-800 overflow-hidden">
        <!--回首頁按鈕-->
        <div class="absolute right-5 bottom-10 w-[150px] h-[150px]" id="container">
          <NuxtLink id="circle" class="group block relative cursor-pointer"  to="/frontStage" >
            <button type="button" class="absolute right-5 top-[70px] h-16 w-16 text-center border-black border-4 bg-amber-400 rounded-full text-3xl font-bold group-hover:bg-black group-hover:text-white">
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
          </NuxtLink>
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
        <div class="w-1/5 relative bg-amber-400  flex flex-col justify-end  min-h-[550px] overflow-visible" :class="{ 'h-[650px]': currentPage === 'signup' }">
          <div class="absolute bottom-2 flex flex-col right-11 w-[420px] min-h-[480px]  z-20 px-8 py-6 bg-stone-900  shadow-xl"  :class="{ 'h-[550px]': currentPage === 'signup' }"></div>
          <div class="absolute bottom-4 flex flex-col right-14 w-[420px] min-h-[480px]  z-20 px-8 py-6 bg-white  shadow-xl">
            <div class="absolute -top-1 -left-1 w-10 h-10 z-20 border-stone-900  border-l-8 border-t-8"></div>
            <h2 class="text-5xl text-center font-bold  mb-5 underline decoration-4 decoration-amber-400"> {{ currentPage === 'login' ? '登入' : '註冊' }}</h2>
            <!-- login form -->
            <v-form v-if="currentPage === 'login'" class="mt-auto border p-3" ref="userLoginForm"  v-slot="{ errors }" >
              <!-- Email input -->
              <div class="mb-6">
                <v-field type="text" name="帳號" id="account"  :class="{ 'is-invalid': errors['帳號'] }" rules="required|email"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入帳號" v-model="account" />
                  <error-message name="帳號" class="invalid-feedback"/>
              </div>
              <!-- Password input -->
              <div class="mb-6">
                <v-field type="password" name="密碼" id="password"  :class="{ 'is-invalid': errors['密碼'] }" rules="required"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入密碼" v-model="password" />
                  <error-message name="密碼" class="invalid-feedback"/>
              </div>
  
              <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                  <input type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-3 align-bottom bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="rememberMe" checked />
                  <label class=" mt-2 form-check-label inline-block text-gray-800 text-sm" for="rememberMe">記住我</label>
                </div>
                <a href="#!"
                  class="text-black text-sm hover:font-bold hover:underline hover:decoration-4 hover:decoration-amber-400">
                  忘記密碼</a>
              </div>
  
              <!-- Submit button -->
              <button type="button"
                class="block px-7 py-3 bg-black text-white font-bold text-lg leading-snug uppercase rounded shadow-md hover:bg-amber-400 hover:text-black focus:bg-amber-500 active:bg-amber-500 transition duration-150 ease-in-out w-full mb-3"
                data-mdb-ripple="true" data-mdb-ripple-color="light" @click="submit(account, password)">
                {{ currentPage === 'login' ? '登入' : '註冊' }}
              </button>
            </v-form>
            <!-- signup form -->
            <v-form v-else class="mt-auto border p-3" ref="userSignupForm"  v-slot="{ errors }" >
            <!-- Name input -->
              <div class="mb-6">
                <v-field type="text" name="稱謂" id="name"  :class="{ 'is-invalid': errors['稱謂'] }" rules="required"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入姓名" v-model="name" />
                  <error-message name="稱謂" class="invalid-feedback"/>
              </div>
              
              <!-- Email input -->
              <div class="mb-6">
                <v-field type="text" name="帳號" id="account"  :class="{ 'is-invalid': errors['帳號'] }" rules="required|email"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入郵箱帳號" v-model="account" />
                  <error-message name="帳號" class="invalid-feedback"/>
              </div>
  
              <!-- Password input -->
              <div class="mb-6">
                <v-field type="password" name="密碼" id="password"  :class="{ 'is-invalid': errors['密碼'] }" rules="required"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請輸入密碼" v-model="password" />
                  <error-message name="密碼" class="invalid-feedback"/>
              </div>

              <!-- confirm input -->
              <div class="mb-6">
                <v-field type="password" name="再次輸入密碼" id="confirmPassword"  :class="{ 'is-invalid': errors['再次輸入密碼'] }"  :rules="{ is: password }"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="請再次輸入密碼" v-model="cfmPass" />
                  <error-message name="再次輸入密碼" class="invalid-feedback"/>
              </div>
  
              <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                  <input type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-3 align-bottom bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="rememberMe" checked />
                  <label class=" mt-2 form-check-label inline-block text-gray-800 text-sm" for="rememberMe">同意會員條款</label>
                </div>
              </div>
  
              <!-- Submit button -->
              <button type="button"
                class="block px-7 py-3 bg-black text-white font-bold text-lg leading-snug uppercase rounded shadow-md hover:bg-amber-400 hover:text-black focus:bg-amber-500 active:bg-amber-500 transition duration-150 ease-in-out w-full mb-3"
                data-mdb-ripple="true" data-mdb-ripple-color="light" @click="submit(account, password)">
                {{ currentPage === 'login' ? '登入' : '註冊' }}
              </button>
            </v-form>
            <div class="flex justify-center">
              <button type="button" class="text-center text-sm text-stone-800 my-3 hover:font-bold hover:underline hover:decoration-4 hover:decoration-amber-400" @click="changeCurrentPage">{{ currentPage === 'login' ? '註冊' : '登入' }}</button>
            </div>
          </div>
          <div class="flex justify-end">
              <p class="text-3xl text-white  text-vertical uppercase font-bold pr-3 pb-4">this is {{ currentPage }} page</p>
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
    definePageMeta({
      layout: false
    })
    // const store = userStore();
    const { userStore } = useStore()
    // console.log('store', useStore, userStore);
    const { messageContent } = storeToRefs(userStore);
    const { hideInfoModal, infoModal, login } = useApiModal();
    // 利用 currentPage 的 值區分 login 以及 signup
    const currentPage = ref('login');
    const name = ref('');
    const password = ref('');
    const account = ref('');
    const cfmPass = ref('');
    const userLoginForm = ref(null);
    const userSignupForm = ref(null);

    // 轉換目前頁面
    function changeCurrentPage() {
      if (currentPage.value === 'login') {
        currentPage.value = 'signup';
      } else if (currentPage.value === 'signup') {
        currentPage.value = 'login';
      }
    };

    // 驗證方法 & 執行 login 或 signup
    async function submit(account, password) {
      if (currentPage.value === 'login') {
        const res = await userLoginForm.value.validate();
        if (res.valid) {
          if (password.trim && account.trim) {
            login(account, password)
          }
        } else {
          userStore.$patch((state) => { state.messageContent.message = '帳密有誤' });
          infoModal.value.openModal();
        }
      } else {
        await userSignupForm.value.validate();
      }
    }

    return {
      name,
      password,
      cfmPass,
      account,
      submit,
      infoModal,
      messageContent,
      hideInfoModal,
      userLoginForm,
      userSignupForm,
      currentPage,
      changeCurrentPage,
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