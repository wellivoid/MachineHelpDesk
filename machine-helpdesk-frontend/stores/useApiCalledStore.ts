import { defineStore } from 'pinia';
import axios from 'axios';
import { format } from 'date-fns';

interface IPropsCalled {
  id: number;
  title: string;
  description: string;
  priority: string;
  userId: number;
  status: string;
  createdAt: string;
}

export const useApiCalledStore = defineStore('called', () => {
  const { $toast } = useNuxtApp();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.API_BASE_URL; // Obtém a URL da API do .env

  const create = async (data: Omit<IPropsCalled, 'id' | 'createdAt'>) => {
    const resp = ref('');
    try {
      const httpPost = await axios.post(`${API_BASE_URL}/called`, data);
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
      const httpGetAll = await axios.get<IPropsCalled[]>(`${API_BASE_URL}/called?page=1&limit=10000`, {
        headers: {
          'Accept-Language': locale.value, // Envia o idioma correto para a API
        },
      });
      respGetAll.value = httpGetAll.data.map(chamado => ({
        ...chamado,
        createdAt: format(new Date(chamado.createdAt), locale.value.startsWith('pt') || locale.value.startsWith('es') ? 'dd/MM/yyyy - HH:mm:ss' : 'MM/dd/yyyy - HH:mm:ss'),
      }));
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
    const response = await axios.get(`${API_BASE_URL}/called?page=1&limit=10000`);

    const totalCount = Number(response.headers['x-total-count']); // ✅ Funciona com Axios!

    totalCountCalled.value = totalCount;
    return totalCount.valueOf;
  };

  // Get By Id
  const getById = async (id: number) => {
    const respGetById = ref<IPropsCalled>();
    try {
      const httpGetById = await axios.get<IPropsCalled>(`${API_BASE_URL}/called/${id}`);
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
  const update = async (id: number, data: Omit<IPropsCalled, 'id' | 'createdAt'>) => {
    const resp = ref('');
    try {
      const httpPost = await axios.put(`${API_BASE_URL}/called/${id}`, data);
      if (httpPost.status == 204) {
        navigateTo('/');
      }
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
