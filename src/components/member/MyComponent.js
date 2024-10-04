import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";
import PageComponent from "../common/PageComponent";
import { getBoardListByMno } from "../../api/boardApi";
import { getImage } from "../../api/imageApi";
import useCustomMove from "../../hooks/useCustomMove";
import BoardModal from "../board/BoardModal";

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
    current: 0
};

const MyComponent = () => {
    const { page, size, refresh, moveToMyPage } = useCustomMove();
    const { moveToModify } = useCustomLogin();
    const [myBoardList, setMyBoardList] = useState(myBoardListInitState);
    const [fetching, setFetching] = useState(false);
    const { isLogin, loginState } = useCustomLogin();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(null);
    const navigate = useNavigate();
    const [imageMap, setImageMap] = useState({}); // 각 게시글 이미지 상태

    const loadThumbnail = useCallback(async (ino) => {
        try {
            const image = await getImage(ino);
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
        const fetchData = async () => {
            if (!loginState.mno) return;
            setFetching(true);
            try {
                const data = await getBoardListByMno({ page, size }, loginState.mno);
                setMyBoardList(data); // 데이터를 먼저 업데이트

                // 각 게시글의 이미지 불러오기
                const newImageMap = {};
                for (const myBoard of data.dtoList) {  // 데이터를 직접 사용
                    const image = await loadThumbnail(myBoard.ino);
                    newImageMap[myBoard.bno] = image;
                }
                setImageMap(newImageMap);
            } catch (error) {
                console.error("Error fetching board data:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [page, size, refresh, loginState.mno, loadThumbnail]); // 종속성 배열에서 myBoardList.dtoList 제거

    const moveMain = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const openLoginModal = () => setIsLoginModalOpen(true);

    const openBoardModal = (bno) => {
        setIsBoardModalOpen(isBoardModalOpen === bno ? null : bno);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        moveMain();
    };

    useEffect(() => {
        if (!isLogin) {
            openLoginModal();
        }
    }, [isLogin]);

    if (!isLogin) {
        return <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />;
    }

    return (
        <div className="h-screen w-screen overflow-auto"> {/* 전체 화면에 스크롤이 생기도록 수정 */}
            <div className="p-5 max-w-7xl mx-auto mt-32"> {/* 내부 콘텐츠에서 스크롤을 허용 */}
                {/* Upper User Info */}
                <div className="flex items-center mb-8 border-b pb-4 border-gray-300 justify-between">
                    <div className="flex items-center">
                        <button
                            className="bg-profile-image bg-cover w-24 h-24 rounded-full mr-5"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{loginState.nickname}</h2>
                            <p className="text-gray-600">{loginState.email}</p>
                        </div>
                    </div>
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition-colors"
                        onClick={moveToModify}>
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
                            {myBoardList.dtoList.map(board => (
                                <div
                                    key={board.bno}
                                    className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                                    onClick={() => openBoardModal(board.bno)}
                                >
                                    <img
                                        className="w-full h-auto mb-3 cursor-pointer object-cover"
                                        style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
                                        src={imageMap[board.bno]}
                                        alt="Board Thumbnail"
                                    />
                                    <p className="p-4 text-center text-gray-800 font-medium">{board.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <PageComponent serverData={myBoardList} movePage={moveToMyPage}/>

                <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal}/>

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
