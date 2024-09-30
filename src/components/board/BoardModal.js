import React, { useMemo, useEffect, useState } from "react";

import { getBoard } from "../../api/boardApi";
import { postReply, getReplyByBno } from "../../api/replyApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getImage } from "../../api/imageApi";
import { postHearts, deleteHeart, findHnoByMnoBno } from "../../api/heartApi";

import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

const BoardModal = ({ isOpen, onClose, bno }) => {
    const [newComment, setNewComment] = useState("");
    const { isLogin, loginState } = useCustomLogin();
    const [boardReply, setBoardReply] = useState(null);
    const [boardData, setBoardData] = useState(null);
    const [projection, setProjection] = useState(null);
    const [fetching, setFetching] = useState(false); // fetching 상태 관리
    const [liked, setLiked] = useState(false);

    const { refresh, setRefresh } = useCustomMove();

    // 모달이 열렸을 때 게시글 데이터를 가져옵니다.
    useEffect(() => {
        const fetchBoardData = async () => {
            setFetching(true); // 로딩 시작
            try {
                const boardData = await getBoard(bno);
                setBoardData(boardData);
            } catch (error) {
                console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setFetching(false); // 로딩 종료
            }
        };

        if (isOpen) {
            fetchBoardData();
        }
    }, [isOpen, bno, refresh]);

    // 게시글 데이터가 로드된 후 댓글 및 좋아요 상태를 가져옵니다.
    useEffect(() => {
        const fetchReplyData = async () => {
            setFetching(true); // 로딩 시작
            try {
                const responseData = await getReplyByBno(bno);
                setBoardReply(responseData);
            } catch (error) {
                console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setFetching(false); // 로딩 종료
            }
        };

        const fetchLikedData = async () => {
            try {
                const likedUsers = await findHnoByMnoBno(loginState.mno, bno);

                setLiked(likedUsers);
            } catch (error) {
                console.error("좋아요 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        
        

        if (isOpen && boardData) {
            fetchReplyData();
            fetchLikedData();
        }
    }, [isOpen, boardData, bno, loginState.mno]);

    // 게시글 데이터가 로드된 후 이미지를 불러옵니다.
    useEffect(() => {
        const loadImage = async () => {
            try {
                const image = await getImage(boardData.ino); // JSON 형식의 응답 받기
                const base64Data = image.fileContent; // JSON 응답에서 base64 문자열을 가져옵니다.
                const blobUrl = createBase64DataToBlob(base64Data); // Blob URL 생성
                setProjection(new EquirectProjection({ src: blobUrl })); // EquirectProjection에 Blob URL 설정
            } catch (error) {
                console.error('이미지를 불러오는 중 오류 발생:', error);
            }
        };

        if (boardData?.ino) {
            loadImage();
        }
    }, [boardData]);
    

    // Base64 데이터를 Blob으로 변환하는 함수
    const createBase64DataToBlob = (base64Data) => {
        const byteCharacters = atob(base64Data); // base64 문자열을 디코드
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' }); // 적절한 MIME 타입 설정
        return URL.createObjectURL(blob); // Blob URL로 변환
    };

    // View360 제어바 설정
    const controlBar = useMemo(
        () =>
            new ControlBar({
                FullscreenButton: true,
            }),
        []
    );

    // 모달이 닫혀 있으면 렌더링하지 않음
    if (!isOpen) return null;

    // 모달 닫기 함수
    const confirmClose = () => {
        onClose();
    };

    // 댓글 추가 함수
    const handleAddComment = () => {
        if (!isLogin) {
            alert("로그인 후 사용하실 수 있습니다.");
        } else if (newComment.trim() !== "") {

            console.log(bno, loginState.mno, newComment)
            postReply({
                bno: bno,
                replierId: loginState.mno,
                content: newComment,
            });
            setNewComment("");
        }
        setRefresh(!refresh);
    };

    // 좋아요 토글 함수
    const handleLikeToggle = async (bno) => {
        if (!loginState) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }

        try {
            if (!liked) {
                await postHearts(bno, loginState.mno);
            } else {
                const hno = await findHnoByMnoBno(loginState.mno, bno);
                if (hno) {
                    await deleteHeart(hno);
                }
            }
            setLiked(!liked);
        } catch (error) {
            console.error("좋아요 처리 중 오류 발생:", error);
        } finally {
            setRefresh(!refresh);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-7xl h-[75vh] rounded-lg shadow-lg flex relative">
                {/* 게시글 내용 (왼쪽) */}
                <div className="w-5/6 p-6 flex flex-col">
                    <div className="flex items-center mb-4">
                        <img
                            className="w-12 h-12 rounded-full mr-4"
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                        />
                        <h2 className="text-lg font-semibold text-gray-600">
                            {boardData ? boardData.writerNickname : "로딩 중..."}
                        </h2>
                    </div>

                    {/* 게시글 데이터 렌더링 */}
                    {fetching ? (
                        <p className="mb-4 text-center text-gray-500">게시글 로딩 중...</p>
                    ) : projection ? (
                        <View360
                            className="is-16by9 mb-4 rounded-lg border"
                            autoplay={true}
                            projection={projection}
                            plugins={[controlBar]}
                            style={{ height: "70vh" }}
                        />
                    ) : (
                        <p className="mb-4 text-center text-gray-500">
                            이미지 로딩 중...
                        </p>
                    )}
                    {boardData && !fetching ? (
                        <>
                            <h1 className="text-2xl font-bold mt-2 mb-2 pl-2 text-gray-800">
                                {boardData.title}
                            </h1>
                            <p className="text-gray-700 pl-2 mb-4 text-lg leading-relaxed">
                                {boardData.content}
                            </p>
                            <button
                                className="mr-3 cursor-pointer"
                                onClick={() => handleLikeToggle(bno)}
                            >
                                {liked ? "❤️" : "🤍"} {boardData.heartCount}
                            </button>
                        </>
                    ) : (
                        !fetching && <p>게시글을 불러오는 중입니다...</p>
                    )}
                </div>

                {/* 댓글 창 (오른쪽) */}
                <div className="w-1/3 border-l p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        댓글
                    </h3>
                    {fetching ? (
                        <p className="text-gray-500">댓글 로딩 중...</p>
                    ) : boardReply && boardReply.length > 0 ? (
                        <ul className="space-y-4">
                            {boardReply.map((reply) => (
                                <li key={reply.rno}>
                                    <div className="text-sm font-medium text-gray-700">
                                        {reply.replierNickname}
                                    </div>
                                    <p className="text-gray-600 text-sm">{reply.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">댓글이 없습니다.</p>
                    )}

                    {/* 댓글 추가 UI */}
                    <div className="mt-auto">
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-400"
                            rows="3"
                            placeholder="댓글을 입력하세요..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white w-full py-2 rounded-md font-semibold transition duration-300 hover:bg-blue-600"
                            onClick={handleAddComment}
                        >
                            댓글 달기
                        </button>
                    </div>
                </div>

                {/* 닫기 버튼 */}
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    onClick={confirmClose}
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default BoardModal;
