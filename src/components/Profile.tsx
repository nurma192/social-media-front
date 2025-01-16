import {useAppSelector} from "../app/hooks";
import {selectCurrentUser} from "../app/features/userSlice";
import {Card, CardHeader, Image} from "@nextui-org/react"

const Profile = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    if (!currentUser) {
        return null
    }
    return (
        <Card className="py-4 w-[302px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <Image />
            </CardHeader>
        </Card>
    );
};

export default Profile;