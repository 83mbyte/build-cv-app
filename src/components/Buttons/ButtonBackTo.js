'use client';
import React from 'react';

import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';

import { MdArrowBackIos } from "react-icons/md";

const ButtonBackTo = ({ href = '/', value = 'button' }) => {
    return (
        <Box>

            <Button colorScheme={'teal'} variant={'ghost'} as={Link} href={href} leftIcon={<MdArrowBackIos />}>{value}</Button>
        </Box>
    );
};

export default ButtonBackTo;