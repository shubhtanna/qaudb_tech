import ActionSection from "../components/Homepage/action";
import ContactForm from "../components/Homepage/contact"
import FeatureSection from "../components/Homepage/section";
import BannerSection from "../components/Homepage/bannaer";
import TestimonialSection from "../components/Homepage/testimonial"
// import Image from "next/image";

export const metadata = {
  title: "Home : Work Manager",
};

export default function Home() {
  return (
    <div>
      {/* banner section  */}
      <BannerSection />
      <FeatureSection />
      <ActionSection />
      <TestimonialSection />
      <ContactForm />
    </div>
  );
}
