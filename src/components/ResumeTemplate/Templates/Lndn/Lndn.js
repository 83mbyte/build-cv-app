import React, { Fragment, forwardRef } from 'react';
import styles from './Lndn.module.css';
import StarRating from '../../../StarRating/StarRating';

const Lndn = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image, additionalSections }
        = data;

    return (
        <div className={styles.resumeContainer} name="lndn" ref={ref}>
            {/* <!-- header container --> */}
            <div className={styles.headerContainer}>
                {
                    image && image !== '' &&
                    <div className={styles.headerPhoto}><img src={image} alt="userPhoto" /></div>
                }
                <div className={`${styles.person} ${styles.bold}`}>{personDetails.data.firstName} {personDetails.data.lastName}{personDetails.data.jobTitle && personDetails.data.jobTitle !== '' && `, ${personDetails.data.jobTitle}`}</div>
                <div className={styles.contacts}>
                    <div>{[personDetails.data.email, personDetails.data.phone].join(', ')}</div>
                    <div>{[personDetails.data.street, personDetails.data.city, personDetails.data.country].join(', ')}</div>
                </div>
            </div>
            {/* <!-- header container end --> */}

            {/* <!-- resume body --> */}

            {/* <!-- Links --> */}
            {
                websoclinks.data.length > 0 &&
                <div className={styles.sectionContainer} id="links">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Links</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div>
                                    {
                                        websoclinks.data.length > 0 &&
                                        websoclinks.data.map((elem, index) => {
                                            if (index < websoclinks.data.length - 1) {
                                                return <a href={elem.link} target={'_blank'} rel={'noreferrer'} key={`link_${index}`}>{`${elem.label}, `}</a>
                                            } else {
                                                return <a href={elem.link} target={'_blank'} rel={'noreferrer'} key={`link_${index}`}>{`${elem.label}`}</a>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Links end --> */}

            {/* <!-- Summary --> */}
            {
                <div className={styles.sectionContainer} id="profile">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Profile Summary</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div dangerouslySetInnerHTML={{ __html: summary.data.value }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Summary end --> */}

            {/* Education  */}
            <div className={styles.sectionContainer} id="education">
                <div className={styles.sectionBody}>
                    <div className={styles.sectionBodyRow}>
                        <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                            <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Education</div>
                        </div>
                        <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>

                            {
                                education.data && education.data.length > 0 &&
                                education.data.map((elem, index) => {

                                    return (
                                        <Fragment key={`education_${index}`}>
                                            <div className={styles.sectionBodyColumn}>
                                                <div className={styles.item}>
                                                    <div className={styles.sectionBodyRow}>
                                                        <div className={styles.spaceBetween}>
                                                            <div className={`${styles.itemName} ${styles.bold}`}>
                                                                {
                                                                    elem.degree && elem.degree !== ''
                                                                        ? <> {`${elem.degree}'s degree, ${elem.institution}`}</>
                                                                        : <> {elem.institution} </>
                                                                }
                                                            </div>
                                                            {
                                                                elem.location && elem.location !== '' &&
                                                                <div className={styles.itemDescr}>{elem.location}</div>
                                                            }
                                                            {
                                                                elem.period && elem.period !== '' &&
                                                                <div className={styles.itemDescr} >{elem.period}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        elem.comments && elem.comments !== '' &&
                                                        <div className={styles.sectionBodyRow}>
                                                            <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: elem.comments }}></p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Education  end */}

            {/* <!-- Skills --> */}
            {
                // skills.isSectionVisible &&
                <div className={styles.sectionContainer} id="skills">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Skills</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={`${styles.sectionBodyRow} ${styles.columnWrap} ${styles.spaceBetween}`}>
                                    {
                                        skills.data && skills.data.length > 0 &&
                                        skills.data.map((elem, index) => {
                                            return (
                                                <div className={`${styles.item} ${styles.spaceBetween}`} key={`skill_${index}`}>
                                                    <div className={`${styles.itemName} ${styles.bold}`}>{elem.label}</div>
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
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Skills end --> */}

            {/* <!-- Courses --> */}
            {
                additionalSections.indexOf('courses') !== -1 &&
                <div className={styles.sectionContainer} id="courses">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Courses</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>

                                {
                                    courses.data && courses.data.length > 0 &&
                                    courses.data.map((elem, index) => {

                                        return (
                                            <Fragment key={`course_${index}`}>
                                                <div className={styles.sectionBodyColumn}>
                                                    <div className={styles.item}>
                                                        <div className={styles.sectionBodyRow}>
                                                            <div className={styles.spaceBetween}>
                                                                <div className={`${styles.itemName} ${styles.bold}`}>
                                                                    {elem.course}{elem.institution !== '' && `, ${elem.institution}`}
                                                                </div>
                                                                {
                                                                    elem.cert && elem.cert !== '' &&
                                                                    <div className={styles.itemDescr}><a href={elem.cert} target='_blank' rel="noreferrer">Link to certificate</a></div>
                                                                }
                                                                {
                                                                    elem.period && elem.period !== '' &&
                                                                    <div className={styles.itemDescr} >{elem.period}</div>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Courses end --> */}

            {/* <!-- Employment history --> */}
            {
                // employmentHistory.data.length > 0 &&
                <div className={styles.sectionContainer} id="employment">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Employment History</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>

                                {
                                    employmentHistory.data && employmentHistory.data.length > 0 &&
                                    employmentHistory.data.map((elem, index) => {

                                        return (
                                            <Fragment key={`employmentHistory_${index}`}>
                                                <div className={styles.sectionBodyColumn}>
                                                    <div className={styles.item}>
                                                        <div className={styles.sectionBodyRow}>
                                                            <div className={styles.spaceBetween}>
                                                                <div className={`${styles.itemName} ${styles.bold}`}>
                                                                    {elem.job}{elem.employer !== '' && `, ${elem.employer}`}
                                                                </div>
                                                                {
                                                                    elem.location && elem.location !== '' &&
                                                                    <div className={styles.itemDescr}>{elem.location}</div>
                                                                }
                                                                {
                                                                    elem.period && elem.period !== '' &&
                                                                    <div className={styles.itemDescr} >{elem.period}</div>
                                                                }

                                                            </div>
                                                        </div>
                                                        {
                                                            elem.comments && elem.comments !== '' &&
                                                            <div className={styles.sectionBodyRow}>
                                                                <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: elem.comments }}></p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            }
            {/* <!-- Employment history end --> */}

            {/* <!-- Languages --> */}
            {
                additionalSections.indexOf('languages') !== -1 &&
                <div className={styles.sectionContainer} id="lang">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Languages</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={`${styles.sectionBodyRow} ${styles.columnWrap}`}>
                                    {
                                        languages.data.length > 0 && languages.data.map((elem, index) => {
                                            return (
                                                <div style={{ width: '100%', marginBottom: '10px' }} key={`language_${index}`}>
                                                    <div className={styles.spaceBetween}>
                                                        <div className={`${styles.itemName} ${styles.bold}`}>{elem.language}</div>
                                                        {
                                                            elem.level !== 'Select level' && elem.level !== '' &&
                                                            <div className={styles.itemDescr}>{`(${elem.level})`}</div>
                                                        }
                                                    </div>
                                                </div >
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Languages end --> */}

            {/* <!-- References --> */}
            {
                additionalSections.indexOf('references') !== -1 &&
                <div className={styles.sectionContainer} id="references">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>References</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                {
                                    !references.__serv.isSwitchChecked
                                        ? <>
                                            {
                                                references.data.length > 0 &&
                                                references.data.map((elem, index) => {
                                                    return <div className={styles.item} key={`reference_${index}`}>
                                                        <div className={`${styles.itemName} ${styles.bold}`}>{elem.name}{elem.company !== '' && ` from ${elem.company}`} Ltd</div>
                                                        <div className={`${styles.sectionBodyRow} ${styles.alignCenter}`}>
                                                            {
                                                                elem.phone !== '' &&
                                                                <div className={styles.itemDescr}>
                                                                    Phone: <a href={`tel:${elem.phone}`} className={styles.phone}>{elem.phone}</a>
                                                                </div>
                                                            }
                                                            {
                                                                elem.phone !== '' && elem.email !== '' &&
                                                                <div className={styles.shortSeparator}></div>
                                                            }
                                                            {
                                                                elem.email !== '' &&
                                                                <div className={styles.itemDescr}>Email: <a href="/">exa@ma.com</a></div>
                                                            }
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </>
                                        : <>
                                            <div className={styles.item}>
                                                <div >References available upon request</div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- References end --> */}

            {/* Hobbies */}
            {
                additionalSections.indexOf('hobbies') !== -1 &&
                <div className={styles.sectionContainer} id="hobbies">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Hobbies</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div dangerouslySetInnerHTML={{ __html: hobbies.data.value }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* Hobbies end */}

            {/* <!-- resume body end--> */}
        </div >
    )
});

export default Lndn;