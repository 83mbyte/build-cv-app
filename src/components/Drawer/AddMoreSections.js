import { Button, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { coursesVisibleToggler } from '../../redux/features/courses/coursesSlice';
import { languagesVisibleToggler } from '../../redux/features/languages/languagesSlice';
import { hobbiesVisibleToggler } from '../../redux/features/hobbies/hobbiesSlice';
import { referencesVisibleToggler } from '../../redux/features/references/referencesSlice';

import { IoSchool, IoLanguage, IoPeople, IoColorPalette, IoCheckmarkDone } from "react-icons/io5";

const AddMoreSections = () => {
    const dispatch = useDispatch();
    const hobbiesDisable = useSelector(state => state.hobbies.__serv.isSectionVisible);
    const languagesDisabled = useSelector(state => state.languages.__serv.isSectionVisible);
    const coursesDisabled = useSelector(state => state.courses.__serv.isSectionVisible);
    const referencesDisabled = useSelector(state => state.references.__serv.isSectionVisible);

    const coursesRef = useRef(null);
    const hobbiesRef = useRef(null);
    const languagesRef = useRef(null);
    const referencesRef = useRef(null);

    const onClickBtnHandler = (elem) => {
        switch (elem) {
            case 'Courses':
                dispatch(coursesVisibleToggler())
                break;
            case 'Hobbies':
                dispatch(hobbiesVisibleToggler());
                break;
            case 'Languages':
                dispatch(languagesVisibleToggler());
                break;
            case 'References':
                dispatch(referencesVisibleToggler())
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