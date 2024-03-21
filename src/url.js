const url = {
    // apiUrl: "https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev",
  apiUrl: "http://localhost:5000",
};

export default url;



// {
//   blogContent?.map((block, index) => {
//     if (block.type === "text") {
//       return (
//         <div
//           key={index}
//           className="blog-container w-[75vw] text-left  "
//           dangerouslySetInnerHTML={{ __html: block.content }}
//         />
//       );
//     } else {
//       // Regular expression to extract width, height, and src attributes from the img tag
//       const regex =
//         /<img[^>]*?width="([^"]*?)"[^>]*?height="([^"]*?)"[^>]*?src="([^"]*?)"/;

//       // Match the regex against the HTML string
//       const match = block.content.match(regex);
//       if (match) {
//         const width = match[1];
//         const height = match[2];
//         const imageUrl = match[3];
//         const aspectRatio = width / height;
//         // Set default alignment as left
//         let alignment = "left";

//         // Determine alignment based on aspect ratio
//         if (aspectRatio > 4 / 3) {
//           alignment = "right";
//         }
//         if (aspectRatio > 6 / 3) {
//           alignment = "center";
//         }
//         return (
//           <div className="image-container w-[80vw]" key={index}>
//             <div className="clear-both"></div>{" "}
//             {/* Add this div to clear floating */}
//             <Image
//               src={imageUrl || "../images/cardimages.jpg"}
//               alt="Your Image"
//               width={parseInt(width)}
//               height={parseInt(height)}
//               // layout="intrinsic"
//               className={`m-3 ${
//                 alignment === "left"
//                   ? "float-left h-[450px] w-auto ml-0"
//                   : alignment === "right"
//                   ? "float-right w-[450px] h-auto mr-0"
//                   : "mx-auto w-[75vw] h-auto float-left"
//               }`}
//             />
//           </div>
//         );
//       } else {
//         // return <div key={index}>Put Defalut Image here</div>;
//       }
//     }
//   });
// }