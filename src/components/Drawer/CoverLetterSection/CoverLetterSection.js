import {
    Button, Heading, Wrap, WrapItem
} from '@chakra-ui/react';

import React, { useRef, useState } from 'react';

import { IoDocumentTextOutline, IoBulbOutline } from "react-icons/io5";
import DrawerCoverLetterContainer from './DrawerCoverLetterContainer';

const CoverLetterSection = () => {

    const createRef = useRef(null);
    const generateRef = useRef(null);

    const [isOpen, setIsOpen] = useState({ visible: false, type: null });

    const onClickBtnHandler = (type) => {
        setIsOpen({
            visible: true,
            type: type
        })
    }

    return (

        <>
            <Heading as={'h5'} size={'xs'} mb={2}>Create a cover letter</Heading>
            <Wrap px={2}>
                <WrapItem>
                    <Button ref={createRef} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoDocumentTextOutline />} onClick={() => onClickBtnHandler('Create')}>Create/Edit</Button>
                </WrapItem>
                <WrapItem><Button ref={generateRef} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoBulbOutline />} onClick={() => onClickBtnHandler('Generate')}>Generate</Button></WrapItem>

            </Wrap>
            <DrawerCoverLetterContainer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
};

export default CoverLetterSection;