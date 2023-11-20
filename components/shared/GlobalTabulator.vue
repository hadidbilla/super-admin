<script setup lang="ts">
import _ from "lodash";
import { ref, PropType } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { tableHeadItems } from "@/utils/types/global-tabulator";
import Lucide from "@/base-components/Lucide";
// import Tippy from "@/base-components/Tippy";
import Table from "@/base-components/Table";
// import FullfilmentIcon1 from "@/components/icons/FullfilmentIcon1.vue";
// import FullfilmentIcon2 from "@/components/icons/FullfilmentIcon2.vue";
// import FullfilmentIcon3 from "@/components/icons/FullfilmentIcon3.vue";
// import GlobalIcons from "@/components/shared/GlobalIcons.vue";
import { Menu } from "@/base-components/Headless";
import Button from "@/base-components/Button";
import LoadingIcon from "@/base-components/LoadingIcon";

const deleteConfirmationModal = ref(false);
const props = defineProps({
  // Define the type of the columns prop
  columns: {
    type: Array as PropType<tableHeadItems[]>,
    required: true,
  },
  // Define the type of the data prop
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  isRowClickable: {
    type: Boolean,
    default: false,
  },
  totalRows: {
    type: Number as PropType<any>,
    required: false,
    default: 0,
  },
  selectedRows: {
    type: Number as PropType<any>,
    required: false,
    default: 0,
  },
  isFromDescriptionTemplate: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const { startLoading, stopLoading, wait } = useLoadingStore();

const detectImageWithTextColumn = (columnName: string) => {
  let arr = ["productName", "user", "store", "templateTitle", "artWork"];
  return arr.includes(columnName);
};

const getStatusColor = (status: any) => {
  if (status === "fulfilled") {
    return "green";
  } else if (status === "unfulfilled") {
    return "red";
  } else {
    return "blue";
  }
};

const getCardName = (card: any) => {
  if (card.toLowerCase() === "visa") {
    return "Visa";
  } else if (card.toLowerCase() === "mastercard") {
    return "Mastercard";
  } else if (card.toLowerCase() === "amex") {
    return "Amex";
  } else if (card.toLowerCase() === "diners") {
    return "DinnersClub";
  } else if (card.toLowerCase() === "unionpay") {
    return "Unionpay";
  } else if (card.toLowerCase() === "jcb") {
    return "Jcb";
  } else if (card.toLowerCase() === "discover") {
    return "Discover";
  }
  return "CardPlaceholder";
};

// const emit = defineEmits(["rowClick"]);
// const rowClick = (id:string) =>{
//  emit("rowClick",id)
// }
</script>

<template>
  <!-- BEGIN: Data List -->
  <div class="col-span-12 overflow-auto bg-white/80 pt-3 rounded-lg border border-slate-200" ref="table">
    <Table class="border-spacing-y-[3px] -mt-2">
      <!-- BEGIN: Table Head -->
      <Table.Thead>
        <Table.Tr>
          <Table.Th class="p-0" v-if="isRowClickable"></Table.Th>
          <Table.Th class="border-b-0 whitespace-nowrap uppercase font-semibold text-sm text-slate-500" :class="{ 'pl-2 pr-5': col.field === 'templateTitle', 'pr-2 pl-5 ': col.field === 'checkbox' }" v-for="(col, i) in columns" :key="i">
            <div class="flex items-center relative" :class="{ 'justify-center': col.center }">
              <input
                class="['&quot;disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent&quot;, &quot;[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent&quot;, &quot;transition w-4 cursor-pointer duration-75 ease-in-out flex items-center text-sm border-slate-200 shadow-sm rounded-[4px] checked:hover:bg-primary checked:bg-primary checked:focus:bg-primary placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80&quot;' ]"
                type="checkbox"
                v-if="col.field === 'checkbox'"
                :checked="col.bulkSelected"
                v-model="col.bulkSelected"
                @change="
                  () => {
                    $emit('bulkSelect', col.bulkSelected);
                  }
                "
              />
              <span v-else>{{ col.label }}</span>
              <div
                class="w-[16px] h-[16px] bg-primary rounded flex justify-center items-center cursor-pointer absolute"
                v-if="col.field === 'checkbox' && selectedRows > 0 && selectedRows < totalRows"
                @click.prevent="
                  () => {
                    $emit('minusSelect');
                  }
                "
              >
                <span class="w-[10px] h-[2px] bg-white rotate-180"> &nbsp; </span>
              </div>
            </div>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr
          v-for="(faker, fakerKey) in data"
          :key="fakerKey"
          :class="isRowClickable ? 'cursor-pointer hover:bg-primary/5 transition duration-300 ease-in-out' : ''"
          class="relative cursor-pointer"
        >
          <span class="absolute w-full h-full" @click="(event) =>{
            event.stopPropagation();
            $emit('rowClick', faker.id);
          }" v-if="isRowClickable"></span>
          <template v-for="(col, i) in columns" :key="i">
            <Table.Td v-if="col.field === 'checkbox'" class="w-10 pr-2 pl-5 border-b-0 dark:bg-darkmode-600 border-t-[1px] relative z-[9]" @click.stop>
              <input
                class="['&quot;disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent&quot;, &quot;[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent&quot;, &quot;transition duration-75 cursor-pointer ease-in-out w-4 flex items-center text-sm border-slate-200 shadow-sm rounded-[4px] checked:hover:bg-primary checked:bg-primary checked:focus:bg-primary placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80&quot;' ]"
                type="checkbox"
                :checked="faker.selected"
                v-model="faker.selected"
                @click="
                  (event ) => {
                    event.stopPropagation();
                    $emit('rowSelect', faker, fakerKey , event);
                  }
                "
              />
            </Table.Td>
            <Table.Td
              v-else-if="detectImageWithTextColumn(col.field)"
              :class="[{ 'w-32': !faker[col.field].title && !faker[col.field].subtitle }, { 'pl-2 pr-5': col.field === 'templateTitle' }]"
              class="!py-3 border-b-0 dark:bg-darkmode-600 border-t-[1px]"
            >
              <div class="flex items-center">
                <div v-if="col.loadingImage">
                  <div class="w-14 h-14 image-fit border rounded-lg" v-if="faker[col.field].image">
                    <img :src="faker[col.field].image" alt="Midone - HTML Admin Template" class="border-white rounded-lg object-contain" />
                  </div>
                  <div class="w-14 h-14 image-fit border border-1 rounded-md flex bg-primary/80 text-white justify-center items-center" v-else>
                    <p>{{ faker[col.field]?.title.charAt(0) || "" }}</p>
                  </div>
                </div>
                <div :class="[{ 'ml-3': col.loadingImage }]" v-if="faker && !isFromDescriptionTemplate">
                  <p class="truncate max-w-[196px] font-medium whitespace-nowrap text-sm" v-if="faker[col.field].title">
                    {{ faker[col.field].title }}
                  </p>
                  <p v-else>No Customer</p>
                  <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5" v-if="faker[col.field].brand">
                    {{ faker[col.field].brand }}
                  </div>
                  <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5" v-if="faker[col.field].subtitle">
                    {{ faker[col.field].subtitle }}
                  </div>
                </div>
                <div :class="[{ 'ml-3': col.loadingImage }]" v-else>
                  <p class="font-medium whitespace-nowrap text-sm" v-if="faker[col.field].title">
                    {{ faker[col.field].title }}
                    <span class="text-slate-500 text-xs whitespace-nowrap mt-0.5" v-if="faker[col.field].brand"> by {{ faker[col.field].brand }} </span>
                  </p>
                  <p v-else>No Title</p>
                  <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5" v-if="faker[col.field].subtitle">
                    {{ faker[col.field].subtitle }}
                  </div>
                </div>
              </div>
            </Table.Td>

            <Table.Td v-else-if="col.field === 'status'" class="w-40 border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <div :class="['flex items-center justify-center', { 'text-success': faker[col.field] }, { 'text-danger': !faker[col.field] }]">
                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                {{ faker[col.field] ? "Active" : "Draft" }}
              </div>
            </Table.Td>
            <Table.Td v-else-if="col.field === 'fulfillmentStatus'" class="w-48 border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <div class="inline-flex items-center gap-2 py-1 rounded-full" v-if="faker[col.field]?.title">
                <!-- {{ faker[col.field]?.title }} -->
                <div
                :class="[
                  faker[col.field]?.title == 'Imported'
                    ? '!text-slate-700 !bg-slate-100 border !border-slate-300'
                    : faker[col.field]?.title == 'Awaiting Approval'
                    ? '!bg-yellow-100 border !border-yellow-300 !text-yellow-700'
                    : faker[col.field]?.title == 'Sent To Production' ? '!text-green-700 !bg-green-100 border !border-green-300'
                    : '!bg-red-100 border !border-red-300 !text-red-700',
                ]"
                class="inline-flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-red-100 whitespace-nowrap"
              >
                <div class="text-xs font-normal leading-none max-w-full flex-initial capitalize">
                  {{ faker[col.field]?.title }}
                </div>
              </div>
                <!-- <FullfilmentIcon1 :text="faker[col.field]?.title" :color="getStatusColor(faker[col.field].title)" />
                <FullfilmentIcon2 :text="faker[col.field]?.title" :color="getStatusColor(faker[col.field].title)" />
                <FullfilmentIcon3 :text="faker[col.field]?.title" :color="getStatusColor(faker[col.field].title)" /> -->
              </div>
              <div v-else>Empty</div>
            </Table.Td>
            <Table.Td v-else-if="col.field === 'publishStatus'" class="w-48 border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <div
                :class="[
                  faker[col.field] == 'Published'
                    ? '!text-green-700 !bg-green-100 border !border-green-300'
                    : faker[col.field] == 'Unpublished Changes'
                    ? '!bg-yellow-100 border !border-yellow-300 !text-yellow-700'
                    : '!bg-red-100 border !border-red-300 !text-red-700',
                ]"
                class="inline-flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-red-100 whitespace-nowrap"
              >
                <div class="text-xs font-normal leading-none max-w-full flex-initial capitalize">
                  {{ faker[col.field] ? faker[col.field] : "" }}
                </div>
              </div>
            </Table.Td>

            <!-- <Table.Td v-else-if="col.field === 'paymentMethod'" class="border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <div class="text-slate-400 flex items-center" v-if="faker.paymentMethod">
                <GlobalIcons :component-name="getCardName(faker.paymentMethod.brand)" class="w-8 h-8 fill-black" />
                <p class="ml-2">****</p>
                <p class="">{{ faker.paymentMethod.last4 }}</p>
              </div>
            </Table.Td> -->

            <Table.Td v-else-if="col.field === 'variants'" class="min-w-[300px] capitalize border-b-0 dark:bg-darkmode-600 border-t-[1px] text-sm">
              <div class="flex items-center gap-3">
                <div class="font-normal flex items-center">
                  <span class=""> {{ faker[col.field].colors }} Colors </span>
                </div>
                <div class="font-normal flex items-center gap-2">
                  <span>/</span>
                  <span class="">{{ faker[col.field].sizes }} Sizes</span>
                </div>
                <div class="font-normal flex items-center gap-2">
                  <span>/</span>
                  <span class="">{{ faker[col.field].variant }} Variants</span>
                </div>
              </div>
            </Table.Td>

            <Table.Td v-else-if="col.field === 'paymentStatus'" class="w-40 border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <div :class="[{ 'text-red-700': faker[col.field]?.toLowerCase() == 'due' }, { 'text-green-700 ': faker[col.field]?.toLowerCase() == 'paid' }, { 'text-amber-700': faker[col.field]?.toLowerCase() === 'refunded' }]" class="">
                <p class="font-normal leading-none max-w-full flex-initial capitalize">{{ faker[col.field] }}</p>
              </div>
            </Table.Td>
            <Table.Td v-else-if="col.field === 'stock' || col.field === 'price'" class="w-40 border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <FormInput id="validation-form-3" type="text" :name="col.field" :placeholder="col.field" v-model="faker[col.field]" />
            </Table.Td>
            <Table.Td v-else-if="col.field === 'btnAction'" class="text-center flex items-center justify-center border-b-0 dark:bg-darkmode-600 border-t-[1px]">
              <button @click.prevent="$emit('download', faker)" type="button" class="gap-2 border-none font-normal flex justify-center items-center !py-0 shadow-none" :disabled="wait(`generateOrderPdf-${faker.id}`)">
                <LoadingIcon v-if="wait(`generateOrderPdf-${faker.id}`)" icon="oval" color="grey" class="w-4 h-4 ml-3" />
                <Lucide v-else icon="Download" class="w-5 h-5 text-slate-600" />
                <span>Download</span>
              </button>
            </Table.Td>
            <Table.Td
              v-else-if="col.field === 'actions'"
              class="w-40 z-20 border-b-0 dark:bg-darkmode-600 border-t-[1px] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
            >
              <div class="flex justify-center items-center">
                <Menu
                  class="p-3"
                  @click.prevent="
                    (event) => {
                      event.stopPropagation();
                    }
                  "
                >
                  <Menu.Button as="a" class="block w-5 h-5" href="#">
                    <Lucide icon="MoreVertical" class="w-5 h-5 text-slate-500" />
                  </Menu.Button>
                  <Menu.Items class="w-40" :placement="'left'">
                    <Menu.Item v-if="col.options.download == true ? true : false"
                      ><a
                        class="flex items-center mr-3 text-sm"
                        href="#"
                        @click.prevent="
                          (event) => {
                            event.stopPropagation();
                            $emit('download', faker.id);
                          }
                        "
                      >
                        <Lucide icon="Download" class="w-4 h-4 mr-1" />
                        Download
                      </a></Menu.Item
                    >
                    <Menu.Item v-if="col.options.showView == true ? true : false"
                      ><a
                        class="flex items-center mr-3 text-sm"
                        href="#"
                        @click.prevent="
                          (event) => {
                            event.stopPropagation();
                            $emit('view', faker);
                          }
                        "
                      >
                        <Lucide icon="Eye" class="w-4 h-4 mr-1" />
                        View
                      </a></Menu.Item
                    >
                    <Menu.Item v-if="faker.publishStatus == 'published'">
                      <a class="flex items-center mr-3 w-[78px] text-sm" :href="'https://' + faker.storeUrl + '/products/' + faker.productHandle" target="_blank">
                        <Lucide icon="Eye" class="w-4 h-4 mr-1 text-slate-300" />
                        Live Link
                      </a>
                    </Menu.Item>
                    <Menu.Item v-if="col.options.hideEdit == true ? false : true">
                      <a
                        class="flex items-center mr-3 text-sm"
                        href="#"
                        @click.prevent="
                          (event ) => {
                            event.stopPropagation();
                            $emit('edit', faker);
                          }
                        "
                      >
                        <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                        Edit
                      </a>
                    </Menu.Item>
                    <Menu.Item
                      v-if="col.options.hideDelete == true ? false : true"
                      @click.prevent="
                    (event) => {
                      event.stopPropagation();
                      $emit('delete', faker);
                    }
                  "
                    >
                      <div class="flex items-center text-danger text-sm">
                        <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
                        Delete
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </Table.Td>
            <Table.Td v-else :class="{ 'text-center': col.center, lowercase: col.field == 'email', capitalize: col.field !== 'email' }" class="border-b-0 dark:bg-darkmode-600 border-t-[1px] text-sm">
              <span>{{ faker[col.field] }}</span>
            </Table.Td>
          </template>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  </div>
  <!-- END: Data List -->
</template>

<!-- 
<style>
.table-container {
  max-height: calc(100vh - 296px);
  overflow-y: scroll;
}

.table-container-order {
  max-height: calc(100vh - 238px);
  overflow-y: scroll;
}
</style> -->
