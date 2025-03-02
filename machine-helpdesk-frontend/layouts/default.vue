<template>
  <div class="p-1 flex h-screen gap-1 bg-gray-400 text-sm">
    <div class="h-full w-32 md:w-44  bg-gray-200 rounded-md">
      <MenuMyPanelMenu />
    </div>
    <div class=" w-full flex flex-col gap-1 ">
      <div class="p-2 bg-gray-200  rounded-md flex flex-wrap items-center justify-center gap-2 relative">
        <span class="font-bold text-blue-800 text-xl">
          Machine HelpDesk {{ $t(pageActual) }}
        </span>
        <span class="absolute right-0 mr-2">
          <span class="pi pi-globe mr-2" />
          <SplitButton
            :model="itemsSetLocale"
            :label="t(locale)"
            severity="secondary"
            class="h-7"
          />
        </span>
      </div>
      <div class="flex-1 bg-gray-200 rounded-md">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale, t, setLocale } = useI18n();

// Estado reativo para armazenar o nome da página
// const pageActual = ref<string>(route.name?.toString() || '');
// const pageActual = ref<string>(typeof route.name === 'string' ? route.name : '');
// const pageActual = computed(() => typeof route.name === 'string' ? route.name : '');
// Computed que já formata a chave do i18n
const pageActual = computed(() =>
  typeof route.name === 'string' ? route.name.replace(/-/g, '_') : '',
);

// Computed para formatar a chave do i18n
// const formattedPageActual = computed(() => {
//   return pageActual.value.replace(/-/g, '_'); // Garantido que é string
// });
// Agora não precisa de `.value`
// const formattedPageActual = computed(() => {
//   return pageActual.value.replace(/-/g, '_');
// });

// Atualiza a variável quando a rota muda
// watch(() => route.path, () => {
//   pageActual.value = route.name?.toString() || '';
// });

const itemsSetLocale = [
  {
    label: t('portuguese'),
    command: () => {
      setLocale('pt');
      // locale.value = 'pt';
    },
  },
  {
    label: t('english'),
    command: () => {
      setLocale('en');
      // locale.value = 'en';
    },
  },
  {
    label: t('spanish'),
    command: () => {
      setLocale('es');
      // locale.value = 'es';
    },
  },
];
</script>

<style lang="scss" scoped>

</style>
