<template>
  <div class="p-1 flex h-screen gap-1 bg-gray-400">
    <div class="h-full w-44 md:w-60  bg-gray-200 rounded-md">
      <MenuMyPanelMenu />
    </div>
    <div class=" w-full flex flex-col  gap-1 ">
      <div class="min-h-10 bg-gray-200 rounded-md flex flex-wrap items-center justify-center gap-2">
        <span class="font-bold text-blue-800">
          Machine HelpDesk {{ $t(formattedPageActual) }}
        </span>
      </div>
      <div class="flex-1 bg-gray-200 rounded-md">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

// Estado reativo para armazenar o nome da página
const pageActual = ref<string>(route.name?.toString() || '');

// Computed para formatar a chave do i18n
const formattedPageActual = computed(() => {
  return pageActual.value.replace(/-/g, '_'); // Garantido que é string
});

// Atualiza a variável quando a rota muda
watch(() => route.path, () => {
  pageActual.value = route.name?.toString() || '';
});
</script>

<style lang="scss" scoped>

</style>
