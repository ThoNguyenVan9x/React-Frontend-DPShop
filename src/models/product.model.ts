export type Product = {
    id?: number;
    name?: string;
    material?: string;
    size?: string;
    price?: string;
    type?: string;
    image?: string;
};

export enum FieldProduct {
    Id = "id",
    Name = "name",
    Material = "material",
    Size = "size",
    Price = "price",
    Type = "type",
    Image = "image",
}
