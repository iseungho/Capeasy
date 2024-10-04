import React, { useEffect, useState } from 'react';
import { getBoard, putBoard } from "../../api/boardApi"; // 게시글 조회 및 수정 API 호출
import useCustomLogin from "../../hooks/useCustomLogin"; // 로그인 상태 훅

const ModifyModal = ({ isOpen, onClose, bno }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginState } = useCustomLogin(); // 로그인 상태 정보

  useEffect(() => {
    if (isOpen && bno) {
      setLoading(true);
      getBoard(bno)
          .then((boardData) => {
            setTitle(boardData.title);
            setContent(boardData.content);
          })
          .catch((error) => {
            console.error("Error fetching board data:", error);
            alert("게시글 정보를 불러오는 중 오류가 발생했습니다.");
          })
          .finally(() => {
            setLoading(false);
          });
    }
  }, [isOpen, bno]);

  if (!isOpen) return null; // 모달이 열리지 않은 상태에서는 렌더링하지 않음

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const updatedBoardData = {
      title,
      content,
      bno, // 게시글 번호
      writerId: loginState.mno, // 작성자 ID
      writerEmail: loginState.email, // 작성자 이메일
      writerNickname: loginState.nickname // 작성자 닉네임
    };

    try {
      await putBoard(bno, updatedBoardData);
      alert("게시글이 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error updating board:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  const confirmClose = () => {
    if (window.confirm("수정한 내용을 저장하지 않고 나가시겠습니까?")) {
      onClose();
    }
  };

  return (
      <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      >
        <div
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-4 right-4" onClick={confirmClose}>
            <span className="text-3xl font-bold text-gray-400 hover:text-gray-600">&times;</span>
          </button>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black">게시글 수정</h2>
          </div>

          {loading ? (
              <div className="text-center">
                <p className="text-gray-500">로딩 중...</p>
              </div>
          ) : (
              <>
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
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="content">
                    내용
                  </label>
                  <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none resize-none focus:ring-2 focus:ring-black"
                      rows="7"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                      onClick={confirmClose}
                  >
                    취소
                  </button>
                  <button
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                      onClick={handleSubmit}
                  >
                    수정
                  </button>
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default ModifyModal;