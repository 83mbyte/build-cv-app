
import React from 'react';
import { useSelector } from 'react-redux';
import SlideBottom from '../components/Slide/SlideBottom';
import Education from '../Sections/Education';
import PersonDetails from '../Sections/PersonDetails';
import ProfSummary from '../Sections/ProfSummary';
import SaveDataServ from '../Sections/SaveDataServ';

const FormEditPage = () => {
    const isModified = useSelector(state => state.utility.data.isModified);

    return (
        <>
            {/* Sections goes here.. */}

            {/* 1) Personal Details section */}
            <PersonDetails title={'Personal Details'} user={'user_zero'} />

            {/* 2) Professional Summary section */}
            <ProfSummary title={'Professional Summary'} user={'user_zero'} />
            {/* 3) Education section */}
            <Education title={'Education'} user={'user_zero'} />
            <SlideBottom show={isModified.status}><SaveDataServ user={'user_hero'} sections={isModified.sections} /></SlideBottom>


        </>
    );
};

export default FormEditPage;

