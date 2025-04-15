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
          <span class="text-2xl font-bold">{{ $t('called') }}</span>

          <Button
            severity="secondary"
            rounded
            class=""
            @click="fetchCalls()"
          >
            <IconsUploadIcon />
          </Button>
        </div>
      </template>
      <Column
        field="id"
        header="ID"
        sortable
        style="width: 15%"
      />
      <Column
        field="title"
        :header="t('title')"
        style="width: 35%"
        class="truncate max-w-48"
      />
      <Column
        field="status"
        header="Status"
        sortable
        style="width: 15%"
      >
        <template #body="{ data }">
          {{ t(`${data.status}`) }}
        </template>
      </Column>
      <Column
        field="priority"
        :header="t('priority')"
        sortable
        style="width: 15%"
      >
        <template #body="{ data }">
          {{ t(`${data.priority}`) }}
        </template>
      </Column>
      <Column
        field="createdAt"
        :header="t('created')"
        sortable
        style="width: 40%"
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
const { t } = useI18n();
</script>
