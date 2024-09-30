import React, { useState } from 'react';
import { postBoard } from "../../api/boardApi"; // 게시글 API 호출
import useCustomLogin from "../../hooks/useCustomLogin"; // 로그인 상태 훅
import BoardModal from '../board/BoardModal'; // BoardModal을 가져옵니다

const WriteModal = ({ isOpen, onClose, ino }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false); // BoardModal을 제어하는 상태
  const [newBoardNo, setNewBoardNo] = useState(null); // 새로 작성된 게시글 번호를 저장할 상태

  const { loginState } = useCustomLogin(); // 로그인 상태 정보

  if (!isOpen) return null; // 모달이 열리지 않은 상태에서는 렌더링하지 않음

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // 작성된 데이터를 업데이트
    const newBoardData = {
      title,
      content,
      ino, // 이미지 번호
      writerId: loginState.mno, // 작성자 ID (로그인된 사용자 정보에서 가져옴)
      writerEmail: loginState.email, // 작성자 이메일
      writerNickname: loginState.nickname // 작성자 닉네임
    };

    try {
      // 서버에 게시글 데이터를 보내기
      const postedBoard = await postBoard(newBoardData);

      // 작성된 게시글 번호 저장
      setNewBoardNo(postedBoard.bno);

      // 제출 후 상태 초기화
      setTitle("");
      setContent("");

      // BoardModal을 열기 위한 상태 업데이트
      setIsBoardModalOpen(true);

      // WriteModal 닫기
      onClose();
    } catch (error) {
      console.error("Error posting board:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {isBoardModalOpen && (
        <BoardModal
          isOpen={isBoardModalOpen}
          onClose={() => setIsBoardModalOpen(false)}
          bno={newBoardNo} // 새로 작성된 게시글 번호 전달
        />
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">글 작성</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteModal;
