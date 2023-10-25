import {defineStore} from "pinia";
import {useCookie} from "nuxt/app";
import {$fetch} from "ofetch";

export interface AuthState {
  user: any;
  token: any;
}

const token =useCookie('token')
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: '',
    token: null,
  }),

  actions: {
    async login(loginData:any) {
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
        // const router = useRouter();

        token.value = data.token
        // cookies.set("searchToken", searchToken, new Date(expiresAt).toUTCString());
        // console.log('cookie.get("token")', cookies.get("token"));

        // this.searchToken = searchToken;
        // await this.fetchUser();
      } catch (error: any) {
        throw error;
      }
    },
  }
})