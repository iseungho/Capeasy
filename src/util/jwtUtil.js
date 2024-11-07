import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import host from "../api/apiConfig";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {

    const prefix = host

    const header = { headers: { "Authorization": `Bearer ${accessToken}` } }

    const res = await axios.get(`${prefix}/member/refresh?refreshToken=${refreshToken}`, header)

    return res.data
}

// before request
const beforeReq = (config) => {

    const memberInfo = getCookie("member")

    if (!memberInfo) {
        console.error("Member NOT FOUND")
        return Promise.reject(
            {
                response:
                {
                    data:
                    {
                        error: "REQUIRE_LOGIN"
                    }
                }
            }
        )
    }

    const { accessToken } = memberInfo

    //  Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

// fail request
const requestFail = (err) => {
    console.error("request error............")
    return Promise.reject(err)
}

// before return response
const beforeRes = async (res) => {
    const data = res.data

    if (data && data.error === 'ERROR_ACCESS_TOKEN') {

        const memberCookieValue = getCookie("member")

        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookieValue))

        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return axios(originalRequest);

    }

    return res
}


// fail response
const responseFail = (err) => {
    console.error("response fail error.............")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)

jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios
