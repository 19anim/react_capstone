import "./checkout-item.styles.scss";

import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

const CheckOutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  const { cartItems, decreaseOrDeleteItem, addItemToCart } = useContext(CartContext);
  const descreaseItemHandler = () => decreaseOrDeleteItem("decrease", cartItem);
  const deleteItemHandler = () => decreaseOrDeleteItem("delete", cartItem);
  const increaseItemHandler = () => addItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={descreaseItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseItemHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={deleteItemHandler}>&#10005;</div>
    </div>
  );
};

export default CheckOutItem;