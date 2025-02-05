
import { Box, VStack, Image, HStack } from '@chakra-ui/react';

import { setResumeHeaderData } from '@/redux/resume/headerBlockSlice';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeading from '../dataFields/CustomHeading';

const HeaderBlock = ({ editableFields }) => {

    const fullName = useSelector(state => state.resumeHeader.fullName);
    const position = useSelector(state => state.resumeHeader.position);
    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const dispatch = useDispatch();

    const onChangeHandler = (name, value,) => {
        dispatch(setResumeHeaderData({ name, value }));
    }

    return (
        <HStack alignItems={'flex-start'} gap={1}>
            <Box flex={[4, 5]} >
                <VStack bg='' alignItems={'flex-start'} gap={1}>

                    <CustomHeading
                        variant={'h1'}
                        size={fontSize.h1}
                        fontWeight={'600'}
                        defaultValue={'Your name test'}
                        name='fullName'
                        value={fullName}
                        isEditable={editableFields}
                        allowEnter
                        onChangeCallback={(name, value) => onChangeHandler(name, value)}
                    />
                    <CustomHeading
                        variant={'h2'}
                        size={fontSize.h2}
                        fontWeight={'600'}
                        defaultValue={'Your position'}
                        name='position'
                        value={position}
                        isEditable={editableFields}
                        onChangeCallback={(name, value) => onChangeHandler(name, value)}
                    />
                </VStack>

            </Box>
            <Box flex={['1', '2']}>
                <Box bg='' border={'0px solid gray'}  >
                    <Image src={'resumeUserImage.png'}
                        borderRadius={'xl'}
                        // maxW={'125px'}
                        // minH='150px'
                        fit='cover'
                    />
                </Box>
            </Box>
        </HStack>
    );
};

export default HeaderBlock;