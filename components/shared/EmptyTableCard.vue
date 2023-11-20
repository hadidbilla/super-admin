<script setup lang="ts">
import Lucide from "@/base-components/Lucide";

const props = defineProps({
  title: {
    type: String,
    default: "No Data Found",
  },
  description: {
    type: String,
    default: "There are No Data available at the moment.",
  },
});
</script>

<template>
  <div class="intro-y mt-5 w-full rounded-sm border-2 border-dashed border-slate-300/70 bg-transparent py-10 text-slate-400/80">
    <Lucide icon="Database" class="mx-auto block h-12 w-12" />
    <div class="mt-3 text-center text-base font-medium text-slate-400/80">
      {{ title }}
    </div>
    <div class="mx-auto mt-2 w-3/4 text-center text-slate-400/80">
      {{ description }}
    </div>
  </div>
</template>