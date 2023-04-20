import { Button, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { IoSchool, IoLanguage, IoPeople, IoColorPalette, IoCheckmarkDone } from "react-icons/io5";
import { additionalSectionAdd } from '../../redux/features/utility/utilitySlice';

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

        <>
            <Heading as={'h5'} size={'xs'} mb={2}>Add more sections</Heading>
            <Wrap px={2}>
                <WrapItem>
                    <Button ref={coursesRef} isDisabled={coursesDisabled} size={'sm'} colorScheme={'teal'} variant={'outline'} onClick={() => onClickBtnHandler(coursesRef.current.innerText)} leftIcon={coursesDisabled ? <IoCheckmarkDone /> : <IoSchool />}
                    >Courses</Button>
                </WrapItem>
                <WrapItem>
                    <Button ref={hobbiesRef} isDisabled={hobbiesDisable} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={hobbiesDisable ? <IoCheckmarkDone /> : <IoColorPalette />} onClick={() => onClickBtnHandler(hobbiesRef.current.innerText)} >Hobbies</Button>
                </WrapItem>
                <WrapItem><Button ref={languagesRef} isDisabled={languagesDisabled} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={languagesDisabled ? <IoCheckmarkDone /> : <IoLanguage />} onClick={() => onClickBtnHandler(languagesRef.current.innerText)}>Languages</Button></WrapItem>
                <WrapItem><Button ref={referencesRef} isDisabled={referencesDisabled} size={'sm'} colorScheme={'teal'} variant={'outline'} leftIcon={referencesDisabled ? <IoCheckmarkDone /> : <IoPeople />} onClick={() => onClickBtnHandler(referencesRef.current.innerText)}>References</Button></WrapItem>
            </Wrap>
        </>
    )
};

export default AddMoreSections;