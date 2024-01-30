import { Generator, QRCode } from "./components";
import { Header, Hero } from "./containers";
import "./App.css";
import Footer from "./containers/Footer";
import { useEffect, useState } from "react";

function App() {
  const [requesturl, setRequestUrl] = useState("");

  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [color, setColor] = useState("black");
  const [style, setStyle] = useState("square");

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Add query params to request url as users fill the form
    setRequestUrl(
      `${import.meta.env.VITE_FUNCTION_URL
      }?url=${qrCodeUrl}&color=${color}&style=${style}`,
    );
  }, [qrCodeUrl, color, style]);

  const handleDownloadBtn = async () => {
    try {
      const res = await fetch(requesturl);
      const { qr_code_url: imgLink } = await res.json();
      setImgUrl(imgLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <main className="flex-1 flex flex-col-reverse sm:flex-row h-96">
        <QRCode imgUrl={imgUrl} />
        <Generator
          qrCodeUrl={qrCodeUrl}
          setQRCodeUrl={setQRCodeUrl}
          setColor={setColor}
          style={style}
          setStyle={setStyle}
          handleDownloadBtn={handleDownloadBtn}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
