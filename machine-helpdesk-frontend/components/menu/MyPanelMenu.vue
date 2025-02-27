<template>
  <div class="p-2  flex flex-col justify-between  h-full">
    <PanelMenu
      multiple
      :model="items"
    />
    <div class="">
      <Button
        :label="t('logout')"
        icon="pi pi-sign-out"
        class="flex-auto h-8"
        outlined
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const items = ref([
  {
    label: t('called'),
    // icon: 'pi pi-file',
    items: [
      {
        label: t('tickets'),
        // icon: 'pi pi-plus',
        command: () => {
          navigateTo('/');
        },
      },
      {
        label: t('new'),
        // icon: 'pi pi-search',
        command: () => {
          navigateTo('/called/create');
        },
      },
      // {
      //   label: 'Print',
      //   icon: 'pi pi-print',
      //   command: () => {
      //     toast.add({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
      //   },
      // },
    ],
  },
  {
    label: t('setting'),
    // icon: 'pi pi-cloud',
    items: [
      {
        label: 'User',
        // icon: 'pi pi-cloud-download',
        command: () => {

        },
      },
      // {
      //   label: 'Export',
      //   icon: 'pi pi-cloud-upload',
      //   command: () => {
      //     toast.add({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
      //   },
      // },
    ],
  },
  {
    label: t('signOut'),
    // icon: 'pi pi-sign-out',
    command: () => {

    },
  },
]);
</script>

<style lang="scss" scoped>

</style>
