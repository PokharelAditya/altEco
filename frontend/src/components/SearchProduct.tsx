import React, { useState } from "react";
import BarcodeScanner from "./subcomponents/BarcodeScanner";
import PromptInput from "./subcomponents/PromptInput";

const SearchProduct: React.FC = () => {
  const [method, setMethod] = useState<string>("prompt");

  type option = {
    label: string;
    method: string;
    icon: React.ReactElement;
  };

  const options: option[] = [
    {
      label: "Input Prompt",
      method: "prompt",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m7 11 2-2-2-2" />
          <path d="M11 13h4" />
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        </svg>
      ),
    },
    {
      label: "Scan Barcode",
      method: "barcode",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <path d="M8 7v10" />
          <path d="M12 7v10" />
          <path d="M17 7v10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex-col mx-4 my-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex my-4 max-w-2xl mx-auto shadow-lg rounded-full">
        {options.map((o, index) => (
          <button
            key={index}
            className={`flex gap-4 w-full py-4 items-center justify-center text-sm font-medium transition-all duration-300
              ${o.method === method ? "bg-green-600 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"}
              ${index === 0 ? "rounded-l-full" : "rounded-r-full"}`}
            onClick={() => setMethod(o.method)}
          >
            {o.icon}
            <span>{o.label}</span>
          </button>
        ))}
      </div>
      {method === "barcode" ? <BarcodeScanner /> : <PromptInput />}
    </div>
  );
};

export default SearchProduct;
