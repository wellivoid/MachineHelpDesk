import { useState, onMounted } from '#imports';

export const useTheme = () => {
  const isDark = useState<boolean>('theme', () => false);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    const html = document.documentElement;

    if (isDark.value) {
      html.classList.add('dark'); // Adiciona a classe no <html>
      localStorage.setItem('theme', 'dark');
    }
    else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    if (savedTheme === 'dark') {
      isDark.value = true;
      html.classList.add('dark');
    }
    else {
      isDark.value = false;
      html.classList.remove('dark');
    }
  });

  return { isDark, toggleDarkMode };
};
