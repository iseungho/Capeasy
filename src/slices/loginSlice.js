import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
    email: ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie("member")

    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            const payload = action.payload
            setCookie("member", JSON.stringify(payload))
            return payload
        },
        logout: (state, action) => {
            removeCookie("member")
            return { ...initState }
        },
        updateLoginInfo: (state, action) => {
            const payload = action.payload
            setCookie("member", JSON.stringify(payload))
            return { ...state, ...payload }
        },
        clearLoginInfo(state) {
            return initState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const payload = action.payload

            if (!payload.error) {
                setCookie("member", JSON.stringify(payload))
            }

            return action.payload
        })
            .addCase(loginPostAsync.pending, (state, action) => {
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
            })
    }
})

export const { login, logout, updateLoginInfo, clearLoginInfo } = loginSlice.actions
export default loginSlice.reducer
