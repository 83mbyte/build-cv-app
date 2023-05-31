import React, { forwardRef } from 'react';
import DOMPurify from 'dompurify';
import styling from './Mdriad.module.css';
const Mdriad = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image, additionalSections }
        = data;

    const removeEmptyData = (dataArray) => {
        return dataArray.filter((elem) => elem !== '')
    }

    const sanitizeData = (data) => {
        return DOMPurify.sanitize(data)
    }

    return (
        <div className={styling.resumeContainer} name={'mdriad'} ref={ref}>
            {/* Header */}
            <div className={styling.headerContainer}>
                {
                    image && image !== '' &&
                    <div className={styling.headerImgContainer}><img src={image} alt="userPhoto" /></div>
                }
                <div className={`${styling.headerInfoContainer} ${styling['bgTeal']}`}>
                    <div className={styling.personContainer}>
                        <p className={`${styling.personName} ${styling.bold}  ${styling.upperCase}`}>{personDetails.data.firstName}</p>
                        {
                            personDetails.data.lastName !== '' &&
                            <p className={`${styling.personName} ${styling.bold} ${styling.upperCase}`}>{personDetails.data.lastName}</p>
                        }
                        <p>{personDetails.data.jobTitle}</p>
                    </div>
                </div>
            </div>
            {/* Header end */}

            {/* Body */}
            <div className={styling.bodyContainer} >
                {/* Details */}
                <SectionContainer id={'details'} title={'Details'}>
                    <div className={styling.sectionItem}>
                        <p>{removeEmptyData([personDetails.data.street, personDetails.data.city, personDetails.data.country]).join(', ')}</p>
                        {
                            personDetails.data.email !== ''
                            && <p><a href={`mailto: ${personDetails.data.email}`} className={styling.lnk}>{personDetails.data.email}</a></p>
                        }
                        {
                            personDetails.data.phone !== ''
                            && <p>{personDetails.data.phone}</p>
                        }
                    </div>
                </SectionContainer>
                {/* Details end  */}

                {/* Profile Summary */}
                <SectionContainer id={'profile'} title={'Profile'}>
                    <div className={styling.sectionItem}>
                        <div dangerouslySetInnerHTML={{ __html: sanitizeData(summary.data.value) }}>
                        </div>
                    </div>
                </SectionContainer>
                {/* Profile Summary end */}

                {/* Education */}

                {
                    education.data.length > 0 &&
                    <SectionContainer id={'education'} title={'Education'}>
                        {
                            education.data && education.data.length > 0 &&
                            education.data.map((elem, index) => {
                                return (
                                    <div className={styling.sectionItem} key={`education_${index}`}>
                                        <div className={styling.sectionItemTitle}>
                                            <div className={styling.bold}>
                                                {removeEmptyData([elem.degree, elem.institution, elem.location]).join(', ')}
                                            </div>
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
                {/* Education end */}

                {/* Skills */}
                {
                    skills.data && skills.data.length > 0 &&
                    <SectionContainer id={'skills'} title={'Skills'}>
                        <div className={styling.sectionItem} >
                            <div className={`${styling.row} ${styling.rowWrap} ${styling.gap_25px}`}>
                                {
                                    skills.data.map((elem, index) => {
                                        return (
                                            <div className={styling.halfWidth} key={`skill_${index}`}>
                                                <LineBarAndText label={elem.label} level={elem.level} isVisible={!skills.__serv.isSwitchChecked} />
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
                                    <div className={styling.sectionItem} key={`course_${index}`}>
                                        <div className={styling.sectionItemTitle}>
                                            <div className={`${styling.row} ${styling.spaceBetween}`}>
                                                <div className={styling.bold}>{elem.course}</div>
                                                {
                                                    elem.cert && elem.cert !== '' &&
                                                    <div className={`${styling.quarterWidth} ${styling.alignRight}`}><a href={elem.cert} className={styling.lnk} target={'_blank'} rel={'noreferrer'}>Link to Certificate</a></div>
                                                }
                                            </div>
                                            {
                                                elem.institution !== '' &&
                                                <div className={`${styling.extraInfo}`}>{elem.institution}</div>
                                            }
                                            {
                                                elem.period !== '' &&
                                                <div className={`${styling.extraInfo}`}>{elem.period}</div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </SectionContainer>
                }
                {/* Courses end */}

                {/* Skills */}
                {
                    additionalSections.indexOf('languages') !== -1 &&
                    <SectionContainer id={'lang'} title={'Languages'}>
                        <div className={styling.sectionItem}>
                            <div className={`${styling.row} ${styling.rowWrap} ${styling.gap_25px}`}>
                                {
                                    languages.data.length > 0 && languages.data.map((elem, index) => {
                                        return (
                                            <div className={styling.thirdWidth} key={`language_${index}`}>
                                                <LanguagesItem label={elem.language} level={elem.level} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </SectionContainer>
                }
                {/* Skills end */}

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
                {/* Links end  */}

                {/* Employment History */}
                {
                    employmentHistory.data.length > 0 &&
                    <SectionContainer id={'employment'} title={'Employment History'}>
                        {
                            employmentHistory.data.map((elem, index) => {
                                return (
                                    <div className={styling.sectionItem} key={`employmentHistory_${index}`}>
                                        <div className={styling.sectionItemTitle}>
                                            <div><span className={styling.bold}>{removeEmptyData([elem.job, elem.employer]).join(', ')}</span>{elem.location !== '' && ` (${elem.location})`}</div>
                                            {
                                                elem.period && elem.period !== '' &&
                                                <div className={`${styling.extraInfo} ${styling.upperCase}`}>{elem.period}</div>
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
                {/* Employment History end */}

                {/* References */}
                {
                    additionalSections.indexOf('references') !== -1 &&
                    <SectionContainer id={'references'} title={'References'}>
                        <div className={styling.sectionItem}>
                            <div className={`${styling.row} ${styling.rowWrap} ${styling.gap_25px}`}>
                                {
                                    references.__serv.isSwitchChecked
                                        ? <div >References available upon request</div>
                                        : <>
                                            {
                                                references.data.length > 0 &&
                                                references.data.map((elem, index) => {
                                                    return (
                                                        <ReferencesItem person={elem.name} company={elem.company} email={elem.email} phone={elem.phone} key={`reference_${index}`} />
                                                    )
                                                })
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </SectionContainer>
                }
                {/* References end */}

                {/* Hobbies */}
                {
                    additionalSections.indexOf('hobbies') !== -1 &&
                    <SectionContainer id={'hobbies'} title={'Hobbies'}>
                        <div className={styling.sectionItem}>
                            <div dangerouslySetInnerHTML={{ __html: sanitizeData(hobbies.data.value) }}></div>
                        </div>
                    </SectionContainer>
                }
                {/* Hobbies end */}

            </div >

            {/* Body end */}
        </div >
    )
});

export default Mdriad;


const SectionContainer = ({ id, title, bgColor = 'bgDark', children }) => {
    return (

        <div className={styling.sectionContainer} id={id}>

            <div className={styling.row}>

                <div className={`${styling.sectionTitle} ${styling[bgColor]}`}>
                    <h1><span>{title}</span></h1>
                </div>
            </div>
            <div className={styling.sectionBody}>
                {children}
            </div>
        </div>
    )
}

const LineBarAndText = ({ label, level, isVisible = true, lineColor = 'bgDark' }) => {

    return (
        <div className={styling.lineBarContainer}>
            <div className={styling.bold}>{label}</div>
            {
                isVisible &&
                <div className={styling.lineBarBackground}>
                    <div className={`${styling.lineBarLevel} ${styling[lineColor]}`} style={{ width: `calc(${level}*20%)` }}></div>
                </div >
            }
        </div>
    )
}

const LanguagesItem = ({ label, level }) => {
    return (
        <div>
            <div className={styling.bold}>{label}</div>
            <div className={`${styling.extraInfo}`}>{level}</div>
        </div>
    )
}

const ReferencesItem = ({ person, company, email, phone }) => {
    return (
        <div className={styling.halfWidth}>
            <div className={styling.sectionItemTitle}>
                <div><span className={styling.bold}>{person}</span> from {company}</div>
            </div>
            <div className={styling.sectionItemBody}>
                <div>email: <a href={`mailto: ${email}`} className={styling.lnk}>{email}</a></div>
                <div>phone: <a href={`tel: ${phone}`} className={styling.lnk}>{phone}</a></div>

            </div >
        </div >
    )
}