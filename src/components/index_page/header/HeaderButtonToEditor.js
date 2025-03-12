import { HStack, Icon, Button, Text, } from '@chakra-ui/react';
import NextLink from "next/link";
import React from 'react';

import { LuCheck } from "react-icons/lu";
const HeaderButtonToEditor = () => {
    return (
        <HStack gap={4}>

            <NextLink href="/editor" passHref>
                <Button colorPalette={'teal'} paddingX={2} size={['sm', 'md']} >Create Resume</Button>
            </NextLink>
            <HStack color={'teal'} gap={1} alignItems={'center'}>

                <Icon>
                    <LuCheck />
                </Icon>
                <Text fontSize={['sm', 'md']}>No registration required</Text>
            </HStack>
        </HStack>
    );
};

export default HeaderButtonToEditor;