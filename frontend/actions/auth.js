import axios from "axios";
import cookie from "js-cookie";
import { API } from "../config";

export const signup = async user => {
  const data = JSON.stringify(user);
  try {
    const response = await axios.post(`${API}/signup`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
};
export const signin = async user => {
  const data = JSON.stringify(user);
  console.log(data);
  try {
    const response = await axios.post(`${API}/signin`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
};

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
};

export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key, value, { expires: 1 });
  }
};

export const getCookie = key => {
  if (process.browser) {
    cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
