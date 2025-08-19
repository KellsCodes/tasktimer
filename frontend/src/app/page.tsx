import Navbar from "./components/Navbar";
import Register from "./components/Register";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <div className="h-[64px] flex flex-col items-center border-b border-b-gray-100 fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <Register /> */}
      </main>
    </div>
  );
}
