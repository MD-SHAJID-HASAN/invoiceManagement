import CreateInvoice from "@/components/CreateInvoice";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-black font-[family-name:var(--font-geist-sans)]">

      <CreateInvoice></CreateInvoice>

    </div>
  );
}
