export const isWeChatBrowser = () => {
  return /MicroMessenger/i.test(navigator.userAgent);
};