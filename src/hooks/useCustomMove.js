import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useCustomMove = () => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)

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

    return {moveToCreate, moveToWait, moveToResult}
}

export default useCustomMove