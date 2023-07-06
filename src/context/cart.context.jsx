import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const isProductExist = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  if (isProductExist) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === productToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      } else {
        return cartItem;
      }
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseOrDeleteItemHandler = (cartItems, decreaseOrDeleteFlag, cartItemToDecreaseOrDelete) => {

  // Delete item
  if (decreaseOrDeleteFlag === "delete" || cartItemToDecreaseOrDelete.quantity === 1) {
    return cartItems.filter((cartItem) => {
      if (cartItem.id !== cartItemToDecreaseOrDelete.id) return cartItem;
    });
  }

  // Decrease item amount
  if (decreaseOrDeleteFlag === "decrease") {
    const test =  cartItems.map((cartItem) => {
      if (cartItem.id === cartItemToDecreaseOrDelete.id)
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      else return cartItem;
    });
    return test;
  }

};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseOrDeleteItem: () => {},
  cartCount: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItemInfor = cartItems.reduce((currentCartItemInforObject, cartItem) => {
      return {totalQuantity: currentCartItemInforObject.totalQuantity + cartItem.quantity, totalPrice: currentCartItemInforObject.totalPrice + (cartItem.price * cartItem.quantity)};
    }, {totalQuantity: 0, totalPrice: 0});
    setCartCount(cartItemInfor.totalQuantity);
    setTotalPrice(cartItemInfor.totalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseOrDeleteItem = (decreaseOrDeleteFlag, cartItemToDecreaseOrDelete) => {
    setCartItems(
      decreaseOrDeleteItemHandler(cartItems, decreaseOrDeleteFlag, cartItemToDecreaseOrDelete)
    );
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    totalPrice,
    setIsCartOpen,
    addItemToCart,
    decreaseOrDeleteItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
