<template>
  <div class="max-w-[800px] mx-auto">
    <GlobalPageHeader :showBackButton="true" parentUrl="/user" title="Update User" />
    <UserForm />
  </div>
</template>

<script setup lang="ts">
import GlobalPageHeader from '~/components/shared/GlobalPageHeader.vue';
import UserForm from '@/components/views/users/UserForm.vue';



</script>

<style scoped>

</style>