<template>
  <main class="container mx-auto mt-24">
    <!-- breadCrumb -->
        <nav class="rounded-md">
          <ol class="list-reset flex justify-end items-center ">
            <li >
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
        <p class="text-sm text-gray-600 text-right">{{ `${article.create_at} 作者: ${article.author}` }}</p>
        <img class="w-full h-auto object-cover border-4 border-black" :src="getArticleImage(article.id)" :alt="getArticleImage(article.id)">
<!-- modal -->
<blockquote class="blockquote">
  <p
  class="text-base font-bold mb-4 underline"
  v-html="article.description"
  ></p>
</blockquote>
<!-- <info-modal class="infoModal" ref="infoModal" :content="messageContent" @hide-modal="hideInfoModal" /> -->
<div class=" mb-5" v-html="article.content" />
</main>
</template>

<script>
import { useApiModal } from '~~/composables/useApiModal';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import atrApi from '@/assets/js/api/atrApi.js';
import { getArticleImage } from '@/assets/js/enum/articleImageEnum.js';



export default {

  setup() {
    const route = useRoute();
    const router = useRouter();
    // const { userStore } = useStore();
    // const { messageContent } = storeToRefs(userStore);
    const { catchErrorToast } = useApiModal();
    const article = ref({});

    async function getArticle(id) {
      const res = await atrApi.getArticle(id);
      if (res.success) {
        article.value = JSON.parse(JSON.stringify(res.article));
      } else {
        catchErrorToast(res.response.data.message);
        router.push('/notFound');
        // if (typeof res.response.data.message === 'string') {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message });
        //   // infoModal.value.openModal();
        //   router.push('/notFound');
        // } else {
        //   userStore.$patch((state) => { state.messageContent.message = res.response.data.message.join(', ') })
        // }
      }
    }


    watchEffect(() => {
      if (route.params.id) {
        getArticle(route.params.id)
      }
      // purchaseNotice.value = purchaseNoticeData.replace(/\n/g, '<br /><br />');
    });

    return {
      //  catchErrorToast,
      article,
      getArticleImage,
      // infoModal
      // swiper,
    }

  },
}
</script>

