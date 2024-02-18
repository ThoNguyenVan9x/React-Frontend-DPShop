import { ReactNode } from "react";
import { IconSpinner } from "../icons/IconSpinner";

type Props = {
    loading?: boolean;
    children?: ReactNode;
    color?: "secondary" | "primary";
    onClick?: () => void;
    disabled?: boolean;
};

const ButtonField = ({
    loading,
    children,
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
