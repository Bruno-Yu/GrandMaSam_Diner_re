import atrApi from '@/assets/js/api/atrApi.js'
import { ref } from 'vue'
// import { userStore } from '@/stores';
import useStore from '@/store'
// import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'

export const useApiModal = () => {
  const { userStore } = useStore()
  // api 對應的訊息視窗
  // const store = userStore();
  // const router = useRouter();

  // loading 設置
  const $loading = useLoading({
    // options
  })

  const params = {
    color: '#000000',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999,
    container: null
  }
  const loader = ref(null)

  function loaderShow() {
    loader.value = $loading.show(params)
  }
  function loaderHide() {
    loader.value.hide()
  }

  // 訊息相關 Modal
  const infoModal = ref(null)
  const showInfoModal = ref(false)

  function hideInfoModal() {
    infoModal.value.hideModal()
    userStore.$patch((state) => {
      state.messageContent.title = '提示'
      state.messageContent.message = ''
      state.messageContent.status = ''
    })
  }
  //  判別是 新增還是編輯視窗
  const isNew = ref(false)
  // 刪除視窗
  function openDeleteModal(item) {
    userStore.$patch({ currentItem: item })
    // currentItem.value = item;
    userStore.$patch((state) => {
      state.messageContent.title = '刪除提示'
      state.messageContent.message = '請確認是否要刪除!'
      state.messageContent.status = 'delete'
    })
    infoModal.value.openModal()
  }

  // 編輯 & 新增視窗 & 邏輯
  const editModal = ref(null)
  const showEditModal = ref(false)

  function openModal(item) {
    userStore.$patch({ currentItem: item })
    isNew.value = false
    editModal.value.openModal()
  }
  function hideModal() {
    editModal.value.hideModal()
  }
  function openNewModal() {
    isNew.value = true
    editModal.value.openModal()
  }


  //  六角 api 相關程式碼
  //  共用錯誤 modal 提示
      function catchErrorModal(message){
    if (typeof message === 'string') {
        userStore.$patch((state) => {
          state.messageContent.message = message
        })
      } else {
        userStore.$patch((state) => {
          state.messageContent.message = message.join(', ')
        })
      }
  }
  // 共用錯誤 toast 提示
  function catchErrorToast(messages){
    if (typeof messages === 'string') {
            userStore.$patch((state) => {
            const message = {
              title: '提示',
              content: messages ,
              style: 'success',
            }
            state.toastMessages.push(message);
          })
        
      } else if (typeof messages === 'object') { {
        message.forEach(msg=>{
          userStore.$patch((state) => {
          const  singleMsg= {
            title: '提示',
            content: msg ,
            style: 'success',
          }
          state.toastMessages.push(singleMsg);
        })
        })
        
      }
  }
}

  // 登入
  async function login(username, password, path = '/backStage') {
    const params = {
      username,
      password
    }
    loaderShow()
    const res = await atrApi.login(params)
    if (res.success) {
      const { token, expired } = res
      userStore.$patch({ token: token, login: true })
      document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
      loaderHide()
      // router.push(path)
      navigateTo({ path })
    } else {
      catchErrorModal( res.response.data.message);
      loaderHide()
      infoModal.value.openModal()
    }
  }

  // 確認是否是登入狀態
  async function checkLoginStatus(path = '/frontStage') {
    const res = await atrApi.checkLoginStatus()
    if (!res.success) {
      navigateTo({ path })
    }
  }
  // 使用者登出
  async function logOut(path = '/frontStage') {
    loaderShow()
    const res = await atrApi.logOut()
    if (res.success) {
      loaderHide()
      localStorage.removeItem('rawOrderData');
      navigateTo({ path })
    } else {
      catchErrorModal( res.response.data.message);
      loaderHide()
      infoModal.value.openModal()
    }
    userStore.$patch({ token: '', login: false })
  }
  const pagination = ref({});


  // 管理
   // 管理員取得資料
  async function getAdminShown(page=1, category) {
    loaderShow();
    const params =  category ? { page, category } : { page };
    let res;
    if(userStore.currentPosition === '/backStage/billboardAdmin'){
      res = await atrApi.getAdminArticles(params);
    } else if(userStore.currentPosition === '/backStage/productsAdmin'){
      res = await atrApi.getAdminProducts(params);
    } else if(userStore.currentPosition === '/backStage/challengesAdmin'){
      res = await atrApi.getAdminChallenges(params);
    }else if(userStore.currentPosition === '/backStage/ordersAdmin'){
      res = await atrApi.getAdminOrders(params);
    }
    if (res.success) {
      loaderHide()
      pagination.value = JSON.parse(JSON.stringify(res.pagination));
      userStore.$patch((state) => {
        if(userStore.currentPosition === '/backStage/billboardAdmin'){
      state.adminShown = JSON.parse(JSON.stringify(res.articles));
    } else if(userStore.currentPosition === '/backStage/productsAdmin'){
        state.adminShown = JSON.parse(JSON.stringify(res.products));
    }else if(userStore.currentPosition === '/backStage/challengesAdmin'){
        state.adminShown = JSON.parse(JSON.stringify(res.coupons));
    }else if(userStore.currentPosition === '/backStage/ordersAdmin'){
        state.adminShown = JSON.parse(JSON.stringify(res.orders));
    }
      })
    } else {
      loaderHide()
      catchErrorToast( res.response.data.message);
    }
    loaderHide()
  }
    // 管理員取得單一資料
  async function getAdminSingleShown(id) {
    loaderShow();
    let res;
    if(userStore.currentPosition === '/backStage/billboardAdmin'){
      res = await atrApi.getAdminArticle(id);
    } else if(userStore.currentPosition === '/backStage/challengesAdmin'){
      res = await atrApi.getAdminChallenge(id);
    }else if(userStore.currentPosition === '/backStage/ordersAdmin'){
      res = await atrApi.getAdminOrder(id);
    }
    if (res.success) {
      userStore.$patch((state) => {
        if(userStore.currentPosition === '/backStage/billboardAdmin'){
      state.currentItem = JSON.parse(JSON.stringify(res.article));
    }else if(userStore.currentPosition === '/backStage/challengesAdmin'){
      state.currentItem = JSON.parse(JSON.stringify(res.data));
    }else if(userStore.currentPosition === '/backStage/ordersAdmin'){
      state.currentItem = JSON.parse(JSON.stringify(res.data));
    }
      })
    } else {
      catchErrorToast( res.response.data.message);
    }
    loaderHide();
  }



  // 管理員新增
  async function addAdminShown(data) {
    loaderShow();
    let res;
    if(userStore.currentPosition ===  '/backStage/billboardAdmin'){
      res = await atrApi.addAdminArticle(data);
    } else if(userStore.currentPosition ===  '/backStage/productsAdmin'){
      res = await atrApi.addAdminProduct(data);
    }else if(userStore.currentPosition === '/backStage/challengesAdmin'){
      res = await atrApi.addAdminChallenge(data);
    }
    if (res.success) {
      editModal.value.hideModal()
      userStore.$patch((state) => {
        state.messageContent.message = res.message
      })
      infoModal.value.openModal()
      getAdminShown()
    } else {
      catchErrorModal( res.response.data.message);
      infoModal.value.openModal()
    }
    loaderHide()
  }
  // 管理員編輯
  async function editAdminShown(data) {
    loaderShow()
    const { id } = data
    // const res = await atrApi.editAdminProduct(id, data)
        let res;
    if(userStore.currentPosition === '/backStage/billboardAdmin'){
      res = await atrApi.editAdminArticle(id, data);
    } else if(userStore.currentPosition === '/backStage/productsAdmin'){
      res = await atrApi.editAdminProduct(id, data);
    }else if(userStore.currentPosition === '/backStage/challengesAdmin'){
      res = await atrApi.editAdminChallenge(id, data);
    }
    if (res.success) {
      editModal.value.hideModal()
      userStore.$patch((state) => {
        state.messageContent.message = res.message
      })
      infoModal.value.openModal()
      getAdminShown()
    } else {
      catchErrorModal( res.response.data.message);
      infoModal.value.openModal()
    }
    loaderHide()
  }
  // 管理員刪除
  async function deleteAdminShown() {

    infoModal.value.hideModal();
    loaderShow()
    let res;
    if(userStore.currentPosition === '/backStage/billboardAdmin'){
      res = await atrApi.deleteAdminArticle(userStore.currentItem?.id);
    } else if(userStore.currentPosition === '/backStage/productsAdmin'){
      res = await atrApi.deleteAdminProduct(userStore.currentItem?.id);
    }else if(userStore.currentPosition === '/backStage/challengesAdmin'){
      res = await atrApi.deleteAdminChallenge(userStore.currentItem?.id);
    }else if(userStore.currentPosition === '/backStage/ordersAdmin'){
      res = await atrApi.deleteAdminOrder(userStore.currentItem?.id);
    }
    if (res.success) {
      userStore.$patch((state) => {
        state.messageContent.message = res.message
      })
      getAdminShown()
    } else {
      catchErrorModal( res.response.data.message);
    }
    loaderHide()
    infoModal.value.openModal()
  }

  // 購物車
  const cartProducts = ref([])
  const finalTotal = ref(0)
  const totalQty = ref(0)
   // 取購物車內容
  async function getCart() {
    const res = await atrApi.getCart()
    if (res.success) {
      cartProducts.value = JSON.parse(JSON.stringify(res.data.carts))
      finalTotal.value = res.data.final_total
      totalQty.value = checkQty(res.data.carts)
    } else {
      catchErrorToast( res.response.data.message);
    }
  }
  function checkQty(carts) {
    let qty = 0
    carts.forEach((item) => {
      qty += item.qty
    })
    return qty
  }
  // 加入購物車
    async function addToCart(product_id, qty = 1) {
    const data = {
      product_id, qty
    }
    const res = await atrApi.addToCart({ data });
    if (res.success) {
      // console.log(res);
      getCart()
      userStore.$patch((state) => {
        const message = {
          title: '提示',
          content: res.message ,
          style: 'success',
        }
        state.toastMessages.push(message);
      })
    } else {
      catchErrorToast( res.response.data.message);
    }
  }

  // 刪除購物車
  async function deleteCartProduct(id) {
    const res = await atrApi.deleteCartProduct(id)
    if (res.success) {
      getCart()
    }
  }

  return {
    editModal,
    infoModal,
    showEditModal,
    showInfoModal,
    hideInfoModal,
    catchErrorToast,
    catchErrorModal,
    isNew,
    openDeleteModal,
    openModal,
    hideModal,
    openNewModal,
    login,
    checkQty,
    checkLoginStatus,
    logOut,
    getAdminShown,
    getAdminSingleShown,
    addAdminShown,
    editAdminShown,
    deleteAdminShown,
    getCart,
    addToCart,
    cartProducts,
    finalTotal,
    totalQty,
    deleteCartProduct,
    pagination,
  }
}
