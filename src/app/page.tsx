import HomePage from "@/components/page/homepage/homepage";

export default function Home() {
  return (
    <main className="h-screen flex flex-col gap-14 p-6 justify-between relative">
      <div className="flex w-full h-full">
        <HomePage />
      </div>
    </main>
  );
}
