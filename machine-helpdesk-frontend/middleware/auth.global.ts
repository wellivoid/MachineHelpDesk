/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('accessToken');

  // Permitir acesso às rotas públicas
  if (to.path === '/login' || to.path === '/register') return;

  // Se não houver token, redireciona para login
  if (!accessToken.value) {
    return navigateTo('/login');
  }

  try {
    // Decodifica o token para verificar a expiração
    const decodedToken: { uid: number; exp: number } = jwtDecode(accessToken.value);
    const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos

    // Se o token expirou, remove e redireciona para login
    if (decodedToken.exp < now) {
      useCookie('accessToken', { maxAge: 0 }).value = null;
      return navigateTo('/login');
    }
  }
  catch (error) {
    // Se houver erro ao decodificar, remove o token e redireciona
    useCookie('accessToken', { maxAge: 0 }).value = null;
    return navigateTo('/login');
  }
});
