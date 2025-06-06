"use client";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import dynamic from "next/dynamic";
import Image from "next/image";
const MultiSelect = dynamic(() => import("../components/MultiSelect"), {
  ssr: false,
});

// For backward compatability
export default function test() {
  const options = [
    { value: 0, label: "Red" },
    { value: 1, label: "Green" },
    { value: 2, label: "Blue" },
    { value: 3, label: "Orange" },
    { value: 4, label: "Yellow" },
    { value: 5, label: "Pink" },
  ];
  const [optionSelected, setSelected] = useState<Option[] | null>();

  const handleChange = (selected: Option[]) => {
    setSelected(selected);
    console.log(selected);
  };
  return (
    <>
      hellow you are there
      <MultiSelect
        key="example_id"
        options={options}
        onChange={handleChange}
        value={optionSelected}
        isSelectAll={true}
        menuPlacement={"bottom"}
      />
    </>
  );
}
