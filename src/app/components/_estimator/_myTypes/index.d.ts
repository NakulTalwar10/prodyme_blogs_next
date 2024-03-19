import React, { Dispatch, SetStateAction } from "react";

interface step1Type {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setBuildUpArea: Dispatch<SetStateAction<number>>;
  setBasementArea: Dispatch<SetStateAction<number>>;
}
interface step2Type {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  quality: number;
  setQuality: Dispatch<SetStateAction<number>>;
  estimateValue: number;
  generateEstimate: () => void;
  totalRate: number;
  costPerSqft: number;
}

interface step3Type {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  estimateValue: number;
  groupedItems: GroupedItemType[];
  setGroupedItems: Dispatch<SetStateAction<GroupedItemType[]>>;
  quality: number;
  totalRate: number;
  costPerSqft: number;
}
interface step4Type {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  estimateValue: number;
  groupedItems: GroupedItemType[];
  setGroupedItems: Dispatch<SetStateAction<GroupedItemType[]>>;
  quality: number;
  totalRate: number;
  reset: () => void;
  costPerSqft: number;
}

interface stepType {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  buildUpArea: number;
  quality: number;
}

interface eventType {
  // other props...
  onSelect: (e: ChangeEvent<HTMLElement>) => void;
}
interface ItemDetails {
  Item: string;
  Category: string;
  Description: string; // Allow both string and number for Description
  "Long Description": string;
  Rate: string;
  Unit?: string;
}
interface GroupedItemType {
  itemName: string;
  Category: string;
  Selected: boolean;
  items: ItemDetails[];
}

module.exports = {
  step1Type,
  step2Type,
  eventType,
  stepType,
  ItemDetails,
  GroupedItemType,
};