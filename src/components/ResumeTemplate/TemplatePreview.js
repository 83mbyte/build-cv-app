import React, { forwardRef, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

const Amsterdam = lazy(() => import('./Templates/Amsterdam/Amsterdam'));
const Vivien = lazy(() => import('./Templates/Vivien/Vivien'));
const Lndn = lazy(() => import('./Templates/Lndn/Lndn'));

const TemplatePreview = forwardRef((props, ref) => {
    const templateName = useSelector(state => state.templates.data.selected);

    const personDetails = useSelector(state => state.personDetails);
    const websoclinks = useSelector(state => state.links);
    const skills = useSelector(state => state.skills);
    const summary = useSelector(state => state.summary);
    const education = useSelector(state => state.education);
    const courses = useSelector(state => state.courses);
    const employmentHistory = useSelector(state => state.history);
    const languages = useSelector(state => state.languages);
    const hobbies = useSelector(state => state.hobbies);
    const references = useSelector(state => state.references);
    const image = useSelector(state => state.image.data.value);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);

    if (templateName) {
        switch (templateName.toLowerCase()) {
            case 'amsterdam':
                return <Suspense>
                    <Amsterdam data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections }} ref={ref} />
                </Suspense>
            // break;
            case 'vivien':
                return <Suspense>
                    <Vivien data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections, image }} ref={ref} />
                </Suspense>

            case 'lndn':
                return <Suspense>
                    <Lndn data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image, additionalSections }} ref={ref} />
                </Suspense>

            default:
                return <Suspense>
                    <Amsterdam data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections }} ref={ref} />
                </Suspense>
        }
    } else {
        return <Suspense>
            <Amsterdam data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections }} ref={ref} />
        </Suspense>
    }
});

export default TemplatePreview;