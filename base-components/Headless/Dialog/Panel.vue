<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  DialogPanel as HeadlessDialogPanel,
  TransitionChild,
} from "@headlessui/vue";
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { ProvideDialog } from "./Dialog.vue";
import { inject, useAttrs, computed } from "vue";

interface PanelProps {
  as?: string | object;
}

const { as } = withDefaults(defineProps<PanelProps>(), {
  as: "div",
});

const dialog = inject<ProvideDialog>("dialog");

const attrs = useAttrs();
const computedClass = computed(() =>
  twMerge([
    "w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-transform dark:bg-darkmode-600",
    dialog?.size == "md" && "sm:w-[460px]",
    dialog?.size == "sm" && "sm:w-[300px]",
    dialog?.size == "lg" && "sm:w-[600px]",
    dialog?.size == "xl" && "sm:w-[600px] lg:w-[900px]",
    dialog?.zoom.value && "scale-105",
    typeof attrs.class === "string" && attrs.class,
  ])
);
</script>

<template>
  <TransitionChild
    as="div"
    enter="ease-in-out duration-[180ms]"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in-out duration-[180ms]"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    class="fixed inset-0 bg-black/60"
    aria-hidden="true"
  />
  <TransitionChild
    as="div"
    enter="ease-in-out duration-[180ms]"
    enterFrom="opacity-0 -mt-5"
    enterTo="opacity-100 mt-5"
    entered="opacity-100 mt-5"
    leave="ease-in-out duration-[180ms]"
    leaveFrom="opacity-100 mt-5"
    leaveTo="opacity-0 -mt-5"
    class="fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <HeadlessDialogPanel as="template">
      <component
        :is="as"
        :class="computedClass"
        v-bind="_.omit(attrs, 'class')"
      >
        <slot></slot>
      </component>
    </HeadlessDialogPanel>
  </TransitionChild>
</template>
