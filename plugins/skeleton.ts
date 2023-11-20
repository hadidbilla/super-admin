import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Skeletor);
})