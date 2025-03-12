import { Stack, Box, Button, HStack, Separator } from '@chakra-ui/react';
import Link from 'next/link';
import { LuLogIn } from "react-icons/lu";

const HeaderNavygation = () => {
    return (
        <Stack direction={['column', 'row']} w='full' justifyContent={'space-between'} gap={[0, 1]} marginTop={0} alignItems={'center'}>
            <Box bg='' fontWeight={'bold'}>{process.env.NEXT_PUBLIC_APP_NAME}</Box>
            <HStack gap={1} bg=''>
                <Link href='/news' prefetch={true}>
                    <Button variant={'plain'} size={['2xs', 'sm']} paddingX={'2'} justifyContent={'center'} gap={1}
                        _hover={{ opacity: 0.75 }}
                        aria-label='news button'
                    >
                        News
                    </Button>
                </Link>
                <Separator orientation="vertical" size='sm' height={'4'} />

                <Link href='/login' prefetch={true}>
                    <Button variant={'plain'} size={['2xs', 'sm']} paddingX={'2'} justifyContent={'center'} gap={1}
                        _hover={{ opacity: 0.75 }}
                        aria-label='signin button'
                    > Login <LuLogIn />
                    </Button>
                </Link>
            </HStack>
        </Stack >
    );
};

export default HeaderNavygation;