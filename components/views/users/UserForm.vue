
<template>
  <div>
    <form @submit.prevent="handleSignup" class="">
      <div class="box p-3 sm:p-5">
          <div class="rounded-md border-slate-200/60 dark:border-darkmode-400 sm:border sm:p-5">
            <FormInline class="mt-5 flex-row items-start pt-5 first:mt-0 first:pt-0">
                <FormLabel class="w-full flex-1 xl:w-64">
                  <div class="mb-3 text-left">
                    <div class="flex items-center">
                      <div class="font-medium">First Name</div>
                    </div>
                  </div>
                  <div class="mt-3 w-full xl:mt-0">
                    <FormInput
                      v-model.trim="signupForm.firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                    />
                  </div>
                </FormLabel>
                  <FormLabel class="w-full flex-1 xl:w-64 ml-4">
                    <div class="mb-3 text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Last Name</div>
                        <div class="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">Required</div>
                      </div>
                    </div>
                    <div class="mt-3 w-full xl:mt-0">
                      <FormInput
                        v-model.trim="validate.lastName.$model"
                        type="text"
                        name="lastName"
                        :class="{
                          'border-danger': validate.lastName.$error,
                        }"
                        placeholder="Doe"
                      />
                      <template v-if="validate.lastName.$error">
                        <div v-for="(error, index) in validate.lastName.$errors" :key="index" class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </FormLabel>
               
            </FormInline>
            <div class="input-form mt-3 sm:mt-5">
                <FormInline class="mt-5 flex-row items-start pt-5 first:mt-0 first:pt-0">
                  <FormLabel class="w-full flex-1 xl:w-64">
                    <div class="mb-3 text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Email</div>
                        <div class="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">Required</div>
                      </div>
                    </div>
                    <div class="mt-3 w-full xl:mt-0">
                      <FormInput v-model.trim="validate.email.$model" autocomplete="nope" type="email" name="email" :class="{ 'border-danger': validate.email.$error }" placeholder="example@gmail.com" />
                      <template v-if="validate.email.$error">
                        <div v-for="(error, index) in validate.email.$errors" :key="index" class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </FormLabel>
                </FormInline>
            </div>
            <div class="input-form mt-3 sm:mt-5" >
                <FormInline class="mt-5 flex-row items-start pt-5 first:mt-0 first:pt-0">
                  <FormLabel class="w-full flex-1 xl:w-64">
                    <div class="mb-3 text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Password</div>
                        <div class="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">Required, at least 6 characters</div>
                      </div>
                    </div>
                    <div class="mt-3 w-full xl:mt-0">
                      <FormInput autocomplete="nope" v-model.trim="validate.password.$model" type="password" name="password" :class="{ 'border-danger': validate.password?.$error }" placeholder="*****" />
                      <template v-if="validate.password?.$error">
                        <div v-for="(error, index) in validate.password.$errors" :key="index" class="mt-2 text-danger">
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </FormLabel>
                </FormInline>
              </div>
          </div>
      </div>
      <div class="mt-5 flex flex-col justify-end gap-2 md:flex-row">
          <Button variant="primary" type="submit" class="py-3">
            Save
            <!-- {{ route.params.id ? "Update" : "Save" }} -->
            <LoadingIcon icon="oval" color="white" class="ml-2 h-4 w-4" v-if="wait('saveAdmin')" />
          </Button>
        </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/user";
import {useLoadingStore} from "~/stores/loading";
import FormInput from "~/base-components/Form/FormInput.vue";
import FormLabel from "~/base-components/Form/FormLabel.vue";
import FormInline from "~/base-components/Form/FormInline.vue";
import Button from "~/base-components/Button";
import LoadingIcon from "~/base-components/LoadingIcon";
import FormCheck from "~/base-components/Form/FormCheck";
import {email, helpers, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const store = useAuthStore(),
    route = useRoute(),
    {stopLoading, startLoading, wait} = useLoadingStore()

const signupForm = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: ""
})

const rules = {
  lastName: {
    required: helpers.withMessage("Last name is required", required),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Invalid email address", email)
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage("Password should be at least 6 characters long", minLength(6))
  },
}
const validate = useVuelidate(rules, signupForm);

const handleSignup = async (e: any) => {
  e.preventDefault()
  console.log(signupForm.value);
  validate.value.$touch();
  if (validate.value.$error) return;
  // toast.success("My toast content");
  try {
    startLoading("createUser")
    let res = await store.signup(signupForm.value)
  } catch (e) {
    console.log(e)
  } finally {
    stopLoading('createUser')
  }
}

const handleFetchUser = async () => {
  try {
    startLoading("getUserList")
    await store.getUserList()
  } catch (error) {
    console.log(error)
  } finally {
    stopLoading("getUserList")
  }
}


onMounted(() => {
  if (route.params.id) {
    handleFetchUser()
  }
})


</script>

<style lang="scss" scoped>

</style>