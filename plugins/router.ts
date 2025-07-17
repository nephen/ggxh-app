import { useUserStore } from '../store/userStore';
import { defineNuxtPlugin, useRouter } from '#app';
import { isWeChatBrowser } from '../utils/envUtils';
import { showToast } from '../utils/toast';

// 提取到外部的注册函数
const registerUser = async (userInfo: {
  nickname?: string | null;
  avatar?: string | null;
  id?: number | null;
  recommendSource?: string | null;
}) => {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nickname: userInfo?.nickname,
      avatar: userInfo?.avatar,
      id: userInfo?.id,
      recommendSource: userInfo?.recommendSource
    }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log('用户注册成功:', data);
    return data;
  }
};

const version: string = '1.0.2'; // 定义版本号

export default defineNuxtPlugin(() => {
  const router = useRouter();
  
  router.beforeEach((to, from, next) => {
    // 新增URL混淆参数检查
    if (!to.query.t && !to.path.startsWith('/api')) {
      const randomParam = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      const newQuery = { ...to.query, t: randomParam }
      next({
        path: to.path,
        query: newQuery,
        hash: to.hash
      })
      return
    }

    const userStore = useUserStore();
    if (userStore.version !== version) {
      userStore.clear(); // 清除用户信息
      userStore.version = version; // 更新版本号
    }

    // 新增微信授权登录逻辑
    if (isWeChatBrowser()) {
      if (to.query.recommend) {
        userStore.saveRecommendSource(to.query.recommend as string)
      }
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (to.query.token) {
          console.log("更新user token数据", to.query);
          userStore.updateUser(to.query);
          registerUser(userStore.userInfo); // 修改调用方式
        } else if (!userStore.token) {
          console.log("user静默登陆");
          let scope = "snsapi_base";
          const stat = {
            path: to.path,
            host: window.location.host,
            userInfo: false
          };
          
          if (to.query.scope && typeof to.query.scope === 'string') {
            stat.userInfo = true;
            scope = to.query.scope;
          }

          const statJsonString = JSON.stringify(stat);
          const statBase64String = btoa(statJsonString);
          const statUrlSafeBase64 = statBase64String
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
          
          const redirectUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbfd2519073ed0db&redirect_uri=http%3A%2F%2Fmsg.nephen.cn/wxMessageBoard/h5login&response_type=code&scope=${scope}&state=${statUrlSafeBase64}#wechat_redirect`;
          window.location.href = redirectUrl;
          return;
        }
      }
    } else {
      // 非微信浏览器逻辑
      showToast('请使用微信浏览器访问');
    }
    next();
  });
});