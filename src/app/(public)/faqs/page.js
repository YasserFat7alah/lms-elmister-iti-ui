import FAQPageHeader from "@/components/faqComponents/FAQPageHeader";
import FAQSection from "@/components/faqComponents/FAQSection";

export default function Faqs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
      <FAQPageHeader/>
       <FAQSection/>
      </main>
    </div>
  )
}
