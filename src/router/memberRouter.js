import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>
const Login = lazy(() => import("../pages/member/LoginPage"))
const Logout = lazy(() => import("../pages/member/LogoutPage"))
const CheckPassword = lazy(() => import("../pages/member/CheckPasswordPage"))
const Mypage = lazy(() => import("../pages/member/Mypage"));

const memberRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "logout",
            element: <Suspense fallback={Loading}><Logout /></Suspense>,
        },
        {
            path: "modify",
            element: <Suspense fallback={Loading}><CheckPassword /></Suspense>,
        },
        {
            path: "mypage/:mno",
            element: <Suspense fallback={Loading}><Mypage /></Suspense>,
        },
    ]
}

export default memberRouter
