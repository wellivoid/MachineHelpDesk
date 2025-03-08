import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const accessToken = useCookie('accessToken');
  const uid = computed(() => {
    if (!accessToken.value) return null;

    try {
      const decodedToken: { uid: number } = jwtDecode(accessToken.value);
      return decodedToken.uid;
    }
    catch {
      return null;
    }
  });

  return { uid };
};
