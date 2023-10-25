<script setup lang="ts">

import FormInput from "~/base-components/Form/FormInput.vue";
import FormLabel from "~/base-components/Form/FormLabel.vue";
import FormInline from "~/base-components/Form/FormInline.vue";
import Button from "~/base-components/Button";
import LoadingIcon from "~/base-components/LoadingIcon";
import FormCheck from "~/base-components/Form/FormCheck";
import {email, helpers, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { useToast } from "vue-toastification";

const toast = useToast();
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

const handleSignup = async (e:any) => {
  e.preventDefault()
  console.log(signupForm.value);
  validate.value.$touch();
  if (validate.value.$error) return;
  toast.success("My toast content");
  try {
  } catch (e) {
    console.log(e)
  } finally {

  }
}


definePageMeta({
  layout: "auth"
})
</script>

<template>
  <div class="h-screen bg-primary">
    <div class="container h-full flex justify-center items-center">
      <form @submit.prevent="handleSignup" class="max-w-[650px] w-full bg-white px-8 rounded py-10">
        <h2 class="text-center text-2xl font-medium">Register as a Admin</h2>
        <div class="">
          <FormInline class="mt-5 flex-row items-start pt-5">
            <FormLabel class="!mr-0 w-full flex-1 xl:w-64">
              <div class="mb-3 text-left">
                <div class="flex items-center">
                  <div class="font-medium text-lg">First Name</div>
                </div>
              </div>
              <div class=" w-full xl:mt-0">
                <FormInput class="py-4 text-base" v-model="signupForm.firstName" type="text" name="firstName"
                           placeholder="First Name"
                />
              </div>
            </FormLabel>
            <FormLabel class="!mr-0 w-full flex-1 xl:w-64 ml-5">
              <div class="mb-3 text-left">
                <div class="flex items-center">
                  <div class="font-medium text-lg">Last Name</div>
                  <div
                      class="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">
                    Required
                  </div>
                </div>
              </div>
              <div class=" w-full xl:mt-0">
                <FormInput class="py-4 text-base" v-model="signupForm.lastName" type="text" name="lastname"
                           placeholder="Last name" :class="{
                      'border-danger': validate.lastName.$error,
                    }"
                />
                <template v-if="validate.lastName.$error">
                  <div v-for="(error, index) in validate.lastName.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
            </FormLabel>
          </FormInline>
        </div>
        <FormInline class="mt-5 flex-row items-start">
          <FormLabel class="!mr-0 w-full flex-1 xl:w-64">
            <div class="mb-3 text-left">
              <div class="flex items-center">
                <div class="font-medium text-lg">Email</div>
                <div
                    class="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">
                  Required
                </div>
              </div>
            </div>
            <div class="mt-3 w-full xl:mt-0">
              <FormInput class="py-4 text-base" v-model="signupForm.email" type="email" name="firstName"
                         placeholder="Enter your email" :class="{
                      'border-danger': validate.email.$error,
                    }"
              />
              <template v-if="validate.email.$error">
                <div v-for="(error, index) in validate.email.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div>
          </FormLabel>
        </FormInline>
        <FormInline class="mt-3 flex-row items-start pt-5 first:mt-0 first:pt-0">
          <FormLabel class="!mr-0 w-full flex-1 xl:w-64">
            <div class="mb-3 text-left">
              <div class="flex items-center">
                <div class="font-medium text-lg">Password</div>
                <div
                    class="ml-2 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-darkmode-300 dark:text-slate-400">
                  Required
                </div>
              </div>
            </div>
            <div class="mt-3 w-full xl:mt-0">
              <FormInput class="py-4 text-base" v-model="signupForm.password" type="password" name="password"
                         placeholder="Enter your password" :class="{
                      'border-danger': validate.password.$error,
                    }"
              />
              <template v-if="validate.password.$error">
                <div v-for="(error, index) in validate.password.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div>
          </FormLabel>
        </FormInline>
        <div class="flex mt-4 text-xs intro-x text-[#64748B] dark:text-slate-500 sm:text-sm">
          <div class="flex items-center mr-auto">
            <FormCheck.Input id="remember-me" type="checkbox" class="mr-2 "/>
            <label class="cursor-pointer select-none text-sm" htmlFor="remember-me"> Remember me </label>
          </div>
          <a href="" class="text-sm text-[#64748B]">Forgot Password?</a>
        </div>
        <Button type="submit" size="lg" variant="primary"
                class="text-lg px-4 py-3 align-top w-full mt-5 capitalize">
          <!--        {{ wait("Login") ? "Logging In" : "Login" }}-->
          Sign Up
          <!--        <LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2"  />-->
        </Button>
        <p class=" text-[#64748B] pt-5 text-left">Already Have an Account ?
          <nuxt-link to="/login" class="underline">Login</nuxt-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>