<template>
  <div class="flex justify-center">
    <Dialog
      :visible="true"
      pt:root:class="!border-0 !bg-transparent"
      pt:mask:class="backdrop-blur-sm"
      class="m-4"
    >
      <template #container>
        <div
          class="max-md:max-w-80 flex flex-col px-4 py-4 gap-6 rounded-2xl border-2 border-white bg-gradient-to-b from-blue-950 to-sky-500 text-white overflow-auto"
        >
          <div class="block mx-auto">
            <IconsLogoIcon/>
          </div>
          <div class=" space-x-4">
            <div class="inline-flex flex-col gap-2">
              <label
                for="userName"
                class="text-primary-50 font-semibold"
              >{{ $t('name') }}</label>
              <InputText
                id="userName"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
              />
            </div>
            <div class="inline-flex flex-col gap-2 ">
              <label
                for="userEmail"
                class="text-primary-50 font-semibold"
              >{{ $t('email') }}</label>
              <InputText
                id="userEmail"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
              />
            </div>
          </div>
          <div class=" space-x-4">
            <div class="inline-flex flex-col gap-2">
              <label
                for="password"
                class="text-primary-50 font-semibold"
              >{{ $t('password') }}</label>
              <InputText
                id="password"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
                type="password"
              />
            </div>
            <div class="inline-flex flex-col gap-2">
              <label
                for="repeaterPassword"
                class="text-primary-50 font-semibold"
              >{{ $t('repeaterPassword') }}</label>
              <InputText
                id="repeaterPassword"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
                type="password"
              />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <Button
              :label="t('cancel')"
              text
              class="!p-4 w-full !text-white !border !border-white/80 hover:!bg-white/20"
              @click="navigateTo('/login')"
            />
            <Button
              :label="t('register')"
              text
              class="!p-4 w-full !text-white !border !border-white/80 hover:!bg-white/20"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
definePageMeta({
  layout: 'login',
});
</script>
