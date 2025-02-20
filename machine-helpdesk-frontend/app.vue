<template>
  <div>
    <div class="p-4"><button class=" border-4 border-blue-800 bg-amber-700" type="button" >Testbjhcbjd</button></div>
    <Button label="Verify" />
    <h1>{{ $t('welcome') }}</h1>
    <Button @click="setLocale('pt')" label="PtBr" />
    <Button @click="setLocale('en')" label="en" />
  </div>
</template>
<script setup>
  const { setLocale } = useI18n()
</script>
