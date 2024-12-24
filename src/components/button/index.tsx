import type React from 'react';
import {Button as NextButton} from "@nextui-org/react";

type Props = {
    children: React.ReactNode,
    icon?: JSX.Element,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    fullWidth?: boolean,
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | undefined,
}

const Button = ({children, icon, className, type, fullWidth, color}: Props) => {
    return (
        <div>
            <NextButton
                startContent={icon}
                size="lg"
                color={color}
                variant={'light'}
                className={className}
                type={type}
                fullWidth={fullWidth}
            >
                {children}
            </NextButton>
        </div>
    );
};

export default Button;