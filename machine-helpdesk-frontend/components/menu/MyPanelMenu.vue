<template>
  <div class="p-2  flex flex-col justify-between  h-full ">
    <!-- <PanelMenu
      multiple
      :model="items"
    /> -->
    <Menu
      :model="items "
      class="w-full"
      pt:root:class=""
      pt:list:class=""
      pt:iten:class=""
    />
    <div class="">
      <Button
        :label="t('signOut')"
        icon="pi pi-sign-out"
        class="flex-auto h-8  hover:!bg-neutral-100 hover:!text-green-600 w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const items = computed(() => [
  {
    label: t('called'),
    // icon: 'pi pi-file',
    items: [
      {
        label: t('tickets'),
        icon: 'pi pi-list',
        command: () => {
          navigateTo('/');
        },
      },
      {
        label: t('new'),
        icon: 'pi  pi-plus',
        command: () => {
          navigateTo('/called/create');
        },
      },
    ],
  },
]);
</script>

<style lang="css">
.p-menu {
    min-width: 6rem;
    /* max-width: 6rem; */
}
</style>
