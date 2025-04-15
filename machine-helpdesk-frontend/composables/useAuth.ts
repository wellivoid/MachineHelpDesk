import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const accessToken = useCookie('accessToken');

  const uid = computed(() => {
    if (!accessToken.value) return null;

    try {
      const decodedToken: { uid: number; ulevel: string } = jwtDecode(accessToken.value);
      return decodedToken.uid;
    }
    catch {
      return null;
    }
  });

  const ulevel = computed(() => {
    if (!accessToken.value) return null;

    try {
      const decodedToken: { uid: number; ulevel: string } = jwtDecode(accessToken.value);
      return decodedToken.ulevel;
    }
    catch {
      return null;
    }
  });

  return { uid, ulevel };
};
