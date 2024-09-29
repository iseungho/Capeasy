import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";

import { getBoardListByMno } from "../../api/boardApi";
import { getThumbnail } from "../../api/imageApi";  // 이미지 API 가져오기
import useCustomMove from "../../hooks/useCustomMove";

const myBoardListInitState = {
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

const MyComponent = () => {
    const { mypage, mysize, refresh } = useCustomMove();
    const [myBoardList, setMyBoardList] = useState(myBoardListInitState);
    const [fetching, setFetching] = useState(false);
    const { isLogin, loginState } = useCustomLogin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [thumbnails, setThumbnails] = useState({}); // 썸네일 상태 추가

    // 게시글 목록 불러오기
    useEffect(() => {
        const fetchData = async () => {
            if (!loginState.mno) return; // 로그인된 사용자의 MNO가 없으면 중단
            setFetching(true);
            try {
                const responseData = await getBoardListByMno({ page: mypage, size: mysize }, loginState.mno);
                setMyBoardList({
                    ...myBoardListInitState,
                    boardList: responseData.dtoList || []  // 게시글 목록 설정
                });

                // 게시글 썸네일 불러오기
                const thumbnailPromises = responseData.dtoList.map(async (board) => {
                    if (board.imageIno) {
                        try {
                            const thumbnailUrl = await getThumbnail(board.imageIno);
                            return { bno: board.bno, thumbnailUrl: thumbnailUrl || "" };
                        } catch (error) {
                            console.error(`Error fetching thumbnail for board ${board.bno}:`, error);
                            return { bno: board.bno, thumbnailUrl: "" };
                        }
                    } else {
                        return { bno: board.bno, thumbnailUrl: "" };
                    }
                });

                const thumbnailResults = await Promise.all(thumbnailPromises);
                const thumbnailMap = {};
                thumbnailResults.forEach(({ bno, thumbnailUrl }) => {
                    thumbnailMap[bno] = thumbnailUrl;
                });
                setThumbnails(thumbnailMap); // 썸네일 상태 업데이트

            } catch (error) {
                console.error("Error fetching board data:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [mypage, mysize, refresh, loginState.mno]);

    // 메인 페이지로 이동하는 함수
    const moveMain = useCallback(() => {
        navigate('/');
    }, [navigate]);

    // 모달 열기 및 닫기 함수
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        moveMain();
    };

    // 로그인 여부에 따라 모달을 여는 로직
    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin]);

    // 로그인되지 않았을 때 모달만 보여주기
    if (!isLogin) {
        return <LoginModal isOpen={isModalOpen} onClose={closeModal} />;
    }

    return (
        <div className="p-5 max-w-7xl mx-auto">
            {/* 상단 유저 정보 */}
            <div className="flex items-center mb-8 border-b pb-4 border-gray-300">
                <img
                    className="w-24 h-24 rounded-full mr-5"
                    src="https://via.placeholder.com/150"
                    alt="User Avatar"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{loginState.nickname}</h2>
                    <p className="text-gray-600">{loginState.email}</p>
                </div>
            </div>

            {/* 자신이 작성한 게시글 목록 */}
            <div>
                <h3 className="text-xl font-medium mb-4">내 게시글</h3>
                {fetching ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myBoardList.boardList.length === 0 ? (
                            <p>작성한 게시글이 없습니다.</p>
                        ) : (
                            myBoardList.boardList.map(board => (
                                <div key={board.bno} className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
                                    <img
                                        className="w-full h-44 object-cover"
                                        src={thumbnails[board.bno]}
                                        alt="Board Thumbnail"
                                    />
                                    <p className="p-4 text-center text-gray-800">{board.title}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* LoginModal */}
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default MyComponent;
