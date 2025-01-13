import {CircularProgress} from "@nextui-org/react";

interface Props {
    size?: "sm" | "md" | "lg" | undefined;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}

const MyCircularProgress = ({size = "md", color = "primary"}: Props) => {
    return (
        <CircularProgress size={size} color={color}

        />
    )
}

export default MyCircularProgress;
