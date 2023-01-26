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
            {/* <ProfSummary title={'Professional Summary'} state={state.data.summary} user={state.loggedUser} /> */}
            {/* 3) Education section */}
            {/* <Education title={'Education'} user={state.loggedUser} state={state.data.education} /> */}
        </>
    );
};

export default FormEditPage;