import { defineStore } from 'pinia';


export const userStore = defineStore('userStore', {
  // 對應data
  state: () => ({
    token: '',
    confirm: '已成功引入 pinia',
    login: false, // 是否是登入狀態
    adminShown: [], // 目前搜尋的產品/文章
    currentPosition: '',
    currentItem: {}, // 目前展示的產品/文章 
    toastMessages: [],
    rawOrderData: [], // 存取 後台儀表板數據避免需打多次 api
    messageContent: {
      title: '提示',
      message: '',
      status: '',
    },
  }),
  getters: {

  },
  actions: {

  }
})
