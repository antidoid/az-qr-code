import AzureFunctionLogo from "../assets/functions.svg";
import AzureBlobStorageLogo from "../assets/blob.svg";

export default function Footer() {
    return (
        <div className="bg-black h-12 flex items-center justify-end">
            <p className="text-white mr-4">
                Developed with{" "}
                <img src={AzureBlobStorageLogo} className="inline h-[30px] mx-2" />
                +
                <img src={AzureFunctionLogo} className="inline h-[25px] ml-2" />
            </p>
        </div>
    );
}
