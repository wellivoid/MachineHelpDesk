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

  const create = async (data: Omit<IPropsCalled, 'id'>) => {
    const resp = ref('');
    try {
      const httpPost = await axios.post('http://localhost:3333/called', data);
      resp.value = JSON.stringify(httpPost.data);
      const id = Number(resp.value);
      if (!isNaN(id) && Number.isInteger(id)) {
        navigateTo('/');
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';

        $toast.error(`Erro ao criar o chamado`);

        resp.value = `Erro: ${errorMessage}`;
      }
      else {
        $toast.error(`Erro ao criar o chamado`);

        resp.value = 'Erro na requisição';
      }
    }
    return resp.value;
  };

  // GET ALL
  const getAll = async () => {
    const respGetAll = ref<IPropsCalled[]>([]);
    try {
      const httpGetAll = await axios.get<IPropsCalled[]>('http://localhost:3333/called?page=1&limit=10000');
      respGetAll.value = httpGetAll.data;
      $toast.success('Atualização concluída com sucesso');
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        $toast.error('Erro na atualização');
      }
      else {
        $toast.error('Erro na atualização');
      }
    }
    return respGetAll.value;
  };

  // Informar quantidade de chamados no banco
  const totalCountCalled = ref(0);
  const getTotalCountCalled = async () => {
    const response = await axios.get('http://localhost:3333/called?page=1&limit=10000');

    const totalCount = Number(response.headers['x-total-count']); // ✅ Funciona com Axios!

    totalCountCalled.value = totalCount;
    return totalCount.valueOf;
  };

  // Get By Id
  const getById = async (id: number) => {
    const respGetById = ref<IPropsCalled>();
    try {
      const httpGetById = await axios.get<IPropsCalled>(`http://localhost:3333/called/${id}`);
      respGetById.value = httpGetById.data;
      $toast.success(`Chamado de ${id} aberto com sucesso`);
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        $toast.error(`Erro ao abrir o chamado do id: ${id}`);
      }
      else {
        $toast.error(`Erro ao abrir o chamado do id: ${id}`);
      }
    }
    return respGetById.value;
  };

  // Update
  const update = async (id: number, data: Omit<IPropsCalled, 'id'>) => {
    const resp = ref('');
    try {
      const httpPost = await axios.put(`http://localhost:3333/called/${id}`, data);
      if (httpPost.status == 204) {
        navigateTo('/');
      }
      // resp.value = JSON.stringify(httpPost.data);
      // const id = Number(resp.value);
      // if (!isNaN(id) && Number.isInteger(id)) {
      //   navigateTo('/');
      // }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';

        $toast.error(`Erro ao atualizar o chamado`);

        resp.value = `Erro: ${errorMessage}`;
      }
      else {
        $toast.error(`Erro ao atualizar o chamado`);

        resp.value = 'Erro na requisição';
      }
    }
  };
  return { create, getAll, getTotalCountCalled, totalCountCalled, getById, update };
});
