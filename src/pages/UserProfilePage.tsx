import {useAppSelector} from "../app/hooks";
import {selectUser} from "../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";

type Props = {
    currentUser: boolean
}

function UserProfilePage({currentUser}: Props) {
    const navigate = useNavigate()
    const user = useAppSelector(selectUser)
    if (!user) {
        navigate("")
        return null
    }
    console.log(user)
    return (
        <div>
            {user.id}
        </div>
    );
}

export default UserProfilePage;