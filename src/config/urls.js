import { CURRENT_PROFILE, PROFILE_PRODUCTION } from "./constants";

export const BASE_URL =
  CURRENT_PROFILE === PROFILE_PRODUCTION
    ? "https://free-magazine-backend-production.up.railway.app/api"
    : "http://localhost:8080/api";
export const authApiUrl = "/auth";
export const postsApiUrl = "/posts";
export const commentsApiUrl = "/comments";
export const likesApiUrl = "/likes";
export const photosApiUrl = "/photos";
export const categoriesApiUrl = "/categories";
