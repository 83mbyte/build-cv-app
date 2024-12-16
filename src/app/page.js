import FooterContainer from "@/components/Footer/FooterContainer";
import IndexPageContainer from "@/components/Index_Page/IndexPageContainer";
import { Box } from "@chakra-ui/react";



export default function Home() {
  return (
    <Box>
      <IndexPageContainer />
      <FooterContainer />
    </Box>
  );
}
