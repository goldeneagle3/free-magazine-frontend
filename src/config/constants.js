export const BRAND = "GUGULTAŞ";
export const PROFILE_PRODUCTION = "prod";
export const PROFILE_DEVELOPMENT = "dev";
export const CURRENT_PROFILE = PROFILE_PRODUCTION;
export const rememberCookie = "remember_me";
export const cookieExpireTime =
  CURRENT_PROFILE === PROFILE_DEVELOPMENT ? 1800000 : 86400000;
