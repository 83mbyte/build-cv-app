import React, { forwardRef } from 'react';

import styles from './Amsterdam.module.css';

import StarRating from '@/components/StarRating/StarRating';

import sanitizeString from '@/lib/sanitizeString';

const Amsterdam = forwardRef(function AmsterdamRef({ data }, ref) {

    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections }
        = data;

    return (

        <div className={styles.resumeContainer} name="amsterdam" ref={ref}>

            {/* <!-- header container --> */}
            <div className={styles.headerContainer}>
                <div className={styles.personName}>{`${personDetails.data.firstName} ${personDetails.data.lastName}`}</div>
                {personDetails.data.jobTitle !== '' && <div className={styles.personJobTitle}>{personDetails.data.jobTitle}</div>}
            </div>
            {/* <!-- header container end --> */}

            {/* <!-- details container --> */}
            <div className={styles.detailsContainer}>

                {/* <!-- left side --> */}
                <div className={styles.leftSide}>

                    {/* <!-- details --> */}
                    <div className={styles.sectionContainer} id="details">
                        <div className={styles.sectionTitle}>details</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>address</div>
                                {(personDetails.data.street !== '')
                                    && <div>{personDetails.data.street}</div>
                                }
                                {(personDetails.data.city && personDetails.data.city !== '')
                                    && <div>{personDetails.data.city}</div>
                                }
                                {
                                    (personDetails.data.country && personDetails.data.country !== '') && <div>{personDetails.data.country}</div>
                                }
                            </div>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>phone</div>
                                {
                                    personDetails.data.phone !== '' &&
                                    <div><a className={styles.lnk} href={`tel:${personDetails.data.phone}`}>{personDetails.data.phone}</a></div>
                                }
                            </div>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>email</div>
                                {
                                    personDetails.data.email !== '' &&
                                    <div><a className={styles.lnk} href={`mailto:${personDetails.data.email}`}>{personDetails.data.email}</a></div>
                                }
                            </div>
                        </div>
                    </div>
                    {/* <!-- details end --> */}

                    {/* <!-- Links --> */}
                    {
                        <div className={styles.sectionContainer} id="links">
                            <div className={styles.sectionTitle}>Links</div>
                            <div className={styles.sectionBody}>
                                {
                                    websoclinks.data && websoclinks.data.length > 0
                                    && websoclinks.data.map((elem, index) => {
                                        return <div className={styles.item} key={`link_${index}`}>
                                            <div><a className={styles.lnk} href={elem.link}>{elem.label}</a></div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Links end --> */}

                    {/* <!-- Skills --> */}
                    {
                        // skills.isSectionVisible
                        // &&
                        <div className={styles.sectionContainer} id="skills">
                            <div className={styles.sectionTitle}>Skills</div>
                            <div className={styles.sectionBody}>
                                {skills.data && skills.data.length > 0 &&
                                    skills.data.map((elem, index) => {
                                        return (
                                            <div className={styles.item} key={`skill_${index}`}>
                                                <div>{elem.label}</div>
                                                {
                                                    !skills.__serv.isSwitchChecked &&
                                                    <div><StarRating level={elem.level} /></div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Skills end --> */}


                    {/* <!-- Languages --> */}
                    {
                        additionalSections.indexOf('languages') !== -1 &&
                        <div className={styles.sectionContainer} id="lang">
                            <div className={styles.sectionTitle}>Languages</div>
                            <div className={styles.sectionBody}>
                                {
                                    languages.data && languages.data.length > 0 &&
                                    languages.data.map((elem, index) => {
                                        return (
                                            <div className={styles.item} key={`skill_${index}`}>
                                                <div>{elem.language}</div>
                                                {
                                                    elem.level !== '' && <div className={styles.infoText}>({elem.level})</div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Languages end --> */}

                    {/* <!-- Hobbies --> */}
                    {
                        additionalSections.indexOf('hobbies') !== -1 &&
                        <div className={styles.sectionContainer} id="hobbies">
                            <div className={styles.sectionTitle}>Hobbies</div>
                            <div className={styles.sectionBody}>
                                {
                                    hobbies.data.value && hobbies.data.value !== '' &&
                                    <div className={styles.item}>
                                        <div dangerouslySetInnerHTML={{ __html: sanitizeString(hobbies.data.value) }}></div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Hobbies end --> */}

                </div>

                {/* <!-- right side --> */}
                <div className={styles.rightSide}>

                    {/* <!-- profile --> */}
                    <div className={styles.sectionContainer} id="profile">
                        <div className={styles.sectionTitle}>profile summary</div>
                        <div className={styles.sectionBody}>
                            {
                                summary.data.value !== '' &&
                                <div className={styles.item} dangerouslySetInnerHTML={{ __html: sanitizeString(summary.data.value) }}>
                                </div>
                            }
                        </div>
                    </div>
                    {/* <!-- profile end --> */}

                    {/* <!-- Education --> */}
                    {
                        // education.isSectionVisible &&
                        <div className={styles.sectionContainer} id="education">
                            <div className={styles.sectionTitle}>education</div>
                            <div className={styles.sectionBody}>
                                {
                                    education.data && education.data.length > 0 &&
                                    education.data.map((elem, index) => {
                                        return (
                                            <div className={styles.item} key={`education_${index}`}>
                                                <div className={styles.itemRow}>
                                                    <div className={styles.firstColumn}>
                                                        <div className={styles.bold}>{elem.degree && elem.degree !== '' && `${elem.degree}'s degree, `}{elem.institution}</div>
                                                        <div className={styles.infoText}>{elem.period}</div>
                                                    </div>
                                                    <div className={styles.secondColumn}>
                                                        <div className={styles.infoText}>{elem.location}</div>
                                                    </div>
                                                </div>
                                                {
                                                    elem.comments && elem.comments !== '' &&
                                                    <div className={styles.itemRow} dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}></div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Education end--> */}

                    {/* <!-- Courses --> */}
                    {
                        additionalSections.indexOf('courses') !== -1 &&
                        <div className={styles.sectionContainer} id="courses">
                            <div className={styles.sectionTitle}>courses</div>
                            <div className={styles.sectionBody}>
                                {
                                    courses.data && courses.data.length > 0 &&
                                    courses.data.map((elem, index) => {
                                        return (
                                            <div className={styles.item} key={`course_${index}`}>
                                                <div className={styles.itemRow}>
                                                    <div className={styles.firstColumn}>
                                                        <div className={styles.bold}>
                                                            {elem.course}{elem?.institution && `, ${elem.institution}`}
                                                        </div>
                                                        <div className={styles.infoText}>{elem.period}</div>

                                                    </div>
                                                    {
                                                        elem?.cert !== ''
                                                        &&
                                                        <div className={styles.secondColumn}>
                                                            <div className={styles.infoText}><a className={styles.lnk} href={elem.cert} target='_blank' rel="noreferrer">Link to certificate</a></div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Courses end--> */}

                    {/* <!-- Employment History --> */}
                    {
                        employmentHistory.data && employmentHistory.data.length > 0 &&
                        <div className={styles.sectionContainer} id="employment">
                            <div className={styles.sectionTitle}>Employment History</div>
                            <div className={styles.sectionBody}>
                                {
                                    employmentHistory.data.map((elem, index) => {
                                        return (
                                            <div className={styles.item} key={`employment_${index}`}>
                                                <div className={styles.itemRow}>
                                                    <div className={styles.firstColumn}>
                                                        <div className={styles.bold}>{elem.job}, {elem.employer}.</div>
                                                        <div className={styles.infoText}>{elem.period}</div>
                                                    </div>
                                                    <div className={styles.secondColumn}>
                                                        <div className={styles.infoText}>{elem.location}</div>
                                                    </div>
                                                </div>
                                                {elem.comments && elem.comments !== '' &&
                                                    <div dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                {/* <!-- Employment history item end --> */}
                            </div>
                        </div>
                    }
                    {/* <!-- Employment History end --> */}

                    {/* <!-- References --> */}
                    {
                        additionalSections.indexOf('references') !== -1 &&
                        <div className={styles.sectionContainer} id="references">
                            <div className={styles.sectionTitle}>references</div>
                            <div className={styles.sectionBody}>
                                {
                                    !references.__serv.isSwitchChecked
                                        ? <>
                                            {
                                                references.data && references.data.length > 0 &&
                                                references.data.map((elem, index) => {
                                                    return (
                                                        <div className={styles.item} key={`reference_${index}`}>
                                                            <div className={styles.itemRow}>
                                                                <div className={styles.firstColumn}>
                                                                    <div className={styles.bold}>{elem.name} from {elem.company}</div>
                                                                    {
                                                                        elem.email && elem.email !== '' &&
                                                                        <div className={styles.infoText}>
                                                                            email: <a className={styles.lnk} href={`mailto:${elem.email}`}>{elem.email}</a>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        elem.phone && elem.phone !== '' &&
                                                                        <div className={styles.infoText}>
                                                                            phone: <a className={styles.lnk} href={`tel:${elem.phone}`}>{elem.phone}</a>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                        : 'References available upon request'
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- References end --> */}

                </div>

            </div>
            {/* <!-- details container end --> */}

        </div >
    )
});

export default Amsterdam;