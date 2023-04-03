
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
import DividerCustom from '../components/Divider/DividerCustom';

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
                        <DividerCustom />

                        {/* Professional Summary section */}
                        <Summary loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Education section */}
                        <Education loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Links */}
                        <Links loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Skills */}
                        <Skills loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Courses */}
                        <Courses loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Employment History */}
                        <History loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Languages */}
                        <Languages loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* References */}
                        <References loggedUser={loggedUser} />
                        <DividerCustom />

                        {/* Hobbies */}
                        <Hobbies loggedUser={loggedUser} />

                    </LayoutDashboard>
                    : <Navigate to={'/login'} />
            }
        </>

    );
};

export default Dashboard;