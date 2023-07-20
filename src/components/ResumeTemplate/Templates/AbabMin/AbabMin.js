import React, { forwardRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import styling from './AbabMin.module.css';


import StarRating from '../../../StarRating/StarRating';

const AbabMin = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections, setIsLoadedTemplateStatus }
        = data;

    const removeEmptyData = (dataArray) => {
        return dataArray.filter((elem) => elem !== '')
    }

    const sanitizeData = (data) => {
        return DOMPurify.sanitize(data)
    }

    useEffect(() => {
        setIsLoadedTemplateStatus(true);
        return () => {
            setIsLoadedTemplateStatus(false);
        }
    }, []);

    return (
        <div className={styling.resumeContainer} name={'ababmin'} ref={ref}>
            {/* Header */}
            <div className={`${styling.headerContainer} ${styling.gap_25px}`}>
                <div className={styling.headerFirst}>
                    <div className={styling.headerFirstColored}>
                        <div>
                            <div className={`${styling.personName} ${styling.upperCase}`}>{personDetails.data.firstName} <span className={styling.bold}>{personDetails.data.lastName}</span></div>
                            <div className={`${styling.personJob} ${styling.upperCase}`}>{personDetails.data.jobTitle}</div>
                        </div>
                    </div>
                </div>
                <div className={styling.headerSecond}>
                    <ul>
                        {
                            personDetails.data.phone !== ''
                            && <li>{personDetails.data.phone}</li>
                        }
                        {
                            personDetails.data.email !== ''
                            && <li><a href={`mailto: ${personDetails.data.email}`} className={styling.lnk}>{personDetails.data.email}</a></li>
                        }
                        {
                            (personDetails.data.street || personDetails.data.city || personDetails.data.country) &&
                            <li>{removeEmptyData([personDetails.data.street, personDetails.data.city, personDetails.data.country]).join(', ')}</li>
                        }
                    </ul>
                </div>
            </div>
            {/* Header end */}

            {/* Body */}
            <div className={styling.bodyContainer}>
                {/* Profile Summary */}
                <SectionContainer id='profile' title="Profile Summary">
                    <div className={styling.sectionItem}>
                        <div className={styling.comments} dangerouslySetInnerHTML={{ __html: sanitizeData(summary.data.value) }}>
                        </div>
                    </div>
                </SectionContainer>
                {/* Profile Summary end */}

                {/* Education */}
                {
                    education.data.length > 0 &&
                    <SectionContainer id='education' title="Education">
                        {
                            education.data.map((elem, index) => {
                                return (
                                    <div className={styling.sectionItem} key={`education_${index}`}>
                                        <div className={`${styling.sectionItemTitle}`}>
                                            <div className={`${styling.bold}`}>{removeEmptyData([elem.degree, elem.institution, elem.location]).join(', ')}</div>
                                            {
                                                elem.period !== '' &&
                                                <div className={`${styling.extraInfo} ${styling.upperCase}`}>{elem.period}</div>
                                            }
                                        </div>
                                        {
                                            elem.comments !== '' &&
                                            <div className={styling.sectionItemBody}>
                                                <div className={styling.comments} dangerouslySetInnerHTML={{ __html: sanitizeData(elem.comments) }}>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </SectionContainer>
                }
                {/* Education end  */}

                {/* Skills */}
                {
                    skills.data && skills.data.length > 0 &&
                    <SectionContainer id={'skills'} title={'Skills'}>
                        <div className={styling.sectionItem}>
                            <div className={`${styling.row} ${styling.rowWrap} ${styling.gap_25px} ${styling.row_gap_15px}`}>
                                {
                                    skills.data.map((elem, index) => {
                                        return (
                                            <div className={styling.thirdWidth} key={`skill_${index}`}>
                                                <div className={`${styling.bold}`}>{elem.label}</div>
                                                {
                                                    !skills.__serv.isSwitchChecked &&
                                                    <div><StarRating level={elem.level} type={'square'} customSize={'12px'} /></div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </SectionContainer>
                }
                {/* Skills end */}

                {/* Courses */}
                {
                    additionalSections.indexOf('courses') !== -1 &&
                    <SectionContainer id={'courses'} title={'Courses'}>
                        {
                            courses.data && courses.data.length > 0 &&
                            courses.data.map((elem, index) => {
                                return (
                                    <div className={`${styling.sectionItem} ${styling.row} ${styling.spaceBetween}`} key={`course_${index}`}>
                                        <div className={`${styling.sectionItemTitle}`}>
                                            <div className={`${styling.bold}`}>{elem.course}</div>
                                            {
                                                (elem.institution !== '' || elem.period !== '') &&
                                                <div className={`${styling.extraInfo}`}>
                                                    {removeEmptyData([elem.institution, elem.period]).join(', ')}
                                                </div>
                                            }
                                        </div>
                                        {
                                            elem.cert && elem.cert !== '' &&
                                            <div className={`${styling.thirdWidth} ${styling.justifyEnd} ${styling.flex}`}><a href={elem.cert} className={styling.lnk} target={'_blank'} rel={'noreferrer'}>Link to cetificate</a></div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </SectionContainer>
                }

                {/* Courses end */}

                {/* Languages */}
                {
                    additionalSections.indexOf('languages') !== -1 &&
                    <SectionContainer id={'lang'} title={'Languages'}>
                        <div className={styling.sectionItem}>
                            <div className={`${styling.row} ${styling.rowWrap} ${styling.gap_25px} ${styling.row_gap_15px} ${styling.spaceBetween}`}>
                                {
                                    languages.data.length > 0 && languages.data.map((elem, index) => {
                                        return (
                                            <div className={styling.thirdWidth} key={`language_${index}`}>
                                                <div className={`${styling.bold}`}>{elem.language}</div>
                                                <div className={`${styling.extraInfo}`}>/{elem.level}/</div>
                                            </div>)
                                    })
                                }
                            </div>
                        </div>
                    </SectionContainer>
                }
                {/* Languages end */}

                {/* Employment history */}
                {
                    employmentHistory.data.length > 0 &&
                    <SectionContainer id={'employment'} title={'Employment History'}>
                        {
                            employmentHistory.data.map((elem, index) => {
                                return (
                                    <div className={styling.sectionItem} key={`employmentHistory_${index}`}>
                                        <div className={`${styling.row} ${styling.spaceBetween}`}>
                                            <div className={`${styling.sectionItemTitle}`}>
                                                <div className={`${styling.bold}`}>{removeEmptyData([elem.job, elem.employer]).join(', ')}</div>
                                                {
                                                    elem.location !== '' &&
                                                    <div className={`${styling.extraInfo}`}>{elem.location}</div>
                                                }
                                            </div>
                                            {
                                                elem.period && elem.period !== '' &&
                                                <div className={`${styling.quarterWidth} ${styling.justifyEnd} ${styling.flex}`}>{elem.period}</div>
                                            }
                                        </div>
                                        {
                                            elem.comments && elem.comments !== '' &&
                                            <div className={styling.sectionItemBody}>
                                                <div className={styling.comments} dangerouslySetInnerHTML={{ __html: sanitizeData(elem.comments) }}>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </SectionContainer>
                }
                {/* Employment history end */}

                {/* References */}
                {
                    additionalSections.indexOf('references') !== -1 &&
                    <SectionContainer id={'references'} title={'References'}>
                        {
                            references.__serv.isSwitchChecked
                                ? <div >References available upon request</div>
                                :
                                <>
                                    {
                                        references.data.length > 0 &&
                                        references.data.map((elem, index) => {
                                            return (
                                                <div className={`${styling.sectionItem} `} key={`reference_${index}`}>
                                                    <div className={`${styling.row} ${styling.spaceBetween}`}>
                                                        <div className={`${styling.sectionItemTitle}`}>
                                                            <div className={`${styling.bold}`}>{elem.name}</div>
                                                        </div>
                                                        <div className={`${styling.halfWidth} ${styling.flex}  ${styling.justifyEnd}`}>
                                                            <div className={`${styling.extraInfo}`}>{elem.company}</div>
                                                        </div>
                                                    </div>
                                                    <div className={styling.sectionItemBody}>
                                                        {
                                                            elem.phone !== '' &&
                                                            <div>phone: {elem.phone}</div>
                                                        }
                                                        {
                                                            elem.email !== '' &&
                                                            <div>email: <a href={`mailto: ${elem.email}`} className={styling.lnk}>{elem.email}</a></div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }


                    </SectionContainer>
                }
                {/* References end */}

                {/* Links */}
                <SectionContainer id={'links'} title={'Links'}>
                    <div className={styling.sectionItem}>
                        <div className={`${styling.row} ${styling.rowWrap} ${styling.gap_25px}`}>
                            {
                                websoclinks.data.length > 0 &&
                                websoclinks.data.map((elem, index) => {
                                    return (
                                        <div className={styling.bold} key={`link_${index}`}>
                                            <a href={elem.link} target={'_blank'} rel={'noreferrer'} className={styling.lnk}>{elem.label}</a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </SectionContainer>
                {/* Links end */}

                {/* Hobbies */}
                {
                    additionalSections.indexOf('hobbies') !== -1 &&
                    <SectionContainer id={'hobbies'} title={'Hobbies'}>
                        <div className={styling.sectionItem}>
                            <div className={styling.comments} dangerouslySetInnerHTML={{ __html: sanitizeData(hobbies.data.value) }}>
                            </div>
                        </div>
                    </SectionContainer>
                }
                {/* Hobbies end */}
            </div >
            {/* Body end */}

        </div >
    )
});


export default AbabMin;

const SectionContainer = ({ id, title, children }) => {
    return (
        <div className={styling.sectionContainer} id={id}>
            <div className={`${styling.sectionTwoColumns} ${styling.gap_25px}`}>
                <div className={`${styling.sectionTitle} ${styling.thirdWidthSection}`}>
                    <span className={styling.bold}>{title}</span>
                </div>
                <div className={styling.sectionBody}>
                    {children}
                </div>

            </div>
        </div>
    )
}