import { Stack, Box, Button, HStack, Separator } from '@chakra-ui/react';
import Link from 'next/link';
import { LuLogIn } from "react-icons/lu";
import { indexData } from '@/lib/content-lib';

const HeaderNavygation = () => {
    return (
        <Stack direction={['column', 'row']} w='full' justifyContent={'space-between'} gap={[8, 1]} marginTop={0} alignItems={'center'}>
            <Box bg='' fontWeight={'bold'}>{process.env.NEXT_PUBLIC_APP_NAME}</Box>
            <HStack gap={2} bg=''>
                <Link href='/blog' prefetch={true}>
                    <Button variant={'plain'} size={'sm'} paddingX={'2'} justifyContent={'center'} gap={1}
                        _hover={{ opacity: 0.75 }}
                        aria-label='news button'
                    >
                        {indexData.top.blogButton ?? 'Blog'}
                    </Button>
                </Link>
                <Separator orientation="vertical" size='sm' height={'4'} />

                <Link href='/login' prefetch={true}>
                    <Button variant={'plain'} size={'sm'} paddingX={'2'} justifyContent={'center'} gap={1}
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