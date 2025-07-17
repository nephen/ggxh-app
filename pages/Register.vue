<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-8">
    <div class="container mx-auto px-6 py-8 max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">用户注册</h1>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="nickname" class="block text-sm font-medium text-gray-700">用户昵称</label>
          <input
            type="text"
            id="nickname"
            v-model="nickname"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入昵称"
            required
          />
        </div>
        <div class="mb-4">
          <label for="avatar" class="block text-sm font-medium text-gray-700">用户头像 <span class="text-gray-500 text-xs">(选填)</span></label>
          <input
            type="text"
            id="avatar"
            v-model="avatar"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入头像链接"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">手机号码</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入手机号码"
            required
            pattern="[0-9]{11}"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          注册
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { showToast } from '../utils/toast';

const nickname = ref('');
const avatar = ref('');
const phone = ref(''); // 新增手机号码字段

const registerUser = async () => {
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: nickname.value,
        avatar: avatar.value || '/avatar-placeholder.png',
        id: phone.value, // 使用手机号码作为用户ID
      }),
    });
    
    const data = await response.json();
    if (response.ok) {
      const userStore = useUserStore();
      userStore.setUserInfo(data.data);
      showToast('注册成功！');
    } else {
      console.error('注册失败:', data.error);
    }
  } catch (error) {
    console.error('注册失败:', error);
  }
};
</script>