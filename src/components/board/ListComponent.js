import React, { useEffect, useState, useCallback } from "react";
import BoardModal from "./BoardModal";
import BoardInfoModal from "../common/BoardInfoModal";
import ModifyModal from "../common/ModifyModal";
import { getBoardList, deleteBoard } from "../../api/boardApi";
import { getImage } from "../../api/imageApi";
import { getHeartListByBno, postHearts, deleteHeart, findHnoByMnoBno } from "../../api/heartApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import PageComponent from "../common/PageComponent";

const initListState = {
    dtoList: [],
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
    const { page, size, refresh, moveToBoardList, setRefresh } = useCustomMove();
    const [serverData, setServerData] = useState(initListState);
    const [fetching, setFetching] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(null);
    const [isBoardInfoModalOpen, setIsBoardInfoModalOpen] = useState(null);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(null);
    const [likedBoards, setLikedBoards] = useState({});
    const [imageMap, setImageMap] = useState({});

    const { loginState } = useCustomLogin();

    const loadThumbnail = useCallback(async (ino) => {
        try {
            const image = await getImage(ino);
            const base64Data = image.fileContent;
            return createBase64DataToBlob(base64Data);
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
        return URL.createObjectURL(blob);
    };

    useEffect(() => {
        const fetchBoardAndLikes = async () => {
            setFetching(true);
            try {
                const data = await getBoardList({ page, size });
                setServerData(data);
    
                const newImageMap = {};
                for (const board of data.dtoList) {
                    const image = await loadThumbnail(board.ino);
                    newImageMap[board.bno] = image;
                }
                setImageMap(newImageMap);
    
                if (loginState?.mno && data.dtoList.length > 0) {
                    const likesState = {};
                    for (const board of data.dtoList) {
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
    }, [loginState, page, size, refresh, loadThumbnail]);  // Removed serverData.dtoList dependency
    

    const handleBoardModalOpen = (bno) => {
        setIsBoardModalOpen(isBoardModalOpen === bno ? null : bno);
    };

    const handleBoardInfoModalOpen = (bno) => {
        setIsBoardInfoModalOpen(isBoardInfoModalOpen === bno ? null : bno);
    };

    const handleModifyBoard = async (bno) => {
        setIsModifyModalOpen(isModifyModalOpen === bno ? null : bno);
    };
    
    const handleDeleteBoard = async (bno) => {
        try {
            await deleteBoard(bno);
            alert('게시글이 삭제되었습니다.');
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };

    const closeModifyModal = async () => {
        setIsModifyModalOpen(null);
        setRefresh(!refresh);
    }

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

                {serverData.dtoList.map((board) => (
                    <div key={board.bno} className="post-item border-b border-gray-300 py-4 m-6 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg">
                        <div className="post-header flex justify-between items-center mb-3 px-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full mr-3 bg-profile-image bg-cover"/>
                                <div>
                                    <p className="accent-gray-800">{board.writerNickname}</p>
                                </div>
                            </div>
                            <button className="text-gray-500" onClick={() => handleBoardInfoModalOpen(board.bno)}>
                                ...
                            </button>
                        </div>

                        <div className="post-body"
                             onClick={() => handleBoardModalOpen(board.bno)}>
                            <img
                                className="w-full h-auto mb-3 cursor-pointer object-cover"
                                style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
                                src={imageMap[board.bno] || "https://via.placeholder.com/800x600"}
                                alt="Post Media"
                            />
                            <p className="px-4 cursor-pointer font-semibold text-xl md:text-xl">
                                {board.title}
                            </p>
                            <p className="px-4 cursor-pointer text-sm md:text-base">
                                {board.content}
                            </p>
                        </div>

                        <div className="post-footer flex justify-between items-center mt-3 px-4">
                            <div>
                                <button className="mr-3 cursor-pointer" onClick={() => handleLikeToggle(board.bno)}>
                                    {likedBoards[board.bno] ? "❤️" : "🤍"} {board.heartCount}
                                </button>
                                <button className="cursor-pointer" onClick={() => handleBoardModalOpen(board.bno)}>
                                    💬 {board.replyCount}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div>
                    <PageComponent serverData={serverData} movePage={moveToBoardList}/>
                </div>

                <BoardInfoModal
                    isOpen={isBoardInfoModalOpen !== null}
                    onClose={() => setIsBoardInfoModalOpen(null)}
                    bno={isBoardInfoModalOpen}
                    onModify={handleModifyBoard}
                    onDelete={handleDeleteBoard}
                />

                <BoardModal
                    isOpen={isBoardModalOpen !== null}
                    onClose={() => setIsBoardModalOpen(null)}
                    bno={isBoardModalOpen}
                />

                <ModifyModal
                    isOpen={isModifyModalOpen !== null}
                    onClose={() => closeModifyModal()}
                    bno={isModifyModalOpen}
                />

            </div>
        </div>
    );
};

export default ListComponent;
