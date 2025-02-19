import {useParams} from "react-router-dom";
import {useGetUserByIdQuery} from "../app/features/user/userApi";
import MyCircularProgress from "../components/ui/MyCircularProgress";
import UserProfilePage from "./UserProfilePage";

const GetUserProfilePage = () => {
    const {id} = useParams()
    const {isLoading: isGetUserLoading} = useGetUserByIdQuery(Number(id))

    if (isGetUserLoading) {
        return <MyCircularProgress size={"lg"}/>
    }

    return (
        <UserProfilePage currentUser={false}/>
    );
};

export default GetUserProfilePage;