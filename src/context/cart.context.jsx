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

const decreaseQuantityHandler = (cartItems, productIdToDecrease) => {
  const currentProduct = cartItems.find((cartItem) => {
    return cartItem.id == productIdToDecrease;
  })
  const currentIndex = cartItems.indexOf(currentProduct);
  currentProduct.quantity = currentProduct.quantity - 1;
  if(currentProduct.quantity == 0){
    cartItems.splice(currentIndex, 1);
  }
  return [...cartItems];
}

const increaseQuantityHandler = (cartItems, productIdToIncrease) => {
  const currentProduct = cartItems.find((cartItem) => {
    return cartItem.id == productIdToIncrease;
  })
  currentProduct.quantity = currentProduct.quantity + 1;
  return [...cartItems];
}

const deleteItemHandler = (cartItems, productIdToDelete) => {
  const currentProduct = cartItems.find((cartItem) => {
    return cartItem.id == productIdToDelete;
  })
  const currentIndex = cartItems.indexOf(currentProduct);
  cartItems.splice(currentIndex, 1);
  return [...cartItems];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  deleteItem: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0)
    setCartCount(newCartCount);
  }, [cartItems]) 

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseQuantity = (productIdToDecrease) => {
    setCartItems(decreaseQuantityHandler(cartItems, productIdToDecrease));
  }

  const increaseQuantity = (productIdToIncrease) => {
    setCartItems(increaseQuantityHandler(cartItems, productIdToIncrease));
  }

  const deleteItem = (productIdToDelete) => {
    setCartItems(deleteItemHandler(cartItems, productIdToDelete));
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, decreaseQuantity, increaseQuantity, deleteItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
