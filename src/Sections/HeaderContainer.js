import { HStack, Box, Button } from '@chakra-ui/react';
import React from 'react';
import { MdPreview, MdSave } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import AvatarCustom from '../components/Avatar/AvatarCustom';
import ToolTip from '../components/ToolTip/ToolTip';
import { putDataOnServer } from '../redux/features/utility/utilitySlice';


const HeaderContainer = ({ user }) => {
    const isModified = useSelector(state => state.utility.isModifiedContent);
    const state = useSelector(state => state)
    const name = useSelector(state => state.personDetails.data.name);

    const dispatch = useDispatch();

    const clickSaveHandler = () => {
        for (const section of isModified.sections) {

            if (section === 'skills') {
                dispatch(putDataOnServer({
                    user,
                    path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible,
                            isSwitchDisabled: state[section].isSwitchDisabled,
                        }
                    }
                }));
            } else if (section === 'courses' || section === 'employmentHistory' || section === 'languages') {
                dispatch(putDataOnServer({
                    user,
                    path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible
                        }
                    }
                }));
            } else if (section === 'references') {
                dispatch(putDataOnServer({
                    user,
                    path: section,
                    value: {
                        data: state[section].data,
                        __serv: {
                            isSectionVisible: state[section].isSectionVisible,
                            isSwitchChecked: state[section].isSwitchChecked
                        }
                    }
                }));
            }
            else {
                dispatch(putDataOnServer({ user, path: section, value: state[section].data }));
            }
        }

    }
    return (

        <HStack spacing={1} bg='gray.100' justify={'flex-end'} p={1} pr={'20px'} boxShadow={'0px 3px 5px 0px rgba(0, 0, 0, 0.25)'} position='fixed' w='full' zIndex={1212} as='header'>
            <Box>
                <ToolTip label={'preview document'}>
                    <Button variant={'solid'} colorScheme='teal' size={'xs'} leftIcon={<MdPreview />}>Preview</Button>
                </ToolTip>
            </Box>
            <Box>

                <ToolTip label='save changes'>
                    <Button
                        variant={'outline'}
                        colorScheme='teal'
                        size={'xs'}
                        leftIcon={<MdSave />}
                        isDisabled={!isModified.status}
                        onClick={clickSaveHandler}
                    >Save</Button>
                </ToolTip>

            </Box>
            <AvatarCustom name={(name.firstName.value !== '' || name.lastName.value !== '') ? `${name.firstName.value} ${name.lastName.value}` : ''} />

        </HStack >
    );
};

export default HeaderContainer;