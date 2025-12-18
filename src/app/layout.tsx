import type { Metadata } from "next";
import "./globals.css";
import WodhHeader_OptionB_SplitToggle from "@/components/WodhHeader_OptionB_SplitToggle";
import WodhFooter_MegaBold_Global_Final_Refined_v2 from "@/components/WodhFooter_MegaBold_Global_Final_Refined_v2";

export const metadata: Metadata = {
  title: "WODHIO",
  description: "WODHIO - Next.js and React application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WodhHeader_OptionB_SplitToggle />
        {children}
        <WodhFooter_MegaBold_Global_Final_Refined_v2 />
      </body>
    </html>
  );
}

