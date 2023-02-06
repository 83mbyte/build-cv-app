
import React from 'react';
import { useSelector } from 'react-redux';
import SlideBottom from '../components/Slide/SlideBottom';
import Courses from '../Sections/Courses';
import Education from '../Sections/Education';
import EmploymentHistory from '../Sections/EmploymentHistory';
import Languages from '../Sections/Languages';
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

            {/* 4) Web & Social Links section */}
            <WebSocLinks title={'Websites & Social Links'} user={'user_hero'} />

            {/* 5) Skills section */}
            <Skills title={'Skills'} user={'user_hero'} />

            {/* 6) Courses section */}
            <Courses title={'Courses'} user={'user_hero'} />

            {/* 7) Employment History section */}
            <EmploymentHistory title={'Employment History'} user={'user_hero'} />

            {/* 8) Languages section */}
            <Languages title={'Languages'} user={'user_hero'} />

            {/*   popup/slide_bottom Save button */}
            <SlideBottom show={isModified.status}><SaveDataModal user={'user_hero'} sections={isModified.sections} /></SlideBottom>


        </>
    );
};

export default FormEditPage;

