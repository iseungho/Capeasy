import React, { useEffect, useState } from "react";
import BoardModal from "../common/BoardModal";
import { getBoardList } from "../../api/boardApi";
import { API_SERVER_HOST } from "../../api/imageApi";
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
    current: 0
};

const BoardListComponent = () => { 
    const { page, size, refresh, setRefresh } = useCustomMove();
    const [serverData, setServerData] = useState(initListState);
    const [fetching, setFetching] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [likedBoards, setLikedBoards] = useState({}); 

    // Use login state correctly by calling the hook as a function
    const { loginState } = useCustomLogin();

    // Fetch board data and like states
    useEffect(() => {
        const fetchBoardAndLikes = async () => {
            setFetching(true);
            try {
                // Fetch board list data
                const responseData = await getBoardList({ page, size });
                const boardList = responseData.dtoList || [];
                setServerData({
                    ...initListState,
                    boardList
                });

                // Fetch like states for each board
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
    }, [loginState, page, size, refresh]);

    const handleModalOpen = (bno) => {
        setIsModalOpen(isModalOpen === bno ? null : bno);
    };

    // Toggle like status
    const handleLikeToggle = async (bno) => {
        if (!loginState) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }
    
        try {
            if (!likedBoards[bno]) {
                // 좋아요 추가
                await postHearts(bno, loginState.mno);
                setLikedBoards((prevState) => ({
                    ...prevState,
                    [bno]: true,
                }));
            } else {
                // 좋아요 제거
                const hno = await findHnoByMnoBno(loginState.mno, bno); // await 추가
                if (hno) {
                    await deleteHeart(hno); // 좋아요 제거
                    setLikedBoards((prevState) => ({
                        ...prevState,
                        [bno]: false,
                    }));
                }
            }
        } catch (error) {
            console.error("Error toggling heart:", error);
        } finally {
            setRefresh();
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
                            <img
                                className="w-full h-auto mb-3 cursor-pointer object-cover"
                                style={{ height: '72vh', objectFit: 'cover' }}
                                src={`${API_SERVER_HOST}/api/images/view/thumbnail/${board.ino}`}
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
                                {/* 좋아요 및 댓글 수 표시 */}
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

export default BoardListComponent;
