"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { step3Type } from "../_myTypes";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section2: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: "40px",
    color: "#f97316",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  rate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f97316",
  },
  rate2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f97316",
    marginLeft: 10,
    paddingLeft: 10,
  },
});

export const PDFFile: React.FC<step3Type> = ({
  step,
  setStep,
  estimateValue,
  groupedItems,
  setGroupedItems,
  quality,
  totalRate,
  costPerSqft,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div className="flex flex-col">
          {groupedItems.map((item, index) => (
            <View key={index} style={styles.section}>
              <div>
                <Text style={styles.itemName}>{item.itemName}</Text>
              </div>
              {item.items.map((i, subIndex) => {
                if (item.Category === i.Category) {
                  return (
                    <div key={subIndex}>
                      <View key={subIndex}>
                        <div>
                          <Text style={styles.description}>
                            {i.Description}
                          </Text>
                        </div>
                        <div className="">
                          <Text style={styles.rate}>
                            INR {i.Rate} {i.Unit}
                          </Text>
                        </div>
                      </View>
                    </div>
                  );
                }
              })}
            </View>
          ))}
        </div>
        <div className="flex flex-col max-sm:text-center">
          <View>
            <div>
              <Text style={styles.section2}>
                INR {costPerSqft.toLocaleString()} per sqft
              </Text>
            </div>
            <div className="">
              <Text style={styles.rate2}>
                Approximately INR {estimateValue.toLocaleString()} for your BUA
                (Built-Up-Area)
              </Text>
            </div>
          </View>
        </div>
      </Page>
    </Document>
  );
};
