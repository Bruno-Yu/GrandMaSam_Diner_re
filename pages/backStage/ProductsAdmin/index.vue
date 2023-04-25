<template>
  <main>
    <div class="grid gap-2 grid-cols-1 xl:grid-cols-2 h-screen">
      <div class="relative flex flex-col mb-8 xl:mb-0 h-screen overflow-hidden">
        <div class="absolute left-[260px] bottom-5 h-36 w-36 bg-black"></div>
        <div class="absolute -left-1 -bottom-[80px] h-72 w-72 bg-amber-400/95"></div>
        <div class="absolute left-[180px] -bottom-[120px] h-52 w-52 bg-amber-500/50"></div>
        <div class="relative z-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 min-w-full flex flex-col sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold pt-5 pb-8 underline decoration-4 decoration-amber-400/80">產品管理</h2>
            <div class="overflow-hidden border border-solid border-gray-300 bg-white  mt-auto">

              <table class="min-w-full text-center ">
                <thead class="border-b bg-black">
                  <tr>
                    <th scope="col" class="font-medium text-white px-6 py-2">
                      產品名稱
                    </th>
                    <th scope="col" class="font-medium text-white px-6 py-2">
                      原價
                    </th>
                    <th scope="col" class="font-medium text-white px-6 py-2">
                      售價
                    </th>
                    <th scope="col" class="font-medium text-white px-6 py-2">
                      是否啟用
                    </th>
                    <th scope="col" class="font-medium text-white px-6 py-2">
                      查看細節
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b" v-for="item in adminShown" :key="item.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-left font-bold text-gray-900"> {{ item.title }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{ item.origin_price }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {{ item.price }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div class="flex justify-center">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-black bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                            type="checkbox" role="switch" id="isEnabledBtn"
                            :checked="item.is_enabled === 1 ? true : false">
                          <label class="form-check-label block text-gray-800"
                            for="isEnabledBtn"></label>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center justify-center">
                        <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                          <button type="button"
                            class="rounded-l inline-block px-4 py-1.5 bg-black text-white font-medium text-xs leading-tight uppercase hover:bg-amber-400  focus:bg-gray-900 focus:outline-none focus:ring-0 active:bg-gray-900 transition duration-150 ease-in-out"
                            @click="check(item)">查看</button>
                          <button type="button"
                            class="inline-block px-4 py-1.5 bg-neutral-600 text-white font-medium text-xs leading-tight uppercase hover:bg-neutral-900 focus:bg-gray-900 focus:outline-none focus:ring-0 active:bg-gray-900 transition duration-150 ease-in-out"
                            @click="openModal(item)">編輯</button>
                          <button type="button"
                            class="rounded-r inline-block px-4 py-1.5 bg-red-700 text-white font-medium text-xs leading-tight uppercase hover:bg-red-900  focus:bg-gray-900 focus:outline-none focus:ring-0 active:bg-gray-900 transition duration-150 ease-in-out"
                            @click="openDeleteModal(item)">刪除</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
      <!-- pagination -->
      <div class=" flex justify-end my-3  mr-4">
        <nav aria-label="Page navigation">
          <ul class="list-style-none flex gap-1">
            <li :class="{ 'hidden': !pagination.has_pre }">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-neutral-600 transition-all duration-300 hover:bg-black hover:text-white active:text-white dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Previous" @click.prevent="getAdminShown(page = pagination.current_page - 1, category = '')">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in pagination.total_pages" :key="page">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3  transition-all duration-300 hover:bg-black hover:text-white active:text-white dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                :class="{ 'bg-black': page === pagination.current_page, 'text-white': page === pagination.current_page, 'text-neutral-600': page !== pagination.current_page }"
                href="#"
                @click.prevent="getAdminShown(page, category = '')"
                >{{ page }}</a
              >
            </li>
            <li :class="{ 'hidden': !pagination.has_next }">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-neutral-600 transition-all duration-300 hover:bg-black hover:text-white active:text-white dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Next"  @click.prevent="getAdminShown(page = pagination.current_page + 1, category = '')"
                ><span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
            </div>
          </div>
        </div>
        <p class="relative z-10 font-semibold pl-2">目前頁面產品共 {{ Object.keys(adminShown)?.length }} 項</p>
      </div>
      <div class="h-screen p-2" :class="{ 'bg-black': Object.keys(currentItem).length, 'bg-white': !Object.keys(currentItem).length }">
        <div class="flex justify-end my-5 mx-5 ">
          <button type="button"
            class="inline-block px-6 py-2 bg-amber-400 text-black text-base font-bold leading-tight uppercase rounded hover:bg-black hover:text-amber-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            @click="openNewModal">新增產品</button>
        </div>
        <div v-if="Object.keys(currentItem)?.length > 0" class="flex flex-col justify-center p-2">
          <div class=" rounded mb-5">
            <img class=" w-full h-80 object-cover rounded "
              :src="currentItem.imageUrl" :alt="currentItem.title" />
          </div>
          <div class="flex flex-col  rounded mb-5 bg-gray-900 text-white border-8 border-amber-400">
            <div class="p-6 flex flex-col justify-start">
              <h5 class=" text-2xl font-bold mb-2 underline decoration-4 decoration-amber-400">{{ currentItem.title }}</h5>
              <div class=" text-base mb-2">
                <!-- <star-rating :star-size="20" :animate="true" :increment="0.5" :read-only="true"
                  :rating="currentItem.rating ? currentItem.rating : 0" /> -->
              </div>
              <p class=" text-lg font-bold mb-2">
                {{ currentItem.category }}
              </p>
              <p class=" text-base mb-4">
                {{ currentItem.description }}
              </p>
              <p><span class="font-bold ">售價: </span> <span class="underline">{{ currentItem.price }}/{{ currentItem.unit }}</span> <span
                  class=" ml-5 text-xs">還剩  {{ currentItem.num }} 份</span> </p>
                </div>
              </div>
              <div v-if="currentItem.imagesUrl?.length" class="grid gap-1 grid-rows-1 grid-cols-5 p-1 rounded bg-gray-900">
                <img v-for="(item, index) in currentItem.imagesUrl" :key="index" class="h-40 w-40 block object-cover"
                  :src="item" :alt="item">
              </div>
              <div v-else></div>
        </div>
        <!-- <p v-else class="text-gray-600">請選擇單一產品查看</p> -->
        <div v-else  class="flex flex-col justify-center items-center h-5/6" >
          <img class="block object-cover w-auto h-5/6" src="@/assets/images/choose_product.webp" alt="choose_product">
          <p class="text-4xl font-bold">點選查詢按鈕可查看產品細節</p>
        </div>
      </div>
    </div>
    <product-modal class="editModal" ref="editModal" :currentItem="currentItem" :isNew="isNew"
      @update-product="editAdminShown" @add-product="addAdminShown" />
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @delete-product="deleteAdminShown"
      @hide-modal="hideInfoModal" />
  </main>
</template>

<script>
import { useApiModal } from '~~/composables/useApiModal';
import useStore from '@/store';
import { storeToRefs } from 'pinia';


export default {
  // components: { editModal, starRating },
  setup() {
    definePageMeta({
      layout: 'back-layout'
    });
    const { userStore } = useStore();
    const { adminShown, currentItem, messageContent } = storeToRefs(userStore);
    const { pagination, editModal, infoModal, hideInfoModal, isNew, openDeleteModal, openModal, hideModal, openNewModal, editAdminShown, addAdminShown, getAdminShown, deleteAdminShown } = useApiModal();
    // function editProduct(data) {
    //   editAdminShown(data);
    // }
    // 查看按鈕
    function check(item) {
      userStore.currentItem = JSON.parse(JSON.stringify(item))
    }

    onMounted(() => {
      getAdminShown();
    });
    return {
      adminShown,
      currentItem,
      editModal,
      // editProduct,
      infoModal,
      messageContent,
      openModal,
      hideModal,
      openNewModal,
      openDeleteModal,
      hideInfoModal,
      isNew,
      getAdminShown,
      editAdminShown,
      addAdminShown,
      deleteAdminShown,
      pagination,
      check,
    };
  }
}


</script>


<style scoped>
  .form-switch .form-check-input:checked {
    background-color: #f6bd03e4;
    border-color: black;
    /* background-position: right center; */
}

</style>