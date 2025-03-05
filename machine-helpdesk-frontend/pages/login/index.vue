<template>
  <div class="card flex justify-center">
    <!-- <Button
      label="Login"
      icon="pi pi-user"
      @click="visible = true"
    /> -->

    <Dialog
      :visible="true"
      pt:root:class="!border-0 !bg-transparent"
      pt:mask:class="backdrop-blur-sm"
    >
      <template #container>
        <div
          class="flex flex-col px-4 py-8 gap-6 rounded-2xl border-2 border-white bg-gradient-to-b from-blue-950 to-sky-500 text-white"
        >
          <IconsLogoIcon class=" block mx-auto" />
          <div class="inline-flex flex-col gap-2 ">
            <label
              for="userEmail"
              class="text-primary-50 font-semibold"
            >{{ $t('email') }}</label>
            <InputText
              id="userEmail"
              v-model="data.email"
              class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80"
            />
          </div>
          <div class="inline-flex flex-col gap-2">
            <label
              for="password"
              class="text-primary-50 font-semibold"
            >{{ $t('password') }}</label>
            <InputText
              id="password"
              v-model="data.password"
              class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80"
              type="password"
            />
          </div>
          <div class="flex items-center gap-4">
            <Button
              :label="t('register')"
              text
              class="!p-4 w-full !text-white !border !border-white/80 hover:!bg-white/20"
              @click="navigateTo('/register')"
            />
            <Button
              :label="t('login')"
              text
              class="!p-4 w-full !text-white !border !border-white/80 hover:!bg-white/20"
              @click="login"
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

interface ILogin {
  email: string;
  password: string;

}

const data: ILogin = {
  email: '',
  password: '',
};

const userStore = useApiUsersStore();

const login = async () => {
  await userStore.signIn(data.email, data.password);
};
</script>
