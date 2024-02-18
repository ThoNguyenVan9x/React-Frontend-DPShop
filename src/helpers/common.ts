export const formatCurrency = (amount: number): string => {
    return Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};
