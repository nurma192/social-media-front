import {Outlet} from "react-router-dom";
import Container from "../Container";
import Header from "./header";
import NavBar from "../nav-bar/navbar";

const Layout = () => {

    // useEffect(()=>{
    //     console.log("user effect")
    //     fetch("http://localhost:8092/posts/")
    //         .then(res=>res.json())
    //         .then(data => {
    //             console.log(data);
    //         }).catch(err => console.log(err));
    // },[])
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
                </>
            </Container>
        </>
    );
};

export default Layout;