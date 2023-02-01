import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { MdSave } from 'react-icons/md';
import { useDispatch, useSelector, } from 'react-redux';
import { putDataOnServer } from '../redux/features/utility/utilitySlice';


const SaveDataServ = ({ user, sections }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const clickHandler = () => {
        for (const section of sections) {
            dispatch(putDataOnServer({ user, path: section, value: state[section].data }))
        }
    }
    return (

        <Box w={['xs', 'xl', '3xl']} m={'0 auto'} borderTopRadius={'10px'} border={'1px solid #319795'} borderBottom={'none'} bg={'gray.100'}>
            <Flex columnGap={'5px'} fontSize={['9px', 'sm', 'sm', 'md']} alignItems={'center'} justifyContent='center' py={2} >
                {/* <Text marginTop={'1px'}>Don't forget to </Text> */}
                {/* //TODO
                //TODO
                //TODO 'pending','fulfilled' and so on state to the Button as it solved on 
                //TODO
                //TODO */}
                <Button colorScheme={'teal'} size={'sm'} variant={'outline'} fontSize={'inherit'} leftIcon={<MdSave size={'24px'} />} onClick={clickHandler}>Save</Button>
                {/* <Text marginTop={'1px'}> before you leave the page.</Text> */}
            </Flex >
        </Box >
    );
};

export default SaveDataServ;  