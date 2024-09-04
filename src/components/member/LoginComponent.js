import React, { useState } from "react";
import LoginModal from "./LoginModal";

const LoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
            >
                Login
            </button>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default LoginButton;