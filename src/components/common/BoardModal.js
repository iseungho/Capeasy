import React, { useMemo, useEffect, useState } from "react";

import { getBoard } from "../../api/boardApi";
import { postReply, getReplyByBno } from "../../api/replyApi";
import useCustomMove from "../../hooks/useCustomMove";
import { getMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/videoApi";

import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

const host = API_SERVER_HOST;

const BoardModal = ({ isOpen, onClose, bno }) => {
    const [newComment, setNewComment] = useState("");
    const { isLogin, loginState } = useCustomLogin();
    const [boardReply, setBoardReply] = useState(null);
    const [boardData, setBoardData] = useState(null); // 게시글 데이터를 저장할 상태
    const [fetching, setFetching] = useState(false);

    const { refresh } = useCustomMove();

    useEffect(() => {
        const fetchBoardData = async () => {
            console.log(bno);
            try {
                const boardData = await getBoard(bno);
                setBoardData(boardData);
            } catch (error) {
                console.error("Error fetching board data:", error);
            }
        };

        // 댓글 데이터를 비동기적으로 로드
        const fetchReplyData = async () => {
            setFetching(true);
            try {
                const responseData = await getReplyByBno(bno);
                setBoardReply(responseData);
            } catch (error) {
                console.error("Error fetching reply data:", error);
            } finally {
                setFetching(false);
            }
        };

        if (isOpen) {
            fetchBoardData(); // 게시글 데이터 로드
            fetchReplyData(); // 댓글 데이터 로드
        }
    }, [isOpen, bno, refresh]);

    const projection = useMemo(() => {
        if (boardData && boardData.ino) {
            return new EquirectProjection({
                src: `${host}/api/images/view/${boardData.ino}`,
            });
        }
        return null;
    }, [boardData]);

    const controlBar = useMemo(
        () =>
            new ControlBar({
                FullscreenButton: true,
            }),
        []
    );

    if (!isOpen) return null;

    const confirmClose = () => {
        onClose();
    };

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
                            {boardData ? boardData.writerNickname : "Loading..."}
                        </h2>
                    </div>


                    {/* 게시글 데이터 렌더링 */}
                    {projection ? (
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
                    <h1 className="text-2xl font-bold mt-2 mb-2 pl-2 text-gray-800">
                        {boardData ? boardData.title : "Loading..."}
                    </h1>

                    <p className="text-gray-700 pl-2 mb-4 text-lg leading-relaxed">
                        {boardData ? boardData.content : "Loading..."}
                    </p>
                </div>

                {/* 댓글 창 (오른쪽) */}
                <div className="w-1/3 border-l p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        댓글
                    </h3>
                    {boardReply && boardReply.length > 0 ? (
                        <ul className="space-y-4">
                            {boardReply.map((reply) => (
                                <li key={reply.replierNickname}>
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
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition duration-200"
                    onClick={confirmClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default BoardModal;
