import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const productsToPreview = products.filter((product, index) => {
    return index < 4;
  });
  return (
    <div className="category-preview-container">
      <Link className="title" to={title}>{title.toUpperCase()}</Link>
      <div className="preview">
        {productsToPreview.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </div>
    </div>
  );
};

export default CategoryPreview;
