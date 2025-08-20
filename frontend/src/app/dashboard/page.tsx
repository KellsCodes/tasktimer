import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="relative top-[80px] w-full flex flex-col items-center py-10 px-20">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* Additional dashboard content can go here */}
        </div>
      </main>
    </div>
  );
}