import { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => {
    addItemToCart(product);
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType="inverted">
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
