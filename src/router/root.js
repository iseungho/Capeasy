import { Suspense, lazy } from "react";
import memberRouter from "./memberRouter";
import boardRouter from "./boardRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div className="loading-image"></div>

const Main = lazy(() => import("../pages/capeasy/MainPage"))

const About = lazy(() => import("../pages/capeasy/AboutPage"))

const Create = lazy(() => import("../pages/capeasy/CreatePage"))

const Waiting = lazy(() => import("../pages/capeasy/WaitingPage"))

const Result = lazy(() => import("../pages/capeasy/ResultPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "member",
        children: memberRouter()
    },
    {
        path: "board",
        children: boardRouter()
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "create",
        element: <Suspense fallback={Loading}><Create/></Suspense>
    },
    {
        path: "waiting/:vno",
        element: <Suspense fallback={Loading}><Waiting/></Suspense>
    },
    {
        path: "result/:ino",
        element: <Suspense fallback={Loading}><Result/></Suspense>
    }
])

export default root