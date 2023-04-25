<template>
  <main>
    <h1>這是後台首頁</h1>
    <!-- <info-modal class="infoModal" ref="infoModal" :content="messageContent" @delete-product="deleteAdminShown"
      @hide-modal="hideInfoModal" /> -->
  </main>
</template>

<script>
// import { useApiModal } from '~~/composables/useApiModal';
// import useStore from '@/store';
// import { storeToRefs } from 'pinia';

export default {
  setup() {
    definePageMeta({
      layout: 'back-layout'
    });
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