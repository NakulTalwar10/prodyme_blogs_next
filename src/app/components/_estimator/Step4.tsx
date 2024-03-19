"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFFile } from './_components/PDFFile';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { step4Type, stepType } from './_myTypes'; 

export const Step4: React.FC<step4Type> = ({
  step,
  setStep,
  estimateValue,
  groupedItems,
  setGroupedItems,
  quality,
  totalRate,
  reset,
  costPerSqft,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProceed = () => {
    reset();
  };

  return (
    <>
      {isClient && (
        <div
          className={`w-[899px] max-xl:w-[90vw] h-auto gap-[30px] pt-3  pb-6 bg-white rounded-bl-lg rounded-br-lg border border-orange-400 flex-col justify-start items-start inline-flex pl-5 ${
            step !== 4 ? 'hidden' : ''
          }`}
        >
          <div className="w-[899px] max-lg:w-[90vw] h-auto">
            <div className="flex flex-col mx-2 my-5 justify-between items-start gap-5 relative">
              {groupedItems.map((item: any, index: number) => { 
                return (
                  <div key={index}>
                    <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] max-sm:w-[80vw]">
                      {item.itemName}
                    </div>
                    {item.items.map((i: any, subIndex: number) => { 
                      if (item.Category === i.Category) {
                        return (
                          <span key={subIndex} className="text-orange-400">
                            <span className="text-black md:text-base text-sm font-bold font-['Anek Latin']">
                              INR
                            </span>{' '}
                            {i.Rate}
                            <span className="text-black md:text-base text-sm font-light font-['Anek Latin']">
                              {' '}
                              {i.Unit}
                            </span>
                          </span>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col mx-2 my-5 justify-between items-start gap-5 relative">
              <div>
                <span className="text-orange-400 md:text-6xl text-3xl font-bold font-['Anek Latin']">
                  INR {costPerSqft.toLocaleString()}{' '}
                </span>
                <span className="text-black md:text-2xl text-base font-normal font-['Anek Latin']">
                  per sq. ft
                </span>
              </div>
              <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] max-sm:w-[80vw]">
                Approximately INR {estimateValue.toLocaleString()} for your BUA
                (Built-Up-Area)
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-5 inline-flex flex-wrap my-5 ">
            <PDFDownloadLink
              document={
                <PDFFile
                  step={step}
                  setStep={setStep}
                  estimateValue={estimateValue}
                  groupedItems={groupedItems}
                  setGroupedItems={setGroupedItems}
                  quality={quality}
                  totalRate={totalRate}
                  costPerSqft={costPerSqft}
                />
              }
              fileName="Generated Estimate"
              className="w-[200px] px-10 py-2.5 bg-white rounded-[20px] border border-orange-400 justify-start items-start gap-2.5 flex transition-transform transform hover:scale-110"
            >
              <div className="text-orange-400 text-base font-normal font-['Anek Latin']">
                Download PDF
              </div>
            </PDFDownloadLink>
            <ScrollLink to="estimatorSection" smooth={false}>
              <button
                onClick={handleProceed}
                className="w-[250px] px-10 py-2.5 bg-orange-400 rounded-[20px] justify-start items-start gap-2.5 flex transition-transform transform hover:scale-110"
              >
                <div className="text-white text-base font-normal font-['Anek Latin']">
                  Generate New Budget
                </div>
              </button>
            </ScrollLink>
          </div>
        </div>
      )}
    </>
  );
};
