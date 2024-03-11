import Image from "next/image";
import BlogsPage from './blogs/page'
import BlogsSidebar from "./components/BlogsSidebar";
import ProductsPage from "./products/page"

export default function Home() {
  return (
  
  <main>
    <BlogsPage/>
    {/* <BlogsSidebar/> */}
    {/* <ProductsPage/> */}
  </main>
  );
}
