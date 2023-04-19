
import React from 'react';
import { useSelector } from 'react-redux';
import LayoutDashboard from '../components/Layouts/LayoutDashboard';
import { Navigate } from 'react-router-dom';
import PersonDetails from '../components/Sections/PersonDetails';
import Summary from '../components/Sections/Summary';
import Education from '../components/Sections/Education';
import Links from '../components/Sections/Links';
import Skills from '../components/Sections/Skills';
import Courses from '../components/Sections/Courses';
import History from '../components/Sections/History';
import Languages from '../components/Sections/Languages';
import References from '../components/Sections/References';
import Hobbies from '../components/Sections/Hobbies';

const Dashboard = () => {
    const loggedUser = useSelector(state => state.utility.auth.data)
    return (
        <>
            {
                loggedUser
                    ?
                    <LayoutDashboard loggedUser={loggedUser}>
                        {/* Personal Details section */}
                        <PersonDetails />


                        {/* Professional Summary section */}
                        <Summary loggedUser={loggedUser} />


                        {/* Education section */}
                        <Education loggedUser={loggedUser} />


                        {/* Links */}
                        <Links loggedUser={loggedUser} />


                        {/* Skills */}
                        <Skills loggedUser={loggedUser} />


                        {/* Employment History */}
                        <History loggedUser={loggedUser} />

                        {/* Courses */}
                        <Courses loggedUser={loggedUser} />


                        {/* Languages */}
                        <Languages loggedUser={loggedUser} />


                        {/* References */}
                        <References loggedUser={loggedUser} />


                        {/* Hobbies */}
                        <Hobbies loggedUser={loggedUser} />

                    </LayoutDashboard>
                    : <Navigate to={'/login'} />
            }
        </>

    );
};

export default Dashboard;