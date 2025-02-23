<template>
  <div>
    Tela de login
    <Button
      label="Notify !"
      @click="$toast('Hello World I am toast.')"
    />
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();

onMounted(() => {
  ;
});
</script>
