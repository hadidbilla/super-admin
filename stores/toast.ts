import { defineStore } from "pinia";
import { isBoolean } from "lodash";



interface ErrorSate {
  isShow: boolean;
  error: string;
  success: string;
}


export const useToastStore = defineStore("error", {
  state: (): ErrorSate => ({
    isShow: false,
    error: "",
    success: "",
  }),
  actions: {
    setError(error: string) {
      this.isShow = true;
      this.error = error;
      this.success = "";
    },

    setSuccess(success: string) {
      this.isShow = true;
      this.success = success;
      this.error = "";
    }
  },
  getters: {
    getErrorState():any {
      return {
        isShow: this.isShow,
        error: this.error,
        success: this.success,
      }
    }
  }
});
