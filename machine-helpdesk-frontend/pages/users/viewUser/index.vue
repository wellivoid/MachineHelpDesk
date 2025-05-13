<template>
  <div class="p-1 flex flex-col justify-between h-full">
    <div>
      <div class="flex flex-col">
        <label for="vw-userName">{{ t('name') }}</label>
        <InputText
          id="vw-userName"
          v-model="data.name"
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <label for="vw-userEmail">{{ t('email') }}</label>
        <InputText
          id="vw-userEmail"
          v-model="data.email"
          disabled
          type="text"
        />
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 ">
        <div class="flex flex-col">
          <label for="vw-lv">{{ t('level') }}</label>
          <Select
            id="vw-lv"
            v-model="selectedLevel"
            :options="listLevel"
            option-label="name"
            :placeholder="t('infoPriority')"
            class="w-full md:w-56"
          />
        </div>
        <div class="flex flex-col">
          <label for="vw-enable">{{ t('enable') }}</label>
          <Select
            id="vw-enable"
            v-model="selectedEnable"
            :options="listEnable"
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
        @click="updateUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const id = Number(route.query.id);
const userStore = useApiUsersStore();
// const { ulevel } = useAuth();

interface IPropsUsersData {
  name: string;
  email: string;
  level: string;
  enable: number;
  createdAt: string;
}

const data = ref<IPropsUsersData>({
  name: '',
  level: '',
  enable: 0,
  email: '',
  createdAt: '',
});

const listLevel = computed(() => [
  { name: t('admin'), code: 'admin' },
  { name: t('common'), code: 'common' },
  { name: t('master'), code: 'master' },
]);

const listEnable = computed(() => [
  { name: t('false'), code: 0 },
  { name: t('true'), code: 1 },
]);

// Computed para refletir e modificar `data.priority`
const selectedLevel = computed({
  get: () => listLevel.value.find(p => p.code === data.value.level) || null,
  set: (newPriority: { code: string } | null) => {
    if (newPriority) data.value.level = newPriority.code;
  },
});

// Computed para refletir e modificar `data.status`
const selectedEnable = computed({
  get: () => listEnable.value.find(s => s.code === data.value.enable) || null,
  set: (newStatus: { code: number } | null) => {
    if (newStatus) data.value.enable = newStatus.code;
  },
});

// const RespById = ref('');
const updateUser = async () => {
  await userStore.update(id, data.value);
};

const getById = async () => {
  const result = await userStore.getById(id);
  if (result) {
    data.value = result;
    selectedEnable.value = listEnable.value.find(p => p.code === result.enable) || null;
    selectedLevel.value = listLevel.value.find(p => p.code === result.level) || null;
  }
};

onMounted(() => {
  getById();
});
</script>
