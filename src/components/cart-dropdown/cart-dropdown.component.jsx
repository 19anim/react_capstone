import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} product={cartItem}></CartItem>
        })}
      </div>
      <Link to="/checkout">
        <Button>GO TO CHECKOUT</Button>
      </Link>
        
    </div>
  );
};

export default CartDropdown;
