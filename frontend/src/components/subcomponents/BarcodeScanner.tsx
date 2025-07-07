import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!code) {
      const codeReader = new BrowserMultiFormatReader();

      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result, _, controls) => {
          if (result) {
            setCode(result.getText());
            controls.stop();
          }
        },
      );
    }
  }, [code]);

  return (
    <>
      <div className="pt-8">
        {code === "" ? (
          <video
            ref={videoRef}
            className="w-full max-h-[70svh] rounded-2xl object-cover"
          />
        ) : (
          <div className="flex-col">
            <div className="flex-col text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Scan Successful
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Code: {code}</p>
            </div>
            <div className="flex mt-4 gap-4 w-full justify-center">
              <button
                className="flex items-center gap-2 mt-4 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md hover:shadow-md cursor-pointer transition-all duration-300"
                onClick={() => setCode("")}
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 hover:shadow-md cursor-pointer transition-all duration-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BarcodeScanner;
