import { useUserStore } from '../store/userStore';

// 封装原生fetch请求
export async function authFetch(url: string, options: RequestInit = {}) {
  const userStore = useUserStore();
  const token = userStore.userInfo?.token;
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  const mergedOptions = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, mergedOptions);
    if (response.status === 401) {
      window.location.href = '/profile';
      return Promise.reject('认证过期，请重新登录');
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// 封装Nuxt的$fetch请求
export async function authNuxtFetch(url: string, options: any = {}) {
  const userStore = useUserStore();
  const token = userStore.userInfo?.token;
  
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const mergedOptions = {
    ...options,
    headers
  };

  try {
    const response = await $fetch(url, mergedOptions);
    if (response.status === 401) {
      window.location.href = '/profile';
      return Promise.reject('认证过期，请重新登录');
    }
    return response;
  } catch (error) {
    console.error('$Fetch error:', error);
    throw error;
  }
}