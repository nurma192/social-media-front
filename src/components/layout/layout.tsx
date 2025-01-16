import {Outlet} from "react-router-dom";
import Container from "../Container";
import Header from "./header";
import NavBar from "../nav-bar/navbar";
import {useAppSelector} from "../../app/hooks";
import {selectCurrentUser} from "../../app/features/user/userSlice";
import Profile from "../Profile";

const Layout = () => {

    const user = useAppSelector(selectCurrentUser)
    console.log("user layout:",user)

    return (
        <>
            <Header/>

            <Container>
                <>
                    <div className="flex-2 p-4">
                        <NavBar/>
                    </div>

                    <div className="flex-1 p-4 ">
                        <Outlet/>
                    </div>
                    <div className="flex-2 p-4">
                        <div className="flex-col.flex.gap-5">
                            {user && <Profile />}
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
};

export default Layout;