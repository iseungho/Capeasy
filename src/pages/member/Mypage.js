import { useParams } from "react-router-dom";
import MyComponent from "../../components/member/MyComponent";
import BasicLayout from "../../layouts/BasicLayout";

const MyPage = () => {

    const { mno } = useParams()

    return (
        <div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full'>
            <BasicLayout>
                <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
                    <MyComponent mno={mno}/>
                </div>
            </BasicLayout>
        </div>
    );
}

export default MyPage;
