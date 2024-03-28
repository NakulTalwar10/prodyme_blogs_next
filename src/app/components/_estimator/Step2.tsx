"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { step2Type } from "./_myTypes";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";

export const Step2: React.FC<step2Type> = ({
  step,
  setStep,
  setQuality,
  estimateValue,
  generateEstimate,
  quality,
  totalRate,
  costPerSqft,
}) => {
  interface Star {
    Base: boolean;
    Classic: boolean;
    Premium: boolean;
    Luxury: boolean;
    "Ultra-luxury": boolean;
  }
  const [star, setStar] = useState({
    Base: true,
    Classic: false,
    Premium: false,
    Luxury: false,
    "Ultra-luxury": false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setQuality(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    if (step === 2) {
      generateEstimate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const star: Star = {
      Base: false,
      Classic: false,
      Premium: false,
      Luxury: false,
      "Ultra-luxury": false,
    };
    const id: string = e.target.id;
    // console.log(e.target.value);
    star[id as keyof Star] = true;
    setStar(star);
    setQuality(parseInt(e.target.value));
  };

  const validate = (): boolean => {
    if (quality === 0) {
      setError("* Please select the quality!");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const validateEstimate = () => {
    if (validate()) {
      generateEstimate();
      setStep(step + 1);
    }
  };

  return (
    <>
      <div
        className={`w-[899px] max-xl:w-[90vw] h-auto gap-[30px] pt-3  pb-6 bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg border border-orange-400 flex-col justify-start items-start inline-flex ${
          step !== 2 ? "hidden" : ""
        }`}
      >
        <div className="flex-col m-0 justify-start items-start gap-[23px] flex">
          <div className="pl-5 justify-start items-start gap-2.5 inline-flex">
            <span className="text-center text-black text-sm font-normal font-['Anek Latin']">
              Step 2/5
            </span>
          </div>
        </div>
        <div className="pl-5 flex-col justify-start items-start gap-5 flex">
          <div className="flex-col justify-start items-start gap-5 flex">
            <span className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] ">
              Select the degree of premium quality:
            </span>
            <div className="flex flex-co3">
              <div className="justify-start items-end gap-5 inline-flex flex-wrap">
                {Object.keys(star)?.map((key: string, id: number) => {
                  return (
                    <label
                      key={id}
                      htmlFor={key}
                      className="w-[88px] h-[69px] mr-10 flex-col justify-start items-start inline-flex  transition-transform transform hover:scale-110"
                    >
                      <div
                        className={`w-[120px] h-[69px] p-2 rounded-[10px] border flex-col justify-end items-center gap-1 flex relative ${
                          star[key as keyof Star] ? "border-orange-400" : ""
                        }`}
                      >
                        {Array.from({ length: id + 1 }, (_, index) => (
                          <Image
                            key={index}
                            width={1000}
                            height={1000}
                            style={{ left: `${8 * (index + 4)}px` }}
                            className={`absolute z-10 ${
                              index % 2 === 0 ? "top-2" : "top-3"
                            } w-[20px] h-auto  `}
                            src={
                              star[key as keyof Star]
                                ? "images/Star2.svg"
                                : "images/Star1.svg"
                            } // Correct path relative to the public directory
                            alt="Star Image"
                           
                          />
                        ))}
                        <span className="text-center text-black text-sm text-nowrap font-light font-['Anek Latin']">
                          {key}
                        </span>
                        <input
                          type="radio"
                          name="star"
                          value={id + 1}
                          id={key}
                          className="hidden"
                          onChange={(e) => handleSelect(e)}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="text-red-500 mt-5">{error}</div>
            </div>
          </div>
          <div className="w-[800px] h-[0px] border max-xl:w-[60vw] border-stone-300"></div>

          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div>
              <span className="text-orange-400 md:text-6xl text-2xl font-bold font-['Anek Latin']">
                INR {costPerSqft.toLocaleString()}{" "}
              </span>
              <span className="text-black md:text-3xl text-base font-normal font-['Anek Latin']">
                per sq. ft
              </span>
            </div>
            <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin']">
              Approximately INR {estimateValue.toLocaleString()} for your BUA
              (Built-Up-Area)
            </div>
          </div>
          <div className="w-[800px] h-[0px] border max-xl:w-[60vw] border-stone-300"></div>
          <div className="justify-start items-start gap-5 inline-flex flex-wrap">
            <button
              onClick={() => setStep(step - 1)}
              className="p-4 bg-white rounded-full border border-orange-400 justify-center items-center gap-2.5 flex transition-transform transform hover:scale-110"
            >
              <div className="text-orange-400 text-xl font-normal font-['Anek Latin']">
                <IoArrowBackOutline/>
              </div>
            </button>
            <button
              onClick={validateEstimate}
              className=" px-10 py-4 bg-orange-400 rounded-[20px] border border-orange-400 justify-center items-center gap-2.5 inline-flex transition-transform transform hover:scale-110"
            >
              <div className="text-white text-base font-normal font-['Anek Latin']">
                Customize Estimate
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
