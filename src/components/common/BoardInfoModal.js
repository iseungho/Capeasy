import React from "react";

const BoardInfoModal = ({ isOpen, onClose, bno, onModify, onDelete }) => {
    if (!isOpen) return null;

    const confirmClose = () => {
        onClose(); // 모달을 닫는 함수
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
            onClick={confirmClose}  // 배경 클릭 시 모달 닫기
        >
            <div className="bg-white p-6 rounded-lg shadow-xl w-64 relative">
                <ul className="py-2">
                    <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => onModify(bno)}
                    >
                        글 수정
                    </li>
                    <li
                        className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                        onClick={() => onDelete(bno)}
                    >
                        삭제
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BoardInfoModal;
