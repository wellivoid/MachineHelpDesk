<template>
  <div class="p-2">
    <PanelMenu
      :model="items"
      class=" "
    />
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: 'Called',
    // icon: 'pi pi-file',
    items: [
      {
        label: 'Call list',
        // icon: 'pi pi-plus',
        command: () => {
          navigateTo('/');
        },
      },
      {
        label: 'New',
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
    label: 'Setting',
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
    label: 'Sign Out',
    // icon: 'pi pi-sign-out',
    command: () => {

    },
  },
]);
</script>

<style lang="scss" scoped>

</style>
