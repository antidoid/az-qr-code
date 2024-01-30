import DefaultImage from "../assets/default-qr.png";
import Spinner from "./Spinner";

export default function QRCode({
  imgUrl,
  isLoading,
}: {
  imgUrl: string;
  isLoading: boolean;
}) {
  return (
    <div className="basis-1/2 p-4 sm:p-0 flex items-center justify-center bg-[#F4F4F4] relative">
      {isLoading && <Spinner />}
      <img
        src={imgUrl || DefaultImage}
        className={!isLoading && imgUrl ? "" : "blur " + "z-0"}
        alt="QRCode"
      ></img>
    </div>
  );
}
