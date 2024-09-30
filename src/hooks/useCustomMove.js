import { useState } from "react"
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom"

const getNum = (param, defaultValue) => {
    if(!param) {
        return defaultValue
    }
    return parseInt(param)
}

const useCustomMove = () => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)

    const queryDefault = createSearchParams({page, size}).toString()

    const moveToMain = () => {
        navigate({
            pathname: `/`,
        })
    }

    const moveToCreate = () => {
        navigate({
            pathname: `../create`,

        })
    }

    const moveToWait = (data) => {
        const vno = parseInt(data.vno)
        setRefresh(!refresh)
        navigate({
            pathname: `../waiting/${vno}`
        })
    }

    const moveToResult = (data) => {
        const ino = parseInt(data.ino)
        setRefresh(!refresh)
        navigate({
            pathname: `../result/${ino}`
        })
    }

    const moveToBoardList = (pageParam) => {
        let queryStr = ""

        if(pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        } else {
            queryStr = queryDefault
        } 

        setRefresh(!refresh)
        
        navigate({
            pathname: `/board/list`, search:queryStr
        })
    }

    const moveToMyPage = (pageParam) => {
        let queryStr = ""

        if(pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        } else {
            queryStr = queryDefault
        } 

        setRefresh(!refresh)
        
        navigate({
            pathname: `/member/mypage`, search:queryStr
        })
    }

    return {moveToMain, moveToBoardList, moveToCreate, moveToWait, moveToResult, moveToMyPage, setRefresh, page, size, refresh}
}

export default useCustomMove