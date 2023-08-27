import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((categoryTitle) => {
        return <CategoryPreview key={categoryTitle} title={categoryTitle} products={categoriesMap[categoryTitle]} ></CategoryPreview>
      })}
    </div>
  );
  
};

export default CategoriesPreview;
