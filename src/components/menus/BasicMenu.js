import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../member/LoginModal";
import MemberInfoModal from "../common/MemberInfoModal";
import useCustomMove from "../../hooks/useCustomMove";

const BasicMenu = ({ children }) => {
  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout, moveToPath } = useCustomLogin();
  const { moveToMain, moveToBoardList } = useCustomMove();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberInfoOpen, setIsMemberInfoOpen] = useState(false);
  const [memberInfoPosition, setMemberInfoPosition] = useState({
    top: 0,
    left: 0,
  });

  const profileButtonRef = useRef(null); // Ref for the profile button

  const handleLogout = useCallback(() => {
    doLogout();
    alert("정상적으로 로그아웃되었습니다!");
    moveToPath("/");
  }, [doLogout, moveToPath]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openMemberInfo = () => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      const modalWidth = 200; // Set this to the actual width of your modal
      const buttonCenterX = rect.left + rect.width / 2;
      setMemberInfoPosition({
        top: rect.bottom + window.scrollY, // Position below the button
        left: buttonCenterX - modalWidth / 2 + window.scrollX, // Center the modal horizontally
      });
    }
    setIsMemberInfoOpen(true);
  };

  const closeMemberInfo = () => setIsMemberInfoOpen(false);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target) &&
        !event.target.closest(".member-info-modal")
      ) {
        closeMemberInfo();
      }
    };
    if (isMemberInfoOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMemberInfoOpen]);

  return (
    <div>
      <nav id="navbar" className="fixed w-full top-0 left-0 z-50 bg-white shadow">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div
              className="bg-logo-image bg-cover w-48 h-16 font-bold text-blue-500"
              onClick={moveToMain}
            ></div>
            <button className="text-gray-500 font-semibold text-xl" onClick={moveToBoardList}>
              Community
            </button>
          </div>

          <nav className="space-x-4 flex items-center">
            {!loginState.email ? (
              <>
                <button
                  className="bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 w-32 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-lg"
                  onClick={openLoginModal}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  ref={profileButtonRef} // Ref to track the button position
                  className="bg-profile-image bg-cover w-14 h-14 rounded-full cursor-pointer"
                  onClick={openMemberInfo}
                />
                {isMemberInfoOpen && (
                  <MemberInfoModal
                    isOpen={isMemberInfoOpen}
                    onClose={closeMemberInfo}
                    profileImage={loginState.profileImage}
                    onLogout={handleLogout}
                    position={memberInfoPosition} // Pass position to the modal
                  />
                )}
              </>
            )}
          </nav>
        </div>
      </nav>
      {children}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default BasicMenu;
