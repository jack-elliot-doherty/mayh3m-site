export const getCallBackUrl = (referer: string, resolvedUrl: string) => {
  return `${referer}${resolvedUrl.slice(1, resolvedUrl.length)}`
    .replace(/\//g, "%2F")
    .replace(/\:/g, "%3A");
};
