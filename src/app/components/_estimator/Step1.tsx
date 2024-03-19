"use client";

import React, { useEffect, useState } from "react";
import { step1Type } from "./_myTypes";
import Select from 'react-select';

const Step1: React.FC<step1Type> = ({
  step,
  setStep,
  setBasementArea,
  setBuildUpArea,
}) => {
  const [bUnit, setBUnit] = useState<number>(1);
  const [aUnit, setAUnit] = useState<number>(1);
  const [bValue, setBValue] = useState<number>(NaN);
  const [aValue, setAValue] = useState<number>(NaN);
  const [basement, setBasement] = useState(true);
  const [errors, setErrors] = useState<{
    aUnit: string;
    bUnit: string;
    aValue: string;
    bValue: string;
  }>({ aUnit: "", bUnit: "", aValue: "", bValue: "" });

  const options = [
    { value: 1, label: "Square Feet (Sq. ft)"},
    { value: 1 / 0.09290304, label: "Square Meter (Sq. mt)" },
    { value: 9, label: "Square Yard (Sq. yd)" },
  ];

  useEffect(() => {
    if (basement) {
      setBasementArea(Math.round(bUnit * bValue));
    } else {
      setBasementArea(0);
    }
    //   console.log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bUnit, bValue, basement]);

  useEffect(() => {
    setBuildUpArea(Math.round(aUnit * aValue));
    //   console.log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aUnit, aValue]);

  const validate = (): boolean => {
    let valid = true;
    let errors = { aUnit: "", bUnit: "", aValue: "", bValue: "" };
    if (aUnit === 0) {
      errors.aUnit = "* Select Unit!";
      valid = false;
    } else {
      errors.aUnit = "";
    }
    if (Number.isNaN(aValue)) {
      errors.aValue = "* Enter Value!";
      valid = false;
    } else if (aValue <= 0) {
      errors.aValue = "* Area can not be 0 or less!";
      valid = false;
    } else {
      errors.aValue = "";
    }
    if (basement === true) {
      if (bUnit === 0) {
        errors.bUnit = "* Select Unit!";
        valid = false;
      } else {
        setErrors({ ...errors, bUnit: "" });
      }
      if (Number.isNaN(bValue)) {
        errors.bValue = "* Enter Value!";
        valid = false;
      } else if (bValue <= 0) {
        errors.bValue = "* Area can not be 0 or less!";
        valid = false;
      } else {
        errors.bValue = "";
      }
    }
    setErrors(errors);
    return valid;
  };

  const handleProceed = () => {
    const valid = validate();
    //console.log(aValue, errors);
    if (valid === true) {
      setStep(step + 1);
    }
  };

  return (
    <>
      <div
        className={`w-[899px] max-xl:w-[90vw] h-auto gap-[30px] pt-3  pb-6 bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg border border-orange-400 flex-col justify-start items-start inline-flex ${
          step !== 1 ? "hidden" : ""
        }`}
      >
        <div className="flex-col justify-start items-start gap-[23px] flex">
          <div className="pl-5 justify-start items-start gap-2.5 inline-flex">
            <div className="text-center text-black md:text-sm text-xs font-normal font-['Anek Latin']">
              Step 1/5
            </div>
          </div>
        </div>
        <div className="pl-5 flex-col justify-start items-start gap-5 flex">
          <div className="flex-col justify-start items-start gap-5 flex">
            <span className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] ">
              Provide us your expected built up area:
            </span>
            <div className="justify-start items-start gap-5 inline-flex max-md:flex-col">
              <div className="flex flex-col">
                <input
                  type="number"
                  min="1"
                  placeholder="like 1800..."
                  onChange={(e) => setAValue(parseFloat(e.target.value))}
                  className="flex w-[200px] h-[38px] p-2.5 bg-neutral-100 rounded-lg border border-orange-400 justify-start items-center gap-2.5 text-black md:text-sm text-xs font-normal font-['Anek Latin']"
                />
                <span className="text-red-500 pt-2">{errors.aValue}</span>
              </div>
              <div className="flex flex-col">
                {/* <select
                  className={`flex w-[200px] h-[38px] p-2.5 bg-neutral-100 rounded-lg justify-start items-center gap-2.5 grow shrink basis-0 text-black md:text-sm text-xs font-normal font-['Anek Latin'] ${
                    aUnit === 0 ? "opacity-50" : ""
                  }`}
                  onChange={(e) => setAUnit(parseInt(e.target.value))}
                  defaultValue={1}
                >
                  <option value={0} disabled className="hidden">
                    Unit of measurment
                  </option>
                  <option value={1 / 0.09290304}>Square Meters (Sq. mt)</option>
                  <option value={9}>Square Yards (Sq. yd)</option>
                  <option value={1}>Square Feet (Sq. ft)</option>
                </select> */}
                <Select
                  defaultValue={options[0]}
                  onChange={(selectedOption) => {
                    if (
                      selectedOption &&
                      typeof selectedOption.value === "number"
                    ) {
                      const selectedValue = selectedOption.value;
                      setAUnit(selectedValue);
                    }
                  }}
                  options={options}
                  instanceId="unique-instance-id" // Add a unique instanceId
                  inputId="my-select-input-id" // Set a unique ID for the input element
                  classNames={{
                    control: (state) =>
                      "bg-neutral-100 rounded-lg justify-start items-center text-black md:text-sm text-xs font-normal ",
                  }}
                />
                <span className="text-red-500 pt-2">{errors.aUnit}</span>
              </div>
            </div>
          </div>
          <div className="w-[800px] max-xl:w-[60vw] h-[0px] border border-stone-300"></div>
          <div className="flex-col justify-start items-start gap-5 flex">
            <div className="justify-start items-center gap-1 flex ">
              <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] ">
                Planning to build a basement?
              </div>
              <div className="w-[31px] h-[17px]">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={basement}
                    onChange={() => setBasement(!basement)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-100  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400 "></div>
                </label>
              </div>
            </div>

            <div className={basement ? "" : "hidden"}>
              <div className="w-[420px] max-xl:w-[30vw] h-[0px] border border-stone-300 mb-5"></div>
              <div className="flex-col justify-start items-start gap-5 flex">
                <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] ">
                  Provide us your expected basement area:
                </div>
                <div className="justify-start items-start gap-5 inline-flex max-md:flex-col">
                  <div className="flex flex-col">
                    <input
                      type="number"
                      min="0"
                      placeholder="like 1800..."
                      onChange={(e) => setBValue(parseFloat(e.target.value))}
                      className="flex w-[200px] h-[38px] p-2.5 bg-neutral-100 rounded-lg border border-orange-400 justify-start items-center gap-2.5 text-black md:text-sm text-xs font-normal font-['Anek Latin']"
                    />
                    <span className="text-red-500 pt-2">{errors.bValue}</span>
                  </div>
                  <div className="flex flex-col">
                    <Select
                      defaultValue={options[0]}
                      options={options}
                      onChange={(selectedOption) => {
                        if (
                          selectedOption &&
                          typeof selectedOption.value === "number"
                        ) {
                          const selectedValue = selectedOption.value;
                          setBUnit(selectedValue);
                        }
                      }}
                      instanceId="unique-instance-id" // Add a unique instanceId
                      inputId="my-select-input-id" // Set a unique ID for the input element
                      classNames={{
                        control: (state) =>
                          "bg-neutral-100 rounded-lg justify-start items-center text-black md:text-sm text-xs font-normal ",
                      }}
                    />
                    <span className="text-red-500 pt-2">{errors.bUnit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[800px] max-xl:w-[60vw] h-[0px] border border-stone-300"></div>
          <div className="justify-start items-start gap-5 inline-flex">
            <button
              onClick={handleProceed}
              className="w-[135px] px-10 py-2.5 bg-orange-400 rounded-[20px] justify-center items-center gap-2.5 flex transition-transform transform hover:scale-110"
            >
              <div className="text-white text-base font-normal font-['Anek Latin']">
                Proceed
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
