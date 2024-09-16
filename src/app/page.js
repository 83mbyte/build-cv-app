import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box backgroundColor={''} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} h={'100vh'} m={0} p={5}>
      <Box backgroundColor={''} >
        {process.env.NEXT_PUBLIC_APP_NAME || 'YOUR APP NAME'}
      </Box>
    </Box >
  );
}
