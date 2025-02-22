<template>
  <div>
    Tela de login
  </div>
</template>

<script setup>
const { $toast } = useNuxtApp();

onMounted(() => {
  $toast.error('Toast adicionado com sucesso!!!');
});
</script>
