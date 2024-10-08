import React, { useMemo, useEffect, useState, useRef } from "react";
import { getBoard } from "../../api/boardApi";
import { postReply, getReplyByBno, putReply, deleteReply } from "../../api/replyApi";
import { postHearts, deleteHeart, findHnoByMnoBno } from "../../api/heartApi";
import { getImage } from "../../api/imageApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import View360, { EquirectProjection, ControlBar } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

const BoardModal = ({ isOpen, onClose, bno }) => {
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null); // For editing a comment
    const [commentEditText, setCommentEditText] = useState(""); // Temporary state for edited text
    const { isLogin, loginState } = useCustomLogin();
    const [boardReply, setBoardReply] = useState(null);
    const [boardData, setBoardData] = useState(null);
    const [projection, setProjection] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [liked, setLiked] = useState(false);

    const { refresh, setRefresh, moveToMyPage } = useCustomMove();

    const modalRef = useRef(null); // Create a ref for the modal

    // Fetch board data when modal opens
    useEffect(() => {
        const fetchBoardData = async () => {
            if (!isOpen) return;
            setFetching(true);
            try {
                const boardData = await getBoard(bno);
                setBoardData(boardData);
            } catch (error) {
                console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchBoardData();
    }, [isOpen, bno, refresh]);

    // Fetch replies and liked data
    useEffect(() => {
        const fetchReplyData = async () => {
            if (!isOpen || !boardData) return; // Stop fetching if modal is not open or no board data
            setFetching(true);
            try {
                const responseData = await getReplyByBno(bno);
                setBoardReply(responseData);
            } catch (error) {
                console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setFetching(false);
            }
        };

        const fetchLikedData = async () => {
            if (!isOpen || !boardData) return; // Stop fetching if modal is not open or no board data
            try {
                const likedUsers = await findHnoByMnoBno(loginState.mno, bno);
                setLiked(likedUsers);
            } catch (error) {
                console.error("좋아요 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchReplyData();
        fetchLikedData();
    }, [isOpen, boardData, bno, loginState.mno]);

    // Load image after board data is ready
    useEffect(() => {
        const loadImage = async () => {
            if (!boardData?.ino) return; // Stop loading if no board data or ino
            try {
                const image = await getImage(boardData.ino);
                const base64Data = image.fileContent;
                const blobUrl = createBase64DataToBlob(base64Data);
                setProjection(new EquirectProjection({ src: blobUrl }));
            } catch (error) {
                console.error('이미지를 불러오는 중 오류 발생:', error);
            }
        };

        loadImage();
    }, [boardData]);

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

    const controlBar = useMemo(() => new ControlBar({ FullscreenButton: true }), []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Close modal if click is outside
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleAddComment = () => {
        if (!isLogin) {
            alert("로그인 후 사용하실 수 있습니다.");
        } else if (newComment.trim() !== "") {
            postReply({
                bno: bno,
                replierId: loginState.mno,
                content: newComment,
            });
            setNewComment("");
            setRefresh(!refresh);
        }
    };

    const handleLikeToggle = async (bno) => {
        if (!isLogin) {
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

    const handleEditClick = (reply) => {
        setEditingComment(reply.rno);
        setCommentEditText(reply.content);
    };

    const handleDeleteClick = async (replyId) => {
        try {
            await deleteReply(replyId);
            setRefresh(!refresh); // Refresh comments after deletion
        } catch (error) {
            console.error("댓글 삭제 중 오류 발생:", error);
        }
    };

    const handleUpdateComment = async (replyId) => {
        try {
            await putReply(replyId, commentEditText);
            setEditingComment(null);
            setRefresh(!refresh); // Refresh comments after update
        } catch (error) {
            console.error("댓글 수정 중 오류 발생:", error);
        }
    };

    const handleMoveMypage = async (mno) => {
        onClose();
        moveToMyPage(mno);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <button
                onClick={onClose}
                className="absolute top-0 right-2 text-5xl text-gray-600 transition transform"
            >
                &times;
            </button>
            <div ref={modalRef} className="bg-white w-4/5 h-5/6 rounded-lg shadow-lg flex relative overflow-hidden flex-col md:flex-row">
                {/* 게시글 내용 (왼쪽) */}
                <div className="flex-1 flex flex-col md:w-5/6">

                    {/* 게시글 데이터 렌더링 */}
                    {fetching ? (
                        <p className="mb-4 text-center text-gray-500">게시글 로딩 중...</p>
                    ) : projection ? (
                        <View360
                            className="is-16by9"
                            autoplay={true}
                            projection={projection}
                            plugins={[controlBar]}
                            style={{ width: "100%", height: "100%" }}
                        />
                    ) : (
                        <p className="mb-4 text-center text-gray-500">이미지 로딩 중...</p>
                    )}
                </div>

                {/* 댓글 창 (오른쪽) */}
                <div className="w-full md:w-1/3 p-5 flex flex-col overflow-y-auto">
                    <div className="flex items-center mb-4" onClick={() => handleMoveMypage(boardData.writerId)}>
                        <div className="bg-profile-image bg-cover w-12 h-12 rounded-full mr-4" />
                        <h2 className="text-lg font-semibold text-gray-600">
                            {boardData ? boardData.writerNickname : "로딩 중..."}
                        </h2>
                    </div>
                    {boardData && !fetching ? (
                        <>
                            <h1 className="text-2xl font-bold mt-2 mb-2 text-gray-800">
                                {boardData.title}
                            </h1>
                            <p className="text-gray-700 mb-2 text-lg leading-relaxed">
                                {boardData.content}
                            </p>
                            <button
                                className="cursor-pointer self-start mb-2"
                                onClick={() => handleLikeToggle(bno)}
                            >
                                {liked ? "❤️" : "🤍"} 좋아요 {boardData.heartCount}개
                            </button>

                        </>
                    ) : (
                        !fetching && <p>게시글을 불러오는 중입니다...</p>
                    )}
                    {/* 댓글 목록 영역 */}
                    <div className="flex-grow h-max mb-4">
                        {fetching ? (
                            <p className="text-gray-500">댓글 로딩 중...</p>
                        ) : (
                            <>
                                {boardReply && boardReply.length > 0 ? (
                                    <ul className="space-y-3">
                                        {boardReply.map((reply) => (
                                            <div key={reply.rno} className="relative group">
                                                {editingComment === reply.rno ? (
                                                    <div
                                                        className="flex p-2 bg-gray-100 rounded-lg items-start justify-between">
                                                        <input
                                                            type="text"
                                                            value={commentEditText}
                                                            onChange={(e) => setCommentEditText(e.target.value)}
                                                            className="w-5/6 bg-gray-100 px-2 py-1 focus:outline-none focus:cursor-text cursor-pointer"
                                                        />
                                                        <div className="flex justify-center w-1/6">
                                                            <button
                                                                className="p-1"
                                                                onClick={() => handleUpdateComment(reply.rno)}
                                                            >
                                                                저장
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <li key={reply.rno}
                                                        className="p-2 bg-gray-100 rounded-lg flex items-start justify-between">
                                                        <div>
                                                            <div className="font-medium text-gray-700">
                                                                {reply.replierNickname}
                                                            </div>
                                                            <p className="text-gray-600 text-sm">{reply.content}</p>
                                                        </div>
                                                        {/* 현재 유저가 작성한 댓글일 때만 ... 버튼 노출 */}
                                                        {reply.replierId === loginState.mno && (
                                                            <div>
                                                                <button
                                                                    onClick={() => handleEditClick(reply)}
                                                                    className="ml-2 cursor-pointer text-gray-400 self-start text-xs underline"
                                                                >
                                                                    수정
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteClick(reply.rno)}
                                                                    className="ml-1 cursor-pointer text-gray-400 self-start text-xs underline"
                                                                >
                                                                    삭제
                                                                </button>
                                                            </div>
                                                        )}
                                                    </li>
                                                )}
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>댓글이 없습니다.</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* 댓글 입력란 */}
                    <div className="flex items-center">
                        <textarea
                            className="flex-grow p-3 border border-gray-300 rounded-md resize-none"
                            placeholder="댓글을 입력하세요..."
                            value={newComment}
                            onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                    setNewComment(e.target.value);
                                } else {
                                    alert("댓글은 100자까지 입력이 가능합니다!")
                                }
                            }}
                            rows={1}
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        />
                        <button
                            className="ml-2 p-2"
                            onClick={handleAddComment}
                        >
                            입력
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardModal;
