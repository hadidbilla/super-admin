import { NotificationElement } from "@/base-components/Notification";
import { useToastStore }  from "@/stores/toast";


export const successToast = (text: string) => {
  const errorStore = useToastStore();
  errorStore.setSuccess(text);
};

export const errorToast = (error: any) => {
  const errorStore = useToastStore();
  let errorMessage = error ? error.message : "Something went wrong"
  errorStore.setError(errorMessage);
};