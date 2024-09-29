import React, { useRef, useState, useEffect } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { postVideo } from "../../api/videoApi";
import HowToUseModal from "./HowToUseModal";
import ErrorModal from "./ErrorModal";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";

function CreateComponent(props) {
  const fileInputRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowModal] = useState(false);
  const [showHowToUseModal, setShowHowToUseModal] = useState(true);

  const [isActive, setActive] = useState(false);
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);

  const { moveToWait } = useCustomMove();
  const loginInfo = useSelector(state => state.loginSlice);

  useEffect(() => {
    if (selectedFile) {
      const videoUrl = URL.createObjectURL(selectedFile);
      setVideoSrc(videoUrl);

      return () => {
        URL.revokeObjectURL(videoUrl);
      };
    }
  }, [selectedFile]);

  const resetFileInput = () => {
    setSelectedFile(null);
    setVideoSrc(null);
    setError(null);
    fileInputRef.current.value = null;
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadAnotherClick = () => {
    resetFileInput();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setSelectedFile(file);
      } else {
        setError("영상만 업로드 가능합니다.");
        setShowModal(true);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      setError("영상만 업로드 가능합니다.");
      setShowModal(true);
    }
  };

  const handleClickNext = () => {
    if (selectedFile) {
      setIsLoading(true);
      setError(null);

      postVideo(selectedFile, loginInfo.mno)
          .then((data) => {
            console.log(data);
            setIsLoading(false);
            resetFileInput();
            moveToWait(data);
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error.message + "로 인해 실패했습니다. 다시 시도해주세요!");
            setShowModal(true);
          });
    } else {
      setError("선택된 파일이 없습니다.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
  };

  const closeHowToUseModal = () => {
    setShowHowToUseModal(false);
  };

  return (
      <section className="bg-gray-100 bg-cover min-h-screen flex flex-col items-center justify-center">
        {!selectedFile ? (
            <div
                onClick={handleButtonClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragStart}
                onDragLeave={handleDragEnd}
                className={`w-[50vw] h-[50vh] rounded-3xl border-green-200 border-2 shadow-lg
                    ${isActive ? "bg-gray-200" : "bg-white"}
                    flex items-center justify-center
                    text-green-500 text-lg font-semibold hover:bg-gray-200 hover:shadow-lg transition-shadow`}
            >
              <span>클릭 혹은 드래그해서 영상을 올려주세요.</span>
            </div>
        ) : (
            <div className="w-[60vw] h-[60vh] relative">
              <video
                  src={videoSrc}
                  controls
                  className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
        )}
        <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
        />
        {selectedFile && (
            <div className="flex flex-row gap-4 mt-4">
              <button
                  onClick={handleUploadAnotherClick}
                  className="bg-blue-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 flex-1 shadow-md hover:shadow-lg transition-shadow"
                  style={{ width: "180px", height: "56px" }}
              >
                영상 변경하기
              </button>
              <button
                  onClick={handleClickNext}
                  className="bg-green-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 flex-1 shadow-md hover:shadow-lg transition-shadow"
                  style={{ width: "180px", height: "56px" }}
                  disabled={isLoading}
              >
                {isLoading ? (
                    <BeatLoader color="#ffffff" size={10} />
                ) : (
                    "추억 제작하기"
                )}
              </button>
            </div>
        )}

        {showErrorModal && error && (
            <ErrorModal message={error} onClose={closeModal} />
        )}

        {showHowToUseModal && <HowToUseModal onClose={closeHowToUseModal} />}
      </section>
  );
}

export default CreateComponent;
