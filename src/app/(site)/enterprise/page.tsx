import EnterpriseContent from "./EnterpriseContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Portfolio | Successors F1 - Marketing, Finance & Project Management",
  description:
    "Explore our enterprise strategy, sponsorship value, and financial planning. We deliver measurable ROI for our partners.",
  alternates: {
    canonical: "/enterprise",
  },
};

export default function EnterprisePage() {
  return <EnterpriseContent />;
}
