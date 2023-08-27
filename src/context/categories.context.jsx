import { createContext, useState, useEffect } from "react";

import {getCategoriesAndDocuments} from "../utils/firebase.utils";

import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, SetCategoriesMap] = useState({});
  
  useEffect(() => {
    const getMappedCategories = async () => {
      const mappedCategories = await getCategoriesAndDocuments();
      SetCategoriesMap(mappedCategories);
    }
    getMappedCategories();
  }, []);
  
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
