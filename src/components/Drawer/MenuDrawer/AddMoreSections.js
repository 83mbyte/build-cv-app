import { Button, Heading, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { IoSchool, IoLanguage, IoPeople, IoColorPalette, IoCheckmarkDone } from "react-icons/io5";
import { additionalSectionAdd } from '@/redux/features/utility/utilitySlice';


const AddMoreSections = () => {
    const dispatch = useDispatch();
    const hobbiesDisable = useSelector(state => state.utility.additionalSections.data.includes('hobbies'));
    const languagesDisabled = useSelector(state => state.utility.additionalSections.data.includes('languages'));
    const coursesDisabled = useSelector(state => state.utility.additionalSections.data.includes('courses'));
    const referencesDisabled = useSelector(state => state.utility.additionalSections.data.includes('references'));

    const coursesRef = useRef(null);
    const hobbiesRef = useRef(null);
    const languagesRef = useRef(null);
    const referencesRef = useRef(null);

    const onClickBtnHandler = (elem) => {
        switch (elem) {
            case 'Courses':
                dispatch(additionalSectionAdd('courses'));
                break;
            case 'Hobbies':
                dispatch(additionalSectionAdd('hobbies'));
                break;
            case 'Languages':
                dispatch(additionalSectionAdd('languages'));
                break;
            case 'References':
                dispatch(additionalSectionAdd('references'));
                break;
            default:
                break;
        }
    }

    return (

        <VStack spacing={1}>
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Add Sections To Your Resume</Heading>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} ref={coursesRef} isDisabled={coursesDisabled} colorScheme={'teal'} variant={'ghost'} onClick={() => onClickBtnHandler(coursesRef.current.innerText)} leftIcon={coursesDisabled ? <IoCheckmarkDone /> : <IoSchool />}
            >Courses</Button>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} variant={'ghost'} ref={hobbiesRef} isDisabled={hobbiesDisable} colorScheme={'teal'} leftIcon={hobbiesDisable ? <IoCheckmarkDone /> : <IoColorPalette />} onClick={() => onClickBtnHandler(hobbiesRef.current.innerText)} >Hobbies</Button>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} variant={'ghost'} ref={languagesRef} isDisabled={languagesDisabled} colorScheme={'teal'} leftIcon={languagesDisabled ? <IoCheckmarkDone /> : <IoLanguage />} onClick={() => onClickBtnHandler(languagesRef.current.innerText)}>Languages</Button>

            <Button style={{ justifyContent: 'flex-start' }} w='full' size={'sm'} variant={'ghost'} ref={referencesRef} isDisabled={referencesDisabled} colorScheme={'teal'} leftIcon={referencesDisabled ? <IoCheckmarkDone /> : <IoPeople />} onClick={() => onClickBtnHandler(referencesRef.current.innerText)}>References</Button>

        </VStack>

    )
};

export default AddMoreSections;