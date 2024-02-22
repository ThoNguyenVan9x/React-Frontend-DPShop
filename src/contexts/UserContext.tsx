import { ReactNode, createContext, useState } from "react";

type UserContextProviderProps = {
    children: ReactNode;
};

type User = {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    token: string;
};

const UserContext = createContext<any>({} as User);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User>({} as User);

    const loginContext = (
        username: string,
        fullName: string,
        email: string,
        phone: string,
        address: string,
        role: string,
        token: string
    ) => {
        setUser((user) => ({
            username: username,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            role: role,
            token: token,
        }));

        localStorage.setItem("username", username);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("address", address);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("address");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setUser((user) => ({} as User));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
