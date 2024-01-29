import Color from "./Color";
import Style from "./Style";

export default function Generator() {
  return (
    <div className="basis-1/2 p-4 sm:p-10">
      <h2 className="text-3xl font-semibold">Generate QR Code</h2>
      <p className="mt-3 text-xl">Enter or paste URL :</p>
      <input
        type="url"
        placeholder="https://antiderivative.live"
        className="w-4/5 mt-3 rounded-lg border border-black p-3"
      />
      <div className="flex flex-col">
        <p className="text-xl mt-3">Color</p>
        <div className="mt-3 flex">
          <Color background="bg-black" />
          <Color background="bg-red" />
          <Color background="bg-green" />
          <Color background="bg-blue" />
          <Color background="bg-yellow" />
        </div>
      </div>
      <Style />
      <button className="p-3 w-36 bg-black text-white rounded-xl mt-3">
        Download
      </button>
    </div>
  );
}
