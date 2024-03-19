"use client";
import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { GroupedItemType, ItemDetails, step3Type } from "./_myTypes";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa";
// import * as xlsx from "xlsx";

const Step3: React.FC<step3Type> = ({
  step,
  setStep,
  estimateValue,
  groupedItems,
  setGroupedItems,
  quality,
  totalRate,
  costPerSqft,
}) => {
  const [popUpFormFlag, setPopUpFormFlag] = useState(false);
  const [popUpFormData, setPopUpFormData] = useState({
    email: "",
    phoneNo: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phoneNo: "",
  });
  const [info, setInfo] = useState({ desc: "", name: "" });
  const [desc, setDesc] = useState("");
  const [showOptions, setShowOptions] =
    useState<{ sectionId: number; showOptions: boolean }[]>();


  const containerRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the top of the container
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };


  useEffect(() => {
    // try {
    //   fetch("https://mocki.io/v1/ac384b6b-81b2-483e-89ab-507a48c4f516")
    //     .then((res) => res.json())
    //     .then((data) => setData(data));
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  // useEffect(() => {
  //   let options: { sectionId: number; showOptions: boolean }[] = [];
  //   data?.map((d) => {
  //     options.push({ sectionId: d.sectionID, showOptions: false });
  //   });
  //   setShowOptions(options);
  // }, [data]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPopUpFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log(popUpFormData);
  // }, [popUpFormData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", phoneNo: "" };

    // if(popUpFormData.email !== ""){
    //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(popUpFormData.email)) {
    //     newErrors.email = "If entering email please enter valid email!";
    //     valid = false;
    //   }
    // }

    if (!/^\d{10}$/.test(popUpFormData.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number format!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform actions with the form data here
      console.log("Form Data:", popUpFormData);

      try {
        const response = await fetch(
          "https://gwebvydn88.execute-api.ap-south-1.amazonaws.com/dev/api/user/estimator",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed
            },
            body: JSON.stringify({
              email: popUpFormData.email,
              phone: popUpFormData.phoneNo,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        toast.success("Form submitted sucessfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // console.log("Response Data:", responseData);

        setStep(step + 1); // Move to the next step after successful form submission
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Form submittion failed!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Invalid input!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const popUpForm = () => {
    return (
      <div className="fixed top-10 left-0 flex justify-center items-center w-full h-full bg-opacity-50 bg-gray-950 z-40">
        <form
          className="flex flex-col justify-around items-center w-[300px] h-[400px] gap-[23px] bg-gray-950 text-white font-normal text-lg border border-orange-400 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="justify-center items-center flex flex-col m-3 ">
            <label className="my-1" htmlFor="email">
              Email:{" "}
            </label>
            <input
              placeholder="useremail@mail.com"
              className="border rounded-lg p-1 text-black"
              type="email"
              id="email"
              name="email"
              defaultValue={popUpFormData.email}
              onChange={handleChange}
            />{" "}
            <span className="text-red-500">{errors.email}</span>
          </div>

          <div className="justify-center items-center flex flex-col m-3">
            <label className="my-1" htmlFor="phoneNo">
              Phone Number<span className="text-red-500">*</span>:{" "}
            </label>
            <input
              placeholder="Phone Number"
              className="border rounded-lg p-1 text-black"
              type="tel"
              id="phoneNo"
              name="phoneNo"
              defaultValue={popUpFormData.phoneNo}
              onChange={handleChange}
            />{" "}
            <span className="text-red-500">{errors.phoneNo}</span>
          </div>

          <button
            type="submit"
            className="w-[135px]  px-10 py-2.5 bg-orange-400 rounded-[20px] justify-center items-center gap-2.5 flex transition-transform transform hover:scale-110"
          >
            <div className="text-white text-base font-medium font-['Anek Latin']">
              Submit
            </div>
          </button>
        </form>
        <button
          className="text-red-500 bg-white font-bold text-lg mt-[-400px] ml-[-20px] rounded-full border border-red-400 px-2 "
          onClick={() => setPopUpFormFlag(false)}
        >
          X
        </button>
      </div>
    );
  };
  const handleProceed = () => {
    setPopUpFormFlag(true);
  };

  const handleOptions = (items: GroupedItemType) => {
    let temp = [...groupedItems];
    temp.map((d) => {
      if (d.itemName === items.itemName) {
        if (d.Selected === true) {
          d.Selected = false;
          setGroupedItems(temp);
          return;
        }
        d.Selected = true;
      } else {
        d.Selected = false;
      }
    });
    setGroupedItems(temp);
  };

  const onChangeHandle = (item: ItemDetails) => {
    let temp = [...groupedItems];
    // console.log(item)

    temp.map((d) => {
      if (d.Selected === true) {
        d.Selected = false;
        d.Category = item.Category;
      }
    });
    setGroupedItems(temp);
  };

  const handleReset = () => {
    let temp = [...groupedItems];

    temp.map((d) => {
      let q = "";
      if (quality === 1) {
        q = "Base";
      } else if (quality === 2) {
        q = "Classic";
      } else if (quality === 3) {
        q = "Premium";
      } else if (quality === 4) {
        q = "Luxury";
      } else {
        q = "Ultra-luxury";
      }
      d.Selected = false;
      d.Category = q;
    });
    setGroupedItems(temp);
  };

  // const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const data = e.target?.result;
  //       const workbook = xlsx.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[1];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const json = xlsx.utils.sheet_to_json(worksheet);
  //       console.log(json);
  //     };
  //     reader.readAsArrayBuffer(e.target.files[0]);
  //   }
  // };

  const showDesc = (items: GroupedItemType) => {
    items.items.map((item) => {
      if (items.Category === item.Category) {
        if (items.itemName === info.name) {
          setInfo({ desc: "", name: "" });
          return;
        }
        setInfo({ desc: item["Long Description"], name: items.itemName });
      }
    });
  };

  // useEffect(() => {
  //   setDesc()
  // },[])

  return (
    <div
      className={` flex-col justify-start items-start gap-[23px] flex w-[899px] max-xl:w-[90vw] h-auto p-5 pt-3 pb-6 bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg border border-orange-400  ${step !== 3 ? "hidden" : ""
        }`}
    >
      {popUpFormFlag && popUpForm()}

      {/* <input type="file" accept=".xls,.xlsx" onChange={readUploadFile} /> */}
      <span className="text-center text-black md:text-sm text-xs font-normal font-['Anek Latin']">
        Step 3/5
      </span>
      <div className="scroll-container-wrapper relative">
        <div
          ref={containerRef}
          className=" scroll-container grid grid-cols-3  gap-4 max-lg:flex max-lg:flex-wrap justify-between self-start items-start max-h-[300px] overflow-y-auto overflow-x-hidden">

          {groupedItems?.map((d, i) => {
            return (
              <div
                key={i}
                className="h-full max-sm:mx-0 max-lg:w-[300px] max-sm:w-auto flex flex-col gap-2 justify-between items-start relative"
              >
                <div className="flex flex-col justify-center items-start">
                  <div className="self-stretch justify-between w-[280px] inline-flex max-sm:flex-col-2 text-wrap text-left max-sm:items-start ">
                    <div className="flex-col justify-start items-start inline-flex text-left">
                      <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin'] max-sm:w-[65vw]">
                        {d.itemName}
                      </div>

                      {/* <div className="text-black md:text-sm text-xs font-normal font-['Anek Latin']">
                      Rathi, Kamdhenu or equivalent
                    </div> */}
                    </div>
                    <div className="flex relative right-0">
                      <button
                        onClick={() => handleOptions(d)}
                        className="transition-transform transform hover:scale-110 w-[30px] object-contain"
                      >
                        <Image
                        width={1000}
                        height={1000}
                          src="images/pen.svg"
                          alt="Detailed Description"
                          className="w-[20px] h-auto"
                        />
                      </button>
                      <button
                        onClick={() => showDesc(d)}
                        className="transition-transform transform hover:scale-110 w-[30px] object-contain"
                      >
                        <Image
                        width={1000}
                        height={1000}
                          src="images/info.svg"
                          alt="Detailed Description"
                          className="w-[20px] h-auto"
                        />
                      </button>
                      {info.name === d.itemName && (
                        <div
                          className={`absolute z-20 font-normal bg-orange-50 mt-8 justify-center m-auto p-1 w-[400px]   max-xl:ml-[-25vw] max-sm:mx-2 max-sm:w-[90vw] max-sm:left-[2vw]  rounded-xl text-wrap ${
                            (i + 1) % 3 === 0
                              ? "ml-[-350px] max-xl:ml-[-25vw]"
                              : ""
                          }`}
                        >
                          {info.desc}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-black md:text-sm text-xs mr-2 w-[200px] font-font-normal font-['Anek Latin']">
                    {d.items.map((i, index) => {
                      if (d.Category === i.Category) {
                        return (
                          <div key={index}>
                            {i.Description.slice(0, 60)}{" "}
                            {i.Description.length > 60 ? " ..." : ""}
                          </div>
                        );
                      }
                    })}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleOptions(d)}
                    className="w-[252px] max-sm:w-[200px] h-[50px] p-2.5 bg-neutral-100 border border-orange-400 justify-start items-center gap-2.5 inline-flex transition-transform transform rounded-lg"
                  >
                    <div className="grow shrink basis-0 ">
                      {d.items.map((i, index) => {
                        if (d.Category === i.Category) {
                          return (
                            <span key={index}>
                              <span className="text-black md:text-sm text-xs font-bold font-['Anek Latin']">
                                INR
                              </span>{" "}
                              {i.Rate}
                              <span className="text-black md:text-sm text-xs font-font-normal font-['Anek Latin']">
                                {" "}
                                {i.Unit}
                              </span>
                            </span>
                          );
                        }
                      })}
                    </div>
                  </button>
                  <div className="relative">
                    <div
                      className={`${
                        d.Selected === true
                          ? `absolute top-0 left-0   z-20 font-normal bg-gray-100 border-orange-400 border justify-center m-auto w-[252px] text-wrap rounded-lg ${
                              (i + 1) % 3 === 0 ? "" : ""
                            }`
                          : "hidden"
                      }`}
                    >
                      {" "}
                      <span className="font-bold text-orange-500 md:text-2xl text-base">
                        Choose product
                      </span>
                      {d.items.map((item, i) => {
                        return (
                          <div
                            className="  flex flex-col m-auto justify-center"
                            key={i}
                          >
                            <label
                              className={`border border-orange-400 bg-gradient-to-r text-[1rem] font-normal justify-center m-auto p-1 w-[250px]  text-wrap ${
                                item.Category === d.Category
                                  ? "bg-orange-400 text-white"
                                  : "bg-white text-black hover:from-amber-50 hover:via-amber-100 hover:to-amber-50"
                              } ${
                                i + 1 === d.items.length ? "rounded-b-lg" : ""
                              }`}
                              htmlFor={i.toString()}
                            >
                              <span className="font-bold">Description: </span>
                              <span>{item.Description}</span>
                              <br />
                              <span className="font-bold">Rate: </span>
                              <span>INR {item.Rate}</span>
                            </label>
                            <input
                              type="radio"
                              name={item.Item}
                              value={item.Rate}
                              checked={item.Category === d.Category}
                              id={i.toString()}
                              onChange={() => onChangeHandle(item)}
                              className="hidden"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>{" "}
                {(i + 1) % 3 !== 0 && i !== groupedItems.length - 1 && (
                  <div className=" max-lg:hidden w-[0px] h-full absolute right-0 top-0 origin-top-left border border-stone-300"></div>
                )}
              </div>
            );
          })}

        </div>
        <button
          onClick={scrollToTop}
          className="scroll-up-button absolute bottom-4 right-4 hover:border-2 border-2 border-orange-400 text-orange-400 text-lg p-4 rounded-full cursor-pointer"
        >
          <FaArrowUp />
        </button>
      </div>
      <div className="w-[800px] h-[0px] max-xl:w-[80vw] mt-4 border border-stone-300"></div>


      <div className="flex-col justify-start items-start gap-2.5 flex">
        <div>
          <span className="text-orange-400 md:text-6xl text-3xl font-bold font-['Anek Latin']">
            INR {costPerSqft.toLocaleString()}{" "}
          </span>
          <span className="text-black md:text-2xl text-base font-normal font-['Anek Latin']">
            per sq. ft
          </span>
        </div>
        <div className="text-black md:text-2xl text-base font-normal font-['Anek Latin']">
          Approximately INR {estimateValue.toLocaleString()} for your BUA
          (Built-Up-Area)
        </div>
      </div>
      <div className="w-[800px] h-[0px] max-xl:w-[60vw] border border-stone-300"></div>
      <div className="justify-start items-start gap-5 inline-flex flex-wrap">
        <ScrollLink to="estimatorSection" smooth={false}>
          <button
            onClick={() => setStep(step - 1)}
            className=" p-4 bg-white rounded-full border border-orange-400 justify-center items-center gap-2.5 flex transition-transform transform hover:scale-110"
          >
            <div className="text-orange-400 text-xl font-normal font-['Anek Latin']">
              <IoArrowBackOutline />
            </div>
          </button>
        </ScrollLink>
        <ScrollLink to="estimatorSection" smooth={false}>
          <button
            onClick={handleProceed}
            className="p-4 bg-orange-400 rounded-full justify-center items-center gap-2.5 flex transition-transform transform hover:scale-110"
          >
            <div className="text-white text-xl font-normal font-['Anek Latin']">
              <FaCheck />
            </div>
          </button>
        </ScrollLink>
        <section>
          <button
            onClick={handleReset}
            className="p-4 bg-white rounded-full border border-orange-400 justify-center items-center gap-2.5 inline-flex transition-transform transform hover:scale-110"
          >
            <div className="text-orange-400 text-xl font-normal font-['Anek Latin']">
              <FiRefreshCw />
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Step3;
