import Image from "next/image";
import React, { useEffect, useState } from "react";
import quote from "../../../../public/images/quote/quote.png"

const SubheadingContent = ({isSub ,subHeading, content, quote, image }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(0);
  const [alignment, setAlignment] = useState("left");

  useEffect(() => {
    setWidth(image.width);
    setHeight(image.height);
  }, [image]);

  useEffect(() => {
    setAspectRatio(width / height);
  }, [width, height]);

  // const aspectRatio = width / height;
  // Set default alignment as left
  // let alignment = "left";

  // Determine alignment based on aspect ratio
  useEffect(() => {
    if (aspectRatio > 4 / 3) {
      setAlignment("right");
    }
    if (aspectRatio > 6 / 3) {
      setAlignment("center");
    }
  }, [aspectRatio]);

  if(image === false && subHeading === "" && content === "" && quote === "" ){
    return (<></>);
  }else {
    return (
      <div className="text-left ">
        {isSub && subHeading !== "" && (
          // for subheading
          <div className="text-2xl font-semibold my-2 text-left  ">
            {subHeading}
          </div>
        )}
        {!isSub && subHeading !== "" && (
          // for heading
          <div className="text-4xl font-semibold my-2 text-left  ">
            {subHeading}
          </div>
        )}

        {image !== false && (
          <div
            className={`my-3 ${
              alignment === "left"
                ? "float-left w-[350px] mx-auto"
                : alignment === "right"
                ? "float-right w-[470px] h-auto mr-0 mx-auto "
                : "mx-auto w-[75vw] h-auto float-left mb-8 mt-0"
            }`}
          >
            <div
              className={` ${
                alignment === "left"
                  ? "w-[330px] mx-auto ml-0"
                  : alignment === "right"
                  ? "w-[450px] h-auto mx-auto mr-0"
                  : "mx-auto w-[75vw] h-auto ml-0"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={parseInt(width)}
                height={parseInt(height)}
                // layout="intrinsic"
                className={` ${
                  alignment === "left"
                    ? "w-[330px] mx-auto"
                    : alignment === "right"
                    ? "w-[450px] h-auto mx-auto"
                    : "mx-auto w-[75vw] h-auto"
                }`}
              />
            </div>
            {image.description !== "" && (
              <div
                className={` border-l-medium border-l-[#FF7A34] text-center italic px-[20px] py-[22px] bg-white ${
                  alignment === "left"
                    ? "w-[330px] mx-auto ml-0"
                    : alignment === "right"
                    ? "w-[450px] h-auto mx-auto mr-0"
                    : "mx-auto w-[75vw] h-auto ml-0"
                }`}
              >
                {image.description}
              </div>
            )}
          </div>
        )}
        {content !== "" && (
          <p className="blog-container w-[75vw] text-left font-normal text-lg my-2">
            {content.split("\r\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
        {quote !== "" && (
          <div className="flex gap-[50px]">
            {/* <Image width={1000} height={1000} url={quote} alt='"' className="w-[25px] h-[52px]" /> */}
            {/* <Image width={1000} height={1000} url={quote} alt='"' className="w-[25px] h-[52px]" /> */}
            <div className="text-4xl italic font-semibold text-center py-5 my-5 border-y-medium ">
              {quote}
            </div>
          </div>
        )}

        {(subHeading !== "" || content !== "" || quote !== "") && (
          <div className="mb-8"></div>
        )}
      </div>
    );
  }
};

export default SubheadingContent;
