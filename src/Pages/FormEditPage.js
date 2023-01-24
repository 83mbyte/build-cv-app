import React from 'react';
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
        </>
    );
};

export default FormEditPage;