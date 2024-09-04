import { Cookies } from "react-cookie";

const cookies = new Cookies()

export const setCookie = (name, value, days=1) => {
    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + days)
    return cookies.set(name, value, { path: '/', expires: expires })
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name, path = "/") => {
    cookies.remove(name, { path })
}
