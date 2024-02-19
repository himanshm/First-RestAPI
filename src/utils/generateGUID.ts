export const generateGUID: () => string = () => {
  const timestamp = new Date().getTime().toString(16);
  const randomNum = Math.floor(Math.random() * 1000000).toString(16);
  return `${timestamp}-${randomNum}`;
};
