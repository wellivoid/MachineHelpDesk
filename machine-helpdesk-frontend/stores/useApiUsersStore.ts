/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia';
import { format } from 'date-fns';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface IPropsUser {
  id: number;
  name: string;
  email: string;
  password: string;
  level: string;
  enable: number;
  createdAt: string;
}

export interface IUserPublic {
  id: number;
  name: string;
  enable: number;
  createdAt: Date;
}

export interface IUserUpdate {
  name: string;
  level: string;
  enable: number;
}

export const useApiUsersStore = defineStore('users', () => {
  const { t } = useI18n();
  const { $toast } = useNuxtApp();
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.API_BASE_URL; // Obtém a URL da API do .env

  // Define o cookie do token sem um tempo fixo
  const accessToken = useCookie<string | null>('accessToken');

  // Configuração de headers para requisições autenticadas
  const getAuthHeaders = () => {
    return accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {};
  };

  // Criar ususarios
  const signUp = async (data: Omit<IPropsUser, 'id' | 'createdAt' | 'enable'>) => {
    const resp = ref('');
    try {
      const httpPost = await axios.post(`${API_BASE_URL}/register`, data);
      resp.value = JSON.stringify(httpPost.data);
      const id = Number(resp.value);
      if (!isNaN(id) && Number.isInteger(id)) {
        navigateTo('/login');
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || t('errorUnselected');

        $toast.error(t('errorCreateUser'));

        resp.value = `Erro: ${errorMessage}`;
      }
      else {
        $toast.error(t('error Create User'));

        resp.value = t('errorReq');
      }
    }
    return resp.value;
  };

  // Login do usuário
  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

      if (response.data.accessToken) {
        const decodedToken: { uid: number; exp: number } = jwtDecode(response.data.accessToken);
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = decodedToken.exp - now;

        if (expiresIn > 0) {
          accessToken.value = response.data.accessToken;

          // Atualiza o cookie com tempo de expiração correto
          useCookie('accessToken', { maxAge: expiresIn }).value = response.data.accessToken;

          // $toast.success(t('loginSuccess'));
          navigateTo('/');
        }
        else {
          $toast.error(t('expiredToken'));
        }
      }
    }
    catch (error) {
      $toast.error(t('errorLogin'));
    }
  };

  // Logout do usuário
  const logout = () => {
    const accessToken = useCookie('accessToken');

    if (accessToken.value) {
      // Remove o cookie corretamente
      accessToken.value = undefined; // Definir como `undefined` evita que o Nuxt tente sobrescrevê-lo
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'; // Força remoção
    }

    // Redireciona para login
    navigateTo('/login');
  };

  const getAll = async () => {
    try {
      const response = await axios.get<Omit<IPropsUser, 'password' | 'email'>[]>(`${API_BASE_URL}/users?page=1&limit=10000`, {
        headers: {
          ...getAuthHeaders(),
          'Accept-Language': locale.value,
        },
      });

      return response.data.map(users => ({
        ...users,
        createdAt: format(new Date(users.createdAt), locale.value.startsWith('pt') || locale.value.startsWith('es') ? 'dd/MM/yyyy - HH:mm:ss' : 'MM/dd/yyyy - HH:mm:ss'),
      }));
    }
    catch (error) {
      $toast.error(t('errorUpdate'));
      return [];
    }
  };

  // Get By Id
  const getById = async (id: number) => {
    try {
      const response = await axios.get<Omit<IPropsUser, 'password'>>(`${API_BASE_URL}/users/lv/${id}`, {
        headers: getAuthHeaders(),
      });

      return {
        name: response.data.name,
        level: response.data.level,
        enable: response.data.enable,
        createdAt: format(new Date(response.data.createdAt), locale.value.startsWith('pt') || locale.value.startsWith('es') ? 'dd/MM/yyyy - HH:mm:ss' : 'MM/dd/yyyy - HH:mm:ss'),
        email: response.data.email,
      };
    }
    catch (error) {
      $toast.error(`Erro ao abrir o chamado do id: ${id}`);
    }
  };

  const getAllLv = async () => {
    try {
      const response = await axios.get<Omit<IPropsUser, 'password' | 'email'>[]>(`${API_BASE_URL}/users?page=1&limit=10000`, {
        headers: {
          ...getAuthHeaders(),
          'Accept-Language': locale.value,
        },
      });

      // Resolve all promises returned by the map function
      const listUsersLv = await Promise.all(
        response.data.map(async (user) => {
          const lvResponse = await axios.get(`${API_BASE_URL}/users/lv/${user.id}`, {
            headers: {
              ...getAuthHeaders(),
              'Accept-Language': locale.value,
            },
          });

          return {
            ...user,
            lv: lvResponse.data.level, // Extract `lv` from the response
            createdAt: format(
              new Date(user.createdAt),
              locale.value.startsWith('pt') || locale.value.startsWith('es')
                ? 'dd/MM/yyyy - HH:mm:ss'
                : 'MM/dd/yyyy - HH:mm:ss',
            ),
          };
        }),
      );
      return listUsersLv;
    }
    catch (error) {
      $toast.error('Erro ao carregar os usuários.');
      return [];
    }
  };

  // Update user
  const update = async (id: number, data: Omit<IUserPublic, 'id' | 'createdAt'>) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, data, {
        headers: getAuthHeaders(),
      });

      if (response.status === 204) navigateTo('/users');
    }
    catch (error) {
      $toast.error(t('errorUpdate'));
    }
  };

  return { signIn, signUp, logout, accessToken, getAll, getAllLv, update, getById };
});
