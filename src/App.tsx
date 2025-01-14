import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Auth from "./pages/AuthPage";
import Posts from "./pages/PostsPage";
import CurrentPost from "./pages/CurrectPostPage";
import UserProfile from "./pages/UserProfilePage";
import Followers from "./pages/FollowersPage";
import Following from "./pages/FollowingPage";
import Layout from "./components/layout/layout";
import {Toaster} from "sonner";

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth type={"login"}/>,
        children: [
            {
                path: "login",
                element: <Auth type={"login"}/>,
            },
            {
                path: "register",
                element: <Auth type={"register"}/>,
            }
        ]
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <Posts/>,
            },
            {
                path: "posts/:id",
                element: <CurrentPost/>,
            },
            {
                path: "users/:id",
                element: <UserProfile/>,
            },
            {
                path: "followers",
                element: <Followers/>,
            },
            {
                path: "following",
                element: <Following/>,
            },

        ]
    },
])

const App = () => {
    return (
        <>
            <RouterProvider
                future={{
                    v7_startTransition: true
                }}
                router={router}/>
            <Toaster richColors={true}/>
        </>
    )
}

export default App
