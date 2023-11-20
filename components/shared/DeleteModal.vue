<script setup lang="ts">
import { Dialog } from "@/base-components/Headless";
import LoadingIcon from "@/base-components/LoadingIcon";
import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";
import { PropType, ref } from "vue";

const deleteButtonRef = ref(null);
const deleteBothButtonRef = ref(null);

const props = defineProps({
  showModal: {
    type: Boolean as PropType<any>,
    required: true,
  },
  deleteText: {
    type: String as PropType<any>,
    required: true,
  },
  isShowModalLoadingSpinner: {
    type: Boolean as PropType<boolean>,
    required: true,
    default: false,
  },
  isShowLodingBothButton: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  showBothbtn: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  deleteButtonText: {
    type: String as PropType<any>,
    default: "Delete",
  },
  deleteBothButtonText: {
    type: String as PropType<any>,
    default: "Delete from both",
  },
});

const emit = defineEmits(["btnAction", "cancelDelete", "btnActionboth"]);

const btnAction = () => {
  emit("btnAction");
};

const cancelDelete = () => {
  emit("cancelDelete");
};

const btnActionboth = () => {
  emit("btnActionboth");
};
</script>

<template>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Dialog :open="showModal" @close="cancelDelete" :initialFocus="deleteButtonRef" >
    <Dialog.Panel class="max-w-[720px] !w-full">
      <div class="">
        <div class="flex gap-5 items-center px-4 sm:px-8 py-8">
          <div class="">
            <div class="text-lg sm:text-xl font-semibold">Deletion Confirmation</div>
            <div class="mt-2 text-sm sm:text-base">
              <p class="">
                {{ deleteText }}
              </p>
            </div>
          </div>
        </div>
        <div class="px-12 pr-8 py-5 flex gap-4 justify-end bg-[#EDF1F7]">
          <Button variant="outline-secondary" type="button" size="sm" @click="cancelDelete" class="w-32 font-medium border-slate-300"> Cancel </Button>
          <Button variant="danger" size="sm" @click="btnAction" :disabled="isShowLodingBothButton" type="button" class="min-w-[128px] whitespace-nowrap font-medium" ref="deleteButtonRef">
            {{ deleteButtonText }}
            <LoadingIcon icon="oval" color="white" class="ml-2 h-4 w-4" v-if="isShowModalLoadingSpinner" />
          </Button>
          <Button v-if="showBothbtn" variant="danger" size="sm" @click="btnActionboth" :disabled="isShowModalLoadingSpinner" type="button" class="whitespace-nowrap font-medium" ref="deleteBothButtonRef">
           {{ deleteBothButtonText }}
            <LoadingIcon icon="oval" color="white" class="ml-2 h-4 w-4" v-if="isShowLodingBothButton" />
          </Button>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Delete Confirmation Modal -->
</template>

<style scoped></style>
