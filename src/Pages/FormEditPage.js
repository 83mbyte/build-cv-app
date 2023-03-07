
import { Box } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';

const Courses = lazy(() => import('../Sections/Courses'));

const Education = lazy(() => import('../Sections/Education'));

const EmploymentHistory = lazy(() => import('../Sections/EmploymentHistory'))

const Hobbies = lazy(() => import('../Sections/Hobbies'));

const Languages = lazy(() => import('../Sections/Languages'));

const PersonDetails = lazy(() => import('../Sections/PersonDetails'));

const ProfSummary = lazy(() => import('../Sections/ProfSummary'));

const References = lazy(() => import('../Sections/References'));

const Skills = lazy(() => import('../Sections/Skills'))

const WebSocLinks = lazy(() => import('../Sections/WebSocLinks'));

const FormEditPage = ({ user }) => {


    return (

        <Box pt={10} >
            {/* Sections.. */}
            <Suspense fallback={<SpinnerCustom />}>
                {/* 1) Personal Details section */}
                <PersonDetails title={'Personal Details'} user={user} />
            </Suspense>

            <Suspense fallback={<SpinnerCustom />}>
                {/* 2) Professional Summary section */}
                <ProfSummary title={'Professional Summary'} user={user} />
            </Suspense>

            <Suspense fallback={<SpinnerCustom />}>
                {/* 3) Education section */}
                <Education title={'Education'} user={user} />
            </Suspense>

            <Suspense fallback={<SpinnerCustom />}>
                {/* 4) Web & Social Links section */}
                <WebSocLinks title={'Websites & Social Links'} user={user} />
            </Suspense>
            <Suspense fallback={<SpinnerCustom />}>
                {/* 5) Skills section */}
                <Skills title={'Skills'} user={user} />
            </Suspense>
            <Suspense fallback={<SpinnerCustom />}>
                {/* 6) Courses section */}
                <Courses title={'Courses'} user={user} />
            </Suspense>

            <Suspense fallback={<SpinnerCustom />}>
                {/* 7) Employment History section */}
                <EmploymentHistory title={'Employment History'} user={user} />

                {/* 8) Languages section */}
                <Languages title={'Languages'} user={user} />

                {/* 9) References section */}
                <References title={'References'} user={user} />

                {/* 10) Hobbies section */}
                <Hobbies title={"Hobbies"} user={user} />
            </Suspense>
        </Box >
    );
};

export default FormEditPage;

