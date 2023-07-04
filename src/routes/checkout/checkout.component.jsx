import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./checkout.styles.scss";

const CheckOut = () => {
  const { cartItems, decreaseQuantity, increaseQuantity, deleteItem } = useContext(CartContext);
  const handleDecreaseClick = (event) => {
    const cartItemId = event.target.dataset.id
    decreaseQuantity(cartItemId);
  };

  const handleIncreaseClick = (event) => {
    const cartItemId = event.target.dataset.id
    increaseQuantity(cartItemId);
  };

  const handleDeleteClick = (event) => {
    const cartItemId = event.target.dataset.id
    deleteItem(cartItemId);
  }

  return (
    <div className="checkout-container">
      {cartItems.map((cartItem) => {
        const { id, imageUrl, name, quantity, price } = cartItem;
        return (
          <div key={id} className="checkout-item">
            <img src={imageUrl} alt={name} />
            <span>{name}</span>
            <span>
              <b>
                <span className="decrease-amount action-button" onClick={handleDecreaseClick} data-id={id}>{`<  `}</span>
              </b>
              {quantity}
              <b>
                <span className="increase-amount action-button" onClick={handleIncreaseClick} data-id={id}>{`  >`}</span>
              </b>
            </span>
            <span>{price}</span>
            <b>
              <span className="remove-item action-button" onClick={handleDeleteClick} data-id={id}>X</span>
            </b>
          </div>
        );
      })}
    </div>
  );
};

export default CheckOut;
