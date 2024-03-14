"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBarBlogCard = ({post}) => {

  return (
    <Link href="/[slug]" as={post.slug} className="my-1 flex flex-col">
      <Image
        width={1000}
        height={1000}
        src={post.jetpack_featured_media_url || "../images/cardimages.jpg"}
        alt="image"
        className="object-cover w-[150px] h-[65px] my-1"
      />
      {/* <span className="font-bold">{post.title.rendered}</span> */}
      <span
        className="font-bold "
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="font-normal "
        dangerouslySetInnerHTML={{
          __html:
            post.excerpt.rendered.length > 40
              ? `${post.excerpt.rendered.substring(0, 40)}...`
              : post.excerpt.rendered,
        }}
      />
    </Link>
  );
};

export default SideBarBlogCard;