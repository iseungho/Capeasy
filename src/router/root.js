import { Suspense, lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");

// 'Loading...' appears while loading the page.
const Loading = <div>Loading...</div>

const Main = lazy(() => import("../pages/MainPage"))

const Create = lazy(() => import("../pages/CreatePage"))

const Waiting = lazy(() => import("../pages/WaitingPage"))

const Result = lazy(() => import("../pages/ResultPage"))

const Test = lazy(() => import("../pages/TestPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
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
    },
    {
        path: "test",
        element: <Suspense fallback={Loading}><Test/></Suspense>
    }
])

export default root