import { Generator, QRCode } from "./components";
import { Header, Hero } from "./containers";
import "./App.css";
import Footer from "./containers/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <main className="flex-1 flex flex-col-reverse sm:flex-row h-96">
        <QRCode />
        <Generator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
