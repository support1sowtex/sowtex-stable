"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const MultiSelect = dynamic(() => import("../components/MultiSelect"), {
  ssr: false,
});

type Option = {
  value: number;
  label: string;
};

export default function Test() {
  const options: Option[] = [
    { value: 0, label: "Red" },
    { value: 1, label: "Green" },
    { value: 2, label: "Blue" },
    { value: 3, label: "Orange" },
    { value: 4, label: "Yellow" },
    { value: 5, label: "Pink" },
  ];

  const [optionSelected, setSelected] = useState<Option[] | null>(null);

  const handleChange = (selected: Option[]) => {
    setSelected(selected);
    console.log(selected);
  };

  return (
    <>
      <p>Hello, you are there!</p>
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
