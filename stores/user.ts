import {defineStore} from "pinia";
import {useCookie} from "nuxt/app";
import {$fetch} from "ofetch";

export interface AuthState {
  user: any;
  token: any;
  userList: any[];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: '',
    token: null,
    userList: []
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
    },

    async logout() {
      try {
        const data = await $fetch(`api/auth/logout`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' // Set the content type
          },
        });
        console.log(data)
        const router = useRouter();
        await router.push("/login")
      } catch (error: any) {
        throw error;
      }
    },

    async getUserList() {
      try {
        const data = await $fetch(`api/user`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json' // Set the content type
          },
        });
        console.log(data)
        this.userList = data.users
      } catch (error: any) {
        throw error;
      }
    }
  }
})