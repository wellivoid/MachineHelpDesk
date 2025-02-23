<template>
  <div class="p-1 flex flex-col justify-between h-full">
    <div>
      <div class="flex flex-col">
        <label for="createTitle">{{ $t('title') }}</label>
        <InputText
          id="createTitle"
          v-model="data.title"
          type="text"
          class=""
        />
      </div>
      <div class="flex flex-col">
        <label for="createDescription">{{ $t('description') }}</label>
        <Textarea
          id="createDescription"
          v-model="data.description"
          rows="10"
          cols="30"
          class="resize-none"
        />
      </div>
      <div class="flex flex-col">
        <label for="createPriority">{{ $t('status') }}</label>
        <Select
          id="createPriority"
          v-model="selectedPriority"
          :options="listPriority"
          option-label="name"
          :placeholder="t('infoPriority')"
          class="w-full md:w-56"
        />
      </div>
    </div>
    <div>
      <Button
        :label="t('createTicket')"
        class="min-w-36 "
        @click="createCalled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// const { $toast } = useNuxtApp();
// import type { toast } from 'vue3-toastify';

const { t } = useI18n();
// const { $toast } = useNuxtApp();

interface IPropsDataCreate {
  title: string;
  description: string;
  priority: string;
  userId: number;
  status: string;

};

const data = ref<IPropsDataCreate>({
  title: '',
  description: '',
  priority: '',
  userId: 1,
  status: 'Open',
});

const selectedPriority = ref();
const listPriority = ref([
  { name: t('low'), code: 'low' },
  { name: t('medium'), code: 'medium' },
  { name: t('high'), code: 'high' },
]);

// watch(selectedPriority, (newPriority) => {
//   if (newPriority) {
//     data.value.priority = newPriority.code;
//     // console.log(data);
//   }
// });

watch(selectedPriority, (newPriority: { code: string }) => {
  if (newPriority) {
    data.value.priority = newPriority.code;
    console.log(data);
  }
});

// const nuxtApp = useNuxtApp();
// const toastMy = nuxtApp.$toast as typeof toast;

const calledStore = useApiCalledStore();
const createdRespId = ref('');
const createCalled = async () => {
  createdRespId.value = await calledStore.create(data.value);
  // try {

  //   toastMy.success('Chamado criado com sucesso');
  // }

  // catch (error) {
  //   toastMy.error(`Erro ao criar chamado: ${error}`);
  // }
};
</script>
