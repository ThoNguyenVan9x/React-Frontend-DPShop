export type CustomerOrderInfo = {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    note?: string;
    paymentMethod?: string;
    shippingMethod?: string;
};

export enum FieldCustomerInfo {
    Name = "fullName",
    Email = "email",
    Phone = "phone",
    Address = "address",
    Note = "note",
    PaymentMethod = "paymentMethod",
    ShippingMethod = "shippingMethod",
}
