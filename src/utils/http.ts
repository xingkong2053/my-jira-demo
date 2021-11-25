import qs from "qs";
import * as auth from "../auth-provider";
import { message } from "antd";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? "Bearer " + token : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += '?' + qs.stringify(data);
  } else {
    config.body = JSON.stringify(data || {});
  }

  const response = await window.fetch(`${apiUrl}/${endpoint}`, config);

  if (response.status === 401) {
    // 未授权的接口
    await auth.logout();
    // 刷新页面
    window.location.reload();
    return Promise.reject({ message: "请重新登录" });
  }
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    const msg = result.message || "服务异常";
    message.error(msg);
    return Promise.reject(result);
  }
};

export const useHttp = () => {
  const {user} = useAuth()
  return (...[endpoint,config]: Parameters<typeof http>) => http(endpoint,{...config,token:user?.token})
}
