// for add items to cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    };
}

// for delete items from cart
export const deleteCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    };
}
