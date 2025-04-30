<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="p-1 flex-1 h-full overflow-auto">
    <DataTable
      :value="listUsersLoad"
      removable-sort
      stripedRows
      size="small"
      table-style="min-width: 50rem"
      pt:root:class="h-90"
      pt:tableContainer:class="max-h-max"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-2xl font-bold">{{ $t('users') }}</span>

          <i
            class="pi pi-sync mr-3 bg-slate-200 p-2 rounded hover:rotate-180 transition-all duration-500"
            style="font-size: 0.95rem"
            @click="getAllUsers()"
          />
        </div>
      </template>
      <Column
        field="id"
        header="ID"
        sortable
        style="width: 15%"
      />
      <Column
        field="name"
        :header="t('name')"
        style="width: 35%"
        class="truncate max-w-48"
      />
      <Column
        field="createdAt"
        :header="t('created')"
        sortable
        style="width: 40%"
      />
      <Column
        class="w-24"
        :header="t('enable')"
      >
        <template #body="{ data }">
          <ToggleSwitch
            v-model="data.enable"
            @update:model-value="() => console.log(listUsersLoad)"
          />
        </template>
      </Column>
    </datatable>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const userStore = useApiUsersStore();
const listUsersLoad = ref<IPropsUsers[]>([]);

interface IPropsUsers {
  id: number;
  name: string;
  enable: boolean;
  createdAt: string;
}

const getAllUsers = async () => {
  const result = await userStore.getAll();

  if (result) {
    listUsersLoad.value = result.map((user: IPropsUsers) => ({
      ...user,
      enable: Boolean(user.enable),
    }));
  }
};

// const updateUserEnable = async (user: IPropsUsers) => {
//   const payloadDataUser = {
//     ...user,
//     enable: user.enable ? 1 : 0,
//   };

//   // await userStore.update(payload);
//   console.log(payloadDataUser);
// };

onMounted(() => {
  getAllUsers();
});
</script>
