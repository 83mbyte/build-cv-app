
import { Box } from '@chakra-ui/react';
import React from 'react';

import Courses from '../Sections/Courses';
import Education from '../Sections/Education';
import EmploymentHistory from '../Sections/EmploymentHistory';
import Hobbies from '../Sections/Hobbies';
import Languages from '../Sections/Languages';
import PersonDetails from '../Sections/PersonDetails';
import ProfSummary from '../Sections/ProfSummary';
import References from '../Sections/References';

import Skills from '../Sections/Skills';
import WebSocLinks from '../Sections/WebSocLinks';

const FormEditPage = ({ loggedUser }) => {

    // let loggedUser = 'user_hero'; //must be replaced to logged user from state..

    return (

        <Box pt={10} >
            {/* Sections goes here.. */}

            {/* 1) Personal Details section */}
            <PersonDetails title={'Personal Details'} user={loggedUser} />

            {/* 2) Professional Summary section */}
            <ProfSummary title={'Professional Summary'} user={loggedUser} />

            {/* 3) Education section */}
            <Education title={'Education'} user={loggedUser} />

            {/* 4) Web & Social Links section */}
            <WebSocLinks title={'Websites & Social Links'} user={loggedUser} />

            {/* 5) Skills section */}
            <Skills title={'Skills'} user={loggedUser} />

            {/* 6) Courses section */}
            <Courses title={'Courses'} user={loggedUser} />

            {/* 7) Employment History section */}
            <EmploymentHistory title={'Employment History'} user={loggedUser} />

            {/* 8) Languages section */}
            <Languages title={'Languages'} user={loggedUser} />

            {/* 9) References section */}
            <References title={'References'} user={loggedUser} />

            {/* 10) Hobbies section */}
            <Hobbies title={"Hobbies"} user={loggedUser} />

        </Box>
    );
};

export default FormEditPage;

