import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type ShoppingContextProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: number;
    name: string;
    price: number;
    thumbnail: any;
    description: string;
    categoryId: number;
    qty: number;
};

type ProductItem = {
    id: number;
    name: string;
    price: number;
    thumbnail: any;
    description: string;
    categoryId: number;
};

interface ShoppingContextType {
    cartQty: number;
    totalPrice: number;
    cartItems: CartItem[];
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    addCartItem: (item: ProductItem) => void;
    removeCartItem: (id: number) => void;
    clearCartItem: () => void;
}

const ShoppingContext = createContext<ShoppingContextType>(
    {} as ShoppingContextType
);

export const useShoppingContext = () => {
    return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({
    children,
}: ShoppingContextProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const jsonCartData = localStorage.getItem("shopping_cart");
        return jsonCartData ? JSON.parse(jsonCartData) : [];
    });

    useEffect(() => {
        localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.qty * item.price,
        0
    );

    const increaseQty = (id: number) => {
        console.log("increase QTY: ", id);
        const currentCartItem = cartItems.find((item) => item.id === id);
        if (currentCartItem) {
            const newItems = cartItems.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty + 1 };
                } else {
                    return item;
                }
            });
            setCartItems(newItems);
        }
    };

    const decreaseQty = (id: number) => {
        console.log("increase QTY: ", id);
        const currentCartItem = cartItems.find((item) => item.id === id);
        if (currentCartItem) {
            if (currentCartItem.qty == 1) {
                removeCartItem(id);
            } else {
                const newItems = cartItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, qty: item.qty - 1 };
                    } else {
                        return item;
                    }
                });
                setCartItems(newItems);
            }
        }
    };

    const addCartItem = (product: ProductItem) => {
        console.log("product: ", product);
        if (product) {
            const currentCartItem = cartItems.find(
                (item) => item.id === product.id
            );
            if (currentCartItem) {
                const newItems = cartItems.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, qty: item.qty + 1 };
                    } else {
                        return item;
                    }
                });
                setCartItems(newItems);
            } else {
                const newItem = { ...product, qty: 1 };
                setCartItems([...cartItems, newItem]);
            }
        }
    };

    const removeCartItem = (id: number) => {
        console.log("remove cart Item");
        const currentCartItemIndex = cartItems.findIndex(
            (item) => item.id === id
        );
        const newItems = [...cartItems];
        newItems.splice(currentCartItemIndex, 1);
        setCartItems(newItems);
    };

    const clearCartItem = () => {
        console.log("clear cart Item");
        setCartItems([]);
    };

    return (
        <ShoppingContext.Provider
            value={{
                cartItems,
                cartQty,
                totalPrice,
                increaseQty,
                decreaseQty,
                addCartItem,
                removeCartItem,
                clearCartItem,
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
};

export default ShoppingContext;
