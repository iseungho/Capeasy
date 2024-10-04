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
    else{
      alert("작성이 완료되었습니다! 마이페이지에서 확인해주세요.");

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

  const confirmClose = () => {
    if (window.confirm("진행상황이 저장되지 않습니다. 정말로 닫으시겠습니까?")) {
      setTitle(""); // 제목 초기화
      setContent(""); // 내용 초기화
      onClose();
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

        <div
            className="fixed inset-0 left-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
        >
          <div
              className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4" onClick={confirmClose}>
              <span className="text-3xl font-bold text-gray-400 hover:text-gray-600">&times;</span>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-black">글 작성</h2>
            </div>

            {/* 제목 입력 폼 */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="title">
                제목
              </label>
              <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="제목을 입력하세요."
              />
            </div>

            {/* 내용 입력 폼 */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="content">
                내용
              </label>
              <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none  resize-none focus:ring-2 focus:ring-black"
                  rows="8 "
                  placeholder="내용을 입력하세요."
              />
            </div>
            {/* 버튼들 */}
            <div className="flex justify-end">
              <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition mr-2"
                  onClick={confirmClose}
              >
                취소
              </button>
              <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
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