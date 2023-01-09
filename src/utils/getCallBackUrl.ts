export const getCallBackUrl = (referer: string) => {
  return `${referer}`.replace(/\//g, "%2F").replace(/\:/g, "%3A");
};
