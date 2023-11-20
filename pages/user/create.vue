<template>
  <div class="max-w-[800px] mx-auto">
    <GlobalPageHeader :showBackButton="true" parentUrl="/user" title="Crete User" />
    <UserForm />
  </div>
</template>

<script setup>
import GlobalPageHeader from '~/components/shared/GlobalPageHeader.vue';
import UserForm from '@/components/views/users/UserForm.vue';

const goTo = () => {
  router.push("/user/create");
};
</script>

<style lang="scss" scoped>

</style>