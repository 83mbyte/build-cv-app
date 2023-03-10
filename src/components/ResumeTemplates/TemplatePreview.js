
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import Dublin from './Templates/Dublin/Dublin';
import Amsterdam from './Templates/Amsterdam/Amsterdam';
import SpinnerCustom from '../Spinner/SpinnerCustom';
import Vivien from './Templates/Vivien/Vivien';

const TemplatePreview = forwardRef((props, ref) => {

    const templateName = useSelector(state => state.templates.data.selected);
    const personDetails = useSelector(state => state.personDetails.data);
    const websoclinks = useSelector(state => state.websoclinks);
    const skills = useSelector(state => state.skills);
    const summary = useSelector(state => state.summary);
    const education = useSelector(state => state.education);
    const courses = useSelector(state => state.courses);
    const employmentHistory = useSelector(state => state.employmentHistory);
    const languages = useSelector(state => state.languages);
    const hobbies = useSelector(state => state.hobbies);
    const references = useSelector(state => state.references);
    const image = useSelector(state => state.image.data.encoded);

    if (templateName) {
        switch (templateName.toLowerCase()) {
            case 'dublin':
                return <Dublin data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image }} ref={ref} />

            case 'amsterdam':
                return <Amsterdam data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references }} ref={ref} />
            case 'vivien':
                return <Vivien data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image }} ref={ref} />
            default:
                return <Amsterdam />
        }
    } else {
        return <SpinnerCustom />
    }


});

export default TemplatePreview;