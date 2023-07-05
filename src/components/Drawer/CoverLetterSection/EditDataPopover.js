import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    FocusLock,
    PopoverCloseButton, useDisclosure, IconButton, VStack, ButtonGroup, Button, FormControl, FormLabel, Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { MdOutlineEditNote } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { inputUpdate } from '../../../redux/features/personDetails/personDetailsSlice';
import { setIsModifiedContent } from '../../../redux/features/utility/utilitySlice';
import { addSkillsItem } from '../../../redux/features/skills/skillsSlice';

const EditDataPopover = (props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    const firstNameRef = React.useRef(null);
    const lastNameRef = React.useRef(null);
    const skillRef = React.useRef(null);
    return (
        <Popover
            isOpen={isOpen}
            initialFocusRef={props.type === 'personName' ? firstNameRef : skillRef}
            onOpen={onOpen}
            onClose={onClose}
            placement={'auto'}
            closeOnBlur={false}

        >
            <PopoverTrigger>
                <IconButton fontSize={'20px'} icon={<MdOutlineEditNote />} variant={'unstyled'} mx={3} />
            </PopoverTrigger>
            <PopoverContent p={5} borderColor='gray.300'>
                <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow />
                    <PopoverCloseButton />

                    {
                        props.type === 'personName'
                            ? <NameForm firstName={props.firstName} lastName={props.lastName} onClose={onClose} ref={{ firstNameRef, lastNameRef }} />
                            : <SkillsForm ref={skillRef} onClose={onClose} />
                    }

                </FocusLock>
            </PopoverContent>
        </Popover>
    )
}

export default EditDataPopover;

const TextInput = React.forwardRef((props, ref) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} name={props.name} id={props.id} {...props} onBlur={props.onBlur} />
        </FormControl>
    )
})


const NameForm = React.forwardRef((props, ref) => {

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const checkEmpty = (first, last) => {

        if ((first && first.trim() !== '') || (last && last.trim() !== '')) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }
    const saveEdit = () => {
        if (ref.firstNameRef.current.value) {
            dispatch(inputUpdate({ inputName: ref.firstNameRef.current.name, value: ref.firstNameRef.current.value }));

        }
        if (ref.lastNameRef.current.value) {
            dispatch(inputUpdate({ inputName: ref.lastNameRef.current.name, value: ref.lastNameRef.current.value }));
        }
        dispatch(setIsModifiedContent({ status: true, section: 'personDetails' }))
        props.onClose();
    }
    return (
        <VStack my={1}>
            <TextInput label='First Name' name={'firstName'} id={'firstName'} ref={ref.firstNameRef} onBlur={() => checkEmpty(ref.firstNameRef.current.value, ref.lastNameRef.current.value)} />
            <TextInput label='Last Name' name={'lastName'} id={'lastName'} ref={ref.lastNameRef} onBlur={() => checkEmpty(ref.firstNameRef.current.value, ref.lastNameRef.current.value)} />/>

            <ButtonGroup display='flex' justifyContent='flex-end' colorScheme='teal'>
                <Button variant='outline' onClick={props.onClose}>
                    Cancel
                </Button>
                <Button isDisabled={disabled} onClick={saveEdit}>
                    Save
                </Button>
            </ButtonGroup>
        </VStack>
    )
})

const SkillsForm = React.forwardRef((props, ref) => {
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();

    const checkEmpty = (item) => {
        if (item && item.trim() !== '') {
            setDisabled(false);
        }
        else { setDisabled(true) }
    }
    const addItem = (ref) => {

        dispatch(addSkillsItem({ label: ref.current.value, level: 3 }))

        ref.current.value = '';
        props.onClose();
    }

    return (

        <VStack my={1}>
            <TextInput label='Add Skill' name={'skillAdd'} id={'skillAdd'} ref={ref} onChange={() => checkEmpty(ref.current.value)} />

            <ButtonGroup display='flex' justifyContent='flex-end' colorScheme='teal'>
                <Button variant='outline' onClick={props.onClose}>
                    Cancel
                </Button>
                <Button isDisabled={disabled} onClick={() => addItem(ref)}>
                    Add
                </Button>
            </ButtonGroup>
        </VStack>
    )
})