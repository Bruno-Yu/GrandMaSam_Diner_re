<template>
  <div>
    <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollable"
      aria-modal="true" role="dialog" ref="modal">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b bg-black/95 border-gray-200 rounded-t-md">
            <h5 class="text-xl font-bold leading-normal text-white" id="exampleModalCenteredScrollableLabel">
              <span v-if="isNew">新增挑戰</span>
              <span v-else>編輯挑戰</span>
            </h5>
            <button type="button"
              class="btn-close box-content w-6 h-6 p-1  border-none rounded-none text-white opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-amber-400 hover:opacity-100 hover:no-underline"
              data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle-fill text-xl "></i></button>
          </div>
          <div class="modal-body relative p-4">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <div class="flex justify-center">
                  <div class="mb-3 w-full">
                    <label for="title" class="form-label font-bold inline-block mb-2 text-gray-700">標題</label>
                    <input type="text" class="
                        form-control
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
                        focus:text-gray-700 focus:bg-white focus:outline-none
                      " id="title" v-model="tempChallenge.title" placeholder="請輸入標題" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                      <label for="code" class="form-label font-bold inline-block mb-2 text-gray-700">挑戰碼</label>
                      <input type="text" class="
                          form-control
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
                          focus:text-gray-700 focus:bg-white focus:outline-none
                        " id="code" v-model="tempChallenge.code" placeholder="請輸入挑戰碼" />
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                      <label for="date" class="form-label font-bold inline-block mb-2 text-gray-700">到期日</label>
                      <input type="date" class="
                          form-control
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
                          focus:text-gray-700 focus:bg-white focus:outline-none
                        " id="date" v-model="tempChallenge.due_date" />
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                      <label for="percent" class="form-label font-bold inline-block mb-2 text-gray-700">挑戰百分比</label>
                      <input type="number" class="
                          form-control
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
                          focus:text-gray-700 focus:bg-white focus:outline-none
                        " id="percent" v-model="tempChallenge.percent" placeholder="請輸入挑戰百分比" />
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-black bg-no-repeat bg-contain  focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox" role="switch" v-model="tempChallenge.is_enabled" :true-value="1" :false-value="0"
                      id="activate">
                    <label class="form-check-label inline-block text-gray-800" for="activate">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button type="button"
              class="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal">
              取消
            </button>
            <button type="button"
              class="inline-block px-6 py-2.5 bg-amber-400 text-black font-bold text-xs  leading-tight uppercase rounded shadow-md hover:bg-black hover:text-white hover:shadow-lg  hover:border-2 hover:border-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-1"
              @click="confirm(tempChallenge)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'tw-elements/dist/src/js/bs/src/modal';

export default {
  props: {
    currentItem: {
      type: Object,
      default: () => {}
    },
    isNew: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const { currentItem, isNew } = toRefs(props);
    const emptyBlank = {
      title: '',
      code: '',
      due_date: '',
      percent: 0,
      is_enabled: 0,
    };
    // 只有 tempProduct 1個原始值
    const tempChallenge = ref({});
    // modal
    const modal = ref(null);
    const bsModal = ref(null);

    function openModal() {
      bsModal.value.show();
    }
    function hideModal() {
      bsModal.value.hide();
    }
    function confirm(challenge) {
      if (isNew.value) {
        emit('add-challenge', challenge)
        bsModal.value.hide();
        tempChallenge.value = { ...emptyBlank };
      } else {
        emit('update-challenge', challenge);
        bsModal.value.hide();
        tempChallenge.value = { ...emptyBlank };
      }
    }
    watchEffect(() => {
      if (isNew.value) {
        tempChallenge.value = { ...emptyBlank };
      } else {
        tempChallenge.value = { ...currentItem.value };
      }
    })

    onMounted(() => {
      bsModal.value = new Modal(modal.value);
    })

    return {
      tempChallenge,
      modal,
      openModal,
      hideModal,
      confirm,
    }
  }
}




</script>



<style lang="scss" scoped>
.form-switch .form-check-input:checked {
  background-color: #f6bd03e4;
  border-color: black;
  /* background-position: right center; */
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 900px;
    margin: 1.75rem auto;
  }
}
</style>