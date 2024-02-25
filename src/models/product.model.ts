export type Product = {
    id?: number;
    name?: string;
    material?: string;
    size?: string;
    price?: number;
    countInStock?: number;
    discount?: number;
    image?: string;
    rating?: number;
    type?: string;
};

export enum FieldProduct {
    Id = "id",
    Name = "name",
    Material = "material",
    Size = "size",
    Price = "price",
    Discount = "discount",
    CountInStock = "countInStock",
    Image = "image",
    Rating = "rating",
    Type = "type",
}
