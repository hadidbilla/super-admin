<script setup lang="ts">
import Lucide from "~/base-components/Lucide/Lucide.vue";
import { useSideMenuStore } from "~/stores/side-menu";

const navigation = useSideMenuStore();
const route = useRoute();

const handleIsActive = () => {
  const path = route.path.split("/")[1];
  navigation.menu.forEach((item) => {
    if (item.path === `/${path}`) {
      item.current = true;
    } else {
      if (item.path == route.path) {
        item.current = true;
      } else {
        item.current = false;
      }
    }
  });
};

watch(
  () => route.path,
  () => {
    handleIsActive();
  }
);

const menus = computed(() => {
  return navigation.menu;
});

onMounted(() => {
  handleIsActive();
});
</script>

<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary border-r border-gray-200 px-6 pb-4"
    >
      <div class="flex h-16 shrink-0 items-center">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
          alt="Your Company"
        />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in menus" :key="item.name">
                <nuxt-link
                  :to="item.path"
                  :class="[
                    item.current
                      ? 'bg-white text-primary'
                      : 'text-white hover:text-slate-300 ',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-primary'
                        : 'text-white group-hover:text-slate-300',
                      'h-6 w-6 shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <button
              @click="$router.push('/profile')"
              class="group cursor-pointer -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:text-slate-300"
            >
              <Lucide
                icon="SettingsIcon"
                class="h-6 w-6 shrink-0 text-white group-hover:text-slate-300"
                aria-hidden="true"
              />
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
