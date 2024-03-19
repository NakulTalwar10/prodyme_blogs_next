import React, { useEffect, useState } from 'react'
import { stepType } from './_myTypes';
import Image from 'next/image';

export const SideBar: React.FC<stepType> = ({ step, setStep, buildUpArea, quality })=> {
  const [qValue, setQValue] = useState("");
  useEffect(() => {
    if (quality === 1) {
      setQValue("Base");
    } else if (quality === 2) {
      setQValue("Classic");
    } else if (quality === 3) {
      setQValue("Premium");
    } else if (quality === 4) {
      setQValue("Luxury");
    } else if (quality === 5) {
      setQValue("Ultra-luxury");
    }
  }, [quality]);
  return (
    <div className="mt-2  flex min-[1280px]:flex-col text-center sticky top-[20px]">
      <div
        className={`${
          step === 1
            ? "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6 bg-orange-400 min-[1280px]:rounded-tl-lg min-[1280px]:rounded-bl-lg justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-white md:text-xl text-base max-sm:text-base font-bold font-['Anek Latin'] max-xl:rounded-t-lg max-xl:rounded-r-lg max-sm:p-2"
            : "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6 bg-zinc-300 min-[1280px]:rounded-tl-lg justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-black md:text-xl text-base max-sm:text-base font-normal font-['Anek Latin'] max-xl:rounded-tl-lg max-sm:p-2"
        }`}
      >
        <div className="">
          {isNaN(buildUpArea) ? 0 : buildUpArea.toLocaleString()} Sq. ft
        </div>
        <div
          className={
            step === 1 ? " hidden" : "w-[26px] h-[26px] relative max-sm:hidden"
          }
        >
          <img
            className="w-[26px] h-[26px] left-0 top-0 object-cover absolute rounded-full border-2 border-black"
            src="images/ok.svg"
            alt="ok"
          />
        </div>
      </div>
      <div
        className={
          step === 1
            ? "w-[300px] max-xl:w-[30vw] h-[80px] px-5 py-6 max-sm:h-[60px]  min-[1280px]:rounded-bl-lg justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-orange-400 md:text-xl text-base max-sm:text-base font-normal font-['Anek Latin'] max-xl:rounded-lg max-sm:p-2"
            : step === 2
            ? "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6 bg-orange-400  min-[1280px]:rounded-bl-lg justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-white md:text-xl text-base max-sm:text-base font-bold font-['Anek Latin'] max-sm:p-2"
            : "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6 bg-zinc-300  justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-black md:text-xl text-base  max-sm:text-base font-normal font-['Anek Latin'] max-sm:p-2"
        }
      >
        <div className="">{qValue} </div>
        <div
          className={
            step <= 2 ? " hidden" : "w-[26px] h-[26px] relative max-sm:hidden"
          }
        >
          <img
            className="w-[26px] h-[26px] left-0 top-0 object-cover absolute rounded-full border-2 border-black"
            src="images/ok.svg"
            alt="ok"
          />
        </div>
      </div>
      <div
        className={
          step <= 2
            ? "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6  min-[1280px]:rounded-bl-lg max-xl:rounded-r-lg justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-orange-400 md:text-xl text-base max-sm:text-base font-normal font-['Anek Latin'] max-sm:p-2"
            : step === 3
            ? "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6 bg-orange-400  min-[1280px]:rounded-bl-lg max-xl:rounded-r-lg justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-white md:text-xl text-base max-sm:text-base font-bold font-['Anek Latin']  max-sm:mx-0 max-sm:p-2"
            : "w-[300px] max-xl:w-[30vw] h-[80px] max-sm:h-[60px] px-5 py-6 bg-zinc-300  justify-end max-sm:justify-center max-xl:justify-center items-start gap-2.5 inline-flex text-black md:text-xl text-base max-sm:text-base font-normal font-['Anek Latin']  max-sm:mx-0 max-sm:p-2"
        }
      >
        <div className="">Customize Estimator</div>
        <div
          className={
            step <= 3 ? " hidden" : "w-[26px] h-[26px] relative max-sm:hidden "
          }
        >
          <img
            className="w-[26px] h-[26px] object-cover left-0 top-0 absolute rounded-full border-2 border-black"
            src="images/ok.svg"
            alt="ok"
          />
        </div>
      </div>
    </div>
  );
}