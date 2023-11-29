import { defineStore } from "pinia";
import { useCookie } from "nuxt/app";
import { $fetch } from "ofetch";

export interface AuthState {
  user: any;
  token: any;
  userList: any[];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: "",
    token: null,
    userList: [],
  }),

  actions: {
    async login(loginData: any) {
      try {
        console.log(loginData);
        const data = await $fetch(`api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
          body: loginData, // Convert the data to JSON string
        });

        console.log(data);
        const router = useRouter();
        await router.push("/");
      } catch (error: any) {
        throw error;
      }
    },

    async signup(signupData: any) {
      try {
        console.log(signupData);
        const data = await $fetch(`/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
          body: signupData, // Convert the data to JSON string
        });

        console.log(data);
        const router = useRouter();
        await router.push("/login");
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    async logout() {
      try {
        const data = await $fetch(`/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        });
        console.log(data);
        const router = useRouter();
        await router.push("/login");
      } catch (error: any) {
        throw error;
      }
    },

    async getUserList() {
      try {
        const data = await $fetch(`/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        });
        console.log(data);
        this.userList = data.users;
      } catch (error: any) {
        throw error;
      }
    },

    async getUser(id: any) {
      try {
        console.log(id);
        const data = await $fetch(`/api/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        });
        this.user = data.user;
      } catch (error: any) {
        throw error;
      }
    },

    async updateUser(id: any, userData: any) {
      try {
        console.log(id);
        const { password, ...rest } = userData;
        const data = await $fetch(`/api/user/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
          body: rest,
        });
        console.log(data);
        this.user = data.user;
      } catch (error: any) {
        throw error;
      }
    },

    async deleteUser(id: any) {
      try {
        console.log(id);
        const data = await $fetch(`/api/user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        });
        console.log(data);
        this.user = data.user;
      } catch (error: any) {
        throw error;
      }
    },
  },
  getters: {
    getUserListData: (state) => {
      return state.userList;
    },
    getUserData: (state) => {
      return state.user;
    },
  },
});
