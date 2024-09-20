// components/HowToUseModal.js

import React from "react";
import useCustomMove from "../../hooks/useCustomMove";

function HowToUseModal({ onClose }) {
  const { moveToCreate } = useCustomMove();
  const handleButtonClick = () => {
    onClose();
    moveToCreate();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-auto h-auto">
        <h2 className="text-2xl font-semibold mb-6">사용 방법</h2>
        <p className="mb-4">
          동영상 촬영을 시작하고 모든 공간이 담기도록 360°로 돌며 찍어주세요.
        </p>
        <p className="text-sm text-gray-700 mb-4">
          💡광각 카메라나 0.5배율로 촬영하면 더 높은 품질을 얻을 수 있어요.
        </p>
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

export default HowToUseModal;
