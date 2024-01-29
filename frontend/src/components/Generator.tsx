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
};

export default function Generator({
  qrCodeUrl,
  setQRCodeUrl,
  setColor,
  style,
  setStyle,
  handleDownloadBtn,
}: GeneratorProps) {
  const [currentSelectedColor, setCurrentSelectedColor] = useState<Number>(0);

  const colors = ["black", "red", "green", "green", "yellow"];
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
        <p className="text-xl mt-3">Color</p>
        <div className="mt-3 flex">{colorElements}</div>
      </div>
      <Style style={style} setStyle={setStyle} />
      <button
        onClick={handleDownloadBtn}
        className="p-3 w-36 bg-black text-white rounded-xl mt-3"
      >
        Generate
      </button>
    </div>
  );
}
