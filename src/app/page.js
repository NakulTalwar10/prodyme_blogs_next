import Image from "next/image";
import BlogsPage from './blogs/page'
import HomePage from './home/page'
import BlogsSidebar from "./components/BlogsSidebar";

export default function Home() {
  return (
  
  <main className="">
    {/* <BlogsPage/> */}
    {/* <BlogsSidebar/> */}
    <HomePage/>
  </main>
  );
}
