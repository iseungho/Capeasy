import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>
const Login = lazy(() => import("../pages/member/LoginPage"))
const Logout = lazy(() => import("../pages/member/LogoutPage"))
const CheckPassword = lazy(() => import("../pages/member/CheckPasswordPage"))
const Signup = lazy(() => import("../pages/member/SignupPage"));

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
            path: "signup",
            element: <Suspense fallback={Loading}><Signup /></Suspense>,
        }
    ]
}

export default memberRouter
