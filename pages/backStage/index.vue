<template>
  <main class="border">
    <div class="grid gap-2 grid-cols-1 xl:grid-cols-2">
      <div class="flex flex-col mb-8 xl:mb-0">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <!-- <div class="flex justify-end mb-5">
              <button type="button"
                class="inline-block px-6 py-2 bg-amber-400 text-black text-xs leading-tight uppercase rounded hover:bg-black hover:text-amber-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out font-bold"
                @click="openNewModal">新增產品</button>
            </div> -->
            <div class="overflow-hidden border border-solid border-gray-300">
              <table class="min-w-full text-center ">
                <thead class="border-b bg-black">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                      產品名稱
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                      原價
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                      售價
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                      是否啟用
                    </th>
                    <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                      查看細節
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b" v-for="item in adminProducts" :key="item.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.title }}</td>
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
                            class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                            type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            :checked="item.is_enabled === 1 ? true : false">
                          <label class="form-check-label inline-block text-gray-800"
                            for="flexSwitchCheckDefault"></label>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center justify-center">
                        <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                          <button type="button"
                            class="rounded-l inline-block px-4 py-1.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase hover:bg-gray-900 focus:bg-gray-900 focus:outline-none focus:ring-0 active:bg-gray-900 transition duration-150 ease-in-out"
                            @click="check(item)">查看</button>
                          <button type="button"
                            class="inline-block px-4 py-1.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase hover:bg-gray-900 focus:bg-gray-900 focus:outline-none focus:ring-0 active:bg-gray-900 transition duration-150 ease-in-out"
                            @click="openModal(item)">編輯</button>
                          <button type="button"
                            class="rounded-r inline-block px-4 py-1.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase hover:bg-gray-900 focus:bg-gray-900 focus:outline-none focus:ring-0 active:bg-gray-900 transition duration-150 ease-in-out"
                            @click="openDeleteModal(item)">刪除</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
                  <!-- pagination -->
      <div class="flex justify-end my-3">
        <nav aria-label="Page navigation">
          <ul class="list-style-none flex">
            <li :class="{ 'hidden': !pagination.has_pre }">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Previous" @click.prevent="getProducts(page = pagination.current_page - 1, category = '')">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in pagination.total_pages" :key="page">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                :class="{ 'bg-amber-400': page === pagination.current_page }"
                href="#"
                @click.prevent="getProducts(page, category = '')"
                >{{ page }}</a
              >
            </li>
            <li :class="{ 'hidden': !pagination.has_next }">
              <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Next"  @click.prevent="getProducts(page = pagination.current_page + 1, category = '')"
                ><span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
            </div>
          </div>
        </div>
        <p class="font-semibold">目前有產品 {{ Object.keys(adminProducts).length }} 項</p>
      </div>
      <div  class="p-4">
        <div v-if="Object.keys(currentItem).length > 0" class="flex flex-col justify-center">
          <div class=" rounded mb-5">
            <img class=" w-full h-96 object-cover rounded "
              :src="currentItem.imageUrl" :alt="currentItem.title" />
          </div>
          <div class="flex flex-col  rounded mb-5 bg-white shadow-lg">
            <div class="p-6 flex flex-col justify-start">
              <h5 class="text-gray-900 text-xl font-medium mb-2">{{ currentItem.title }}</h5>
              <div class="text-gray-700 text-base mb-2">
                <!-- <star-rating :star-size="20" :animate="true" :increment="0.5" :read-only="true"
                  :rating="currentItem.rating ? currentItem.rating : 0" /> -->
              </div>
              <p class="text-gray-700 text-base mb-2">
                {{ currentItem.category }}
              </p>
              <p class="text-gray-700 text-base mb-4">
                {{ currentItem.description }}
              </p>
              <p>{{ currentItem.price }}/{{ currentItem.unit }} <span
                  class="text-gray-600 text-xs">還剩{{ currentItem.num }}個</span> </p>
                </div>
              </div>
              <div v-if="currentItem.imagesUrl?.length" class="grid gap-2 grid-rows-1 grid-cols-5  rounded bg-white shadow-lg">
                <img v-for="(item, index) in currentItem.imagesUrl" :key="index" class="h-40 w-40 block object-cover"
                  :src="item" :alt="item">
              </div>
              <div v-else></div>
        </div>
        <p v-else class="text-gray-600">請選擇單一產品查看</p>
      </div>
    </div>
    <edit-modal class="editModal" ref="editModal" :currentItem="currentItem" :isNew="isNew"
      @update-product="editProduct" @add-product="addAdminProduct" />
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @delete-product="deleteAdminProduct"
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
    // const pagination = ref([]);
    const { userStore } = useStore();
    const { adminProducts, currentItem, messageContent } = storeToRefs(userStore);
    const { pagination, editModal, infoModal, hideInfoModal, isNew, openDeleteModal, openModal, hideModal, openNewModal, editAdminProduct, addAdminProduct, getAdminProducts, deleteAdminProduct } = useApiModal();
    function check(prop) {
      // console.log('prop', prop);
      userStore.$patch({ currentItem: prop });
    }
    function editProduct(data) {
      editAdminProduct(data);
    }

    onMounted(() => {
      getAdminProducts();
    });
    return {
      adminProducts,
      currentItem,
      check,
      editModal,
      editProduct,
      infoModal,
      messageContent,
      openModal,
      hideModal,
      openNewModal,
      openDeleteModal,
      hideInfoModal,
      isNew,
      editAdminProduct,
      addAdminProduct,
      deleteAdminProduct,
      pagination,
    };
  }
}


</script>