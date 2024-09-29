import axios from "axios";
import { getBoard } from "./boardApi";
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/hearts`;

export const postHearts = async (bno, memberId) => {
    const formData = new FormData();
    formData.append('bno', bno);
    formData.append('memberId', memberId);

    try {
        const res = await axios.post(`${prefix}/`, formData, {
        });
        return res.data;
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};


export const getHeart = async (hno) => {
    const res = await axios.get();

    return res.data;
}

export const getHeartListByBno = async (bno) => {
    if(!bno) {
        throw new Error("Board number (bno) is required");
    }
    const res = await axios.get(`${prefix}/board/${bno}`);
    return res.data
}

export const deleteHeart = async (hno) => {
    if (!hno) {
        throw new Error("Heart number (hno) is required");
    }
    const res = await axios.delete(`${prefix}/${hno}`);
    return res.data;
}

export const findHnoByMnoBno = async (mno, bno) => {
    try {
        // 'await'을 사용하여 heartList 데이터를 비동기적으로 받아옵니다.
        const heartList = await getHeartListByBno(bno);
        
        // heartList가 배열인지 확인하고, 배열일 경우에만 반복문을 실행합니다.
        if (Array.isArray(heartList)) {
            for (const h of heartList) {
                if (h.memberId === mno) {  // 'mno' 대신 'memberId' 사용 (JSON 구조에 맞게)
                    return h.hno;
                }
            }
        }

        // 해당 mno에 맞는 hno가 없으면 null 반환
        return null;
    } catch (error) {
        console.error("Error finding HNO by MNO and BNO:", error);
        throw error; // 오류가 발생하면 호출한 곳으로 오류를 전달합니다.
    }
}
