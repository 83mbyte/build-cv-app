import React, { forwardRef } from 'react';

import styles from './Dublin.module.css';


const Dublin = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references }
        = data;
    return (
        <div className={styles.resumeContainer} name='dublin' ref={ref}>
            <div className={styles.detailsContainer}>
                <div className={styles.leftSide}>
                    {/* <!-- Name Section --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.nameContainer}>
                            <div className={`${styles.personName} ${styles.bold}`}>{personDetails.name.firstName.value}<br />{personDetails.name.lastName.value}</div>

                            <div className={`${styles.personRole} ${styles.upperCase}`}>{personDetails.position.jobTitle && personDetails.position.jobTitle.value}</div>
                        </div>
                    </div>
                    {/* <!-- Name Section end --> */}

                    {/* <!-- Details Container --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>Details</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <div>{personDetails.address.city ? personDetails.address.city.value : 'fuck'}</div>
                            </div>
                            <div className={styles.item}><div>{personDetails.address.country && personDetails.address.country.value}</div></div>
                            <div className={styles.item}><div>{personDetails.contacts.phone && personDetails.contacts.phone.value}</div></div>
                            <div className={styles.item}><div>{personDetails.contacts.email && personDetails.contacts.email.value}</div></div>
                        </div>
                    </div>
                    {/* <!-- Details Container end  --> */}

                    {/* <!-- Links --> */}
                    {
                        (websoclinks.length > 0) &&
                        <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Links</div>
                            <div className={styles.sectionBody}>
                                {
                                    websoclinks.map((item, index) => {
                                        return <div className={styles.item} key={`links_${index}`}><div><a href={item.link.value}>{item.label.value}</a></div></div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Links end --> */}

                    {/* <!-- Skills --> */}
                    {
                        (skills.length > 0)
                        && <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Skills</div>
                            <div className={styles.sectionBody}>
                                {
                                    skills.map((item, index) => {
                                        return <div className={styles.item} key={`skills_${index}`}>
                                            <div>{item.skill.value}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Skills end --> */}

                    {/* <!-- Languages --> */}
                    {
                        (languages.length > 0)
                        && <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Languages</div>
                            <div className={styles.sectionBody}>
                                {
                                    languages.map((item, index) => {
                                        return <div className={styles.item} key={`languages_${index}`}>
                                            <div>{item.language.value}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Languages end --> */}

                    {/* <!-- Hobbies --> */}
                    {
                        (hobbies.value !== '')
                        && <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Hobbies</div>
                            <div className={styles.sectionBody}>
                                <div className={styles.item} key={`hobbies `}>
                                    <div>{hobbies.value}</div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* <!-- Hobbies end --> */}

                </div>

                <div className={styles.rightSide}>
                    {/* <!-- profile --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>Details</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <p className={styles.txt} dangerouslySetInnerHTML={{ __html: summary.value }}>

                                </p>

                            </div>
                        </div>
                    </div>
                    {/* <!-- profile end --> */}

                    {/* <!-- Education --> */}
                    {
                        education.length > 0
                        && <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Education</div>
                            <div className={styles.sectionBody}>
                                {
                                    education.map((item, index) => {
                                        return <div className={styles.item} key={`education_${index}`}>
                                            <div className={styles.bold}>{item.degree.value !== '' && `${item.degree.value}, `}{item.title.value}</div>
                                            <div className={`${styles.infoText} ${styles.upperCase}`}>{item.period.value}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Education end--> */}

                    {/* <!-- Courses --> */}
                    {
                        courses.length > 0
                        && <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Courses</div>
                            <div className={styles.sectionBody}>
                                {
                                    courses.map((item, index) => {
                                        return <div className={styles.item} key={`courses_${index}`}>
                                            <div className={styles.bold}>
                                                {item.course.value}, {item.institution.value}
                                            </div>
                                            <div className={`${styles.infoText} ${styles.upperCase}`}>{item.period.value}</div>
                                            {
                                                item.certificate.value !== '' && <div className={styles.infoText}><a href={item.certificate.value} target={'_blank'} rel="noreferrer">Link to the course certificate</a></div>
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Courses end--> */}

                    {/* <!-- Employment History --> */}
                    {
                        employmentHistory.length > 0 &&
                        <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Employment History</div>
                            <div className={styles.sectionBody}>
                                {
                                    employmentHistory.map((item, index) => {
                                        return <div className={styles.item} key={`employmentHistory_${index}`}>
                                            <div className={styles.bold}>{item.title.value}, {item.employer.value}, {item.location.value}</div>
                                            <div className={`${styles.infoText} ${styles.upperCase}`}>{item.period.value}</div>
                                            <p dangerouslySetInnerHTML={{ __html: item.wysiwyg.value }}>

                                            </p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* <!-- Employment History end --> */}

                    {/* <!-- References  --> */}
                    {
                        references.length > 0 &&
                        <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>References</div>
                            <div className={styles.sectionBody}>
                                {
                                    references.map((item, index) => {
                                        return <div className={styles.item} key={`employmentHistory_${index}`}>
                                            <div className={styles.bold}>{item.referentName.value} from {item.company.value}</div>
                                            <div>
                                                {item.phone.value} | {item.email.value}
                                            </div>
                                            {/* <div className={`${styles.infoText} ${styles.upperCase}`}>{item.period.value}</div>
                          <p dangerouslySetInnerHTML={{ __html: item.wysiwyg.value }}>

                          </p> */}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- References end --> */}
                </div>
            </div>
        </div>
    )
})

export default Dublin;