<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="list-style-none flex">
        <li :class="{ 'hidden': !pagination.has_pre }">
          <a
            class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
            aria-label="Previous" @click.prevent="getContent(page = pagination.current_page - 1, currentCategory)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in pagination.total_pages" :key="page">
          <a
            class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            :class="{ 'bg-amber-400': page === pagination.current_page }"
            href="#"
            @click.prevent="getContent(page, currentCategory)"
            >{{ page }}</a
          >
        </li>
        <li :class="{ 'hidden': !pagination.has_next }">
          <a
            class="relative block rounded bg-transparent py-1.5 px-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-amber-400 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#"
            aria-label="Next"  @click.prevent="getContent(page = pagination.current_page + 1, currentCategory)"
            ><span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => ({
        total_pages: 1,
        has_pre: false,
        has_next: false,
        current_page: 1,
      })
    },
    getContent: {
      type: Function,
      default: () => {}
    },
    currentCategory: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { pagination, getContent, currentCategory } = toRefs(props);
    // const { confirmName, confirmBtn } = toRefs(confirm.value);
    // const router = useRouter();

    // // 前往產品頁面
    // function gotoProductDetail(id) {
    //   router.push(`./productsView/${id}`);
    // }

    return {
      pagination,
      getContent,
      currentCategory,
    }
  }

}
</script>