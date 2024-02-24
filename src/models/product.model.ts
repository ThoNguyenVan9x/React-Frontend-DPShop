export type Product = {
    id?: number;
    name?: string;
    material?: string;
    size?: string;
    price?: number;
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
    Image = "image",
    Rating = "rating",
    Type = "type",
}
