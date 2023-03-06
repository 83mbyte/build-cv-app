
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import Dublin from './Templates/Dublin/Dublin';
import Amsterdam from './Templates/Amsterdam/Amsterdam';
import SpinnerCustom from '../Spinner/SpinnerCustom';

const TemplatePreview = forwardRef((props, ref) => {

    const templateName = useSelector(state => state.templates.data.selected);
    const personDetails = useSelector(state => state.personDetails.data);
    const websoclinks = useSelector(state => state.websoclinks.data);
    const skills = useSelector(state => state.skills);
    const summary = useSelector(state => state.summary.data);
    const education = useSelector(state => state.education.data);
    const courses = useSelector(state => state.courses.data);
    const employmentHistory = useSelector(state => state.employmentHistory.data);
    const languages = useSelector(state => state.languages.data);
    const hobbies = useSelector(state => state.hobbies.data);
    const references = useSelector(state => state.references.data);
    const image = useSelector(state => state.image.data.encoded);

    let content;

    if (templateName) {
        switch (templateName.toLowerCase()) {
            case 'dublin':
                return <Dublin data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image }} ref={ref} />

            case 'amsterdam':
                return <Amsterdam data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references }} ref={ref} />
            default:
                return <Amsterdam />
        }
    } else {
        return <SpinnerCustom />
    }


});

export default TemplatePreview;