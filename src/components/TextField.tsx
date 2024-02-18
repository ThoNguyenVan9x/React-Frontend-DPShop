type Props = {
    placeholder?: string;
    value?: string;
    width?: string;
    height?: string;
    onChange?: (value: string) => void;
};

function TextField({
    width = "25%",
    height = "20px",
    onChange,
    ...props
}: Props) {
    return (
        <input
            {...props}
            className="text-field p-3"
            style={{ width, height, fontSize: "1rem" }}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
}

export default TextField;
