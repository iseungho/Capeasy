import React, { useEffect, useState, useCallback } from "react";
import BoardModal from "./BoardModal";
import { getBoardList } from "../../api/boardApi";
import { getThumbnail } from "../../api/imageApi";
import { getHeartListByBno, postHearts, deleteHeart, findHnoByMnoBno } from "../../api/heartApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";

const initListState = {
    boardList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const ListComponent = () => {
    const { page, size, refresh, setRefresh } = useCustomMove();
    const [serverData, setServerData] = useState(initListState);
    const [fetching, setFetching] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [likedBoards, setLikedBoards] = useState({});
    const [imageMap, setImageMap] = useState({}); // 각 게시글 이미지 상태

    const { loginState } = useCustomLogin();

    const loadThumbnail = useCallback(async (ino) => {
        try {
            const image = await getThumbnail(ino);
            const base64Data = image.fileContent;
            return createBase64DataToBlob(base64Data); // Blob URL 반환
        } catch (error) {
            console.error('Error loading image:', error);
            return null;
        }
    }, []);

    const createBase64DataToBlob = (base64Data) => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        return URL.createObjectURL(blob); // Blob URL로 변환
    };

    useEffect(() => {
        const fetchBoardAndLikes = async () => {
            setFetching(true);
            try {
                // 게시글 목록 불러오기
                const responseData = await getBoardList({ page, size });
                const boardList = responseData.dtoList || [];

                setServerData({
                    ...initListState,
                    boardList
                });

                // 각 게시글의 이미지 불러오기
                const newImageMap = {};
                for (const board of boardList) {
                    const image = await loadThumbnail(board.ino);
                    newImageMap[board.bno] = image;
                }
                setImageMap(newImageMap);

                // 좋아요 상태 불러오기
                if (loginState?.mno && boardList.length > 0) {
                    const likesState = {};
                    for (const board of boardList) {
                        const likedUsers = await getHeartListByBno(board.bno);
                        likesState[board.bno] = likedUsers.some(
                            like => like.memberId === loginState.mno
                        );
                    }
                    setLikedBoards(likesState);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchBoardAndLikes();
    }, [loginState, page, size, refresh, loadThumbnail]);

    const handleModalOpen = (bno) => {
        setIsModalOpen(isModalOpen === bno ? null : bno);
    };

    const handleLikeToggle = async (bno) => {
        if (!loginState) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }

        try {
            if (!likedBoards[bno]) {
                await postHearts(bno, loginState.mno);
                setLikedBoards((prevState) => ({
                    ...prevState,
                    [bno]: true,
                }));
            } else {
                const hno = await findHnoByMnoBno(loginState.mno, bno);
                if (hno) {
                    await deleteHeart(hno);
                    setLikedBoards((prevState) => ({
                        ...prevState,
                        [bno]: false,
                    }));
                }
            }
        } catch (error) {
            console.error("Error toggling heart:", error);
        } finally {
            setRefresh(!refresh);
        }
    };

    return (
        <div className="post-container flex justify-center mt-24">
            <div className="post-wrapper w-full sm:w-1/2 md:w-1/2 lg:w-2/5">
                {fetching && <p>Loading...</p>}

                {serverData.boardList.map((board) => (
                    <div key={board.bno} className="post-item border-b border-gray-300 py-4 mb-6 bg-white shadow-lg rounded-lg">
                        <div className="post-header flex justify-between items-center mb-3 px-4">
                            <div className="flex items-center">
                                <img className="w-10 h-10 rounded-full mr-3" src="https://via.placeholder.com/40" alt="User Avatar" />
                                <div>
                                    <p className="font-bold">{board.writerNickname}</p>
                                </div>
                            </div>
                            <button className="text-gray-500" onClick={() => handleModalOpen(board.bno)}>
                                ...
                            </button>
                        </div>

                        <div className="post-body">
                            {/* 이미지 렌더링 */}
                            <img
                                className="w-full h-auto mb-3 cursor-pointer object-cover"
                                style={{ height: '72vh', objectFit: 'cover' }}
                                src={imageMap[board.bno] || "https://via.placeholder.com/800x600"}
                                alt="Post Media"
                                onClick={() => handleModalOpen(board.bno)}
                            />
                            <p className="px-4 cursor-pointer font-bold" onClick={() => handleModalOpen(board.bno)}>
                                {board.title}
                            </p>
                            <p className="px-4 cursor-pointer" onClick={() => handleModalOpen(board.bno)}>
                                {board.content}
                            </p>
                        </div>

                        <div className="post-footer flex justify-between items-center mt-3 px-4">
                            <div>
                                <button className="mr-3 cursor-pointer" onClick={() => handleLikeToggle(board.bno)}>
                                    {likedBoards[board.bno] ? "❤️" : "🤍"} {board.heartCount}
                                </button>
                                <button className="cursor-pointer" onClick={() => handleModalOpen(board.bno)}>
                                    💬 {board.replyCount}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <BoardModal
                    isOpen={isModalOpen !== null}
                    onClose={() => setIsModalOpen(null)}
                    bno={isModalOpen}
                />
            </div>
        </div>
    );
};

export default ListComponent;
