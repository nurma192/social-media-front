import type React from 'react';
import {Link} from "react-router-dom";
import MyButton from "../ui/MyButton";

type Props = {
    children: React.ReactNode;
    icon: JSX.Element;
    href: string;
}

const NavButton = ({children, icon, href}: Props) => {
    return (
        <MyButton className="flex justify-start text-xl" icon={icon}>
            <Link to={href} className="size-full flex items-center">
                {children}
            </Link>
        </MyButton>
    );
};

export default NavButton;