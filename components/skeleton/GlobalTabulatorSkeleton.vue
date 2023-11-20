<script setup lang="ts">
import { tableHeadItems } from "@/utils/types/global-tabulator";
import LoadingSkeletonTableRow from './LoadingSkeletonTableRow.vue'
import Table from "@/base-components/Table";
const deleteConfirmationModal = ref(false);
const props = defineProps({
  // Define the type of the columns prop
  columns: {
    type: Array as PropType<tableHeadItems[]>,
    required: true,
  },
  // Define the type of the data prop

  isShowSkeleton: {
    type: Boolean,
    default: true,
  },
});

const detectImageWithTextColumn = (columnName: string) => {
  let arr = ["productName", "user", "store", "templateTitle", "artWork"];
  return arr.includes(columnName);
};
</script>

<template>
   <div class="col-span-12 bg-white/80 pt-3 rounded-lg border border-slate-200">
    <Table class="-mt-2 border-separate border-spacing-y-[3px] rounded-lg bg-white">
      <!-- BEGIN: Table Head -->
      <Table.Thead>
        <Table.Tr>
          <!-- <Table.Th class="border-b-0 whitespace-nowrap">
            
            </Table.Th> -->
          <Table.Th class="whitespace-nowrap border-b-0 pt-3 pb-3 font-semibold text-slate-500" :class="{ 'pl-2 pr-5': col.field === 'templateTitle', 'pr-2 pl-5 ': col.field === 'checkbox' }" v-for="(col, i) in columns" :key="i">
            <div class="flex items-center" :class="{ 'justify-center': col.center }">
              <FormCheck.Input type="checkbox" v-if="col.field === 'checkbox'" />
              <span v-else>{{ col.label }}</span>
              <!-- <Lucide v-if="col.field !== 'actions' && col.field !== 'checkbox'" icon="ChevronDown" class="ml-5" /> -->
            </div>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr v-for="(faker, fakerKey) in 10" :key="fakerKey" class="intro-x">
          <template v-for="(col, i) in columns" :key="i">
            <Table.Td v-if="col.field === 'checkbox'" class="w-10 pr-2 pl-5 border-b-0 dark:bg-darkmode-600 border-t-[1px]" @click.stop>
      
              <LoadingSkeletonTableRow :width="'16px'" :height="'16px'" />
            </Table.Td>
            <Table.Td v-if="col.field === 'user' || col.field === 'templateTitle'" class="border-b-0 border-t-[1px] bg-white !py-2.5 dark:bg-darkmode-600">
              <div class="flex items-center gap-2">
                <LoadingSkeletonTableRow :width="'36px'" :height="'36px'" v-if="col.loadingImage" />
                <div v-if="col.loadingOnlyTitle">
                    <LoadingSkeletonTableRow :width="'140px'" :height="'15px'" />
                </div>
                <div class="flex flex-col gap-2" v-else>
                  <LoadingSkeletonTableRow :width="'180px'" :height="'15px'" />
                  <LoadingSkeletonTableRow :width="'150px'" :height="'15px'" />
                </div>
              </div>
            </Table.Td>
            <Table.Td v-else-if="col.field === 'artWork'" class="border-b-0 border-t-[1px] bg-white !py-2.5 dark:bg-darkmode-600">
              <div class="flex items-center">
                <LoadingSkeletonTableRow :width="'36px'" :height="'36px'" />
              </div>
            </Table.Td>
            <Table.Td v-else-if="col.field === 'productName' || col.field === 'store'" class="border-b-0 border-t-[1px] bg-white !py-2.5 dark:bg-darkmode-600">
              <div class="flex flex-col gap-2">
                <LoadingSkeletonTableRow :width="'160px'" :height="'15px'" />
                <LoadingSkeletonTableRow :width="'130px'" :height="'15px'" />
              </div>
            </Table.Td>

            <Table.Td v-else-if="col.field === 'status' || col.field === 'fulfillmentStatus' || col.field === 'publishStatus'"  class="w-40 border-b-0 border-t-[1px] bg-white dark:bg-darkmode-600">
              <LoadingSkeletonTableRow :width="'100px'" :height="'20px'" />
            </Table.Td>
            <Table.Td
              v-else-if="col.field === 'actions'"
              class="relative w-56 border-b-0 border-t-[1px] bg-white py-0 before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 dark:bg-darkmode-600 before:dark:bg-darkmode-400"
            >
              <div class="flex items-center justify-center gap-3">
                <a v-if="col.options.showView == true ? true : false" class=" flex items-center" :class="{'justify-center': col.center}" href="#">
                  <LoadingSkeletonTableRow :width="'40px'" :height="'20px'" />
                </a>

                <a v-if="col.options.hideEdit == true ? false : true" class=" flex items-center" :class="{'justify-center': col.center}" href="#">
                  <LoadingSkeletonTableRow :width="'40px'" :height="'20px'" />
                </a>
                <a v-if="col.options.hideDelete == true ? false : true" class="flex items-center text-danger" :class="{'justify-center': col.center}" href="#">
                  <LoadingSkeletonTableRow :width="'40px'" :height="'20px'" />
                </a>
              </div>
            </Table.Td>

            <Table.Td v-else-if="col.field !== 'checkbox'" class="border-b-0 border-t-[1px] bg-white capitalize dark:bg-darkmode-600">
              <LoadingSkeletonTableRow :width="'100px'" :height="'20px'" :align="col.center" />
            </Table.Td>
          </template>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  </div>
</template>

