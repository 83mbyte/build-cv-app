import React from 'react';
import Education from '../Sections/Education';
import PersonDetails from '../Sections/PersonDetails';
import ProfSummary from '../Sections/ProfSummary';

const FormEditPage = () => {
    return (
        <>
            {/* Sections goes here.. */}

            {/* 1) Personal Details section */}
            <PersonDetails title={'Personal Details'} user={'user_zero'} />

            {/* 2) Professional Summary section */}
            <ProfSummary title={'Professional Summary'} user={'user_zero'} />
            {/* 3) Education section */}
            <Education title={'Education'} user={'user_zero'} />
        </>
    );
};

export default FormEditPage;