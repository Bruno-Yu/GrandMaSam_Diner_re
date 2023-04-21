<template>
  <main class="container mx-auto">
            <nav class="w-full rounded-md">
          <ol class="list-reset flex items-center">
            <li>
              <NuxtLink
                to='/frontStage/billboardView'
                class="text-base font-bold underline decoration-solid"
                >文章</NuxtLink  
              >
            </li>
            <li>
              <span class="mx-2  text-base font-bold text-neutral-500 dark:text-neutral-400">/</span>
            </li>
            <li ><p class="text-base font-bold text-neutral-500 dark:text-neutral-400 ">{{ `${article.title}` }}</p></li>
          </ol>
        </nav>
        <h1 class="text-4xl font-bold my-6">{{ article.title }}</h1>
<!-- modal -->
    <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" />
  </main>
</template>

<script>
import atrApi from '@/assets/js/api/atrApi.js';


export default {

  setup() {
    const router = useRouter();

    const article = ref({});

    async function getArticle(id) {
      const res = await atrApi.getArticle(id);
      if (res.success) {
        article.value = JSON.parse(JSON.stringify(res.article));
      } else {
        if (typeof res.response.data.message === 'string') {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message });
          // infoModal.value.openModal();
          router.push('/notFound');
        } else {
          userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        }
      }
    }

    watchEffect(() => {
      // console.log(`$route.params ${route.params.id}`);
      if (route.params.id) {
        getArticle(route.params.id)
      }
      // purchaseNotice.value = purchaseNoticeData.replace(/\n/g, '<br /><br />');
    });

    return {
      infoModal,
      article,
      // swiper,
    }

  },
}
</script>

