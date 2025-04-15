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
        class="flex-auto h-8 hover:!bg-neutral-100 hover:!text-green-600 w-full"
        @click="logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { logout } = useApiUsersStore();
const { ulevel } = useAuth();

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
      {
        label: t('users'),
        icon: 'pi  pi-users',
        visible: ulevel.value === 'common' ? false : true,
        command: () => {
          navigateTo('/users');
        },
      },
    ],
  },
]);

// const visu = ref(false);

// onMounted (() => {
//   visu.value = ulevel.value === 'commun' ? false : true;
// });
//
</script>

<!-- <style lang="" scoped>
.p-menu {
    min-width: 6rem;
}
</style> -->
