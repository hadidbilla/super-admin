<script setup lang="ts">
import { Menu } from "@/base-components/Headless";
import Lucide from "~/base-components/Lucide/Lucide.vue";

const props = defineProps({
  sidebarOpen: Boolean,
});

const store = useAuthStore();

const emit = defineEmits(["isSidebarOpen"]);

const handleIsSidebarOpen = (value: boolean) => {
  emit("isSidebarOpen", value);
};
const handleLogout = async () => {
  try {
    await store.logout();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="sticky top-0 z-40 lg:mx-auto lg:px-8">
    <div
      class="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="handleIsSidebarOpen(true)"
      >
        <span class="sr-only">Open sidebar</span>
        <Lucide icon="MenuIcon" class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="relative flex flex-1" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <Lucide
            icon="SearchCheckIcon"
            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">View notifications</span>
            <Lucide icon="BellIcon" class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Separator -->
          <div
            class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <!-- Profile dropdown -->
          <Menu class="">
            <Menu.Button class="-m-1.5 flex items-center p-1.5">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span class="hidden lg:flex lg:items-center">
                <span
                  class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                  >Tom Cook</span
                >
                <Lucide
                  icon="UsersIcon"
                  class="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
            <Menu.Items class="w-40">
              <Menu.Item @click="$router.push('/profile')"> Profile </Menu.Item>
              <Menu.Item @click="handleLogout"> Logout </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
