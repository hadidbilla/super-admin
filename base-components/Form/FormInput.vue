<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import {
  computed,
  InputHTMLAttributes,
  useAttrs,
  inject,
  watch,
  ref,
} from "vue";
import { ProvideFormInline } from "./FormInline.vue";
import { ProvideInputGroup } from "./InputGroup/InputGroup.vue";

/* @vue-ignore */
interface FormInputProps {
  modelValue?: InputHTMLAttributes["value"];
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
  rectangle?: boolean;
}

interface FormInputEmit {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps<FormInputProps>();

const attrs = useAttrs();

const formInline = inject<ProvideFormInline>("formInline", false);
const inputGroup = inject<ProvideInputGroup>("inputGroup", false);

const computedClass = computed(() =>
  twMerge([
    "disabled:bg-slate-100 disabled:cursor-not-allowed ",
    "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed ",
    "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 ",
    props.formInputSize == "sm" && "text-xs py-1.5 px-2",
    props.formInputSize == "lg" && "text-lg py-1.5 px-4",
    props.rounded && "rounded-full",
    formInline && "flex-1",
    inputGroup &&
      "rounded-none [&:not(:first-child)]:border-l-transparent first:rounded-l last:rounded-r z-10",
    typeof attrs.class === "string" && attrs.class,
  ])
);

const localValue = ref(props.modelValue);
const emit = defineEmits<FormInputEmit>();

watch(localValue, () => {
  emit("update:modelValue", localValue.value);
});

watch(
  () => props.modelValue,
  (value) => {
    localValue.value = value;
  }
);
</script>

<template>
  <input
    :class="computedClass"
    :type="props.type"
    v-bind="_.omit(attrs, 'class')"
    v-model="localValue"
  />
</template>
