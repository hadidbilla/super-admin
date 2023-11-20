<script setup lang="ts">
import { defineComponent, PropType, ref, watch, onMounted } from "vue";
import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import { FormInput, FormSelect } from "@/base-components/Form";
import { Menu } from "@/base-components/Headless";
import { Icon } from "@/base-components/Lucide/Lucide.vue";
import GlobalIcons from "@/components/shared/GlobalIcons.vue";


const props = defineProps<{
  title?: string;
  btnTitle?: string;
  icon?: any,
  showSortBy?: boolean;
  secondaryBtnTitle?: string;
  secondaryDisabled?: boolean;
  showBackButton?: string;
  disableBtn?: boolean;
}>();

const sortBy = ref("");
const router = useRouter();
const route = useRoute();
const search = ref<any>("");
const goBack = () => {
  router.push(props.showBackButton ?? "/")
};



const emit = defineEmits(["btnAction", "secondarybtnAction"]);


</script>

<template>
  <div class="mt-6 mb-5 flex justify-between items-center">
    <div class="flex items-center">
      <Button class="w-10 mb-1 shadow-none mr-3" @click="goBack" v-if="showBackButton">
        <span class="flex items-center justify-center">
          <Lucide icon="ChevronLeft" class="w-8 h-8 opacity-60" />
        </span>
      </Button>
      <div class="flex items-center gap-2" v-if="title">
        <Lucide :icon="icon" v-if="icon" />
        <h2 class="mr-auto text-[18px] sm:text-[22px] lg:text-[25px] font-semibold">{{ title }}</h2>
      </div>
      <!-- <p class="mt-3 text-sm text-slate-500">Rapidiously brand orthogonal manufactured products through low-risk high-yield.</p> -->
    </div>
    <div class="flex items-center justify-between flex-wrap gap-4" :class="{'flex-nowrap': !btnTitle && !showSortBy}" v-if="btnTitle || showSortBy || secondaryBtnTitle">
      <div class="flex items-center" :class="{'w-full sm:w-auto': btnTitle || showSortBy}">
        <Button variant="primary" class="mr-3" v-if="btnTitle" :disabled="disableBtn" @click="$emit('btnAction')">{{ btnTitle }}</Button>
        <Button variant="primary" class="mr-3" v-if="secondaryBtnTitle" :disabled="secondaryDisabled" @click="$emit('secondarybtnAction')">{{ secondaryBtnTitle }}</Button>
        
        <!-- <Menu class="z-50">
          <Menu.Button :as="Button" class="!box px-2">
            <span class="flex h-4 w-4 items-center justify-center">
              <Lucide icon="Plus" class="h-4 w-4" />
            </span>
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item> <Lucide icon="Printer" class="mr-2 h-4 w-4" /> Print </Menu.Item>
            <Menu.Item> <Lucide icon="FileText" class="mr-2 h-4 w-4" /> Export to Excel </Menu.Item>
            <Menu.Item> <Lucide icon="FileText" class="mr-2 h-4 w-4" /> Export to PDF </Menu.Item>
          </Menu.Items>
        </Menu> -->
      </div>
    </div>
  </div>
</template>
