import { useState } from "react";
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";

const getNum = (param, defaultValue) => {
    if (!param || isNaN(param)) {
        return defaultValue;
    }
    return parseInt(param, 10);
}

const useCustomMove = () => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 8);

    const queryDefault = createSearchParams({
        page: page.toString(),
        size: size.toString(),
    }).toString();

    // 중복된 쿼리 문자열 생성 로직을 함수로 추출
    const createQueryString = (pageParam) => {
        const pageNum = getNum(pageParam?.page, 1);
        const sizeNum = getNum(pageParam?.size, 8);
        return createSearchParams({
            page: pageNum.toString(),
            size: sizeNum.toString(),
        }).toString();
    }

    const moveToMain = () => {
        navigate({ pathname: `/` });
    }

    const moveToCreate = () => {
        navigate({ pathname: `/create` });
    }

    const moveToAbout = () => {
        navigate({ pathname: `/about` });
    }

    const moveToWait = (data) => {
        const vno = parseInt(data.vno, 10);
        setRefresh(!refresh);
        navigate({ pathname: `/waiting/${vno}` });
    }

    const moveToResult = (data) => {
        const ino = parseInt(data.ino, 10);
        setRefresh(!refresh);
        navigate({ pathname: `/result/${ino}` });
    }

    const moveToBoardList = (pageParam) => {
        const queryStr = pageParam ? createQueryString(pageParam) : queryDefault;

        setRefresh(!refresh);
        navigate({ pathname: `/board/list`, search: queryStr });
    }

    const moveToMyPage = (mno, pageParam) => {
        const queryStr = pageParam ? createQueryString(pageParam) : queryDefault;

        setRefresh(!refresh);
        navigate({ pathname: `/member/mypage/${mno}`, search: queryStr });
    }

    return { moveToMain, moveToAbout, moveToBoardList, moveToCreate, moveToWait, moveToResult, moveToMyPage, setRefresh, page, size, refresh };
}

export default useCustomMove;