export const isAuthor = (roles) => {
  return roles?.find((r) => r === "ROLE_AUTHOR") ? true : false;
};

export const isEditor = (roles) => {
  return roles?.find((r) => r === "ROLE_EDITOR") ? true : false;
};

export const isAdmin = (roles) => {
  return roles?.find((r) => r === "ROLE_ADMIN") ? true : false;
};
