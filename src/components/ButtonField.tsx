import { ReactNode } from "react";
import { IconSpinner } from "../icons/IconSpinner";

type Props = {
    loading?: boolean;
    children?: ReactNode;
    borderRadius?: string;
    color?: "secondary" | "primary" | "black";
    onClick?: () => void;
    disabled?: boolean;
};

const ButtonField = ({
    loading,
    children,
    borderRadius = "30px",
    color = "primary",
    onClick,
    disabled,
}: Props) => {
    const handleOnClick = () => {
        if (disabled) return;
        onClick && onClick();
    };

    return (
        <div onClick={handleOnClick}>
            {!loading ? (
                <button
                    className={`btn btn-${color} ${disabled ? "disabled" : ""}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: ".5rem",
                        color: "#fff",
                        borderRadius: borderRadius,
                    }}
                >
                    {children}
                </button>
            ) : (
                <button
                    className={`btn btn-${color} ${disabled ? "disabled" : ""}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: ".5rem",
                        color: "#fff",
                    }}
                >
                    <IconSpinner width="32px" height="32px" />
                    {children}
                </button>
            )}
        </div>
    );
};

export default ButtonField;
