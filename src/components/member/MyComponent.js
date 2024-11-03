import { useCallback, useState, useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModifyModal from "../common/ModifyModal";
import PageComponent from "../common/PageComponent";
import { deleteBoard, getBoardListByMno } from "../../api/boardApi";
import { getThumbnail } from "../../api/imageApi";
import useCustomMove from "../../hooks/useCustomMove";
import BoardModal from "../board/BoardModal";
import { getMember } from "../../api/memberApi";
import BoardInfoModal from "../common/BoardInfoModal";
import ProfileImageModal from "../common/ProfileImageChangeModal";
import { useProfileContext } from "../../util/profileContext";
import {fetchProfileImage, fetchProfileThumbnail} from "../../util/profileImageUtil";
import { createBase64DataToBlob } from "../../util/imageUtil";

const myBoardListInitState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
    writerMno: 0,
};

const MyComponent = ({ mno }) => {
    const { page, size, refresh, moveToMyPage, setRefresh } = useCustomMove();
    const { moveToModify } = useCustomLogin();
    const [myBoardList, setMyBoardList] = useState(myBoardListInitState);
    const [fetching, setFetching] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(null);
    const [imageMap, setImageMap] = useState({});
    const [memberData, setMemberData] = useState(null);
    const [, setProfileImage] = useState(null);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(null);
    const [isBoardInfoModalOpen, setIsBoardInfoModalOpen] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileThumbnailImage, setProfileThumbnailImage] = useState(null);
    const { loginState } = useCustomLogin();

    const { triggerProfileReload } = useProfileContext();

    const loadProfileImage = useCallback(async () => {
        if (!memberData?.mno) return;
        const thumbnailURL = await fetchProfileThumbnail(mno, setProfileThumbnailImage);
        setProfileImage(thumbnailURL); // 상태에 썸네일 URL 저장
    }, [mno, memberData]);

    const loadThumbnail = useCallback(async (ino) => {
        try {
            const image = await getThumbnail(ino);
            const base64Data = image.fileContent;
            return createBase64DataToBlob(base64Data);
        } catch (error) {
            console.error('Error loading image:', error);
            return null;
        }
    }, []);

    useEffect(() => {
        loadProfileImage();
    }, [loadProfileImage]);

    useEffect(() => {
        const fetchMemberData = async () => {
            if (!mno) return;
            try {
                setFetching(true);
                const memberData = await getMember(mno);
                setMemberData(memberData);
            } catch (error) {
                console.error("Error fetching member data:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchMemberData();
    }, [mno]);

    useEffect(() => {
        const fetchBoardAndImages = async () => {
            if (!memberData || !memberData.mno) return;

            setFetching(true);
            try {
                const boardData = await getBoardListByMno({ page, size }, memberData.mno);
                boardData.writerMno = memberData.mno;
                setMyBoardList(boardData);

                // Fetch all images concurrently
                const newImageMap = {};
                await Promise.all(
                    boardData.dtoList.map(async (board) => {
                        newImageMap[board.bno] = await loadThumbnail(board.ino);
                    })
                );
                setImageMap(newImageMap);
            } catch (error) {
                console.error("Error fetching board or images:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchBoardAndImages();
    }, [memberData, page, size, refresh, loadThumbnail]);

    const openBoardModal = (bno) => {
        setIsBoardModalOpen(isBoardModalOpen === bno ? null : bno);
    };

    const handleProfileImageClick = async () => {
        if (memberData?.mno === loginState.mno) {
            setIsProfileModalOpen(true); // 클릭 시 모달 열기
        } else {
            const imageUrl = await fetchProfileImage(mno, setProfileImage);
            const width = 400; // 새 창의 너비
            const height = 400; // 새 창의 높이
            const left = window.innerWidth / 2 - width / 2; // 중앙 정렬
            const top = window.innerHeight / 2 - height / 2; // 중앙 정렬
            const options = `width=${width},height=${height},top=${top},left=${left},resizable=yes`;

            window.open(imageUrl, '_blank', options); // 새 창 열기
        }
    };

    const handleBoardInfoModalOpen = (bno) => {
        setIsBoardInfoModalOpen(isBoardInfoModalOpen === bno ? null : bno);
    };
    const handleModifyBoard = async (bno) => {
        setIsModifyModalOpen(isModifyModalOpen === bno ? null : bno);
    };

    const handleDeleteBoard = async (bno) => {
        try {
            await deleteBoard(bno);
            alert('게시글이 삭제되었습니다.');
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };

    const closeModifyModal = async () => {
        setIsModifyModalOpen(null);
        setRefresh(!refresh);
    }

    const closeProfileImageChangeModal = async () => {
        setIsProfileModalOpen(false);
        triggerProfileReload();
        await loadProfileImage();
    }

    return (
        <div className="h-screen w-screen overflow-auto">
            <div className="p-5 max-w-7xl mx-auto mt-32">
                {/* Upper User Info */}
                <div className="flex flex-col md:flex-row items-center mb-8 border-b pb-4 border-gray-300 justify-between">
                    <div className="relative flex items-center mb-4 md:mb-0">
                        {/* 프로필 이미지와 프로필 수정 버튼을 감싸는 div */}
                        <div className="relative w-24 h-24 mr-5 group">
                            <img
                                className="w-full h-full rounded-full object-cover cursor-pointer transition duration-300"
                                src={profileThumbnailImage}
                                alt="profile"
                                onClick={handleProfileImageClick}
                            />
                            <div
                                className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-full ${memberData?.mno === loginState.mno ? '' : 'hidden'}`}>
                                <button
                                    className={`absolute inset-0 flex items-center justify-center text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity ${memberData?.mno === loginState.mno ? '' : 'hidden'}`}
                                    onClick={handleProfileImageClick}
                                >
                                    프로필 수정
                                </button>
                            </div>
                        </div>
                        {/* 사용자 정보 */}
                        <div>
                            <h2 className="text-2xl font-semibold">{memberData?.nickname}</h2>
                            <p className="text-gray-600">{memberData?.email}</p>
                        </div>
                    </div>

                    {memberData?.mno === loginState.mno && (
                        <div
                            className="mt-5 md:mt-0 flex flex-col md:flex-row md:justify-end items-stretch gap-2 w-full md:w-auto">
                            <button
                                className="px-4 py-2 md:bg-gray-400 bg-gray-200 md:text-white md:font-normal font-bold rounded-md md:hover:bg-gray-600 hover:bg-gray-300 transition-colors w-full md:w-auto"
                                onClick={moveToModify}
                            >
                                회원정보 수정
                            </button>
                        </div>
                    )}
                </div>


                {/* Board List */}
                <div>
                <h3 className="text-xl font-medium mb-4">내 게시글</h3>
                    {fetching ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {myBoardList.dtoList.map((board) => (
                                <div
                                    key={board.bno}
                                    className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                                    onClick={() => openBoardModal(board.bno)}
                                >
                                    <img
                                        className="w-full h-auto mb-1 cursor-pointer object-cover"
                                        style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
                                        src={imageMap[board.bno]}
                                        alt="Board Thumbnail"
                                    />
                                    <div className="flex justify-between items-center p-4">
                                        <p className="text-gray-800 font-medium text-center">
                                            {board.title}
                                        </p>
                                        {board.writerId === loginState.mno && (
                                            <button className="flex flex-col items-center justify-center text-gray-500 p-2"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 부모의 클릭 이벤트 방지
                                                    handleBoardInfoModalOpen(board.bno);
                                                }}>
                                                <span className="block w-1 h-1 bg-gray-500 rounded-full mb-1" />
                                                <span className="block w-1 h-1 bg-gray-500 rounded-full mb-1" />
                                                <span className="block w-1 h-1 bg-gray-500 rounded-full" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <PageComponent serverData={myBoardList} movePage={moveToMyPage} />

                <BoardModal
                    isOpen={isBoardModalOpen !== null}
                    onClose={() => setIsBoardModalOpen(null)}
                    bno={isBoardModalOpen}
                />

                <ModifyModal
                    isOpen={isModifyModalOpen !== null}
                    onClose={() => closeModifyModal()}
                    bno={isModifyModalOpen}
                />

                <BoardInfoModal
                    isOpen={isBoardInfoModalOpen !== null}
                    onClose={() => setIsBoardInfoModalOpen(null)}
                    bno={isBoardInfoModalOpen}
                    onModify={handleModifyBoard}
                    onDelete={handleDeleteBoard}
                />

                <ProfileImageModal
                    mno={mno}
                    isOpen={isProfileModalOpen}
                    onClose={closeProfileImageChangeModal}
                />
            </div>
        </div>
    );
};

export default MyComponent;
