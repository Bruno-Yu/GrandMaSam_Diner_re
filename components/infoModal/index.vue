<template>
  <div>
<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="infoModal" tabindex="-1" aria-labelledby="infoModalTitle" aria-modal="true" role="dialog" ref="modal">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 bg-black/95 rounded-t-md">
        <h5 class="text-xl font-bold leading-normal text-white" id="exampleModalScrollableLabel">
        {{ content.title }}
        </h5>
        <button type="button"
          class="btn-close box-content w-6 h-6 p-1  border-none rounded-none text-white opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-amber-400 hover:opacity-100 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle-fill text-xl "></i></button>
      </div>
      <div class="modal-body relative p-6 text-center">
        <p class="text-xl">{{ content.message }}</p>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
        <button type="button"
          class="inline-block px-6 py-2.5 bg-amber-400 text-black text-base font-bold leading-tight uppercase rounded shadow-md hover:bg-black hover:text-white hover:shadow-lg focus:bg-black focus:text-white focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out ml-1" @click.prevent="confirm">
          確認
        </button>
      </div>
    </div>
  </div>
</div>
  </div>
  
</template>

<script>
import { ref, onMounted, toRefs } from 'vue';
import Modal from 'tw-elements/dist/src/js/bs/src/modal';

export default {
  props: {
    content: {
      type: Object,
      default: () => {
        const obj = {
          title: '提示',
          message: '',
          status: 'default'
        }
        return obj;
      }
    },
  },
  setup(props, { emit }) {
    const { content } = toRefs(props);
    const modal = ref(null);
    const bsModal = ref(null);

    function openModal() {
      bsModal.value.show();
    }
    function hideModal() {
      bsModal.value.hide();
    }
    function confirm() {
      if (content.value.status === 'delete') {
        emit('delete-product');
      } else {
        emit('hide-modal');
      }
    }

    onMounted(() => {
      bsModal.value = new Modal(modal.value);
    })

    return {
      modal,
      openModal,
      hideModal,
      confirm,
    }
  }

}




</script>