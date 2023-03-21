import React, { forwardRef } from 'react';
import StarRating from '../../../StarRating/StarRating';

import styles from './Dublin.module.css';


const Dublin = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image }
        = data;

    return (
        <div className={styles.resumeContainer} name='dublin' ref={ref}>
            <div className={styles.detailsContainer}>

                <div className={styles.leftSide}>
                    {/* <!-- Name Section --> */}
                    <div className={styles.sectionContainer} >
                        <div className={styles.avatarWrapper}>
                            {
                                image
                                    ? <div className={styles.avatar}><img src={image} alt="imageUser" /></div>
                                    : <div className={styles.avatarEmpty}>place<br />photo</div>
                            }
                        </div>
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
                            {
                                personDetails.address.city.value !== '' &&
                                <div className={styles.item}>
                                    <div>{personDetails.address.city.value}</div>
                                </div>
                            }

                            {
                                personDetails.address.country.value !== '' &&
                                <div className={styles.item}><div>{personDetails.address.country.value}</div></div>
                            }
                            {
                                personDetails.contacts.phone.value !== '' &&
                                <div className={styles.item}><div><a href={`tel:${personDetails.contacts.phone.value}`}>{personDetails.contacts.phone.value}</a></div></div>
                            }
                            {
                                personDetails.contacts.email.value !== '' &&
                                <div className={styles.item}><div><a href={`mailto:${personDetails.contacts.email.value}`}>{personDetails.contacts.email.value}</a></div></div>
                            }
                        </div>
                    </div>
                    {/* <!-- Details Container end  --> */}

                    {/* <!-- Links --> */}
                    {
                        websoclinks.isSectionVisible &&
                        <div className={styles.sectionContainer}>
                            <div className={styles.sectionTitle}>Links</div>
                            <div className={styles.sectionBody}>
                                {
                                    websoclinks.data.map((item, index) => {
                                        return (
                                            <div className={styles.item} key={`links_${index}`}>
                                                <div><a href={item.link.value}>{item.label.value}</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Links end --> */}

                    {/* <!-- Skills --> */}
                    {
                        skills.isSectionVisible
                        && <div className={styles.sectionContainer} id="skills">
                            <div className={styles.sectionTitle}>Skills</div>
                            <div className={styles.sectionBody}>
                                {
                                    skills.data.length > 0
                                    && skills.data.map((item, index) => {
                                        return <div className={styles.item} key={`skills_${index}`}>
                                            <div>{item.skill.value}</div>
                                            {
                                                !skills.isSwitchChecked &&
                                                <div  ><StarRating level={item.level.value} /></div>

                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Skills end --> */}

                    {/* <!-- Languages --> */}
                    {
                        languages.isSectionVisible
                        && <div className={styles.sectionContainer} id="lang">
                            <div className={styles.sectionTitle}>Languages</div>
                            <div className={styles.sectionBody}>
                                {
                                    languages.data && languages.data.length > 0
                                    && languages.data.map((item, index) => {
                                        return <div className={styles.item} key={`languages_${index}`}>
                                            <div>{item.language.value}</div>
                                            {
                                                item.level.value !== '' && <div className={styles.infoText}>({item.level.value})</div>
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Languages end --> */}

                    {/* <!-- Hobbies --> */}
                    {
                        hobbies.isSectionVisible
                        && <div className={styles.sectionContainer} id="hobbies">
                            <div className={styles.sectionTitle}>Hobbies</div>
                            <div className={styles.sectionBody}>
                                {
                                    hobbies.data.value && hobbies.data.value !== ''
                                    && <div className={styles.item} key={`hobbies `}>
                                        <div>{hobbies.data.value}</div>
                                    </div>
                                }
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
                            {
                                (summary.data.value && summary.data.value !== '')
                                && <div className={styles.item}>
                                    <p className={styles.txt} dangerouslySetInnerHTML={{ __html: summary.data.value }}>
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    {/* <!-- profile end --> */}

                    {/* <!-- Education --> */}
                    {
                        education.isSectionVisible
                        && <div className={styles.sectionContainer} id="education">
                            <div className={styles.sectionTitle}>Education</div>
                            <div className={styles.sectionBody}>
                                {
                                    education.data && education.data.length > 0
                                    && education.data.map((item, index) => {
                                        return <div className={styles.item} key={`education_${index}`}>
                                            <div className={styles.bold}>{item.degree.value !== '' && `${item.degree.value}'s, `}{item.title.value}{item.location.value !== '' && `, ${item.location.value}`}</div>
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
                        courses.isSectionVisible
                        && <div className={styles.sectionContainer} id="courses">
                            <div className={styles.sectionTitle}>Courses</div>
                            <div className={styles.sectionBody}>
                                {
                                    courses.data.length > 0
                                    && courses.data.map((item, index) => {
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
                        <div className={styles.sectionContainer} id="employment">
                            <div className={styles.sectionTitle}>Employment History</div>
                            <div className={styles.sectionBody}>
                                {
                                    employmentHistory.map((item, index) => {
                                        return <div className={styles.item} key={`employmentHistory_${index}`}>
                                            <div className={styles.bold}>{item.title.value}, {item.employer.value}, {item.location.value}</div>
                                            <div className={`${styles.infoText} ${styles.upperCase}`}>{item.period.value}</div>
                                            {
                                                item.wysiwyg.value !== '' &&
                                                <p dangerouslySetInnerHTML={{ __html: item.wysiwyg.value }}>

                                                </p>}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* <!-- Employment History end --> */}

                    {/* <!-- References  --> */}
                    {
                        references.data.length > 0 &&
                        <div className={styles.sectionContainer} id="references">
                            <div className={styles.sectionTitle}>References</div>
                            <div className={styles.sectionBody}>
                                {
                                    !references.isSwitchChecked
                                        ? <>
                                            {
                                                references.data.map((item, index) => {
                                                    return <div className={styles.item} key={`reference_${index}`}>
                                                        <div className={styles.bold}>{item.referentName.value} from {item.company.value}</div>
                                                        <div>

                                                            {item.phone.value !== '' && <a href={`tel:${item.phone.value}`}>{item.phone.value}</a>} | {item.email.value !== '' && <a href={`mailto:${item.email.value}`}>{item.email.value}</a>}
                                                        </div>
                                                    </div>
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
        </div >
    )
})

export default Dublin;