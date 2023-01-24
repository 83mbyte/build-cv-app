import React, { Fragment } from 'react';
import PersonDetails from '../Sections/PersonDetails';
import InputCustom from '../__test_temp/InputCustom';

const FormEditPage = ({ state, }) => {
    //console.log(state);
    let path = '';

    return (
        // Sections goes here..
        //
        // 1) Personal Details section
        <PersonDetails title={'Personal Details'} state={state.data.personDetails} user={state.loggedUser} />
    );
};

export default FormEditPage;