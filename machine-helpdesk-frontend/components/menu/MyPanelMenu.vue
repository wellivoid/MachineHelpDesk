<template>
  <div class="p-2" >
    <PanelMenu
      :model="items"
      class=" "
    />
  </div>
</template>

<script setup>
const items = ref([
  {
    label: 'Called',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          toast.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
        },
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => {
          toast.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
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
    icon: 'pi pi-cloud',
    items: [
      {
        label: 'User',
        // icon: 'pi pi-cloud-download',
        command: () => {
          toast.add({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
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
    icon: 'pi pi-sign-out',
    command: () => {
      toast.add({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 });
    },
  },
]);
</script>

<style lang="scss" scoped>

</style>
