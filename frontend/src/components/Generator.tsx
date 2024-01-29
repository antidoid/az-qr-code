import Color from "./Color";

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
      <div className="mt-3 flex">
        <Color color="lolared" />
      </div>
    </div>
  );
}
