export type Account = {
    username?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    password?: string;
    role?: string;
};

export enum FieldAccount {
    Username = "username",
    FullName = "fullName",
    Email = "email",
    phone = "phone",
    Address = "address",
    Password = "password",
    Role = "role",
}
