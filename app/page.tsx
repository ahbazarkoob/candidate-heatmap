import Posk from "@/components/Posk/Posk";

export default function Home() {
  return (
    <main className="p-6 dark:bg-white h-svh text-black overflow-scroll">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <a href="#" className="text-blue-600 text-sm mr-2">
              ← Back to My Jobs
            </a>
          </div>
        </div>
      <Posk />
    </main>
  );
}