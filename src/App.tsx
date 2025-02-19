import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/layout";
import Auth from "./pages/AuthPage";
import Posts from "./pages/PostsPage";
import CurrentPost from "./pages/CurrentPostPage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import GetUserProfilePage from "./pages/GetUserProfilePage";
import UserProfilePage from "./pages/UserProfilePage";


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
                        <Route path="users/:id" element={<GetUserProfilePage/>}/>
                        <Route path="profile"   element={<UserProfilePage currentUser={true} />}/>
                        <Route path="followers" element={<FollowersPage/>}/>
                        <Route path="following" element={<FollowingPage/>}/>
                        <Route path="support"   element={<div>Support</div>}/>
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
