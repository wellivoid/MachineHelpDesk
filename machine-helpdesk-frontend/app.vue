<template>
  <!-- <div class="flex flex-col gap-4 w-3xs">
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

    <Button @click="createCalled" label="POST STORE" />
    <label >ID Created: {{ createdRespId }}</label>

  </div> -->

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// import axios from 'axios';
// import { useCounterStore } from '@/stores/counter'
// import { useApiCalledStore } from './stores/useApiCalledStore';

// const dataCreate = ref({
//     title: "Post Store",
//     description: "nada que deu certo no 3 ",
//     priority: "low",
//     status: "Open",
//     userId: 1
//   })

// const counterStore = useCounterStore()

// const calledStore = useApiCalledStore()
// const createdRespId = ref('')
// const createCalled = async () => {
//   const resp = ref(0)
//   createdRespId.value = await calledStore.create(dataCreate.value)
// }

// const { setLocale } = useI18n()

// const resp = ref('')
// const postData = async () =>{
//   const httpResp = await axios.post('http://localhost:3333/called',
//   {
//     title: "Deu certo",
//     description: "nada que deu certo no 3 ",
//     priority: "low",
//     status: "Open",
//     userId: 1
//   })
//   resp.value = JSON.stringify(httpResp.data)
// }
</script>
