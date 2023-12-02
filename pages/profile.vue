<template>
  <div class="intro-y box lg:mt-5">
    <div
      class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
    >
      <h2 class="mr-auto text-base font-medium">Display Information</h2>
    </div>
    <div class="p-5">
      <div class="flex flex-col xl:flex-row">
        <div class="flex-1 mt-6 xl:mt-0">
          <div class="grid grid-cols-12 gap-x-5">
            <div class="col-span-12 2xl:col-span-6">
              <div>
                <FormLabel htmlFor="update-profile-form-1">
                  Display Name
                </FormLabel>
                <FormInput
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  disabled
                />
              </div>
              <div class="mt-3">
                <FormLabel htmlFor="update-profile-form-2">
                  Nearest MRT Station
                </FormLabel>
                <FormSelect
                  id="update-profile-form-2"
                  v-model="select"
                  class="w-full"
                >
                  <option value="1">Admiralty</option>
                  <option value="2">Aljunied</option>
                  <option value="3">Ang Mo Kio</option>
                  <option value="4">Bartley</option>
                  <option value="5">Beauty World</option>
                </FormSelect>
              </div>
            </div>
            <div class="col-span-12 2xl:col-span-6">
              <div class="mt-3 2xl:mt-0">
                <FormLabel htmlFor="update-profile-form-3">
                  Postal Code
                </FormLabel>
                <FormSelect
                  id="update-profile-form-3"
                  v-model="select"
                  class="w-full"
                >
                  <option value="1">
                    018906 - 1 STRAITS BOULEVARD SINGA...
                  </option>
                  <option value="2">018910 - 5A MARINA GARDENS DRIVE...</option>
                  <option value="3">018915 - 100A CENTRAL BOULEVARD...</option>
                  <option value="4">018925 - 21 PARK STREET MARINA...</option>
                  <option value="5">018926 - 23 PARK STREET MARINA...</option>
                </FormSelect>
              </div>
              <div class="mt-3">
                <FormLabel htmlFor="update-profile-form-4">
                  Phone Number
                </FormLabel>
                <FormInput
                  id="update-profile-form-4"
                  type="text"
                  placeholder="Input text"
                  value="65570828"
                />
              </div>
            </div>
            <div class="col-span-12">
              <div class="mt-3">
                <FormLabel htmlFor="update-profile-form-5"> Address </FormLabel>
                <FormTextarea
                  id="update-profile-form-5"
                  placeholder="Adress"
                  value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                ></FormTextarea>
              </div>
            </div>
          </div>
          <Button variant="primary" type="button" class="w-20 mt-3">
            Save
          </Button>
        </div>
        <div class="mx-auto w-52 xl:mr-0 xl:ml-6">
          <div
            class="p-5 border-2 border-dashed rounded-md shadow-sm border-slate-200/60 dark:border-darkmode-400"
          >
            <div class="relative h-40 mx-auto cursor-pointer image-fit zoom-in">
              <img
                class="rounded-md"
                alt="Midone Tailwind HTML Admin Template"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
              <Tippy
                as="div"
                content="Remove this profile photo?"
                class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
              >
                <Lucide icon="X" class="w-4 h-4" />
              </Tippy>
            </div>
            <div class="relative mx-auto mt-5 cursor-pointer">
              <Button variant="primary" type="button" class="w-full">
                Change Photo
              </Button>
              <FormInput
                type="file"
                class="absolute top-0 left-0 w-full h-full opacity-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Lucide from "@/base-components/Lucide";
import TomSelect from "@/base-components/TomSelect";
import { Menu } from "@/base-components/Headless";
import Button from "@/base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "@/base-components/Form";
const select = ref("1");
</script>
