import ContactContent from "./ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Successors F1 - Get in Touch",
  description:
    "Connect with Team Successors for sponsorship, media inquiries, or STEM collaboration. We're ready to partner for the future.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
