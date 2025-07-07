import { useEffect, useRef, useState } from "react"
import { BrowserMultiFormatReader, BrowserCodeReader } from "@zxing/browser"
// import { BrowserCodeReader } from "@zxing/browser"
// import { DecodeHintType, BarcodeFormat } from "@zxing/library"

const BarcodeScanner: React.FC = () => {
  
  const [ code, setCode ] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null) 

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    // new Map().set(
    //   DecodeHintType.POSSIBLE_FORMATS, [
    //   BarcodeFormat.QR_CODE,
    //   BarcodeFormat.EAN_13,
    //   BarcodeFormat.UPC_A,
    //   BarcodeFormat.CODE_128,
    //   BarcodeFormat.EAN_8,
    //   BarcodeFormat.UPC_E,
    //   BarcodeFormat.CODE_39,
    //
    //   ]
    // ))    
      
      codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current!,
      (result, _, controls) => {
        if (result) {
          setCode(result.getText())
          console.log("Scanned code: " )
          controls.stop()
          // BrowserCodeReader.releaseAllStreams()
          // BrowserCodeReader.cleanVideoSource(videoRef.current!)
        }
      }
    )

    // return () => {
    //   controlsPromise.then((controls) => {
    //     controls.stop()
    //   })
    // }
  }, [code])

  return (
    <>
    <div className="max-w-screen max-h-screen overflow-hidden">
     <video
        ref={videoRef}
        className="w-full h-full rounded-2xl"
      />
        <button onClick = {() => setCode("")}>Cancel</button>
      <div className="absolute dark:text-white">{code}</div>
      </div>
    </>
  )
}

export default BarcodeScanner;
