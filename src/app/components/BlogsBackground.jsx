import React from "react";

const BlogsBackground = () => {
  return (
    <div style={{ position: 'relative' }}>
      <img src="../images/construction.jpg" className="w-full h-[274px] object-cover" alt="Background" />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '20px',
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)'
      }}>
        <h4 className="text-white lg:text-[62px] md:text-[48px] text-[36px]">Blogs and Articles</h4>
        <h5 className="text-white lg:text-[20px] md:text-[16px] text-[14px] mb-4">You can find the most read blogs which would help you get the right set of products</h5>
      </div>
    </div>
  );
};

export default BlogsBackground;
