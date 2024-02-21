import { ReactNode, createContext, useState } from "react";

type UserContextProviderProps = {
    children: ReactNode;
};

const UserContext = createContext<any>({ username: "", auth: false });

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState({ username: "", auth: false });

    const loginContext = (username: string, token: string) => {
        setUser((user) => ({
            username: username,
            auth: true,
        }));
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser((user) => ({
            username: "",
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
