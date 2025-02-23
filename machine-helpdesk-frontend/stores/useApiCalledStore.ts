// import { defineStore } from 'pinia';
// import axios from 'axios';

// interface IPropsCalled {
//   id: number;
//   title: string;
//   description: string;
//   priority: string;
//   userId: number;
//   status: string;
// }

// export const useApiCalledStore = defineStore('called', () => {
//   const create = async (data: Omit<IPropsCalled, 'id'>) => {
//     const resp = ref('');
//     const httpPost = await axios.post('http://localhost:3333/called', data);
//     resp.value = JSON.stringify(httpPost.data);
//     return resp.value;
//   };

//   return { create };
// });

import { defineStore } from 'pinia';
import axios from 'axios';

interface IPropsCalled {
  id: number;
  title: string;
  description: string;
  priority: string;
  userId: number;
  status: string;
}

export const useApiCalledStore = defineStore('called', () => {
  const { $toast } = useNuxtApp();
  // const toast = nuxtApp.$toast as typeof toast;

  const create = async (data: Omit<IPropsCalled, 'id'>) => {
    const resp = ref('');
    try {
      const httpPost = await axios.post('http://localhost:3333/called', data);
      resp.value = JSON.stringify(httpPost.data);
      $toast.success('Chamado criado com sucesso');
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';

        // console.error('Erro na requisição da API:', error.response?.data || error.message);
        $toast.error('Erro na requisição da API');

        resp.value = `Erro: ${errorMessage}`;
        // return error.response?.data || error.message;
      }
      else {
        // Logando erro de rede ou outros erros no console
        // console.error('Erro de rede ou outro erro:', error);
        // $toast.error(`Erro na requisição da API-1: ${error}`);
        $toast.error('Erro na requisição da API');

        resp.value = 'Erro na requisição';
        // return error;
      }
    }
    return resp.value;
  };

  return { create };
});
