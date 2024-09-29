import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/boards`;

// 게시물 등록 (이미지나 비디오 파일 포함 가능)
export const postBoard = async (boardData) => {
    const formData = new FormData();
    // 필수 요소 추가
    formData.append('title', boardData.title); 
    formData.append('content', boardData.content);
    formData.append('ino', boardData.ino);
    formData.append('writerId', boardData.writerId);
    formData.append('writerEmail', boardData.writerEmail);
    formData.append('writerNickname', boardData.writerNickname);

    try {
        const res = await axios.post(`${prefix}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const getBoard = async (bno) => {
    const res = await axios.get(`${prefix}/${bno}`);

    return res.data
}

export const getBoardList = async (pageParam) => {
    const { page, size } = pageParam;

    try {
        const res = await axios.get(`${prefix}/list`, { params: { page, size } });
        return res.data;  // 서버에서 반환하는 데이터를 그대로 반환
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getBoardListByMno = async (pageParam, mno) => {
    const { page, size } = pageParam;

    try {
        const res = await axios.get(`${prefix}/list/member/${mno}`, { params: { page, size } });
        return res.data;  // 서버에서 반환하는 데이터를 그대로 반환
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const putBoard = async (board) => {
    const res = await axios.put(`${prefix}/${board.bno}`, board);

    return res.data
}

// 게시물 삭제
export const deleteBoard = async (bno) => {
    try {
        const res = await axios.delete(`${prefix}/${bno}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};