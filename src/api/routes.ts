import { http } from "../utils/http";

export const getAsyncRoutes = (params?: object) => {
  return http.request("get", "/dj-rest-auth/providers/getAsyncRoutes/", {
    params
  });
};
