import React from "react";

const FetchingModal = () => {
    return (
        <div className={`fixed top-0 left-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black bg-opacity-20`}>
            <div className=" bg-white rounded-3xl opacity-100 min-w-min h-1/4 flex justify-center items-center">
                <div className="text-4xl font-extrabold text-orange-400 m-20">
                    Loading.....
                </div>
            </div>
        </div>
    );
}

export default FetchingModal;
