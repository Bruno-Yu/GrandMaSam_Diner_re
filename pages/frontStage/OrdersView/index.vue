<template>
  <main class="px-10 py-10 mx-auto max-w-5xl mt-20">
    <!-- 購物車無商品時 -->
    <div v-if="!productsList.length">
      123
    </div>
    <template v-else>
      <!-- progress bar -->
      <div>
        <div v-if="currentStatus < 4 && currentStatus >= 0" class="max-w-4xl mx-auto my-4 pb-4">	
          <div class="flex pb-3">
            <div class="flex-1">
            </div>
            <template v-for="(item, index) in statusSteps" :key="index">
              <div class="flex-1" >
                <div class="w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center" :class="{ 'bg-amber-400': currentStatus >= index, 'bg-black': currentStatus < index }">
                  <span class="text-white text-center w-full"><i v-if="currentStatus >= index" class="bi bi-check-lg"></i><span v-else>{{ index + 1 }}</span></span>
                </div>
              </div>
              <div class="w-1/6 align-center items-center align-middle content-center  flex" :class="{ 'hidden': index === 3 }">
                <div class="w-full bg-gray-100 rounded items-center align-middle align-center flex-1" >
                <div class="bg-amber-400  text-xs leading-none py-1 text-center text-grey-darkest rounded " :class="{ 'w-full': currentStatus > index, 'w-0': currentStatus <= index }"></div>
                </div>
              </div>
            </template>
            <div class="flex-1">
            </div>		
          </div>
          <div class="flex content-center text-center font-bold">
            <template v-for="(item, index) in statusSteps" :key="index">
              <div class="w-1/4">
                {{ item }}
              </div>			
            </template>
          </div>
        </div>
        <div v-else class="max-w-7xl mx-auto my-4 pb-4">
          <h2 class="text-6xl font-bold text-center">  訂單資訊 </h2>
        </div>
        <!-- 訂購人資訊 -->
      <div class="accordion mb-5" id="personalInfo">
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingOne">
            <button class="
          accordion-button
          relative
          text-gray-600
          flex
          items-center
          w-full
          py-3
          px-5
          text-base text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
          font-bold
        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
              aria-controls="collapseOne">
              <font-awesome-icon class="w-5 h-5 text-gray-600 mr-2" icon="fa-solid fa-angle-down"></font-awesome-icon>
              訂購人資訊
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show " aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body py-4 px-5">
              <div  v-if="currentStatus >= 3" class="form-group mb-6">
                  <p class=" mb-2 text-sm font-bold text-gray-700 mr-2">訂單狀態 </p>
                  <p v-if="orderInfo.is_paid"  class="text-base font-bold text-green-500"> 訂單已付款 </p>
                  <p v-else  class="text-base font-bold text-gray-400"> 訂單尚未付款 </p>
              </div>
              <div v-if="currentStatus >= 2" class="grid grid-cols-2 gap-4">
                <div class="form-group mb-6">
                  <p class=" mb-2 text-sm font-bold text-gray-700 mr-2">訂單編號 </p>
                  <p  class="text-base font-normal text-gray-700"> {{ orderInfo.id }} </p>
                </div>
                    <div class="form-group mb-6">
                  <p class=" mb-2 text-sm font-bold text-gray-700 mr-2">購買日期 </p>
                  <p  class="text-base font-normal text-gray-700"> {{ orderInfo.create_at }} </p>
                  </div>
                </div>
              <v-form ref="userInputForm" v-slot="{ errors }">
                <div class="grid grid-cols-2 gap-4">
                  <!-- 姓名 -->
                  <div class="form-group mb-6">
                    <template v-if="currentStatus < 2 && currentStatus >= 0">
                      <label for="userName" class="form-label inline-block mb-2 text-sm font-bold text-gray-700">姓名</label>
                      <v-field type="text" id="userName" placeholder="請輸入姓名" name="姓名"
                        :class="{ 'is-invalid': errors['姓名'] }" rules="required" v-model="userInput.userName" :readOnly="currentStatus" class="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none" />
                      <error-message name="姓名" class="invalid-feedback" />
                    </template>
                    <template v-else>
                      <div>
                        <p class=" mb-2 text-sm font-bold text-gray-700 mr-2">姓名 </p>
                        <p  class="text-base font-normal text-gray-700"> {{ orderInfo.user.name }} </p>
                      </div>
                    </template>
                  </div>
                  <!-- 手機 -->
                  <div class="form-group mb-6">
                    <template  v-if="currentStatus < 2 && currentStatus >= 0">
                      <div>
                        <label for="phone" class="form-label inline-block mb-2 text-sm font-bold text-gray-700">手機</label>
                        <v-field type="tel" name="手機" id="phone" placeholder="請輸入手機號碼"  :readOnly="currentStatus" :class="{ 'is-invalid': errors['手機'] }"
                          :rules="verifyPhone" v-model="userInput.phone" class="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                        <error-message name="手機" class="invalid-feedback" />
                      </div>
                    </template>
                    <template v-else>
                      <div>
                        <p class=" mb-2 text-sm font-bold text-gray-700 mr-2">手機 </p>
                        <p  class="text-base font-normal text-gray-700"> {{ orderInfo.user.tel }} </p>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- email -->
                <div class="form-group mb-6">
                  <template  v-if="currentStatus < 2 && currentStatus >= 0">
                  <div>
                    <label for="email" class="form-label inline-block mb-2  text-sm font-bold text-gray-700">電子信箱</label>
                    <v-field type="email" id="email" name="電子信箱" placeholder="請輸入信箱地址"
                      :class="{ 'is-invalid': errors['電子信箱'] }" rules="email|required" v-model="userInput.email" :readOnly="currentStatus" class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                    <error-message name="電子信箱" class="invalid-feedback" />
                  </div>
                  </template>
                    <template v-else>
                      <div>
                        <p class=" mb-2 text-sm font-bold text-gray-700 mr-2"> 電子信箱</p>
                        <p  class="text-base font-normal text-gray-700"> {{ orderInfo.user.email }} </p>
                      </div>
                    </template>
                </div>
                <!-- 地址 -->
                <div class="form-group mb-6">
                  <template  v-if="currentStatus < 2 && currentStatus >= 0">
                    <div>
                      <label for="address" class="form-label inline-block mb-2  text-sm font-bold text-gray-700">地址</label>
                      <v-field type="text" id="address" name="地址" placeholder="請輸入地址" :class="{ 'is-invalid': errors['地址'] }" :readOnly="currentStatus"
                        rules="required" v-model="userInput.address" class="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                      <error-message name="地址" class="invalid-feedback" />
                    </div>
                  </template>
                  <template v-else>
                      <div>
                        <p class=" mb-2 text-sm font-bold text-gray-700 mr-2"> 地址</p>
                        <p  class="text-base font-normal text-gray-700"> {{ orderInfo.user.address }} </p>
                      </div>
                  </template>
                </div>
                <!-- 留言 -->
                <div class="form-group mb-6">
                  <template  v-if="currentStatus < 2 && currentStatus >= 0">
                    <div>
                      <label for="message" class="form-label inline-block mb-2  text-sm font-bold text-gray-700">留言</label>
                      <textarea type="text" id="message" name="留言" v-model="userInput.message" placeholder="若有其他要求或希望注意事項請在這邊輸入" :readOnly="currentStatus"
                      class="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                    </div>
                  </template>
                  <template v-else>
                      <div>
                        <p class=" mb-2 text-sm font-bold text-gray-700 mr-2"> 留言</p>
                        <p  class="text-base font-normal text-gray-700" > {{ orderInfo.message }} </p>
                      </div>
                  </template>
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </div>
  
      <div class="accordion mb-5" id="orderDetail">
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="header">
            <button class="
          accordion-button
          relative
          text-gray-600
          flex
          items-center
          w-full
          py-3
          px-5
          text-base  text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
          font-bold
        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
              aria-controls="collapseOne">
              <font-awesome-icon class="w-5 h-5 text-gray-600 mr-2" icon="fa-solid fa-angle-down"></font-awesome-icon>
              購買明細
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show " aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body py-4 px-5">
              <ul class="border rounded p-2">
                <li v-for="(item, index) in productsList" :key="item.id" class="flex justify-center w-full">
                  <div class="grid grid-cols-4 gap-4 rounded-lg bg-white shadow  w-full">
                    <div class="p-1  col-span-2">
                      <img class="w-full h-28 object-cover rounded " :src="item.product.imageUrl"
                        :alt="item.product_id" />
                    </div>
                    <div class="p-2 col-span-2 justify-start w-full relative">
                      <div class="grid grid-cols-3 items-center">
                        <div  v-if="!editMode[index]" class="col-span-2">
                          <h5 class="text-gray-900 font-medium mb-2">{{ item.product.title }}</h5>
                          <p class="text-gray-600 text-xs">購買日期: {{ dayjs().format('YYYY-MM-DD') }}</p>
                          <div class="flex justify-between items-center border-b border-gray-300 mt-1">
                            <p class="text-gray-600 text-xs">份數 x{{ item.qty }} </p>
                            <p class="text-gray-600 text-xs">TWD {{ helper.numberWithCommas(item.product.price) }}</p>
                          </div>
                          <div class="flex justify-between items-center mt-1">
                            <p class="font-bold text-sm">總金額</p>
                            <p class="text-gray-600 text-xs">TWD {{ helper.numberWithCommas(item.total) }}</p>
                          </div>
                        </div>
                        <div v-else class="col-span-2">
                          <h5 class="text-gray-900 font-medium mb-2">{{ item.product.title }}</h5>
                            <!-- 加減 -->
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
                                :value="productQty"
                                class="border-0 text-black text-center bg-primary w-full pt-2.5 font-medium uppercase leading-normal 
                                transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 
                                focus:outline-none focus:ring-0 active:bg-primary-700"
                                readonly="readonly"
                                />
                              <button
                                type="button"
                                class="inline-block rounded-full text-center"
                                @click="productQty = productQty + 1"
                                >
                                <i class="bi bi-plus mx-2"></i>
                              </button>
                            </div>
                            <div class="grid grid-cols-2 mt-1">
                              <p class="text-gray-600 text-xs"> {{ `每份 TWD ${helper.numberWithCommas(item.product.price)}` }}</p>
                              <p class="text-gray-600 text-xs"> {{ `總金額 TWD ${helper.numberWithCommas(item.product.price) * productQty}` }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-center" :class="{ 'hidden': currentStatus !== 0 }">
                          <button  v-if="!editMode[index]" type="button" class="py-1 px-3 text-base border text-gray-600 shadow rounded hover:bg-black hover:text-amber-400 hover:font-bold" @click="editModeOn(index, item.qty)">編輯</button>
                          <div v-else class="flex gap-4 items-center">
                            <button type="button" class="flex flex-col items-center group" @click="editCart(index, item.id, item.product.id)">
                              <i class="bi bi-check-square-fill font-bold text-lg text-gray-600 group-hover:text-green-600"></i>
                              <p class="font-bold text-sm items-center text-gray-600 mt-1 group-hover:text-green-600 group-hover:font-bold">確認</p>
                            </button>
                            <button type="button" class="flex flex-col items-center group mt-1">
                              <font-awesome-icon class="w-5 h-5 text-gray-600 group-hover:text-red-600" icon="fa-regular fa-trash-can"
                                @click="deleteCart(item.id)"></font-awesome-icon>
                              <p class="font-bold text-sm items-center text-gray-600 mt-2 group-hover:text-red-600  group-hover:font-bold">刪除</p>
                            </button>
                          </div>
      
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="accordion bg-white border border-gray-200 py-4 px-5 mb-5" id="totalPrice">
        <div class="grid grid-cols-2 w-full">
          <div class="flex justify-start items-center">
            <button type="button"
              class=" inline-block px-6 py-2.5 bg-gray-400 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none transition duration-150 ease-in-out"
              :class="{ 'hidden': currentStatus !== 1 }"
              @click="currentStatus -= 1">返回</button>
          </div>
          <div class="flex justify-end items-center gap-4">
            <p class="text-gray-600">{{ totalQty }} 件商品共 <span class="text-gray-700 text-lg"> TWD {{ finalTotal }}</span>
            </p>
            <button type="button"
              class=" inline-block px-6 py-2.5 bg-black text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-black hover:shadow-lg  transition duration-150 ease-in-out"
              @click="confirmBtn">{{ nextStep[currentStatus] }}</button>
          </div>
        </div>
  
      </div>
      </div>
    </template>
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" />
  </main>
</template>

<script>
import atrApi from '@/assets/js/api/atrApi.js';
import dayjs from 'dayjs/esm/index.js';
import helper from '@/assets/js/helper';
// import { ref, onMounted } from 'vue';
import { useApiModal } from '~~/composables/useApiModal';
import useStore from '@/store';
import { storeToRefs } from 'pinia';


const statusSteps = ['填寫訂單', '確認明細', '訂單明細', '訂單付款']

const nextStep = ['確認', '確認', '確認訂單', '立即付款', '回到商城']

export default {
  setup() {
    const { hideInfoModal, infoModal, getCart, cartProducts, finalTotal, totalQty, deleteCartProduct, checkQty, catchErrorToast, catchErrorModal, } = useApiModal();
    const { userStore } = useStore();
    // const store = userStore();
    const { messageContent } = storeToRefs(userStore);
    const router = useRouter();
    const currentStatus = ref(0);
    // 顯示的產品清單
    const productsList = ref([]);
    // 使用者輸入
    const userInput = ref({
      userName: '',
      phone: '',
      email: '',
      address: '',
      message: '',
    })

    const userInputForm = ref(null);
    // 自訂驗證
    function verifyPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) && value.length >= 8 && value.length <= 10 ? true : '需要正確的電話號碼';
    }

    // 確認
    async function confirm() {
      const res = await userInputForm.value.validate();
      // console.log(res, res.valid);
      if (res.valid) {
        return true;
      } else {
        userStore.$patch((state) => { state.messageContent.message = '填寫有誤' });
        infoModal.value.openModal();
        return false;
      }
    }

    // editMode 編輯鍵
    const editMode = ref([]);

    // 編輯位置的產品數
    const productQty = ref(0);

    // 編輯鍵功能
    function editModeOn(index, num) {
      editMode.value[index] = true;
      productQty.value = num
    }

    // 編輯購物車
    async function editCart(index, id, product_id) {
      const data = {
        product_id, qty: productQty.value,
      }
      const res = await atrApi.editCart(id, data);
      if (res.success) {
        // console.log(res);
        editMode.value[index] = false;
        getCart();
        productQty.value = 1;
        userStore.$patch((state) => { state.messageContent.message = res.message });
      } else {
        catchErrorModal(res.response.data.message);
        // if (typeof res.response.data.message === 'string') {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        // } else {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        // }
      }
      infoModal.value.openModal();
    }
    // 刪除購物車
    function deleteCart(id) {
      deleteCartProduct(id);
      editMode.value = [];
      for (let i = 0; i < productsList.value.length; i++) {
        editMode.value.push(false);
      }
    }

    // 確認按鈕
    async function confirmBtn() {
      if (currentStatus.value === 0) {
        if (confirm()) {
          currentStatus.value += 1;
        } else {
          return;
        }
      } else if (currentStatus.value === 1) {
        generateOrder();
      } else if (currentStatus.value === 2) {
        currentStatus.value += 1;
      } else if (currentStatus.value === 3) {

        confirmToPay();
      } else {
        router.push('/frontStage/productsView');
      }
    }

    //

    // 訂單資訊
    const orderInfo = ref({});
    //  產生訂單
    async function generateOrder() {
      const { userName: name, email, phone: tel, address, message } = userInput.value;
      const res = await atrApi.generateOrder({ name, email, tel, address, message });
      if (res.success) {
        const { total, create_at, orderId } = res;
        orderInfo.value = { total, create_at, orderId };
        userStore.$patch((state) => { state.messageContent.message = res.message });
        getOrder();

      } else {
        catchErrorModal(res.response.data.message);
        // if (typeof res.response.data.message === 'string') {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        // } else {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        // }
      }
      infoModal.value.openModal();
    }

    //  取得單一訂單
    async function getOrder() {
      const res = await atrApi.getOrder(orderInfo.value.orderId);
      if (res.success) {
        const { order } = res;
        orderInfo.value = JSON.parse(JSON.stringify(order));
        productsList.value = JSON.parse(JSON.stringify(Object.values(order.products)));
        finalTotal.value = order.total;
        totalQty.value = checkQty(productsList.value);

        editMode.value = [];
        for (let i = 0; i < productsList.value.length; i++) {
          editMode.value.push(false);
        }
        currentStatus.value += 1;
      } else {
        catchErrorModal(res.response.data.message);
        // if (typeof res.response.data.message === 'string') {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        // } else {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        // }
      }
      infoModal.value.openModal();
    }

    //  訂單付款
    async function confirmToPay() {
      const res = await atrApi.confirmToPay(orderInfo.value.id);
      if (res.success) {
        userStore.$patch((state) => { state.messageContent.message = res.message });
        getOrder();
        currentStatus.value += 1;
      } else {
        catchErrorModal(res.response.data.message);
        // if (typeof res.response.data.message === 'string') {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message })
        // } else {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        // }
      }
      infoModal.value.openModal();
    }

    watch(cartProducts, function check(newVal, oldVal) {
      if (newVal.length && (currentStatus.value === 0 || currentStatus.value === 1)) {
        productsList.value = JSON.parse(JSON.stringify(newVal));
        for (let i = 0; i < productsList.value; i++) {
          editMode.value.push(false);
        }
      }
    },
      { deep: true }
    );

    onMounted(() => {
      getCart();
      // if (currentStatus.value === 0 || currentStatus.value === 1) {
      //   productsList.value = JSON.parse(JSON.stringify(cartProducts.value));
      // }


    });

    return {
      messageContent,
      hideInfoModal,
      statusSteps,
      infoModal,
      currentStatus,
      cartProducts,
      productsList,
      finalTotal,
      productQty,
      dayjs,
      helper,
      totalQty,
      confirm,
      userInput,
      verifyPhone,
      userInputForm,
      editMode,
      editModeOn,
      editCart,
      confirmBtn,
      deleteCart,
      nextStep,
      orderInfo,
    }

  },
}
</script>

<style scoped>
.accordion-button:not(.collapsed) {
  color: rgb(51, 51, 51);
}

.accordion-button:not(.collapsed)::after {
  display: none;
}
</style>