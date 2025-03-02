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
      <div class="flex flex-wrap items-center justify-between gap-2 ">
        <div class="flex flex-col">
          <label for="createPriority">{{ $t('priority') }}</label>
          <Select
            id="createPriority"
            v-model="selectedPriority"
            :options="listPriority"
            option-label="name"
            :placeholder="t('infoPriority')"
            class="w-full md:w-56"
          />
        </div>
        <div class="flex flex-col">
          <label for="createPriority">{{ $t('status') }}</label>
          <Select
            id="createPriority"
            v-model="selectedStatus"
            :options="listStatus"
            option-label="name"
            class="w-full md:w-56"
          />
        </div>
      </div>
    </div>
    <div>
      <Button
        :label="t('save')"
        class="min-w-36 "
        @click="updateCalled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const id = Number(route.query.id);

interface IPropsData {
  title: string;
  description: string;
  priority: string;
  userId: number;
  status: string;

};

const data = ref<IPropsData>({
  title: '',
  description: '',
  priority: '',
  userId: 1,
  status: 'open',
});

// const selectedPriority = ref();
// const selectedStatus = ref();

const listPriority = computed(() => [
  { name: t('low'), code: 'low' },
  { name: t('medium'), code: 'medium' },
  { name: t('high'), code: 'high' },
]);

const listStatus = computed(() => [
  { name: t('open'), code: 'open' },
  { name: t('inProgress'), code: 'inProgress' },
  { name: t('resolved'), code: 'resolved' },
  { name: t('closed'), code: 'closed' },
]);

// Computed para refletir e modificar `data.priority`
const selectedPriority = computed({
  get: () => listPriority.value.find(p => p.code === data.value.priority) || null,
  set: (newPriority: { code: string } | null) => {
    if (newPriority) data.value.priority = newPriority.code;
  },
});

// Computed para refletir e modificar `data.status`
const selectedStatus = computed({
  get: () => listStatus.value.find(s => s.code === data.value.status) || null,
  set: (newStatus: { code: string } | null) => {
    if (newStatus) data.value.status = newStatus.code;
  },
});

const store = useApiCalledStore();
// const RespById = ref('');
const updateCalled = async () => {
  await store.update(id, data.value);
};
const getById = async () => {
  const result = await store.getById(id);
  if (result) {
    data.value = result;
    selectedPriority.value = listPriority.value.find(p => p.code === result.priority) || null;
    selectedStatus.value = listStatus.value.find(p => p.code === result.status) || null;
  }
};

onMounted(() => {
  getById();
});
</script>
