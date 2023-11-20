<script setup lang="ts">
import MobileMenu from "~/components/layout/MobileMenu.vue";
import SideMenu from "~/components/layout/SideMenu.vue";
import TopBar from "~/components/layout/TopBar.vue";

const sidebarOpen = ref(false)

const handleIsSidebarOpen = (value: boolean) => {
  console.log(value)
  sidebarOpen.value = value
}

</script>

<template>
  <div>
    <MobileMenu :sidebarOpen="sidebarOpen" @isSidebarOpen="handleIsSidebarOpen"/>
    <!-- Static sidebar for desktop -->
    <SideMenu/>
    <div class="lg:pl-72">
      <!-- Top Bar -->
      <TopBar :sidebarOpen="sidebarOpen" @isSidebarOpen="handleIsSidebarOpen"/>
      <main class="py-10">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <slot/>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>