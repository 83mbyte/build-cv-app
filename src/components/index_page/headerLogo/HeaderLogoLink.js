import { Tooltip } from '@/components/ui/tooltip';
import { HStack, Image, Text } from '@chakra-ui/react';

import Link from 'next/link';


const HeaderLogoLink = () => {
    return (

        <Tooltip showArrow content="Return to Index page" openDelay={300} positioning={{ placement: 'bottom' }}>
            <Link href={'/'}>
                <HStack alignItems={'center'} justifyContent={'center'} >
                    <Image
                        src={'/android-chrome-192x192.png'}
                        alt={`${process.env.NEXT_PUBLIC_APP_NAME_FULL} logo`}
                        boxSize={['18px', '28px']}
                        padding={0}
                        borderRadius={'full'}
                    />
                    <Text fontSize={['sm', 'lg']}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Text>
                </HStack>
            </Link>
        </Tooltip>
    );
};

export default HeaderLogoLink;