<script lang="ts">
export default defineComponent({
  name: "GlobalPageHeader",
});
</script>
<script setup lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import { Icon } from "@/base-components/Lucide/Lucide.vue";
import { Menu } from "@/base-components/Headless";
import GlobalIcons from "@/components/shared/GlobalIcons.vue";

const props = defineProps<{
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showBreadcrumb?: boolean;
  showIcon?: Icon;
  parentUrl?: string;
}>();

const router = useRouter();

const goBack = () => {
  router.push(props.parentUrl ?? "/");
};
</script>

<template>
  <div class="my-6">
    <div class="flex items-center w-full">
      <Button class="mr-3 sm:mr-5" @click="goBack" v-if="showBackButton">
        <span class="flex items-center justify-center">
          <Lucide icon="ChevronLeft" class="h-4 w-4" />
        </span>
      </Button>
      <div class="flex items-center justify-between w-full">
        <div class="flex gap-2 items-center">
          <Lucide class="mr-1 w-5 h-5 sm:w-6 sm:h-6 lg:h-7 lg:w-7 fill-slate-700" :icon="showIcon" v-if="showIcon"/>
          <h2 class="mr-auto text-[18px] sm:text-[22px] lg:text-[25px] font-semibold leading-[1.2]">{{ title }}</h2>
        </div>
        <slot></slot>
      </div>
    </div>
    <p class="mt-2 lg:mt-3 text-xs lg:text-sm text-slate-500 max-w-[500px] xl:max-w-[600px]" v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>
