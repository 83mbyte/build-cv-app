
import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import LayoutDashboard from '../components/Layouts/LayoutDashboard';
import { Navigate } from 'react-router-dom';
import PersonDetails from '../components/Sections/PersonDetails';
import Summary from '../components/Sections/Summary';
import Education from '../components/Sections/Education';
import Links from '../components/Sections/Links';
import Skills from '../components/Sections/Skills';
import History from '../components/Sections/History';
import { getAdditionalSections } from '../redux/features/utility/utilitySlice';

const Hobbies = lazy(() => import('../components/Sections/Hobbies'));
const Languages = lazy(() => import('../components/Sections/Languages'));
const Courses = lazy(() => import('../components/Sections/Courses'));
const References = lazy(() => import('../components/Sections/References'));

const Dashboard = () => {
    const loggedUser = useSelector(state => state.utility.auth.data);
    const additionalSections = useSelector(state => state.utility.additionalSections);
    const dispatch = useDispatch();

    const [loadedPersonDetailsSection, setLoadedPersonDetailsSection] = React.useState(false);

    const sectionsToShow = {
        hobbies: <Hobbies loggedUser={loggedUser} key={'section_hobbies'} />,
        courses: <Courses loggedUser={loggedUser} key={'section_curses'} />,
        references: <References loggedUser={loggedUser} key={'section_references'} />,
        languages: <Languages loggedUser={loggedUser} key={'section_languages'} />
    }

    useEffect(() => {
        if (additionalSections.status === 'idle') {
            dispatch(getAdditionalSections(loggedUser));
        }
    }, [additionalSections.status, loggedUser, dispatch])

    return (
        <>
            {
                loggedUser
                    ?
                    <LayoutDashboard loggedUser={loggedUser}>
                        {/* Personal Details section */}
                        <PersonDetails setLoadedPersonDetailsSection={setLoadedPersonDetailsSection} loadedPersonDetailsSection={loadedPersonDetailsSection} />

                        {
                            !loadedPersonDetailsSection
                                ? <div>
                                    {/* Just one empty div */}
                                </div>
                                : <>

                                    {/* Professional Summary section */}
                                    <LoadingInViewSection>
                                        <Summary loggedUser={loggedUser} />
                                    </LoadingInViewSection>


                                    {/* Education section */}
                                    <LoadingInViewSection>
                                        <Education loggedUser={loggedUser} />
                                    </LoadingInViewSection>


                                    {/* Links */}
                                    <LoadingInViewSection>
                                        <Links loggedUser={loggedUser} />
                                    </LoadingInViewSection>


                                    {/* Skills */}
                                    <LoadingInViewSection>
                                        <Skills loggedUser={loggedUser} />
                                    </LoadingInViewSection>


                                    {/* Employment History */}
                                    <LoadingInViewSection>
                                        <History loggedUser={loggedUser} />
                                    </LoadingInViewSection>


                                    {
                                        additionalSections.data
                                        && additionalSections.data.map((item, index) => {

                                            return (
                                                // Additional sections  
                                                <Fragment key={index}>
                                                    <Suspense >
                                                        {sectionsToShow[item]}
                                                    </Suspense>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </>
                        }


                    </LayoutDashboard >
                    : <Navigate to={'/login'} />
            }
        </>

    );
};

export default Dashboard;


const LoadingInViewSection = ({ children }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ margin: 0, padding: 0 }}>
            {
                isInView ? children : <div style={{ height: '100vh', backgroundColor: '' }}>&nbsp;</div>
            }
        </div>
    )
}