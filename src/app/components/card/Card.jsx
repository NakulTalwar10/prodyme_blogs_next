"use client"

import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
// import "./cards.scss";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import Constants from "../../constants";
import imgDef from "./broken-image.png";
import Image from "next/image";


const Card = ({ product, fun }) => {
    let [delighted, setDelighted] = useState(false);
    let toggleDelighted = () => {
        setDelighted(!delighted);
        fun(`${product.id}`);
    };
    // const nav = useNavigate();
    const handledetails = (e) => {
        // fetch(`${Constants.API_PATH}api/getProductDetailOneData/${e.target.id}/`, {
        //     cache: "no-store",
        // })
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((res) => {
        //         nav("/details", { state: { id: "1", data: res.data } });
        //     })
        //     .catch((err) => {
        //         console.log(err, "err");
        //     });
    };
    return (
      <section
        className="globalCard w-[300px] bg-white rounded-2xl border border-gray-300 relative flex flex-col p-4 mx-auto"
        id={product.id}
        onClick={(e) => handledetails(e)}
      >
        <aside
          className="wishlistIcon absolute top-2 right-2 z-10"
          onClick={toggleDelighted}
        >
          {!delighted ? (
            <FavoriteBorderIcon className="nonFav cursor-pointer text-[#FF7A34]" />
          ) : (
            <FavoriteIcon className="fav cursor-pointer text-[#FF7A34]" />
          )}
        </aside>
        <header className="cardImage  h-[190px]">
          <figure className="imgContainer h-full ">
            <Image
              width={100}
              height={100}
              src={
                // product.Image1 || // will be added when images are available
                imgDef}
              alt={product.ProductName}
              className="w-full h-full object-cover object-top"
            />
          </figure>
        </header>
        <article className="cardDesc pt-3 text-left">
          <header className="descHead mb-1">
            <Typography
              variant="h6"
              className="descTitle text-[#2A2A2A] text-capitalize whitespace-nowrap overflow-hidden overflow-ellipsis"
            >
              {product.ProductName}
            </Typography>
          </header>
          <aside className="descRating mb-4">
            <Rating
              name={product.id}
              value={product.ratingProduct}
              precision={0.5}
              readOnly
            />
          </aside>
          <article className="brand mb-4">
            <Typography variant="body2" className="brandText text-[#2A2A2A]">
              {product.Brand}
            </Typography>
          </article>
          {product.productDescription && (
            <article className="description min-h-[60px]">
              <Typography
                variant="body1"
                className="descContent text-[#2A2A2A] overflow-hidden overflow-ellipsis line-clamp-2"
              >
                {product.productDescription}
              </Typography>
            </article>
          )}
          <section className="separator mb-2">
            <hr className="border border-gray-300" />
          </section>
          <article className="price flex items-center mb-2">
            <Typography variant="h6" className="priceText text-[#2A2A2A]">
              &#8377; {product.PDPrice}/-
            </Typography>
            <Typography variant="caption" className="priceText">
              &nbsp; per box
            </Typography>
          </article>
          <footer className="comparator mb-2">
            <FormControlLabel control={<Checkbox />} label="Compare" />
          </footer>
        </article>
      </section>
    );

};

export default Card;