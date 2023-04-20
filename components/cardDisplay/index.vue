<template>
    <div class="flex flex-col items-center ">
      <div class="rounded-lg  shadow-lg bg-white w-full h-full flex flex-col">
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light" class="relative" @click.prevent="gotoProductDetail(product.id)">
          <img class="rounded-t-lg w-full aspect-[4/3]  object-cover" :src="product.imageUrl" :alt="product.id" />
          <button type="button" class="absolute top-2 right-6 block h-1 w-1 shadow-transparent"><i v-if="false" class="bi-heart-fill text-red-600 text-base"></i><i v-else class="bi bi-heart text-white text-base"></i></button>
        </a>
        <div class="flex flex-col mt-auto px-2 py-2">
          <h5 class="text-gray-900 text-xl font-bold mb-2">{{ product.title }}</h5>
          <div class="flex justify-end mt-auto">
            <button type="button"
              class=" inline-block px-6 py-2.5 bg-amber-400 text-black font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-lg transition duration-150 ease-in-out"
              @click.prevent="confirmBtn(product.id)">{{ confirmName }}</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        id: '',
        imageUrl: '',
        title: '',
      })
    },
    confirm: {
      type: Object,
      default: () => ({
        confirmName: '確認',
        confirmBtn() {},
      }),
    }
  },
  setup(props, { emit }) {
    const { product, confirm } = toRefs(props);
    const { confirmName, confirmBtn } = toRefs(confirm.value);
    const router = useRouter();

    // 前往產品頁面
    function gotoProductDetail(id) {
      router.push(`/frontStage/productsView/${id}`);
    }

    return {
      gotoProductDetail,
      product,
      confirmName,
      confirmBtn,
    }
  }

}
</script>