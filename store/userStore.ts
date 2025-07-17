import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    // 新增版本号字段
    version: null as string | null,
    userInfo: {
      id: null as number | null,  // 新增id字段
      nickname: null as string | null,
      avatar: null as string | null,
      token: null as string | null,  // 当前用户的token
      recommendSource: null as string | null,  // 新增推荐来源字段
    },
    token: null as string | null,
    authorized: false,
    // 新增阅读状态持久化字段
    readingState: {
      currentArticle: null as any | null,
      readStartTime: null as number | null
    },
    // 新增官住状态持久化字段
    followState: {
      currentUser: null as any | null,
      showFollowModal: false
    }
  }),
  actions: {
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    updateUser(user: any) {
      this.token = user.token;
      this.authorized = user.authorized;

      this.userInfo.id = Number(user.userId);  // 转换为number类型
      this.userInfo.nickname = user.nickname;
      this.userInfo.avatar = user.headImgUrl;
    },

    // 新增方法：清理用户信息
    clear() {
      this.userInfo = {
        id: null,  // 重置id字段
        nickname: null,
        avatar: null,
        token: null,
        recommendSource: null,  // 重置推荐来源字段
      }
      this.token = null;
      this.authorized = false;
      this.readingState = {  // 重置阅读状态
        currentArticle: null,
        readStartTime: null
      };
      this.followState = {  // 重置官住状态
        currentUser: null,
        showFollowModal: false
      };
    },
    
    // 新增方法：保存推荐来源
    saveRecommendSource(source: string) {
      if (this.userInfo.recommendSource === null) {  // 确保只保存一次
        this.userInfo.recommendSource = source;
      }
    },
    
    // 新增方法：保存阅读状态
    saveReadingState(article: any, startTime: number) {
      this.readingState = {
        currentArticle: article,
        readStartTime: startTime
      };
    },
    
    // 新增方法：清除阅读状态
    clearReadingState() {
      this.readingState = {
        currentArticle: null,
        readStartTime: null
      };
    },
    
    // 新增方法：保存官住状态
    saveFollowState(user: any) {
      this.followState = {
        currentUser: user,
        showFollowModal: true
      };
    },
    
    // 新增方法：清除官住状态
    clearFollowState() {
      this.followState = {
        currentUser: null,
        showFollowModal: false
      };
    }
  },
  // 配置持久化存储
  // https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html
  persist: {
    key: 'ggxy-user',
  },
});