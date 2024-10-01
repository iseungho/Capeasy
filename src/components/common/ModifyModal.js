import React, { useEffect, useState } from 'react';
import { getBoard, putBoard } from "../../api/boardApi"; // 게시글 조회 및 수정 API 호출
import useCustomLogin from "../../hooks/useCustomLogin"; // 로그인 상태 훅
import useCustomMove from "../../hooks/useCustomMove";

const ModifyModal = ({ isOpen, onClose, bno }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { loginState } = useCustomLogin(); // 로그인 상태 정보
  const { refresh, setRefresh } = useCustomMove();

  useEffect(() => {
      // 모달이 열릴 때만 데이터 불러오기
      if (isOpen && bno) {
          setLoading(true);
      // 게시글 정보를 가져옴
      getBoard(bno)
        .then((boardData) => {
          setTitle(boardData.title);
          console.log(boardData.title);
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
      // 서버에 수정된 게시글 데이터를 보내기
      await putBoard(bno, updatedBoardData);
      alert("게시글이 수정되었습니다.");
      setRefresh(!refresh)
      // 수정 완료 후 모달 닫기
      onClose();
    } catch (error) {
      console.error("Error updating board:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">글 수정</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
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
