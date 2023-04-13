import CKEditor from '@ckeditor/ckeditor5-vue'

export default defineNuxtPlugin(({ vueApp }) => {
  // console.log('app', app);
  vueApp.use(CKEditor);
})
