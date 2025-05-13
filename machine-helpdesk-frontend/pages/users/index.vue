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
          <span class="text-2xl font-bold">{{ t('users') }}</span>

          <i
            class="pi pi-sync mr-3 bg-slate-200 p-2 rounded hover:rotate-180 transition-all duration-500"
            style="font-size: 0.95rem"
            @click="getUsers()"
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
        style="width: 35%"
      />
      <Column
        field="lv"
        :header="t('level')"
        sortable
        style="width: 15%"
      />
      <Column
        :header="t('enable')"
        sortable
        class="flex justify-center"
      >
        <template #body="{ data }">
          <div
            :class="{
              'w-6 h-6 text-green-500 rounded-2xl bg-green-400 border border-green-600': data.enable == 1,
              'w-6 h-6 text-red-500 rounded-2xl bg-red-400 border border-red-600': data.enable == 0,
            }"
          >
            <!-- {{ data.enable == 1 ? t('enabled') : t('disabled') }} -->
          </div>
        </template>
      </Column>

      <Column class="w-24 !text-end ">
        <template #body="{ data }">
          <Button
            severity="secondary"
            rounded
            class=""
            @click="selectRow(data)"
          >
            <IconsOpenInFull class="h-4" />
          </Button>
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
  enable: number;
  createdAt: string;
  lv: string;
}

// const listLv = computed(() => [
//   { name: t('admin'), code: 'admin' },
//   { name: t('common'), code: 'common' },
//   { name: t('master'), code: 'master' },
// ]);
const selectRow = (data: IPropsUsers) => {
  navigateTo(`/users/viewUser?id=${data.id}`);
};

const getUsers = async () => {
  const result = await userStore.getAllLv();
  if (result) {
    listUsersLoad.value = result;
  };
};

onMounted(() => {
  // getAllUsers();
  getUsers();
});
</script>
