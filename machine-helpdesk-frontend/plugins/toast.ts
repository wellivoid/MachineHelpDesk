import Vue3Toastify, { toast, type Content, type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions);

  toast.error = (message: Content) =>
    toast(message, {
      type: 'error',
      theme: 'colored',
    });

  return {
    provide: {
      toast,
    },
  };
});

// import Vue3Toasity, { type ToastContainerOptions, toast, type ToastOptions } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(Vue3Toasity) as ToastContainerOptions;
//   return {
//     provide: {
//       toastify: (msg: string) => {
//         toast(msg, {
//           autoClose: 5000,
//           position: toast.POSITION.TOP_CENTER,
//         } as ToastOptions);
//       },
//     },
//   };
// });
