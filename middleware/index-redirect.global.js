import useStore from '@/store'

export default defineNuxtRouteMiddleware((to, from) => {
  const { userStore } = useStore()
  // console.log('to', to, 'from', from)
  if (to.path === '/') {
    return navigateTo('/frontStage')
  }
  if(to.path){
    userStore.$patch((state) => {
      state.currentPosition = to.path;
      state.currentItem = {};
    })
  }
})
