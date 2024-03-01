export type User = {
    id?: number;
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    password?: string;
    rePassword?: string;
    active?: boolean;
    dateOfBirth?: Date;
    googleAccountId?: number;
    facebookAccountId?: number;
    role?: string;
    token?: string;
};

export enum FieldUser {
    Id = "id",
    FullName = "fullName",
    PhoneNumber = "phoneNumber",
    Address = "address",
    Password = "password",
    RePassword = "rePassword",
    Active = "active",
    DateOfBirth = "dateOfBirth",
    GoogleAccountId = "googleAccountId",
    FacebookAccountId = "facebookAccountId",
    Role = "role",
    Token = "token",
}
