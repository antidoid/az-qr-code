import DefaultImage from "../assets/default-qr.png";

export default function QRCode({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="basis-1/2 p-4 sm:p-0 flex items-center justify-center bg-[#F4F4F4]">
      <img
        src={imgUrl || DefaultImage}
        className={imgUrl ? "" : "blur"}
        alt="QRCode"
      />
    </div>
  );
}
