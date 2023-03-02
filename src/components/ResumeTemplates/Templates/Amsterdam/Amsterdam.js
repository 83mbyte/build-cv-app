import React, { forwardRef } from 'react';
import StarRating from '../../../StarRating/StarRating';
import styles from './Amsterdam.module.css';


const Amsterdam = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references }
        = data;


    return (

        <div className={styles.resumeContainer} name="amsterdam" ref={ref}>
            {/* <!-- header container --> */}
            <div className={styles.headerContainer}>
                <div className={styles.personName}>{personDetails.name.firstName.value} {personDetails.name.lastName.value}</div>
                <div className={styles.personJobTitle}>{personDetails.position.jobTitle && personDetails.position.jobTitle.value}</div>
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
                                {(personDetails.address.street.value && personDetails.address.street.value !== '')
                                    && <div>{personDetails.address.street.value}</div>
                                }
                                {(personDetails.address.city.value && personDetails.address.city.value !== '')
                                    && <div>{personDetails.address.city.value}</div>
                                }
                                {
                                    (personDetails.address.country.value && personDetails.address.country.value !== '') && <div> {personDetails.address.country.value && personDetails.address.country.value}</div>
                                }
                            </div>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>phone</div>
                                {/* <div>{personDetails.contacts.phone.value && personDetails.contacts.phone.value}</div> */}
                                {
                                    personDetails.contacts.phone.value !== '' &&
                                    <div><a href={`tel:${personDetails.contacts.phone.value}`}>{personDetails.contacts.phone.value}</a></div>
                                }
                            </div>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>email</div>
                                <div>{personDetails.contacts.email.value && personDetails.contacts.email.value}</div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- details end --> */}

                    {/* <!-- Links --> */}
                    <div className={styles.sectionContainer} id="links">
                        <div className={styles.sectionTitle}>Links</div>
                        <div className={styles.sectionBody}>
                            {
                                websoclinks.map((elem, index) => {
                                    return <div className={styles.item} key={`link_${index}`}>
                                        <div><a href={elem.link.value}>{elem.label.value}</a></div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    {/* <!-- Links end --> */}

                    {/* <!-- Skills --> */}
                    <div className={styles.sectionContainer} id="skills">
                        <div className={styles.sectionTitle}>Skills</div>
                        <div className={styles.sectionBody}>
                            {
                                skills.data.map((elem, index) => {
                                    return (
                                        <div className={styles.item} key={`skill_${index}`}>
                                            <div>{elem.skill.value}</div>
                                            {
                                                !skills.isSwitchChecked &&
                                                <div  ><StarRating level={elem.level.value} /></div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <!-- Skills end --> */}

                    {/* <!-- Languages --> */}
                    <div className={styles.sectionContainer} id="lang">
                        <div className={styles.sectionTitle}>Languages</div>
                        <div className={styles.sectionBody}>
                            {
                                languages.map((elem, index) => {
                                    return (
                                        <div className={styles.item} key={`skill_${index}`}>
                                            <div>{elem.language.value}</div>
                                            {
                                                elem.level.value !== '' && <div className={styles.infoText}>({elem.level.value})</div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <!-- Languages end --> */}

                    {/* <!-- Hobbies --> */}
                    <div className={styles.sectionContainer} id="hobbies">
                        <div className={styles.sectionTitle}>Hobbies</div>
                        <div className={styles.sectionBody}>
                            {
                                <div className={styles.item} >
                                    <div>{hobbies.value}</div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* <!-- Hobbies end --> */}
                </div>

                {/* <!-- right side --> */}
                <div className={styles.rightSide}>
                    {/* <!-- profile --> */}
                    <div className={styles.sectionContainer} id="profile">
                        <div className={styles.sectionTitle}>profile</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item} dangerouslySetInnerHTML={{ __html: summary.value }}>

                            </div>
                        </div>
                    </div>
                    {/* <!-- profile end --> */}

                    {/* <!-- Education --> */}
                    <div className={styles.sectionContainer} id="education">
                        <div className={styles.sectionTitle}>education</div>
                        <div className={styles.sectionBody}>
                            {
                                education.map((elem, index) => {
                                    return (
                                        <div className={styles.item} key={`education_${index}`}>
                                            <div className={styles.itemRow}>
                                                <div className={styles.firstColumn}>
                                                    <div className={styles.bold}>{elem.degree.value && `${elem.degree.value}'s degree, `}{elem.title.value}</div>
                                                    <div className={styles.infoText}>{elem.period.value}</div>
                                                </div>
                                                <div className={styles.secondColumn}>
                                                    <div className={styles.infoText}>{elem.location.value}</div>
                                                </div>
                                            </div>
                                            {
                                                elem.wysiwyg.value !== '' &&
                                                <div className={styles.itemRow} dangerouslySetInnerHTML={{ __html: elem.wysiwyg.value }}></div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <!-- Education end--> */}

                    {/* <!-- Courses --> */}
                    <div className={styles.sectionContainer} id="courses">
                        <div className={styles.sectionTitle}>courses</div>
                        <div className={styles.sectionBody}>
                            {
                                courses.map((elem, index) => {
                                    return (
                                        <div className={styles.item} key={`course_${index}`}>
                                            <div className={styles.itemRow}>
                                                <div className={styles.firstColumn}>
                                                    <div className={styles.bold}>
                                                        {elem.course.value}{elem.institution.value && `, ${elem.institution.value}`}
                                                    </div>
                                                    <div className={styles.infoText}>{elem.period.value}</div>

                                                </div>
                                                {
                                                    elem.certificate.value !== ''
                                                    &&
                                                    <div className={styles.secondColumn}>
                                                        <div className={styles.infoText}><a href={elem.certificate.value} target='_blank' rel="noreferrer">Link to certificate</a></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <!-- Courses end--> */}

                    {/* <!-- Employment History --> */}
                    <div className={styles.sectionContainer} id="employment">
                        <div className={styles.sectionTitle}>Employment History</div>
                        <div className={styles.sectionBody}>
                            {/* <!-- Employment history item --> */}
                            {
                                employmentHistory.map((elem, index) => {

                                    return (
                                        <div className={styles.item} key={`employment_${index}`}>
                                            <div className={styles.itemRow}>
                                                <div className={styles.firstColumn}>
                                                    <div className={styles.bold}>{elem.title.value}, {elem.employer.value}.</div>
                                                    <div className={styles.infoText}>{elem.period.value}</div>
                                                </div>
                                                <div className={styles.secondColumn}>
                                                    <div className={styles.infoText}>{elem.location.value}</div>
                                                </div>
                                            </div>
                                            {elem.wysiwyg.value !== '' &&
                                                <div dangerouslySetInnerHTML={{ __html: elem.wysiwyg.value }}>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                            {/* <!-- Employment history item end --> */}

                        </div>
                    </div>
                    {/* <!-- Employment History end --> */}


                    {/* <!-- References --> */}
                    <div className={styles.sectionContainer} id="references">
                        <div className={styles.sectionTitle}>references</div>
                        <div className={styles.sectionBody}>
                            {/* <!-- Employment history item --> */}
                            {
                                references.map((elem, index) => {

                                    return (
                                        <div className={styles.item} key={`reference_${index}`}>
                                            <div className={styles.itemRow}>
                                                <div className={styles.firstColumn}>
                                                    <div className={styles.bold}>{elem.referentName.value} from {elem.company.value}</div>
                                                    {
                                                        elem.email.value !== '' &&
                                                        <div className={styles.infoText}>
                                                            email: <a href={`mailto:${elem.email.value}`}>{elem.email.value}</a>
                                                        </div>
                                                    }
                                                    {
                                                        elem.phone.value !== '' &&
                                                        <div className={styles.infoText}>
                                                            phone: <a href={`tel:${elem.phone.value}`}>{elem.phone.value}</a>
                                                        </div>
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                    )
                                })
                            }
                            {/* <!-- Employment history item end --> */}

                        </div>
                    </div>
                    {/* <!-- Employment History end --> */}
                </div>
            </div>
            {/* <!-- details container end--> */}
        </div>
    )
});

export default Amsterdam;