import React, { useState } from "react";
import WriteModal from "../components/common/WriteModal"; // 글 작성 모달 컴포넌트
import { postBoard } from "../api/boardApi";
import useCustomLogin from "../hooks/useCustomLogin";

const TestPage = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [ino, setIno] = useState(null); // 초기 INO 상태

  const { loginState } = useCustomLogin(); // 로그인 상태

  // 글 작성 버튼 클릭 시 모달 열기
  const handleOpenWriteModal = () => {
    setIsWriteModalOpen(true);
  };

  // 글 작성 완료 시 처리
  const handleSubmitWrite = (data) => {
    const { title, content, ino } = data;

    // 로그인 상태에서 사용자 정보를 가져와서 작성
    const writerId = loginState.mno;
    const writerEmail = loginState.email;
    const writerNickname = loginState.nickname;

    console.log(writerEmail+writerId+writerNickname)

    const boardData = {
      title,
      content,
      ino,
      writerId,
      writerEmail,
      writerNickname
    };

    postBoard(boardData)
      .then(() => {
        console.log("게시글이 성공적으로 작성되었습니다.");
      })
      .catch((error) => {
        console.error("게시글 작성 중 오류 발생:", error);
      });

    // 모달 닫기
    setIsWriteModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">테스트 페이지</h1>

      {/* 글 작성 버튼 */}
      <button
        className="px-6 py-3 mb-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        onClick={handleOpenWriteModal}
      >
        글 작성 버튼
      </button>

      {/* 글 작성 모달 */}
      {isWriteModalOpen && (
        <WriteModal
          isOpen={isWriteModalOpen}
          onClose={() => setIsWriteModalOpen(false)}
          onSubmit={handleSubmitWrite}
          ino={ino} // 초기값으로 전달
        />
      )}
    </div>
  );
};

export default TestPage;
