export default function QRCode({
    imgUrl = import.meta.env.VITE_DEFAULT_QR_CODE,
}: {
    imgUrl: string;
}) {
    return (
        <div className="flex-1 flex items-center justify-center bg-[#F4F4F4]">
            <img src={imgUrl} alt="QRCode" />
        </div>
    );
}
