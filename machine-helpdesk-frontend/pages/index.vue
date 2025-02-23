<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="p-1 flex-1 h-full overflow-auto">
    <DataTable
      :value="getAllCalled"
      removable-sort
      stripedRows
      size="small"
      table-style="min-width: 50rem"
      pt:root:class="h-90"
      pt:tableContainer:class="max-h-max"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ $t('called') }}</span>

          <Button
            severity="secondary"
            rounded
            class=""
            @click="[fetchCalls(), fetchTotalCountCalld()]"
          >
            <!-- <IconsReflech class="h-4" /> -->
            <IconsUploadIcon />
          </Button>
        </div>
      </template>
      <Column
        field="id"
        header="ID"
        sortable
        style="width: 25%"
      />
      <Column
        field="title"
        header="Title"
        style="width: 25%"
        class="truncate max-w-48"
      />
      <Column
        field="status"
        header="Status"
        sortable
        style="width: 25%"
      />
      <Column
        field="priority"
        header="Pririty"
        sortable
        style="width: 25%"
      />
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
    </DataTable>
  </div>
</template>

<script setup>
import { IconsUploadIcon } from '#components';

// const fatchCountList = async () => {
//   const response = await fetch('http://localhost:3333/called?page=1&limit=10000');

//   const totalCount = response.headers.get('x-total-count'); // ✅ Agora funciona!

//   console.log('Total Count:', totalCount);
// };

// const customers = ref();

const { $toast } = useNuxtApp();
const selectRow = (data) => {
  $toast.success(`Open id: ${data.id}`);
};
// const calledStore = useApiCalledStore();
const getAllCalled = ref([]);
const fetchCalls = async () => {
  const store = useApiCalledStore();
  getAllCalled.value = await store.getAll(); // Aguarda os dados corretamente
};

const fetchTotalCountCalld = async () => {
  const store = useApiCalledStore();
  return store.getTotalCountCalled();
};

onMounted(() => {
  fetchCalls();
  fetchTotalCountCalld();
});
</script>
