import useStore from '@/store'


export const useToastMessage = () => {
    const { userStore } = useStore()
  // 取得訊息
  function getMessages( title = '提示',  response = false, style, content) {
    if(response){
      if (response.data.success) {
        userStore.$patch((state) => {
          const message = {
            title,
            content: `${title} 成功`,
            style: 'success',
          }
      state.toastMessages.push(message);    
    }) } else {
        // 有些訊息是字串，有些則是陣列，在此統一格式
        const receivedMessage = typeof response.data.message === 'string'
          ? [response.data.message]
          : response.data.message;

        userStore.$patch((state) => {
          const message = {
            title,
            content: receivedMessage.join('、'),
            style: 'fail',
          }
      state.toastMessages.push(message);    
    })
      }
    } else  {
        userStore.$patch((state) => {
    const message = {
            title,
            content,
            style,
          }
      state.toastMessages.push(message);     
    })
}}
//  顯示並刪減訊息
  function toastShow(){
      setTimeout(() => {
          userStore.$patch((state) => {
      state.toastMessages.shift();
    })
      }, 4000);
  }
  function clearToast(index){
      userStore.$patch((state) => {
      state.toastMessages.splice(index, 1);
    })
  }

  return {
    getMessages,
    toastShow,
    clearToast,
  }
}