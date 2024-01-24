import Image from "next/image";
import HomePage from "@/components/page/homepage/homepage";
import ProtectedHomePage from "@/components/page/homepage/protectedHomepage";

export default function Page() {
  return (
    <div className="flex flex-col p-6 h-screen">
      <div className="flex w-full h-full">{<ProtectedHomePage />}</div>
    </div>
  );
}
