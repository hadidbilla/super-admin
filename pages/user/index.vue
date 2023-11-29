<script setup  lang="ts">
import GlobalTabulator from '~/components/shared/GlobalTabulator.vue';
import GlobalTabulatorSkeleton from '~/components/skeleton/GlobalTabulatorSkeleton.vue';
import EmptyTableCard from '~/components/shared/EmptyTableCard.vue';
import DeleteModal from '~/components/shared/DeleteModal.vue';
import GlobalPageHeaderSearch from '~/components/shared/GlobalPageHeaderSearch.vue';
const store = useAuthStore()
const router = useRouter()
const selectedId = ref("")
const {startLoading,stopLoading,wait} = useLoadingStore()
const columns = ref([
  {
    label: "User Id",
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
  {
    label: "ACTIONS",
    field: "actions",
    center: true,
    options: {
      hideEdit: true,
    },
  },
]);

const tableData: any = computed(() => {
return store.userList.map((item: any) => {
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
    startLoading("getUserList")
    await store.getUserList()
  } catch (error) {
    console.log(error)
  } finally {
    stopLoading("getUserList")
  }
}

const goTo = () => {
  router.push("/user/create");
};

const deleteConfirmationModal = ref(false);

const openView = (id:string) => {
  console.log(id)
  router.push(`/user/update/${id}`);
};

const setDeleteConfirmationModal = (user?:any) =>{
  selectedId.value = user?.id || ""
  deleteConfirmationModal.value = !deleteConfirmationModal.value 
}

const deleteUser = async () => {
  try {
    startLoading("deleteUser")
    console.log(selectedId.value);
   await store.deleteUser(selectedId.value)
    await handleFetchUser()
  } catch (e) {
    console.log(e);
  } finally {
    setDeleteConfirmationModal();
    stopLoading("deleteUser")
  }
}

onMounted(() => {
  handleFetchUser()
})

</script>
<template>
  <div>
    <GlobalPageHeaderSearch title="Admin" btn-title="Add New User" @btnAction="goTo" />
    <GlobalTabulatorSkeleton class="" :columns="columns" v-if="wait('getUserList')" />
    <template v-else>
      <GlobalTabulator @rowClick="openView" :is-row-clickable="true" :columns="columns" :data="tableData" v-if="tableData.length" @delete="setDeleteConfirmationModal" />
      <EmptyTableCard title="No Transaction Found" description="There are No Transaction available at the moment." v-else />
    </template>
    <DeleteModal :showModal="deleteConfirmationModal" deleteText="Are you sure you want to delete the User?" @cancelDelete="setDeleteConfirmationModal" @btnAction="deleteUser" :isShowModalLoadingSpinner="wait('deleteUser')" />
  </div>
</template>
