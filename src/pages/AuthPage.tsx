import {useState} from 'react';
import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import Login from "../features/login";
import Register from "../features/register";
import {useNavigate} from "react-router-dom";

export type AuthType = "login" | "register";

type Props = {
    type: AuthType
}

const Auth = ({type}: Props) => {
    const [selected, setSelected] = useState<AuthType>(type);
    const navigate = useNavigate();


    const handleOnSelectionChange = (type: string) => {
        if (type === "login" || type === "register") {
            setSelected(type);
            navigate(`/auth/${type}`)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col h-[620px]">
                <Card className="max-w-full w-[340px] h-auto">
                    <CardBody className="overflow-hidden">
                        <Tabs fullWidth size={"md"} selectedKey={selected}
                              onSelectionChange={(key) => handleOnSelectionChange(key as string)}>
                            <Tab key="login" title="Вход">
                                <Login setSelected={setSelected}/>
                            </Tab>
                            <Tab key="register" title="Регистрация">
                                <Register setSelected={setSelected}/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Auth