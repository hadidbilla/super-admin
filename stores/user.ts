import {defineStore} from "pinia";
import {useCookie} from "nuxt/app";
import {$fetch} from "ofetch";

export interface AuthState {
  user: any;
  token: any;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: '',
    token: null,
  }),

  actions: {
    async login(loginData: any) {
      try {
        console.log(loginData)
        const data = await $fetch(`api/user`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' // Set the content type
          },
          body: loginData // Convert the data to JSON string
        });

        console.log(data)
        const router = useRouter();
        await router.push("/")
      } catch (error: any) {
        throw error;
      }
    },

    async signup(signupData:any){
      try {
        console.log(signupData)
        const data = await $fetch(`api/auth/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' // Set the content type
          },
          body: signupData // Convert the data to JSON string
        });

        console.log(data)
        const router = useRouter();
        await router.push("/login")
      } catch (e) {
        console.log(e)
        throw e;
      }
    }
  }
})