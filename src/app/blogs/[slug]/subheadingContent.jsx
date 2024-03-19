import Image from "next/image";
import React, { useEffect, useState } from "react";
import comma from "../../../../public/images/quote.svg"

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
      <div className="text-left  ">
        {isSub && subHeading !== "" && (
          // for subheading
          <div className="text-3xl text-[28px] font-bold my-2 text-left max-sm:text-3xl  ">
            {subHeading}
          </div>
        )}
        {!isSub && subHeading !== "" && (
          // for heading
          <div className="text-3xl text-[28px] font-bold my-2 text-left max-sm:text-3xl  ">
            {subHeading}
          </div>
        )}

        {image !== false && (
          <div
            className={`my-3 ${
              alignment === "left"
                ? "float-left w-[350px] mx-auto max-sm:w-[300px]"
                : alignment === "right"
                ? "float-right w-[470px] h-auto mr-0 max-sm:mr-auto max-sm:ml-0 mx-auto max-sm:w-[300px] max-sm:float-left"
                : "mx-auto w-[75vw] h-auto float-left mb-8 mt-0 max-sm:w-[85vw]"
            }`}
          >
            <div
              className={` ${
                alignment === "left"
                  ? "w-[330px] mx-auto ml-0 max-sm:w-[290px]"
                  : alignment === "right"
                  ? "w-[450px] h-auto mx-auto mr-0 max-sm:mr-auto max-sm:ml-0 max-sm:w-[290px]"
                  : "mx-auto w-[75vw] h-auto ml-0 max-lg:w-[85vw]"
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
                    ? "w-[330px] mx-auto max-sm:w-[290px]"
                    : alignment === "right"
                    ? "w-[450px] h-auto mx-auto max-sm:w-[290px]"
                    : "mx-auto w-[75vw] h-auto max-lg:w-[85vw]"
                }`}
              />
            </div>
            {image.description !== "" && (
              <div
                className={` border-l-medium border-l-[#FF7A34] text-center text-base italic px-[20px] text-[#555555] py-[22px]  ${
                  alignment === "left"
                    ? "w-[330px] mx-auto ml-0 max-sm:w-[290px]"
                    : alignment === "right"
                    ? "w-[450px] h-auto mx-auto mr-0 max-sm:mr-auto max-sm:ml-0 max-sm:w-[290px]"
                    : "mx-auto w-[75vw] h-auto ml-0 max-lg:w-[85vw]"
                }`}
              >
                {image.description}
              </div>
            )}
          </div>
        )}
        {content !== "" && (
          <p className="blog-container w-[75vw] max-sm:w-[90vw] max-sm:text-base text-left font-normal text-lg my-2">
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
            {/* <Image
              width={1000}
              height={1000}
              url="./images/quote/quote.png"
              alt="image"
              className="w-[25px] h-[52px]"
            />
            <img
              // width={1000}
              // height={1000}
              url="../../../../public/images/quote.svg"
              alt="iamge"
              className="w-[25px] h-[52px]"
            /> */}
            <div className="text-4xl text-[42px] max-sm:text-2xl italic font-normal text-center py-5 my-5 border-y-medium ">
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
