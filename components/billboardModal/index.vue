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
              <span v-if="isNew">新增文章</span>
              <span v-else>編輯文章</span>
            </h5>
            <button type="button"
              class="btn-close box-content w-6 h-6 p-1  border-none rounded-none text-white opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-amber-400 hover:opacity-100 hover:no-underline"
              data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle-fill text-xl "></i></button>
          </div>
          <div class="modal-body relative p-4">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4  flex flex-col items-center">
                <div class="mb-3 w-full">
                  <label for="imgUrl" class="form-label font-bold inline-block mb-2 text-gray-700">輸入封面圖片網址</label>
                  <input type="url" class="
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
                    " id="imgUrl" v-model="tempArticle.imageUrl" placeholder="請輸入圖片網址" />
                  <img class="w-full h-auto block mt-2" :src="tempArticle.imageUrl" :alt="tempArticle.imageUrl">
                </div>
                <!-- <div class="flex justify-center">
                  <div class="mb-3 w-full">
                    <label for="imgUpload" class="form-label inline-block mb-2 text-gray-700">或 上傳圖片</label>
                    <div v-if="imgUploadLoading"
                      class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <input class="form-control
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
                    focus:text-gray-700 focus:bg-white focus:outline-none" type="file"
                      @change="uploadImg" id="imgUpload">
                  </div>
                </div> -->
                
              </div>
              <div class="col-span-8">
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
                      " id="title" v-model="tempArticle.title" placeholder="請輸入標題" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex justify-center">
                    <div class="mb-3 w-full">
                      <label for="author" class="form-label font-bold inline-block mb-2 text-gray-700">作者</label>
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
                      " id="author" v-model="tempArticle.author" placeholder="請輸入作者姓名" />
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <div class="mb-3 w-full">
                      <label for="createDate" class="form-label font-bold inline-block mb-2 text-gray-700">文章建立日期</label>
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
                        " id="createDate" v-model="tempArticle.create_at" placeholder="請選擇文章建立日期" />
                    </div>
                  </div>
                </div>
                <div class="w-full">
                  <div class="flex justify-center">
                    <div class="mb-3 w-full">
                      <p class=" font-bold inline-block mb-2 text-gray-700">標籤</p>
                      <div v-if="tempArticle.tag" class="flex gap-1 mb-3 w-full border p-1">
                          <div  v-for="(label, key) in tempArticle.tag" :key="key" class="inline-block w-1/5 relative border border-gray-300 rounded overflow-hidden">
                            <input
                              type="text"
                              class="border-0"
                              v-model="tempArticle.tag[key]"
                              placeholder="增加標籤"
                            />
                            <button
                              type="button"
                              class="absolute top-3 right-1 rounded-full w-5 h-5 p-1 text-xl font-bold text-white bg-red-400 flex justify-center items-center align-bottom"
                              @click="tempArticle.tag.splice(key, 1)"
                            >
                              <i class="bi bi-x block"></i>
                            </button>
                        </div>
                        <div  class="inline-block w-1/5 relative border border-gray-300 rounded overflow-hidden">
                            <input
                              type="text"
                              class="border-0"
                              v-model="tempArticle.tag[tempArticle.tag.length]"
                              placeholder="增加標籤"
                            />
                            <button
                              type="button"
                              class="absolute top-3 right-1 rounded-full w-5 h-5 p-1 text-xl font-bold text-black flex justify-center items-center align-bottom"
                            >
                              <i class="bi bi-plus-circle-fill block"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="flex justify-center mt-4">
                  <div class="mb-3 w-full">
                    <label for="briefDescription" class="form-label font-bold inline-block mb-2 text-gray-700">文章簡述</label>
                    <textarea class="
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
                      " id="briefDescription" rows="3" v-model="tempArticle.description"
                      placeholder="請輸入商品簡述"></textarea>
                  </div>
                </div>
                <div class="mb-4"> 
                  <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    v-model="tempArticle.content"
                  ></ckeditor>
                </div>
                <!-- <div class="flex justify-center  my-4">
                  <div class="mb-3 w-full">
                    <label for="description" class="form-label font-bold inline-block mb-2 text-gray-700">商品說明</label>
                    <textarea class="
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
                      " id="description" rows="3" v-model="tempArticle.content" placeholder="請輸入商品說明"></textarea>
                  </div>
                </div> -->
                <div class="flex">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-black bg-no-repeat bg-contain  focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox" role="switch" v-model="tempArticle.isPublic" :true-value="true" :false-value="false"
                      id="activate">
                    <label class="form-check-label inline-block text-gray-800" for="activate">是否公開</label>
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
              @click="confirm(tempArticle)">
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
      category: '',
      rating: 0,
      description: '',
      price: 0,
      num: 0,
      origin_price: 0,
      imagesUrl: [],
      imageUrl: '',
      is_enabled: 0,
    };
    // 只有 tempArticle 1個原始值
    const rating = ref(0);
    const tempArticle = ref({});
    const imgUploadLoading = ref(false);
    // ckeditor 套件使用的參數
    const editor = ClassicEditor;
    // const editorData = ref('');
    const editorConfig = ref({});

    function uploadImg() {}
    // modal
    const modal = ref(null);
    const bsModal = ref(null);

    function openModal() {
      bsModal.value.show();
    }
    function hideModal() {
      bsModal.value.hide();
    }
    function confirm(product) {
      if (isNew.value) {
        emit('add-product', product)
        bsModal.value.hide();
        tempArticle.value = { ...emptyBlank };
      } else {
        emit('update-product', product);
        bsModal.value.hide();
        tempArticle.value = { ...emptyBlank };
      }
    }
    watchEffect(() => {
      if (isNew.value) {
        tempArticle.value = { ...emptyBlank };
      } else {
        tempArticle.value = { ...currentItem.value };
      }
    })

    onMounted(() => {
      // onMount,  onBeforeMount 只有第一次觸發時建立只被觸發一次, 之後呼叫 modal 不會重新建立所以部會被觸發
      // 只有onMounted可以處理dom掛載
      bsModal.value = new Modal(modal.value);
    })

    return {
      tempArticle,
      uploadImg,
      imgUploadLoading,
      modal,
      openModal,
      hideModal,
      confirm,
      editor,
      editorConfig,
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