import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>
const List = lazy(() => import("../pages/board/ListPage"))


const boardRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><List /></Suspense>
        }
    ]
}

export default boardRouter
