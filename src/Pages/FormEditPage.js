import React from 'react';
import PersonDetails from '../Sections/PersonDetails';

const FormEditPage = ({ state, }) => {
    ;
    let path = '';

    return (
        // Sections goes here..
        //
        // 1) Personal Details section
        <PersonDetails title={'Personal Details'} state={state.data.personDetails} user={state.loggedUser} />
    );
};

export default FormEditPage;