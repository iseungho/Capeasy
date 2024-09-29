import React from "react";

const PostInfoModal = ({ isOpen, onClose, copyLink, postId, copied }) => {
    if (!isOpen) return null;

    const confirmClose = () => {
        onClose(); // 모달을 닫는 함수
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
            onClick={confirmClose}  // 배경 클릭 시 모달 닫기
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl w-64 relative"
                onClick={(e) => e.stopPropagation()}  // 내부 클릭 시 이벤트 전파 방지
            >

                <ul className="py-2">
                    <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => copyLink(postId)}
                    >
                        {copied ? "링크 복사됨!" : "링크 복사"}
                    </li>
                    <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => console.log(`Edit post ${postId}`)}
                    >
                        글 수정
                    </li>
                    <li
                        className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                        onClick={() => console.log(`Delete post ${postId}`)}
                    >
                        삭제
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PostInfoModal;
