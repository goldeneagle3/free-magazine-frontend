export const checkTokenIsBroken = (message) => {
  return (
    message === "Token geçersiz durumda!" ||
    message === "Token süresi doldu!" ||
    message === "Desteklenmeyen Token!" ||
    message === "Eyvah ! Token oluşumunda bir illegal durumu tespit edldi!"
  );
};
