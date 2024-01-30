import { useState } from "react";
import Color from "./Color";
import Style from "./Style";

type GeneratorProps = {
  qrCodeUrl: string;
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
  handleDownloadBtn: () => {};
  isLoading: boolean;
};

export default function Generator({
  qrCodeUrl,
  setQRCodeUrl,
  setColor,
  style,
  setStyle,
  handleDownloadBtn,
  isLoading,
}: GeneratorProps) {
  const [currentSelectedColor, setCurrentSelectedColor] = useState<Number>(0);

  const colors = ["black", "red", "green", "blue", "yellow"];
  const colorElements = colors.map((color: string, index: Number) => {
    return (
      <Color
        key={index as React.Key}
        background={`bg-${color}`}
        isSelected={index == currentSelectedColor}
        setIsSelected={() => {
          setCurrentSelectedColor(index);
          setColor(color);
        }}
      />
    );
  });

  return (
    <div className="basis-1/2 p-4 sm:p-10">
      <h2 className="text-3xl font-semibold">Generate QR Code</h2>
      <p className="mt-3 text-xl">Enter or paste URL :</p>
      <input
        type="url"
        placeholder="https://antiderivative.live"
        className="w-4/5 mt-3 rounded-lg border border-black p-3"
        value={qrCodeUrl}
        onChange={(e) => setQRCodeUrl(e.target.value)}
      />
      <div className="flex flex-col">
        {/*The below block fixes a bug where the colors don't render*/}
        <div className="bg-red bg-blue bg-green bg-yellow"></div>
        <p className="text-xl mt-3">Color</p>
        <div className="mt-3 flex">{colorElements}</div>
      </div>
      <Style style={style} setStyle={setStyle} />
      <button
        onClick={handleDownloadBtn}
        className="py-2.5 w-36 h-13 text-xl font-semibold bg-black text-white rounded-xl mt-3 hover:opacity-80 disabled:hover:opacity-100 disabled:bg-slate-400 disabled:text-gray-200"
        disabled={isLoading || !qrCodeUrl}
      >
        Generate
      </button>
    </div>
  );
}
