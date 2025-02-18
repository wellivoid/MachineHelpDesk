<script setup>
  const { setLocale } = useI18n()
</script>
<template>
  
  <div>
    <div class="">
      <button class="flex border-2 border-cyan-800" @click="setLocale('en')">en</button>
      <button class="flex border-2 border-cyan-800" @click="setLocale('ptBr')">ptBr</button>
      <p>{{ $t('welcome') }}</p>
   </div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    
  </div>
</template>
