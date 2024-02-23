export type CustomerInfo = {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    note?: string;
    payment?: string;
};

export enum FieldCustomerInfo {
    Name = "fullName",
    Email = "email",
    Phone = "phone",
    Address = "address",
    Note = "note",
    Payment = "payment",
}
