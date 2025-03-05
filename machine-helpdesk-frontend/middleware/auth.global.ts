/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('accessToken'); // Obtemos o cookie do token

  // Função para verificar a expiração do token
  const checkTokenExpiration = () => {
    try {
      if (!accessToken.value) return true; // Se o token não existir, consideramos como expirado

      const decodedToken: { exp: number } = jwtDecode(accessToken.value);
      const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos

      return decodedToken.exp < now; // Se o token expirou, retorna true
    }
    catch (error) {
      return true; // Se houver erro ao decodificar o token, também considera como expirado
    }
  };

  // Se o token estiver expirado e o usuário não estiver na página de login, remove o cookie e redireciona para login
  if (checkTokenExpiration()) {
    useCookie('accessToken').value = null; // Remover o cookie diretamente

    // Verificar se a página atual não é a de login para evitar redirecionamento infinito
    if (to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login');
    }
  }

  // Permitir acesso às rotas públicas
  if (to.path === '/login' || to.path === '/register') return;

  // Verificar se o token expirou e redirecionar automaticamente
  watch(accessToken, (newToken) => {
    if (checkTokenExpiration()) {
      useCookie('accessToken').value = null; // Remover o cookie diretamente
      if (to.path !== '/login') { // Impede o redirecionamento para login quando já está em /login
        navigateTo('/login');
      }
    }
  });
});
