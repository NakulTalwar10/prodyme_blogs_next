import Image from "next/image";
import React from "react";

const BlogsBackground = () => {
  return (
    <div style={{ position: "relative" }}>
      <Image
        src="../images/construction.jpg"
        width={1000}
        height={1000}
        className="w-full h-[275px] object-cover"
        alt="Background"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
        className="pl-[24px] pt-[249px]"
      >
        <div className="absolute top-[20px] left-[24px] text-[12px] font-normal text-white">Home / Knowledge Center / <span className="font-bold">Blogs & Articles</span></div>
        <h4 className="text-white font-normal lg:text-[42px] md:text-[40px] text-[30px]">
          Blogs & Articles
        </h4>
        <h5 className="text-white font-normal lg:text-[20px] md:text-[16px] text-[14px] mb-4">
          You can find the most read blogs which would help you get the right
          set of products
        </h5>
      </div>
    </div>
  );
};

export default BlogsBackground;
