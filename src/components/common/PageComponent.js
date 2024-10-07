import React from "react";

const PageComponent = ({ serverData, movePage }) => {
    // writerMno를 0이 아닐 때만 사용하도록 설정
    const handleMovePage = (page) => {
        if (serverData.writerMno !== 0) {
            movePage(serverData.writerMno, { page });
        } else {
            movePage({ page });
        }
    };

    return (
        <div className="m-6 flex justify-center items-center">
            {serverData.prev && (
                <div
                    className="m-2 px-4 py-2 text-center text-black font-semibold cursor-pointer hover:text-gray-600"
                    onClick={() => handleMovePage(serverData.prevPage)}
                >
                    Prev
                </div>
            )}

            {serverData.pageNumList.map((pageNum) => (
                <div
                    key={pageNum}
                    className={`m-2 px-4 py-2 text-center rounded-full cursor-pointer 
                        ${serverData.current === pageNum
                        ? 'bg-gray-500 text-white'
                        : 'text-black hover:bg-gray-200'}`}
                    onClick={() => handleMovePage(pageNum)}
                >
                    {pageNum}
                </div>
            ))}

            {serverData.next && (
                <div
                    className="m-2 px-4 py-2 text-center text-black font-semibold cursor-pointer hover:text-gray-600"
                    onClick={() => handleMovePage(serverData.nextPage)}
                >
                    Next
                </div>
            )}
        </div>
    );
};

export default PageComponent;