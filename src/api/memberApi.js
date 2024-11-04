import axios from 'axios';
import jwtAxios from "../util/jwtUtil"
import API_SERVER_HOST from "./apiConfig";

const prefix = `${API_SERVER_HOST}/member`

export const loginPost = async (loginParam) => {

    const header = {
        headers: {
            "Content-Type": "x-www-form-urlencoded"
        }
    }

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.password)

    const res = await axios.post(`${prefix}/login`, form, header)

    return res.data
}

export const getMember = async (mno) => {
    const res = await axios.get(`${prefix}/${mno}`);
    return res.data;
}

export const signupMember = async (member) => {
    const header = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await axios.post(`${prefix}/`, member, header);
    return res.data;
}

export const modifyMember = async (member, mno) => {
    if (!mno) {
        throw new Error("Member number (mno) is required");
    }
    const res = await jwtAxios.put(`${prefix}/${mno}`, member);
    return res.data;
}

export const checkPassword = async (member) => {

    const header = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = {
        mno: member.mno,
        password: member.password
    }

    const res = await jwtAxios.post(`${prefix}/check/password`, body, header)

    return res.data
}

export const removeMember = async (mno) => {
    if (!mno) {
        throw new Error("Member number (mno) is required");
    }
    const res = await jwtAxios.delete(`${prefix}/${mno}`);
    return res.data;
}
