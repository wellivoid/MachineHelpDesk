<template>
  <div>
    <div class="p-4"><button class=" border-4 border-blue-800 bg-amber-700" type="button" >Testbjhcbjd</button></div>
    <Button label="Verify" />
    <h1>{{ $t('welcome') }}</h1>
    <Button @click="setLocale('pt')" label="PtBr" />
    <Button @click="setLocale('en')" label="en" />
    <Button @click="postData()" label="POST" />
    <label >{{ resp }}</label>
  </div>
</template>


<script setup="ts">
  const { setLocale } = useI18n()
  import axios from 'axios';


  // const create = () =>{
  //   const httpResp = axios.post('http://localhost:3333/called',
  //   {
  //     title: "Deu certo",
  //     description: "nada que deu certo no 3 ",
  //     priority: "low",
  //     status: "Open",
  //     userId: 1
  //   })
    
  // }
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
