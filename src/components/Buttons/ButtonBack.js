'use client';

import { Button, Box } from '@chakra-ui/react';

import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from 'next/navigation';

const ButtonBack = ({ value }) => {
    const router = useRouter();
    return (
        <Box>
            <Button colorScheme={'teal'} variant={'ghost'} leftIcon={<MdArrowBackIos />} onClick={() => router.back()}>{value}</Button>
        </Box>
    );
};

export default ButtonBack;