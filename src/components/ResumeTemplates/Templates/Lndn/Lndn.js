import React, { Fragment, forwardRef } from 'react';

import styles from './Lndn.module.css';
import StarRating from '@/components/StarRating/StarRating';

import sanitizeString from '@/lib/sanitizeString';

const Lndn = forwardRef(function LndnRef({ data }, ref) {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image, additionalSections, }
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
                <SectionContainer id={'links'} title={'Links'}>
                    <div className={styles.sectionItem}>
                        <div className={styles.itemRow}>
                            {
                                websoclinks.data.length > 0 &&
                                websoclinks.data.map((elem, index) => {
                                    if (index < websoclinks.data.length - 1) {
                                        return (
                                            <Fragment key={`link_${index}`}>
                                                <a href={elem.link} target={'_blank'} rel={'noreferrer'} key={`link_${index}`}>{elem.label}</a>,&nbsp;
                                            </Fragment>
                                        )
                                    } else {
                                        return <a href={elem.link} target={'_blank'} rel={'noreferrer'} key={`link_${index}`}>{`${elem.label}`}</a>
                                    }
                                })
                            }
                        </div>
                    </div>
                </SectionContainer>
            }
            {/* <!-- Links end --> */}

            {/* <!-- Summary --> */}
            <SectionContainer id="profile" title="Profile Summary">
                <div className={styles.sectionItem}>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeString(summary.data.value) }}>
                    </div>
                </div>
            </SectionContainer>
            {/* <!-- Summary end --> */}

            {/* Education  */}
            <SectionContainer id={"education"} title={"Education"}>
                {
                    education.data && education.data.length > 0 &&
                    education.data.map((elem, index) => {
                        return (
                            <div className={styles.sectionItem} key={`education_${index}`}>
                                <div className={styles.itemRow}>
                                    <div className={styles.itemColumnMain}>
                                        <div className={`${styles.bold}`}>{elem.institution}</div>
                                    </div>
                                    <div className={styles.itemColumnSecondary}>
                                        {
                                            elem.period && elem.period !== '' &&
                                            <div className={styles.itemDescr} >{elem.period}</div>
                                        }
                                        {
                                            elem.location && elem.location !== '' &&
                                            <div className={styles.itemDescr}>{elem.location}</div>
                                        }
                                    </div>
                                </div>
                                {
                                    elem.comments && elem.comments !== '' &&
                                    <div className={styles.itemRow}>
                                        <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}></p>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </SectionContainer>
            {/* Education  end */}


            {/* <!-- Skills --> */}
            <SectionContainer id={"skills"} title={"Skills"}>
                <div className={styles.sectionRow}>
                    <div className={styles.columnWrap}>
                        {
                            skills.data && skills.data.length > 0 &&
                            skills.data.map((elem, index) => {
                                return (
                                    <div className={styles.skillsColumn} key={`skill_${index}`}>
                                        <div className={styles.sectionItem}>
                                            <div className={styles.spaceBetween}>
                                                <div className={`${styles.itemName} ${styles.bold}`}>{elem.label}</div>
                                                {
                                                    !skills.__serv.isSwitchChecked &&
                                                    <div><StarRating level={elem.level} /></div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </SectionContainer>
            {/* <!-- Skills end --> */}

            {/* <!-- Courses --> */}
            {
                additionalSections.indexOf('courses') !== -1 &&
                <SectionContainer title={'Courses'} id={'courses'}>
                    {
                        courses.data && courses.data.length > 0 &&
                        courses.data.map((elem, index) => {
                            return (
                                <div className={styles.sectionItem} key={`course_${index}`}>
                                    <div className={styles.itemRow}>
                                        <div className={styles.itemColumnMain}>
                                            <div className={`${styles.bold}`}>
                                                {elem.course}{elem.institution !== '' && `, ${elem.institution}`}

                                            </div>
                                        </div>
                                        <div className={styles.itemColumnSecondary}>
                                            {
                                                elem.period && elem.period !== '' &&
                                                <div className={styles.itemDescr} >{elem.period}</div>
                                            }
                                            {
                                                elem.cert && elem.cert !== '' &&
                                                <div className={styles.itemDescr}><a href={elem.cert} target='_blank' rel="noreferrer">Link to certificate</a></div>
                                            }
                                        </div>
                                    </div>
                                    {
                                        elem.comments && elem.comments !== '' &&
                                        <div className={styles.itemRow}>
                                            <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}></p>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }

                </SectionContainer>
            }
            {/* <!-- Courses end--> */}

            {/* <!-- Employment history --> */}
            {
                employmentHistory.data.length > 0 &&
                <SectionContainer id={'employment'} title={'Employment History'}>
                    {
                        employmentHistory.data && employmentHistory.data.length > 0 &&
                        employmentHistory.data.map((elem, index) => {
                            return (
                                <div className={styles.sectionItem} key={`employmentHistory_${index}`}>
                                    <div className={styles.itemRow}>
                                        <div className={styles.itemColumnMain}>
                                            <div className={`${styles.bold}`}>
                                                {elem.job}{elem.employer !== '' && `, ${elem.employer}`}
                                            </div>
                                        </div>
                                        <div className={styles.itemColumnSecondary}>
                                            {
                                                elem.period && elem.period !== '' &&
                                                <div className={styles.itemDescr} >{elem.period}</div>
                                            }
                                            {
                                                elem.location && elem.location !== '' &&
                                                <div className={styles.itemDescr}>{elem.location}</div>
                                            }
                                        </div>
                                    </div>
                                    {
                                        elem.comments && elem.comments !== '' &&
                                        <div className={styles.itemRow}>
                                            <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: sanitizeString(elem.comments) }}></p>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </SectionContainer>
            }
            {/* <!-- Employment history end --> */}

            {/* <!-- Languages --> */}
            {
                additionalSections.indexOf('languages') !== -1 &&
                <SectionContainer id={'land'} title={'Languages'}>
                    <div className={styles.sectionRow}>
                        <div className={styles.columnWrap}>
                            {
                                languages.data.length > 0 && languages.data.map((elem, index) => {
                                    return (
                                        <div className={styles.skillsColumn} key={`language_${index}`}>
                                            <div className={styles.sectionItem}>
                                                <div className={styles.spaceBetween}>
                                                    <div className={`${styles.itemName} ${styles.bold}`}>{elem.language}</div>
                                                    {
                                                        elem.level !== 'Select level' && elem.level !== '' &&
                                                        <div className={styles.itemDescr}>{`(${elem.level})`}</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </SectionContainer>
            }
            {/* <!-- Languages end --> */}

            {/* <!-- References --> */}
            {
                additionalSections.indexOf('references') !== -1 &&
                <SectionContainer id={'references'} title={'References'}>
                    {
                        !references.__serv.isSwitchChecked
                            ? <>
                                {
                                    references.data.length > 0 &&
                                    references.data.map((elem, index) => {

                                        return <div className={styles.sectionItem} key={`reference_${index}`}>
                                            <div className={`${styles.itemName}`}>

                                                {
                                                    elem.name !== '' ? <span className={styles.bold}>{elem.name}</span> : `Referent's name (not specified)`
                                                }

                                                {
                                                    elem.company !== '' &&
                                                    <>&nbsp;from <span className={styles.bold}>{elem.company}</span></>
                                                }
                                            </div>
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
                                    })

                                }
                            </>
                            : <div >References available upon request</div>
                    }
                </SectionContainer>
            }
            {/* <!-- References end --> */}

            {/* Hobbies */}
            {
                additionalSections.indexOf('hobbies') !== -1 &&
                <SectionContainer id={'hobbies'} title={'Hobbies'}>
                    <div className={styles.sectionItem}>
                        <div dangerouslySetInnerHTML={{ __html: sanitizeString(hobbies.data.value) }}></div>
                    </div>
                </SectionContainer>
            }
            {/* Hobbies end */}

            {/* <!-- resume body end --> */}
        </div>
    );
});

export default Lndn;

const SectionContainer = ({ id, title, children }) => {

    return (
        <div className={styles.sectionContainer} id={id}>
            <div className={styles.sectionRow}>
                <div className={`${styles.sectionColumn} ${styles.column_25}`}>
                    <div className={`${styles.sectionTitle} ${styles.upperCase}`}>{title}</div>

                </div>
                <div className={`${styles.sectionColumn} ${styles.column_75}`}>
                    {/* <div className={styles.sectionItem}> */}
                    {children}
                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}