import CheckPasswordComponent from "../../components/member/CheckPasswordComponent";
import BasicLayout from "../../layouts/BasicLayout";

const CheckPasswordPage = () => {
    return (
        <div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full'>
            <BasicLayout>
                <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
                    <CheckPasswordComponent />
                </div>
            </BasicLayout>
        </div>
    );
}

export default CheckPasswordPage;
