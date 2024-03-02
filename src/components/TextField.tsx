type Props = {
    placeholder?: string;
    type?: string;
    value?: any;
    width?: string;
    height?: string;
    disable?: boolean;
    onChange?: (value: any) => void;
};

function TextField({
    type,
    width,
    height,
    disable,
    onChange,
    ...props
}: Props) {
    return (
        <input
            {...props}
            type={type}
            disabled={disable}
            className={
                type === "text" ||
                type === "number" ||
                type === "password" ||
                type === "date" ||
                !type
                    ? "form-control"
                    : "d-block"
            }
            style={{ width, height }}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
}

export default TextField;
