'use client'

import { ProviderUI } from "./providers";

import Header from "@/components/index_page/header/Header";
import Features from "@/components/index_page/features/Features";
import CoverLetter from "@/components/index_page/coverLetter/CoverLetter";
import Interview from "@/components/index_page/interview/Interview";
import FAQ from "@/components/index_page/faq/FAQ";
import FooterContainer from "@/components/footerCopyright/FooterContainer";



export default function Home() {

  return (
    <ProviderUI>
      {/* header section */}
      <Header />

      {/* features section */}
      <Features />

      {/* cover letter section */}
      <CoverLetter />

      {/* Interview section */}
      <Interview />

      {/* FAQ sesction */}
      <FAQ />

      {/* copyright string */}
      <FooterContainer />
    </ProviderUI>


  );
}


