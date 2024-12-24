import type React from 'react';
import Button from "../button";
import {Link} from "react-router-dom";

type Props = {
    children: React.ReactNode;
    icon: JSX.Element;
    href: string;
}

const NavButton = ({children, icon, href}: Props) => {
    return (
        <Button className="flex justify-start text-xl" icon={icon}>
            <Link to={href} className="size-full flex items-center">
                {children}
            </Link>
        </Button>
    );
};

export default NavButton;