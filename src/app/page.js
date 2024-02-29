import Image from "next/image";
import BlogsPage from './blogs/page'
import BlogsSidebar from "./components/BlogsSidebar";

export default function Home() {
  return (
  
  <main>
    <BlogsPage/>
    {/* <BlogsSidebar/> */}
  </main>
  );
}
