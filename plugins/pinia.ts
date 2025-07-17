import { createPinia } from 'pinia';
import { defineNuxtPlugin } from '#app';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  
  // Only use persistedstate plugin on client side
  if (process.client) {
    pinia.use(piniaPluginPersistedstate);
  }
  
  nuxtApp.vueApp.use(pinia);
});