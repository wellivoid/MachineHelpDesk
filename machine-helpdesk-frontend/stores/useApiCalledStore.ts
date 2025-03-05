/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const { t } = useI18n();
  const { $toast } = useNuxtApp();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.API_BASE_URL; // Obtém a URL da API do .env

  // Obtém o token do cookie
  const accessToken = useCookie<string | null>('accessToken');

  // Configuração de headers para requisições autenticadas
  const getAuthHeaders = () => {
    return accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {};
  };

  // Criar chamados
  const create = async (data: Omit<IPropsCalled, 'id' | 'createdAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/called`, data, {
        headers: {
          ...getAuthHeaders(),
          'Accept-Language': locale.value,
        },
      });

      navigateTo('/');
      return response.data;
    }
    catch (error) {
      $toast.error(t('errorCreateCalled'));
    }
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get<IPropsCalled[]>(`${API_BASE_URL}/called?page=1&limit=10000`, {
        headers: {
          ...getAuthHeaders(),
          'Accept-Language': locale.value,
        },
      });

      $toast.success(t('updateCompleted'));
      return response.data.map(chamado => ({
        ...chamado,
        createdAt: format(new Date(chamado.createdAt), locale.value.startsWith('pt') || locale.value.startsWith('es') ? 'dd/MM/yyyy - HH:mm:ss' : 'MM/dd/yyyy - HH:mm:ss'),
      }));
    }
    catch (error) {
      $toast.error(t('errorUpdate'));
      return [];
    }
  };

  // Informar quantidade de chamados no banco
  const totalCountCalled = ref(0);
  const getTotalCountCalled = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/called?page=1&limit=10000`, {
        headers: getAuthHeaders(),
      });

      totalCountCalled.value = Number(response.headers['x-total-count']);
      return totalCountCalled.value;
    }
    catch (error) {
      $toast.error(t('errorUpdate'));
    }
  };

  // Get By Id
  const getById = async (id: number) => {
    try {
      const response = await axios.get<IPropsCalled>(`${API_BASE_URL}/called/${id}`, {
        headers: getAuthHeaders(),
      });

      return response.data;
    }
    catch (error) {
      $toast.error(`Erro ao abrir o chamado do id: ${id}`);
    }
  };

  // Update chamado
  const update = async (id: number, data: Omit<IPropsCalled, 'id' | 'createdAt'>) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/called/${id}`, data, {
        headers: getAuthHeaders(),
      });

      if (response.status === 204) navigateTo('/');
    }
    catch (error) {
      $toast.error(t('errorUpdate'));
    }
  };

  return { create, getAll, getTotalCountCalled, totalCountCalled, getById, update };
});
