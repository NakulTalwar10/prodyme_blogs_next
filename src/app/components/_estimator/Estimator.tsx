"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import { Step2 } from "./Step2";
import Step3 from "./Step3";
import { SideBar } from "./SideBar";
import test2 from "../../../../test/test2.json";
import { GroupedItemType, ItemDetails } from "./_myTypes";
import { Step4 } from "./Step4";

const Estimator = () => {
  const [groupedItems, setGroupedItems] = useState<GroupedItemType[]>([]);
  const [step, setStep] = useState(1);
  const [basementArea, setBasementArea] = useState(0);
  const [buildUpArea, setBuildUpArea] = useState(0);
  const [costPerSqft, setCostPerSqft] = useState(0);
  const [quality, setQuality] = useState(0);
  const [totalRate, setRateSum] = useState(0);
  const [estimateValue, setEstimateValue] = useState(0);
  const [flag, setFlag] = useState(false);
  const [resetFlag, setResetFlag] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gwebvydn88.execute-api.ap-south-1.amazonaws.com/dev/api/estimator/getItems"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const APIdata = await response.json();
        // console.log(APIdata);

        const groupedItems: GroupedItemType[] = [];



        APIdata.forEach((item: ItemDetails) => {
          const itemName = item.Item;
          const category = "Base"; // Set your desired category here

          // Check if there's an existing group for this itemName
          const existingGroup = groupedItems.find(
            (group) => group.itemName === itemName
          );

          if (existingGroup) {
            existingGroup.items.push(item);
          } else {
            // If not, create a new group
            groupedItems.push({
              itemName,
              Category: category,
              items: [item],
              Selected: false,
            });
          }
        });
        setGroupedItems(groupedItems);
        // console.log(groupedItems, "hello");
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // const groupedItems: GroupedItemType[] = [];

    // test2.forEach((item) => {
    //   const itemName = item.Item;
    //   const category = "Base"; // Set your desired category here

    //   // Check if there's an existing group for this itemName
    //   const existingGroup = groupedItems.find(
    //     (group) => group.itemName === itemName
    //   );

    //   if (existingGroup) {
    //     existingGroup.items.push(item);
    //   } else {
    //     // If not, create a new group
    //     groupedItems.push({
    //       itemName,
    //       Category: category,
    //       items: [item],
    //       Selected: false,
    //     });
    //   }
    // });
    // setGroupedItems(groupedItems);
    // console.log(groupedItems, "hello");
  }, []);

  useEffect(() => {
    // console.log(groupedItems, "hello");
    if (flag === true) {
      generateEstimate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupedItems]);

  function groupItemsWithCategory(newCategory: string): void {
    let sourceData = [...groupedItems];
    sourceData.map((item) => {
      item.Category = newCategory;
    });
    // console.log(sourceData)
    setGroupedItems(sourceData);

    // console.log(groupedItems);
  }

  useEffect(() => {
    let temp: GroupedItemType[] = groupedItems;
    if (quality === 1) {
      groupItemsWithCategory("Base");
    } else if (quality === 2) {
      groupItemsWithCategory("Classic");
    } else if (quality === 3) {
      groupItemsWithCategory("Premium");
    } else if (quality === 4) {
      groupItemsWithCategory("Luxury");
    } else if (quality === 5) {
      groupItemsWithCategory("Ultra-luxury");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  const generateEstimate = () => {
    let totalArea: number;
    let totalRate: number = 0;
    if (Number.isNaN(basementArea)) {
      totalArea = buildUpArea;
    } else {
      totalArea = basementArea * 1.5 + buildUpArea;
    }
    groupedItems.map((items) => {
      items.items.map((item) => {
        if (items.Category === item.Category) {
          const rate = parseFloat(item.Rate);

          if (!isNaN(rate)) {
            totalRate += rate;
          }
        }
      });
    });
    setCostPerSqft((totalArea * totalRate) / buildUpArea);
    setRateSum(totalRate);
    setEstimateValue(totalArea * totalRate);
    setFlag(true);
  };

  const reset = () => {
    setStep(1);
    setBasementArea(0);
    setBuildUpArea(0);
    setQuality(0);
    setRateSum(0);
    setEstimateValue(0);
    setResetFlag(false);
  };

  useEffect(() => {
    setResetFlag(true);
  }, [resetFlag]);

  return (
    <>
      {resetFlag && (
        <div className="w-[100%] h-auto p-5 bg-zinc-100 flex-col  justify-center items-center inline-flex  ">
          <div className="my-4">
            <span className="text-black md:text-[32px] text-[20px] font-normal font-['Anek Latin']">
              Use the{" "}
            </span>
            <span className="text-black md:text-[32px] text-[20px] font-bold font-['Anek Latin']">
              Smart Estimator
            </span>
            <span className="text-black md:text-[32px] text-[20px] font-normal font-['Anek Latin']">
              {" "}
              to get the most detailed preliminary budget:
            </span>
          </div>

          <div className="flex max-xl:flex-col h-auto ">
            {" "}
            <div className="flex-grow">
              {" "}
              <SideBar
                step={step}
                setStep={setStep}
                buildUpArea={buildUpArea}
                quality={quality}
              />
            </div>
            <div className="flex flex-col">
              <div
                className={`border-4 h-0 border-orange-400 transition-all ease-out duration-1000 m-0 ${
                  step === 1
                    ? "w-[5vw]"
                    : step === 2
                    ? "w-[30vw]"
                    : step === 3
                    ? "w-[40vw]"
                    : step === 4
                    ? "max-xl:w-[90vw] w-[899px]"
                    : "w-[0px]"
                }`}
              ></div>
              <Step1
                step={step}
                setStep={setStep}
                setBuildUpArea={setBuildUpArea}
                setBasementArea={setBasementArea}
              />

              <Step2
                quality={quality}
                step={step}
                setStep={setStep}
                setQuality={setQuality}
                estimateValue={estimateValue}
                generateEstimate={generateEstimate}
                totalRate={totalRate}
                costPerSqft={costPerSqft}
              />
              <Step3
                step={step}
                setStep={setStep}
                estimateValue={estimateValue}
                groupedItems={groupedItems}
                setGroupedItems={setGroupedItems}
                quality={quality}
                totalRate={totalRate}
                costPerSqft={costPerSqft}
              />
              <Step4
                step={step}
                setStep={setStep}
                estimateValue={estimateValue}
                groupedItems={groupedItems}
                setGroupedItems={setGroupedItems}
                quality={quality}
                totalRate={totalRate}
                reset={reset}
                costPerSqft={costPerSqft}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Estimator;
