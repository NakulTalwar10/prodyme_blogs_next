import React from "react";
import ProductsCategory from './productsCategory'

const CategoryProducts = ({ params }) => {
    const { productCategory } = params;
  
    const decodedCategoryName = productCategory ? decodeURIComponent(productCategory) : '';

    return <ProductsCategory categoryname={decodedCategoryName} />;
};

export default CategoryProducts;
