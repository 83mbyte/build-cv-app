
import React from 'react';
import { useSelector } from 'react-redux';
import SlideBottom from '../components/Slide/SlideBottom';
import Education from '../Sections/Education';
import PersonDetails from '../Sections/PersonDetails';
import ProfSummary from '../Sections/ProfSummary';
import SaveDataModal from '../Sections/SaveDataModal';
import Skills from '../Sections/Skills';
import WebSocLinks from '../Sections/WebSocLinks';

const FormEditPage = () => {
    const isModified = useSelector(state => state.utility.data.isModified);

    return (
        <>
            {/* Sections goes here.. */}

            {/* 1) Personal Details section */}
            <PersonDetails title={'Personal Details'} user={'user_hero'} />

            {/* 2) Professional Summary section */}
            <ProfSummary title={'Professional Summary'} user={'user_hero'} />
            {/* 3) Education section */}
            <Education title={'Education'} user={'user_hero'} />
            <WebSocLinks title={'Websites & Social Links'} user={'user_hero'} />
            <Skills title={'Skills'} user={'user_hero'} />
            <SlideBottom show={isModified.status}><SaveDataModal user={'user_hero'} sections={isModified.sections} /></SlideBottom>


        </>
    );
};

export default FormEditPage;

