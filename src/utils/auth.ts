import Cookies from "js-cookie";
import { useUserStoreHook } from "/@/store/modules/user";
import { storageSession } from "/@/utils/storage";

const TokenKey = "authorized-token";

type paramsMapType = {
  accessToken: string;
  refreshToken: string;
  user: object;
};

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get("authorized-token");
}

// 设置token以及过期时间（cookies、sessionStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken(data) {
  const { access_token, refresh_token, user } = data;
  // 提取关键信息进行存储
  const paramsMap: paramsMapType = {
    user,
    accessToken: access_token,
    refreshToken: refresh_token
  };
  const dataString = JSON.stringify(paramsMap);
  useUserStoreHook().SET_TOKEN(access_token);
  useUserStoreHook().SET_NAME(user.username);
  Cookies.set(TokenKey, dataString);
  storageSession.setItem(TokenKey, paramsMap);
  storageSession.setItem("info", {
    username: user.username,
    accessToken: access_token
  });
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.removeItem(TokenKey);
}
