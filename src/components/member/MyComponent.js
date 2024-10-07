import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";
import PageComponent from "../common/PageComponent";
import { getBoardListByMno } from "../../api/boardApi";
import { getThumbnail } from "../../api/imageApi";
import useCustomMove from "../../hooks/useCustomMove";
import BoardModal from "../board/BoardModal";
import { getMember } from "../../api/memberApi";

const myBoardListInitState = {
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
    writerMno: 0,
};

const MyComponent = ({mno}) => {
    const { page, size, refresh, moveToMyPage } = useCustomMove();
    const { moveToModify } = useCustomLogin();
    const [myBoardList, setMyBoardList] = useState(myBoardListInitState);
    const [fetching, setFetching] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(null);
    const navigate = useNavigate();
    const [imageMap, setImageMap] = useState({});
    const [memberData, setMemberData] = useState(null);

    const loadThumbnail = useCallback(async (ino) => {
        try {
            const image = await getThumbnail(ino);
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
        const fetchMemberData = async () => {
            if (!mno) return;
            try {
                setFetching(true);
                const memberData = await getMember(mno);
                setMemberData(memberData);
            } catch (error) {
                console.error("Error fetching member data:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchMemberData();
    }, [mno]);

    useEffect(() => {
        const fetchBoardAndImages = async () => {
            if (!memberData || !memberData.mno) return;

            setFetching(true);
            try {
                const boardData = await getBoardListByMno({ page, size }, memberData.mno);
                boardData.writerMno = memberData.mno;
                setMyBoardList(boardData);

                // Fetch all images concurrently
                const newImageMap = {};
                await Promise.all(
                    boardData.dtoList.map(async (board) => {
                        const image = await loadThumbnail(board.ino);
                        newImageMap[board.bno] = image;
                    })
                );
                setImageMap(newImageMap);
            } catch (error) {
                console.error("Error fetching board or images:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchBoardAndImages();
    }, [memberData, page, size, refresh, loadThumbnail]);

    const moveMain = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const openBoardModal = (bno) => {
        setIsBoardModalOpen(isBoardModalOpen === bno ? null : bno);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        moveMain();
    };

    return (
        <div className="h-screen w-screen overflow-auto">
            <div className="p-5 max-w-7xl mx-auto mt-32">
                {/* Upper User Info */}
                <div className="flex items-center mb-8 border-b pb-4 border-gray-300 justify-between">
                    <div className="flex items-center">
                        <button className="bg-profile-image bg-cover w-24 h-24 rounded-full mr-5" />
                        <div>
                            <h2 className="text-2xl font-semibold">{memberData?.nickname}</h2>
                            <p className="text-gray-600">{memberData?.email}</p>
                        </div>
                    </div>
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition-colors"
                        onClick={moveToModify}
                    >
                        회원정보 수정
                    </button>
                </div>

                {/* Board List */}
                <div>
                    <h3 className="text-xl font-medium mb-4">내 게시글</h3>
                    {fetching ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {myBoardList.dtoList.map((board) => (
                                <div
                                    key={board.bno}
                                    className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                                    onClick={() => openBoardModal(board.bno)}
                                >
                                    <img
                                        className="w-full h-auto mb-3 cursor-pointer object-cover"
                                        style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                                        src={imageMap[board.bno]}
                                        alt="Board Thumbnail"
                                    />
                                    <p className="p-4 text-center text-gray-800 font-medium">
                                        {board.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <PageComponent serverData={myBoardList} movePage={moveToMyPage} />

                <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

                <BoardModal
                    isOpen={isBoardModalOpen !== null}
                    onClose={() => setIsBoardModalOpen(null)}
                    bno={isBoardModalOpen}
                />
            </div>
        </div>
    );
};

export default MyComponent;
