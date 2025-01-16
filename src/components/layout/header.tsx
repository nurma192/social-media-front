import {useContext} from 'react';
import {ThemeContext} from "../vim-provider";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {FaRegMoon} from "react-icons/fa";
import {LuSunMedium} from "react-icons/lu";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logout, selectIsAuthenticated} from "../../app/features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {Button} from "@nextui-org/react"
import { CiLogout } from "react-icons/ci";

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth/login")
    }
    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">Network Social</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem
                    className="lg:flex text-3xl cursor-pointer"
                    onClick={() => toggleTheme()}
                >
                    {theme === 'light' ? <FaRegMoon/> : <LuSunMedium/>}
                </NavbarItem>
                <NavbarItem>
                    {
                        isAuthenticated && (
                            <Button
                                color={"default"}
                                variant={"flat"}
                                className={`gap-2`}
                                onPress={handleLogout}
                            >
                                <CiLogout />
                                Выйти
                            </Button>
                        )
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;