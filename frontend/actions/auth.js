import fetch from "isomorphic-fetch";
import { API } from "../config";

export const signup = async user => {
  const response = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
  return await response.json();
};
