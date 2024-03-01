import { ReactNode, createContext, useState } from "react";
import { User } from "../models/account.model";

type UserContextProviderProps = {
    children: ReactNode;
};

// type User = {
//     username: string;
//     fullName: string;
//     email: string;
//     phone: string;
//     address: string;
//     role: string;
//     token: string;
// };

const UserContext = createContext<any>({} as User);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User>({} as User);

    const loginContext = (
        id: number,
        fullName: string,
        phoneNumber: string,
        address: string,
        dateOfBirth: Date,
        role: string,
        token: string
    ) => {
        setUser((user) => ({
            id: id,
            fullName: fullName,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth,
            address: address,
            role: role,
            token: token,
        }));

        localStorage.setItem("id", id + "");
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("address", address);
        localStorage.setItem("dateOfBirth", dateOfBirth + "");
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("fullName");
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("dateOfBirth");
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
