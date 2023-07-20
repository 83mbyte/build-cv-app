import {
    Button, Heading, Wrap, WrapItem
} from '@chakra-ui/react';

import React, { useRef, useState } from 'react';

import { IoDocumentTextOutline, IoBulbOutline } from "react-icons/io5";
import DrawerCoverLetterContainer from './DrawerCoverLetterContainer';
import ToolTip from '../../Tooltip/ToolTip';

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
            <Heading as={'h5'} size={'xs'} mb={2}>Cover Letter</Heading>
            <Wrap px={2}>
                <WrapItem>
                    <ToolTip label='create new or edit your cover letter'>
                        <Button ref={createRef} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoDocumentTextOutline />} onClick={() => onClickBtnHandler('Create')}>New / Edit</Button>
                    </ToolTip>
                </WrapItem>
                <WrapItem>
                    <ToolTip label='generate cover letter automatically'>
                        <Button ref={generateRef} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={<IoBulbOutline />} onClick={() => onClickBtnHandler('Generate')}>Generate</Button>
                    </ToolTip>
                </WrapItem>

            </Wrap>
            <DrawerCoverLetterContainer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
};

export default CoverLetterSection;