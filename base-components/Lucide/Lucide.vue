<script setup lang="ts">
import * as lucideIcons from "lucide-vue-next";

export type Icon = keyof typeof lucideIcons;

interface LucideProps  {
  icon: Icon;
  title?: string;
}

const props = defineProps<LucideProps>();
</script>

<template>
  <component :is="lucideIcons[props.icon]" class="stroke-1.5" />
</template>
