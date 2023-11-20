<script setup lang="ts">
import { ref, PropType } from "vue";
import { Skeletor } from 'vue-skeletor';
const props = defineProps({
  // Define the type of the columns prop
  width: {
    type: String as PropType<any>,
    required: true,
  },
  height: {
    type: String as PropType<any>,
    required: true,
  },
  align: {
    type: Boolean as PropType<any>,
    required: false,
  }
  

});

</script>

<template>
  <div class="flex items-center" :class="{'justify-center': align}">
    <Skeletor :width="width" :height="height" class="!bg-slate-400/30 block" />
  </div>
</template>