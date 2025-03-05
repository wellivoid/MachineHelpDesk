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
            <IconsLogoIcon />
          </div>
          <div class=" space-x-4">
            <div class="inline-flex flex-col gap-2">
              <label
                for="userName"
                class="text-primary-50 font-semibold"
              >{{ t('name') }}</label>
              <InputText
                id="userName"
                v-model="data.name"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
              />
            </div>
            <div class="inline-flex flex-col gap-2">
              <label
                for="userEmail"
                class="text-primary-50 font-semibold"
              >{{ t('email') }}</label>
              <InputText
                id="userEmail"
                v-model="data.email"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
              />
            </div>
          </div>
          <div class=" space-x-4">
            <div class="inline-flex flex-col gap-2">
              <label
                for="password"
                class="text-primary-50 font-semibold"
              >{{ t('password') }}</label>
              <InputText
                id="password"
                v-model="password"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
                type="password"
              />
            </div>
            <div class="inline-flex flex-col gap-2">
              <label
                for="repeaterPassword"
                class="text-primary-50 font-semibold"
              >{{ t('repeaterPassword') }}</label>
              <InputText
                id="repeaterPassword"
                v-model="repeaterPassword"
                class="!bg-white/50 !border-0 !p-4 !text-primary-50 w-80 h-10 max-md:w-72 "
                type="password"
              />
            </div>
          </div>
          <div
            v-if="errorMessage"
            class="text-red-400 text-sm text-center"
          >
            {{ errorMessage }}
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
              @click="createUser"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { t } = useI18n();
definePageMeta({
  layout: 'login',
});

interface IPropsUser {
  name: string;
  password: string;
  email: string;
}

const data = ref<IPropsUser>({
  name: '',
  password: '',
  email: '',
});

// Estados separados para senhas
const password = ref('');
const repeaterPassword = ref('');
const errorMessage = ref('');

const userStore = useApiUsersStore();
const createdResp = ref('');

const createUser = async () => {
  errorMessage.value = '';

  // Validação das senhas antes de criar o usuário
  if (password.value !== repeaterPassword.value) {
    errorMessage.value = t('passwordsDoNotMatch'); // Mensagem de erro
    return;
  }

  // Atribui a senha ao objeto `data` antes de enviar
  data.value.password = password.value;

  createdResp.value = await userStore.signUp(data.value);
};
</script>
