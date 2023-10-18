import { defineStore } from "pinia";



interface LoadingState {
  loading: any;
}


export const useLoadingStore = defineStore("loading", {
  state: (): LoadingState => ({
    loading: {},
  }),

  getters: {
    wait: (state) => (key: string) => {
      return state.loading[key];
    }
  },

  actions: {
    startLoading(key: string) {
      this.loading[key] = true;
    },
    stopLoading(key: string) {
      this.loading[key] = false;
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot));
}