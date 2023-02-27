
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

const FormEditPage = ({ user }) => {


    return (

        <Box pt={10} >
            {/* Sections goes here.. */}

            {/* 1) Personal Details section */}
            <PersonDetails title={'Personal Details'} user={user} />

            {/* 2) Professional Summary section */}
            <ProfSummary title={'Professional Summary'} user={user} />

            {/* 3) Education section */}
            <Education title={'Education'} user={user} />

            {/* 4) Web & Social Links section */}
            <WebSocLinks title={'Websites & Social Links'} user={user} />

            {/* 5) Skills section */}
            <Skills title={'Skills'} user={user} />

            {/* 6) Courses section */}
            <Courses title={'Courses'} user={user} />

            {/* 7) Employment History section */}
            <EmploymentHistory title={'Employment History'} user={user} />

            {/* 8) Languages section */}
            <Languages title={'Languages'} user={user} />

            {/* 9) References section */}
            <References title={'References'} user={user} />

            {/* 10) Hobbies section */}
            <Hobbies title={"Hobbies"} user={user} />

        </Box>
    );
};

export default FormEditPage;

