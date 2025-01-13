
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout";
import Auth from "./pages/AuthPage";
import Posts from "./pages/PostsPage";
import CurrentPost from "./pages/CurrectPostPage";
import UserProfile from "./pages/UserProfilePage";
import Followers from "./pages/FollowersPage";
import Following from "./pages/FollowingPage";

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth type={"login"}/>,
        children: [
            {
                path:"login",
                element: <Auth type={"login"}/>,
            },
            {
                path:"register",
                element: <Auth type={"register"}/>,
            }
        ]
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Posts />,
            },
            {
                path: "posts/:id",
                element: <CurrentPost />,
            },
            {
                path: "users/:id",
                element: <UserProfile />,
            },
            {
                path: "followers",
                element: <Followers />,
            },
            {
                path: "following",
                element: <Following />,
            },

        ]
    },
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
