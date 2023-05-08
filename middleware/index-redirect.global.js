import useStore from '@/store';
import { useApiModal } from '~~/composables/useApiModal';

export default defineNuxtRouteMiddleware((to, from) => {
  const {  getCart } = useApiModal();
  const { userStore } = useStore()
  // console.log('to', to)

  if ( !to.path|| to.path === '/') {
    return navigateTo({path:'/frontStage'})
  }
  if(to.path){
    userStore.$patch((state) => {
      state.currentPosition = to.path;
      state.currentItem = {};
    })
  }
  if(from.matched.length){
    if(from.matched[0].path==='/frontStage/ProductsView/:id' && to.path==='/frontStage/ordersView'){
      getCart();
    }
  }
})
