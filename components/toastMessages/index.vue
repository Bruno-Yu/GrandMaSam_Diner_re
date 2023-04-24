<template>
  <div
    class="pointer-events-none max-w-screen-sm fixed top-14 right-2 z-[1500]"
  >
    <div
      v-for="(message, key) in messages"
      :key="key"
      class=" z-[1500] max-w-screen-sm text-base min-w-[250px] mb-2 outline  rounded-lg outline-offset-4 outline-1 outline-black/30"
      role="alert"
    >
      <div class="flex items-center justify-between rounded-t-lg border-b-2 border-neutral-100 border-opacity-100 bg-white bg-clip-padding px-4 py-2 dark:border-opacity-50 dark:bg-neutral-600">
        <span
          :class="{ 'bg-green-400': message.style === 'success', 'bg-red-500': message.style === 'fail' }"
          class="p-2 rounded mr-2 inline-block"
        ></span>
        <strong class="mr-auto">{{ message.title }}</strong>
        <button
          type="button"
          class="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          @click="clearToast(key)"
          aria-label="Close"
        >
          <span
            class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
      </button>
      </div>
      <div class="break-words rounded-b-lg bg-white/90 py-2 px-4 text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200" v-if="message.content">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>


<script setup>
import useStore from '@/store';
import { useToastMessage } from '~~/composables/useToastMessage';

const { toastShow, clearToast, } = useToastMessage();
const { userStore } = useStore()
const messages = ref(userStore.toastMessages);

watchEffect(() => {
  if (messages.value.length) {
    toastShow();
  }
});

</script>

