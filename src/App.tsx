import {BrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/layout";
import Auth from "./pages/AuthPage";
import Posts from "./pages/PostsPage";
import CurrentPost from "./pages/CurrentPostPage";
import UserProfilePage from "./pages/UserProfilePage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";


const App = () => {
    return (
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Posts/>}/>
                        <Route path="posts/:id" element={<CurrentPost/>}/>
                        <Route path="users/:id" element={<UserProfilePage/>}/>
                        <Route path="followers" element={<FollowersPage/>}/>
                        <Route path="following" element={<FollowingPage/>}/>
                        <Route path="support" element={<div>Support</div>}/>
                    </Route>
                </Route>

                <Route path={"/auth"}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Auth type="login"/>}/>
                    <Route path="register" element={<Auth type="register"/>}/>
                </Route>
            </Routes>
            <Toaster richColors/>
        </BrowserRouter>
    )
}

export default App
