import React from 'react';
import Education from '../Sections/Education';
import PersonDetails from '../Sections/PersonDetails';
import ProfSummary from '../Sections/ProfSummary';

const FormEditPage = ({ state, }) => {
    return (
        <>
            {/* Sections goes here.. */}

            {/* 1) Personal Details section */}
            <PersonDetails title={'Personal Details'} state={state.data.personDetails} user={state.loggedUser} />

            {/* 2) Professional Summary section */}
            <ProfSummary title={'Professional Summary'} state={state.data.summary} user={state.loggedUser} />
            {/* 3) Education section */}
            <Education title={'Education'} user={state.loggedUser} />
        </>
    );
};

export default FormEditPage;