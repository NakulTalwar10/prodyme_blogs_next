
import { useParams } from "next/navigation";
import CategoryBlogsPage from "./categoryPage";


const CategoryPage = ({params}) => {

  const { categoryName } = params;
  
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : '';

  return <CategoryBlogsPage selectedCategory={decodedCategoryName} />;
};

export default CategoryPage;
