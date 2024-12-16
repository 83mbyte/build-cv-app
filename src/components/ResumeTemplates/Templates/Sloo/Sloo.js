import React, { forwardRef } from 'react';

import styles from './Sloo.module.css';
import StarRating from '@/components/StarRating/StarRating';
import sanitizeString from '@/lib/sanitizeString';

const Sloo = forwardRef(function SlooRef({ data }, ref) {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image, additionalSections }
        = data;

    return (
        <div className={styles.resumeContainer} name="sloo" ref={ref}>

            <div className={`${styles.headerContainer} ${styles.brownBackGround}`}>
                <div className={styles.headerMainSection}>
                    {
                        image && image !== '' &&
                        <div className={styles.headerPhoto}><img src={image} alt="userPhoto" /></div>
                    }
                    <h2>{personDetails.data.firstName} {personDetails.data.lastName}</h2>
                    {
                        personDetails?.data?.jobTitle &&
                        <p className={styles.role}>{personDetails.data.jobTitle}</p>
                    }
                </div>

                <div className={styles.headerBottomSection}>
                    <div className={styles.headerBottomItem}>
                        <p>&nbsp;<a href={personDetails.data.email} className={styles.lnk}>{personDetails.data.email}</a></p>
                    </div>
                    {(personDetails.data.street || personDetails.data.city || personDetails.data.country) &&
                        <div className={styles.headerBottomItem}>
                            <p>{[personDetails.data.street, personDetails.data.city, personDetails.data.country].join(', ')}</p>
                        </div>
                    }
                    {personDetails.data.phone !== '' &&
                        <div className={styles.headerBottomItem}>
                            <p>{personDetails.data.phone}</p>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.bodyContainer}>

                {/* Profil Summary */}
                <SectionContainer id="profile" title="Profile Summary">
                    <div className={styles.sectionItem}>
                        <div dangerouslySetInnerHTML={{ __html: sanitizeString(summary.data.value) }}>
                        </div>
                    </div>
                </SectionContainer>
                {/* Profil Summary end */}

                {/* Employment History*/}
                {
                    employmentHistory.data.length > 0 &&
                    <SectionContainer id={'employment'} title={'Employment History'}>
                        {
                            employmentHistory.data && employmentHistory.data.length > 0 &&
                            employmentHistory.data.map((elem, index) => {
                                return (

                                    <div key={`employmentHistory_${index}`} className={styles.sectionItem}>
                                        <div className={styles.bold}>{elem.job}{elem.employer !== '' && `, ${elem.employer}`}{elem.location !== '' && ` (${elem.location})`}</div>
                                        {
                                            elem.period && elem.period !== '' &&
                                            <div className={`${styles.sectionLittleText} ${styles.textBrown}`}>{elem.period}</div>
                                        }
                                        {elem.comments && elem.comments !== '' &&
                                            <div dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </SectionContainer>
                }
                {/* Employment History end*/}


                {/*Education */}
                {
                    education.data.length > 0 &&
                    <SectionContainer id={"education"} title={"Education"}>
                        {
                            education.data && education.data.length > 0 &&
                            education.data.map((elem, index) => {
                                return (
                                    <div key={`education_${index}`} className={styles.sectionItem}>
                                        <div className={styles.bold}>{elem.degree}{
                                            elem.degree !== ''
                                                ? `, ${elem.institution}`
                                                : `${elem.institution}`}{elem.location !== '' && ` (${elem.location})`}
                                        </div>
                                        {
                                            elem.period && elem.period !== '' &&
                                            <div className={styles.sectionLittleText}>{elem.period}</div>
                                        }
                                        {elem.comments && elem.comments !== '' &&
                                            <div dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </SectionContainer>
                }
                {/* Education end*/}

                {/* Links */}
                <SectionContainer id={'links'} title={'Links'}>
                    <div className={`${styles.row} ${styles.wrap}`}>
                        {
                            websoclinks.data.length > 0 &&
                            websoclinks.data.map((elem, index) => {

                                return (
                                    <div key={`link_${index}`}>
                                        <a href={elem.link} className={styles.lnk} target={'_blank'} rel={'noreferrer'}>{elem.label}</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </SectionContainer>
                {/* Links end */}


                {/* Skills */}
                <SectionContainer id={'skills'} title={'Skills'}>
                    <div className={`${styles.row} ${styles.wrapSpaceBetween}`} >
                        {
                            skills.data && skills.data.length > 0 &&
                            skills.data.map((elem, index) => {
                                return (
                                    <div key={`skill_${index}`} className={styles.columnToWrap}>
                                        <div>{elem.label}</div>
                                        {
                                            !skills.__serv.isSwitchChecked &&
                                            <div><StarRating level={elem.level} type={'circle'} customSize={'15px'} /></div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </SectionContainer>
                {/* Skills end */}

                {/* Courses */}

                {
                    additionalSections.indexOf('courses') !== -1 &&
                    <SectionContainer title={'Courses'} id={'courses'}>
                        {
                            courses.data && courses.data.length > 0 &&
                            courses.data.map((elem, index) => {
                                return (
                                    <div key={`course_${index}`} className={styles.sectionItem}>
                                        <div className={styles.bold}>
                                            {elem.course}{elem.institution !== '' && ` (${elem.institution})`}
                                        </div>
                                        <div className={`${styles.info} ${styles.sectionLittleText}`}>
                                            {
                                                elem.period && elem.period !== '' &&
                                                <div className={styles.sectionLittleText}>{elem.period}</div>
                                            }
                                            {
                                                elem.cert && elem.cert !== '' &&
                                                <div><a href={elem.cert} className={styles.lnk} target='_blank' rel="noreferrer">Link to certificate</a></div>
                                            }
                                        </div>
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
                        <div className={`${styles.row} ${styles.wrapSpaceBetween}`}>
                            {
                                languages.data.length > 0 && languages.data.map((elem, index) => {
                                    return (
                                        <div key={`language_${index}`} className={styles.columnToWrap}>

                                            <div>{elem.language}</div>
                                            {
                                                elem.level !== 'Select level' && elem.level !== '' &&
                                                <div className={styles.sectionLittleText}>{`(${elem.level})`}</div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </SectionContainer>
                }
                {/* Languages end */}

                {/* References */}
                {
                    additionalSections.indexOf('references') !== -1 &&
                    <SectionContainer id={'references'} title={'References'}>
                        {
                            references.__serv.isSwitchChecked
                                ? <div >References available upon request</div>
                                : <>
                                    {
                                        references.data.length > 0 &&
                                        references.data.map((elem, index) => {
                                            return (
                                                <div key={`reference_${index}`} className={styles.sectionItem}>
                                                    <div  >
                                                        {
                                                            elem.name !== '' ? <span className={styles.bold}>{elem.name}</span> : `Referent's name (not specified)`
                                                        }

                                                        {
                                                            elem.company !== '' &&
                                                            <>&nbsp;from <span className={styles.bold}>{elem.company}</span></>
                                                        }
                                                    </div>
                                                    <div className={`${styles.info} ${styles.sectionLittleText}`}>
                                                        {
                                                            elem.phone !== '' &&
                                                            <div >Phone: {elem.phone}</div>
                                                        }
                                                        {
                                                            elem.email !== '' &&
                                                            <div className={styles.sectionLittleText}>Email: <a href={`mailto:${elem.email}`} className={styles.lnk}>{elem.email}</a></div>
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

                {/* Hobbies*/}
                {
                    additionalSections.indexOf('hobbies') !== -1 &&
                    <SectionContainer id={'hobbies'} title={'Hobbies'}>
                        <div className={styles.sectionItem}>
                            <div dangerouslySetInnerHTML={{ __html: sanitizeString(hobbies.data.value) }}></div>
                        </div>
                    </SectionContainer>
                }
                {/* Hobbies end */}

            </div>
        </div>
    )
});

export default Sloo;

const SectionContainer = ({ id, title, children }) => {
    return (
        <div className={styles.sectionContainer} id={id}>
            <div className={`${styles.sectionTitle} ${styles.bold}`}>
                <h3>{title}</h3>
            </div>
            <div className={styles.sectionBody}>
                {children}
            </div>
        </div>
    )
}
