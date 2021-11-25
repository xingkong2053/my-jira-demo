// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { User } from "./pages/ProjectList/SearchPanel";
import { http } from "./utils/http";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await http(`login`, {
      method: "POST",
      data,
    });
    return handleUserResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await http(`register`, {
      method: "POST",
      data,
    });
    return handleUserResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
