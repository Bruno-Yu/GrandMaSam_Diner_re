<template>
  <main class="-mx-4 bg-white">
    <!-- pc tablet -->
    <div class="lg:grid grid-cols-3 gap-4 bg-white h-[700px] mb-2 ">
      <!-- card -->
      <template v-for="(item, index) in challengeListData" :key="item.code">
        <div :class="{ 'hidden lg:flex': index !== 1, 'flex': index === 1 }" class="relative bg-stone-800 flex-col h-[700px] overflow-hidden" >
          <img  class="absolute  block duration-700 delay-100 ease-out hover: w-full h-full object-cover shadow-black shadow-lg"  :class="{ '-translate-y-1/2': toggleStatus[index] }" :src="item.imgSrc" :alt="item.alt" >
            <button type="button" class="absolute hidden lg:block top-1/3 left-1/2 -translate-x-1/2  bg-white/30  h-12 w-12 rounded-full animate-bounce " :class="{ 'hidden': !toggleStatus[index] }"  @click="toggleStatus[index] = !toggleStatus[index]"><i class="bi bi-chevron-double-down text-white "></i></button>
            <button type="button" class="absolute hidden lg:block bottom-1 left-1/2 -translate-x-1/2  bg-white/30  h-12 w-12 rounded-full animate-bounce" :class="{ 'hidden': toggleStatus[index] }"  @click="toggleStatus[index] = !toggleStatus[index]"><i class="bi bi-chevron-double-up text-white "></i></button>
            <div class="absolute top-0 bottom-0 left-4 flex justify-center items-center bg-white/20 -skew-x-12 text-6xl text-black font-bold py-4 pl-16 pr-8 " :class="{ 'hidden': toggleStatus[index], 'block': !toggleStatus[index] }" ><p class="block relative"><span class="hidden lg:block">{{ item.name }}</span><span class="block lg:hidden">等你來</span><br /><span class="absolute -right-10 top-full text-amber-400">挑戰</span></p>  </div>
            <div class="absolute top-0 bottom-0 -left-1 flex justify-center items-center bg-amber-400/90 -skew-x-12 text-6xl text-black font-bold py-4 pl-16 pr-8 " :class="{ 'hidden': toggleStatus[index], 'block': !toggleStatus[index] }" > <p class="block relative"><span class="hidden lg:block">{{ item.name }}</span><span class="block lg:hidden">等你來</span> <br /><span class="absolute -right-14 top-full text-white">挑戰</span></p> </div>
          <div class="mt-auto bg-black p-5 min-h-1/2">
            <div class="bg-white/10 p-5">
              <div class="flex justify-center">
                <h4 class="inline-block text-center text-3xl font-bold text-amber-400 border-b-2 border-black pb-1 mb-5">{{ `${item.name}難度` }} </h4>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-3">
                <ul class="list-none text-white col-span-2  space-y-4">
                  <li class="font-bold text-xl">使用說明 <br><span class="pl-1 font-normal text-xs">{{ item.description }}</span></li>
                  <li class="font-bold text-xl">適用範圍 <br><span class="pl-1 font-normal text-xs">{{ item.applyRange }}</span></li>
                </ul>
                <p class="text-9xl text-amber-300">{{ item.times }}<span class=" text-sm font-bold text-white">倍券</span></p>
              </div>
              <input type="button" :id="item.code" class="block bg-transparent w-full border-white border-2 cursor-pointer border-dashed py-2 text-center text-amber-400 text-3xl mb-4" :value="item.code"   @click="copyTocClipboard(item.code)"/>
              <div class="flex justify-between">
                <p class="text-center text-xs text-white">使用時限: {{ item.expired }} </p>
                <p class="text-xs text-gray-500">註: 點選進行複製</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <template v-for="(item) in challengeListData" :key="item.code" >
        <div class="block lg:hidden mt-auto bg-black p-5 h-[350px]">
          <div class="bg-white/10 p-5">
            <div class="flex justify-center">
              <h4 class="inline-block text-center text-3xl font-bold text-amber-400 border-b-2 border-black pb-1 mb-5">{{ `${item.name}難度` }} </h4>
            </div>
            <div class="grid grid-cols-3 gap-1 mb-3">
              <ul class="list-none text-white col-span-2  space-y-4">
                <li class="font-bold text-xl">使用說明 <br><span class="pl-1 font-normal text-xs">{{ item.description }}</span></li>
                <li class="hidden font-bold text-xl">適用範圍 <br><span class="pl-1 font-normal text-xs">{{ item.applyRange }}</span></li>
              </ul>
              <p class="text-9xl text-amber-300">{{ item.times }}<span class=" text-sm font-bold text-white">倍</span></p>
            </div>
            <input type="button" :id="item.code" class="block bg-transparent w-full border-white border-2 cursor-pointer border-dashed py-2 text-center text-amber-400 text-3xl mb-4" :value="item.code"   @click="copyTocClipboard(item.code)"/>
            <div class="hidden lg:flex justify-between">
              <p class="text-center text-xs text-white">使用時限: {{ item.expired }} </p>
              <p class="text-xs text-gray-500">註: 點選進行複製</p>
            </div>
          </div>
        </div>
    </template>
    <!-- mobile -->
    <div class="bg-black py-1">
      <div class=" py-4 text-center bg-[url('/assets/images/product_intro_2.webp')]  bg-fixed bg-blend-darken">
        <h3 class="text-2xl lg:text-3xl italic text-white font-bold leading-relaxed">
          成功其實是1分的實力<br class="inline lg:hidden" />加上99分的心意<br>不要讓吝嗇限制了您人生的高度<br><span class="text-base font-bold not-italic text-black "> 出自- 1995 五歲就會抬頭的創辦人</span>
        </h3>
      </div>
    </div>
    <div class="bg-[url('/assets/images/Thanks_boss.webp')] h-[500px] w-full bg-cover bg-center flex flex-col items-center">
      <div class=" bg-black bg-blend-lighten rounded-t-lg h-[100px] mt-auto w-4/5 py-4">
        <p class="text-4xl text-white text-center font-bold">~ 謝謝老闆 ~</p>
      </div>
    </div>
  </main>
</template>

<script>
import useStore from '@/store'


// data
const challengeListData = [
  {
    imgSrc: 'https://i.imgur.com/wpeIDey.jpg',
    alt: 'News_header_left',
    name: '簡易',
    description: '溢價購買商品，多餘的部分都會捐贈與非洲無關的辛苦作者。',
    times: 5,
    expired: '不限',
    applyRange: '不限，可使用於架上所有商品，或者作為直接捐贈使用。',
    code: '55555555',
  },
  {
    imgSrc: 'https://i.imgur.com/1d3nEt1.jpg',
    alt: 'News_header_md',
    name: '中等',
    description: '溢價購買商品，多餘的部分都會捐贈與非洲無關的辛苦作者。',
    times: 6,
    expired: '不限',
    applyRange: '不限，可使用於架上所有商品，或者作為直接捐贈使用。',
    code: '66666666',
  },
  {
    imgSrc: 'https://i.imgur.com/LvVe6MT.jpg',
    alt: 'News_header_right',
    name: '高級',
    description: '溢價購買商品，多餘的部分都會捐贈與非洲無關的辛苦作者。',
    times: 8,
    expired: '不限',
    applyRange: '不限，可使用於架上所有商品，或者作為直接捐贈使用。',
    code: '88888888',
  }
];


export default {
  setup() {
    const toggleStatus = ref([]);
    const clipboardList = ref({});

    const { userStore } = useStore()
    // 複製進剪貼簿 
    async function copyTocClipboard(content) {
      await navigator.clipboard.writeText(content);
      userStore.$patch((state) => {
        const message = {
          title: '提示',
          content: '複製成功',
          style: 'success',
        }
        state.toastMessages.push(message);
      })
    }
    onMounted(() => {
      challengeListData.forEach(() => toggleStatus.value.push(false));
    });

    return {
      challengeListData,
      toggleStatus,
      ...clipboardList,
      copyTocClipboard,
      // swiper,
    }

  },
}
</script>

