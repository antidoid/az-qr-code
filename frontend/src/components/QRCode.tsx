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
    <div className="basis-1/2 p-4 sm:p-0 flex flex-col items-center justify-center bg-[#F4F4F4] relative">
      {isLoading && <Spinner />}
      <img
        src={imgUrl || DefaultImage}
        className={(!isLoading && imgUrl ? "" : "blur ") + "z-0 w-72"}
        alt="QRCode"
      ></img>
      {imgUrl && (
        <form method="get" action={imgUrl}>
          <button
            type="submit"
            className="py-2.5 w-36 h-13 text-xl font-semibold bg-black text-white rounded-xl mt-3 hover:opacity-80"
          >
            Download
          </button>
        </form>
      )}
    </div>
  );
}
