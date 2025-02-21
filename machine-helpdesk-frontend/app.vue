<template>
  <div class="flex flex-col gap-4 w-3xs">
    <div class="p-4"><button class=" border-4 border-blue-800 bg-amber-700" type="button" >Testbjhcbjd</button></div>
    <Button label="Verify" />
    <h1>{{ $t('welcome') }}</h1>
    <Button @click="setLocale('pt')" label="PtBr" />
    <Button @click="setLocale('en')" label="en" />
    <Button @click="postData()" label="POST" />
    <label >{{ resp }}</label>

    
    <Button @click="counterStore.increment" label="Increment" />
    <label >{{ counterStore.count }}</label>
    <label >{{ counterStore.doubleCount }}</label>

  </div>
</template>


<script setup>
  import axios from 'axios';
  import { useCounterStore } from '@/stores/counter'

  const counterStore = useCounterStore()
  
  const { setLocale } = useI18n()

  const resp = ref('')

  const postData = async () =>{
    const httpResp = await axios.post('http://localhost:3333/called',
    {
      title: "Deu certo",
      description: "nada que deu certo no 3 ",
      priority: "low",
      status: "Open",
      userId: 1
    })
    resp.value = JSON.stringify(httpResp.data)
  }
</script>
