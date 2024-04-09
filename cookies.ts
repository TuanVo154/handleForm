// cookies.ts
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (cookiename: string, value: string) => {
  cookies.set(cookiename, value, {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    secure: true,
    sameSite: "strict",
  });
};

export const getCookie = (cookiename: string) => {
  return cookies.get(cookiename);
};

export const removeCookie = (cookiename: string) => {
  cookies.remove(cookiename, { path: "/" });
};
