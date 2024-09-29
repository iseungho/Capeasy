// components/ErrorModal.js

import React from "react";
import useCustomMove from "../../hooks/useCustomMove";

function ErrorModal({ message, onClose }) {
  const { moveToCreate } = useCustomMove();
  const handleButtonClick = () => {
    onClose();
    moveToCreate();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-1/3 h-1/4">
        <h2 className="text-2xl font-semibold mb-6">오류 메세지</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={handleButtonClick}
          className="bg-green-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
