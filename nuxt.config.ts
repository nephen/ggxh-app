import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  plugins: [
    { src: '~/plugins/router.ts', mode: 'client' },
    { src: '~/plugins/pinia.ts' },
  ],
  modules: [
    '@nuxtjs/sitemap',
    'nuxt-mongoose', // 添加 nuxt-mongoose 模块
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  nitro: {
    preset: 'node-server', // 明确使用Node服务器
    prerender: {
      routes: ['/sitemap.xml'],
      ignore: [
        '/articles', 
        '/users',
        '/profile',
        '/being-read',
        '/my-articles',
        '/fans',
        '/recharge',
        '/reading-report',
        '/report-records',
        '/withdraw-admin',
      ],
      crawlLinks: true,
      failOnError: false,
    },
  },
  runtimeConfig: {
    public: {
      HPJ_SECRET: process.env.HPJ_SECRET,
      HPJ_APPID: process.env.HPJ_APPID,
      BASE_URL: process.env.BASE_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      OSS_REGION: process.env.OSS_REGION,
      OSS_ACCESS_KEY_ID: process.env.OSS_ACCESS_KEY_ID,
      OSS_ACCESS_KEY_SECRET: process.env.OSS_ACCESS_KEY_SECRET,
      OSS_BUCKET: process.env.OSS_BUCKET,
    },
    site: {
      url: 'https://ggxh.nephen.cn',
      name: '关关相互 - 公众号互助平台'
    },
    // 配置 MongoDB 连接字符串
    mongoose: {
      uri: process.env.MONGODB_URI || 'mongodb://root:181224@mongo:27017/ggxh?authSource=admin', // 替换为你的 MongoDB 连接字符串,
      devtools: true,
    }
  },
  features: {
    inlineStyles: false
  },
  app: {
    head: {
      title: '关关相互 - 公众号互助平台', 
      htmlAttrs: {
        lang: 'zh-CN',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        { name: 'description', content: '关关相互 - 2025最新公众号互阅互粉平台，提供公众号推广引流、文章互阅、粉丝互关等服务，帮助公众号快速涨粉，提升阅读量，助力公众号运营。加入2025互关互助群，体验精准匹配同领域读者。' },
        { name: 'keywords', content: '公众号互阅,公众号互助,公众号互粉,公众号推广,公众号阅读互助,公众号浏览量,公众号阅读量神器,公众号阅读量购买,公众号粉丝自助下单,公众号引流,公众号涨粉,互阅平台,互粉群,2025互关群,阅读量提升,社群推广,公众号文章互点群,公众号1000粉丝月收入,公众号互关群二维码,关关相互' },
      ],
    },
  },
  compatibilityDate: '2025-03-02',
})
