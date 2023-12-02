<script setup>
import GlobalTabulator from "~/components/shared/GlobalTabulator.vue";
import GlobalTabulatorSkeleton from "~/components/skeleton/GlobalTabulatorSkeleton.vue";
import EmptyTableCard from "~/components/shared/EmptyTableCard.vue";
import GlobalPageHeaderSearch from "~/components/shared/GlobalPageHeaderSearch.vue";
const store = useAuthStore();
const router = useRouter();
const selectedId = ref("");
const { startLoading, stopLoading, wait } = useLoadingStore();
const columns = ref([
  {
    label: "Order Id",
    field: "id",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "First Name",
    field: "firstName",
  },
  {
    label: "Last Name",
    field: "lastName",
  },
]);

const tableData = computed(() => {
  return store.userList.map((item) => {
    return {
      id: item._id,
      email: item?.email,
      firstName: item?.firstName,
      lastName: item?.lastName,
    };
  });
});

const handleFetchUser = async () => {
  try {
    startLoading("getUserList");
    await store.getUserList();
  } catch (error) {
    console.log(error);
  } finally {
    stopLoading("getUserList");
  }
};

const goTo = () => {
  router.push("/user/create");
};

const deleteConfirmationModal = ref(false);

const openView = (id) => {
  console.log(id);
  router.push(`/order/${id}`);
};

const setDeleteConfirmationModal = (user) => {
  selectedId.value = user?.id || "";
  deleteConfirmationModal.value = !deleteConfirmationModal.value;
};

const deleteUser = async () => {
  try {
    startLoading("deleteUser");
    console.log(selectedId.value);
    await store.deleteUser(selectedId.value);
    await handleFetchUser();
  } catch (e) {
    console.log(e);
  } finally {
    setDeleteConfirmationModal();
    stopLoading("deleteUser");
  }
};

onMounted(() => {
  handleFetchUser();
});
</script>
<template>
  <div>
    <GlobalPageHeaderSearch title="Order List" />
    <GlobalTabulatorSkeleton
      class=""
      :columns="columns"
      v-if="wait('getUserList')"
    />
    <template v-else>
      <GlobalTabulator
        @rowClick="openView"
        :is-row-clickable="true"
        :columns="columns"
        :data="tableData"
        v-if="tableData.length"
      />
      <EmptyTableCard
        title="No Transaction Found"
        description="There are No Transaction available at the moment."
        v-else
      />
    </template>
  </div>
</template>
