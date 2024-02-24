type Props = {
    placeholder?: string;
    type?: string;
    value?: any;
    width?: string;
    height?: string;
    onChange?: (value: string) => void;
};

function TextField({ type, width, height, onChange, ...props }: Props) {
    return (
        <input
            {...props}
            type={type}
            className={
                type === "text" ||
                type === "number" ||
                type === "password" ||
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
