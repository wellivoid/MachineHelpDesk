const LoggedIn = true;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  if ((to.path !== '/login' && to.path !== '/register') && !LoggedIn) {
    return navigateTo('/login');
  }
});
