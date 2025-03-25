'use client'

import { VStack, Box, Stack, Text, Heading, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { toolkitData } from '@/lib/content-lib';

const ToolsList = () => {

    return (
        <VStack gap={2} bg='' w='full' >
            <Box w='full' pb={'10'}>
                <Heading as='h1' size='3xl'>{toolkitData.pageHeading ?? 'Lorem ipsum'}</Heading>
                <Text>{toolkitData.pageText ?? 'Lorem ipsum lorem ipsum lorem ipsum'}</Text>
            </Box>
            <Stack flexDirection={['column', 'row']} flexWrap={'wrap'} bg='' gap={'3'} position={'relative'} alignItems={'center'} justifyContent={'center'} as='main'  >

                {
                    Object.keys(toolkitData.tools).map((item, ind) => {
                        return (
                            <ToolCard key={ind} data={toolkitData.tools[item]} />
                        )
                    })
                }

            </Stack>
        </VStack>
    );
};

export default ToolsList;

const ToolCard = ({ data }) => {

    return (
        <VStack border={'1px solid #dedede'}
            padding={'3'}
            borderRadius={'lg'}
            flexShrink={1}
            flexGrow={1}
            flexBasis={'43%'}
            gap={'2'}
            alignItems={'flex-start'}
            shadow={'xs'}
            bg='white'
        >
            <Box>
                <Heading as='h2' size={'xl'}>
                    <Link href={data.href ?? '#'}>{data.title}</Link>
                </Heading>
                <Text>{data.description}</Text>
            </Box>
            <ChakraLink asChild colorPalette={'teal'} fontSize={['xs', 'sm']} _focus={{ outline: 'none' }}>
                <Link href={data.href ?? '#'}>
                    {data.linkText}
                </Link>
            </ChakraLink>
        </VStack>
    )
}