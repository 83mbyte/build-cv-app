import React, { forwardRef, Fragment } from 'react';
import styles from './Vivien.module.css';
import sanitizeString from '@/lib/sanitizeString';

const Vivien = forwardRef(function VivienRef({ data }, ref) {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image, additionalSections }
        = data;

    return (
        <div className={styles.resumeContainer} name="vivien" ref={ref}>
            {/* <!-- header container --> */}
            <div className={styles.headerContainer}>
                {
                    image &&
                    <div className={styles.headerPhoto}>
                        <img src={image} alt="userPhoto" />
                    </div>
                }
                <div className={styles.headerDetails}>
                    <div className={styles.person}>
                        <div className={`${styles.personName} ${styles.bold}`}>{personDetails.data.firstName} {personDetails.data.lastName}</div>
                        {personDetails.data?.jobTitle && <div className={styles.personJobTitle}>{personDetails.data.jobTitle}</div>}
                    </div>

                    <div className={styles.contact}>
                        <div className={styles.contactAddress}>
                            {`${personDetails.data.city}, ${personDetails.data.country}`}
                        </div>
                        <div className={styles.contactPhoneEmail}>
                            <div>
                                <a href={`tel:${personDetails.data.phone}`} className={styles.lnk}>{personDetails.data.phone}</a>
                            </div>
                            {
                                (personDetails.data.email !== '' && personDetails.data.phone !== '')
                                && <div>&nbsp;/&nbsp; </div>
                            }
                            <div>
                                <a href={`mailto:${personDetails.data.email}`} className={styles.lnk}>{personDetails.data.email}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- header container end --> */}

            {/* <!-- resume body --> */}
            <div className={styles.detailsContainer}>
                {/* <!-- LeftSide --> */}
                <div className={styles.leftSide}>

                    {/* <!-- Skills --> */}
                    {
                        // skills.data.length > 0 &&
                        <div className={styles.sectionContainer} id='skills'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Skills</div>
                            <div className={styles.sectionBody}>
                                {
                                    skills.data.length > 0
                                    && skills.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`skill_${index}`}>
                                                <div>{el.label}</div>
                                                {
                                                    !skills.isSwitchChecked &&
                                                    <div className={styles.levelContainer}>
                                                        <SkillLevels level={el.level} />
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Skills end  --> */}

                    {/* <!-- Languages --> */}
                    {
                        additionalSections.indexOf('languages') !== -1 &&
                        <div className={styles.sectionContainer} id='lang'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Languages</div>
                            <div className={styles.sectionBody}>
                                {
                                    languages.data && languages.data.length > 0
                                    && languages.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`language_${index}`}>
                                                <div>{el.language}</div>
                                                <div className={styles.langLevel}>
                                                    {
                                                        el.level !== '' && el.level !== 'Select level' &&
                                                        <div className={styles.infoText}>{`/${el.level}/`}</div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Languages end  --> */}

                    {/* <!-- Links --> */}
                    {
                        // websoclinks.data && 
                        <div className={styles.sectionContainer} id='links'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Links</div>
                            <div className={styles.sectionBody}>
                                {
                                    websoclinks.data.length > 0
                                    && websoclinks.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`link_${index}`}>
                                                <div><a href={el.link} target={'_blank'} rel="noreferrer" className={styles.lnk}>{el.label}</a></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Links end  --> */}

                    {/* <!-- Hobbies --> */}
                    {
                        additionalSections.indexOf('hobbies') !== -1
                        && <div className={styles.sectionContainer} id='hobbies'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Hobbies</div>
                            <div className={styles.sectionBody}>
                                {
                                    hobbies.data.value && hobbies.data.value !== ''
                                    && <div className={styles.item}>
                                        <div dangerouslySetInnerHTML={{ __html: sanitizeString(hobbies.data.value) }}></div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Hobbies end  --> */}

                </div>
                {/* <!-- LeftSide end --> */}


                {/* <!-- RightSide --> */}
                <div className={styles.rightSide}>
                    {/* <!-- Summary --> */}
                    {
                        // summary.data &&
                        <div className={styles.sectionContainer}>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Profile Summary</div>
                            <div className={styles.sectionBody}>
                                {
                                    summary.data.value !== '' &&
                                    <div className={styles.item}>
                                        <div dangerouslySetInnerHTML={{ __html: sanitizeString(summary.data.value) }} >
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Summary end  --> */}

                    {/* <!-- Education --> */}
                    {
                        // education.data &&
                        <div className={styles.sectionContainer} id='education'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Education</div>
                            <div className={styles.sectionBody}>
                                {
                                    education.data.length > 0
                                    && education.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`education_${index}`}>
                                                {
                                                    el.degree === ''
                                                        ? <div className={styles.bold}>
                                                            {`${el.institution}, ${el.location}`}
                                                        </div>
                                                        :
                                                        <div className={styles.bold}>
                                                            {`${el.degree}'s, ${el.institution}, ${el.location}`}
                                                        </div>
                                                }
                                                <div className={styles.infoText}>{el.period.value}</div>
                                                {
                                                    el.comments && el.comments !== '' &&
                                                    <div dangerouslySetInnerHTML={{ __html: sanitizeString(el.comments) }} >
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Education end  --> */}

                    {/* <!-- Courses --> */}
                    {
                        additionalSections.indexOf('courses') !== -1 &&
                        <div className={styles.sectionContainer} id='courses'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Courses</div>
                            <div className={styles.sectionBody}>
                                {
                                    courses.data.length > 0
                                    && courses.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`course_${index}`}>
                                                <div className={styles.bold}>{`${el.course}, ${el.institution}`}</div>
                                                <div className={styles.itemRow}>
                                                    <div className={styles.infoText}>{el.period}</div>
                                                    {
                                                        (el.cert !== '') &&
                                                        <>
                                                            <div>,</div>
                                                            <div className={styles.infoText}>
                                                                <a href={el.cert} target="_blank"
                                                                    rel="noreferrer" className={styles.lnk}>Link to certificate</a>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Courses end --> */}

                    {/* <!-- Employment --> */}

                    {employmentHistory.data.length > 0 &&
                        <div className={styles.sectionContainer} id="employment">
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Employment History</div>
                            <div className={styles.sectionBody}>
                                {

                                    employmentHistory.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`employment_${index}`}>
                                                <div className={styles.bold}>
                                                    {`${el.job}, ${el.employer}, ${el.location}`}
                                                </div>
                                                <div className={styles.infoText}>{el.period}</div>
                                                {
                                                    el.comments && el.comments !== '' &&
                                                    <div dangerouslySetInnerHTML={{ __html: sanitizeString(el.comments) }}>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Employment end --> */}

                    {/* <!-- References --> */}
                    {
                        additionalSections.indexOf('references') !== -1 &&
                        <div className={styles.sectionContainer} id="references">
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>References</div>
                            <div className={styles.sectionBody}>
                                {
                                    !references.__serv.isSwitchChecked
                                        ?
                                        <>
                                            {
                                                references.data.length > 0 &&
                                                references.data.map((el, index) => {
                                                    return (
                                                        <div className={styles.item} key={`reference_${index}`}>
                                                            <div>{`${el.name} from ${el.company}`}</div>
                                                            <div className={styles.itemRow}>
                                                                {
                                                                    el.phone !== ''
                                                                    &&
                                                                    <div>
                                                                        <a href={`tel:${el.phone}`} className={styles.phone}>{el.phone}</a>
                                                                    </div>
                                                                }
                                                                {
                                                                    el.phone !== '' && el.email !== ''
                                                                    &&
                                                                    <div>-</div>
                                                                }
                                                                <div>
                                                                    <a className={styles.lnk} href={`mailto:${el.email}`}>{el.email}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                        : <div className={styles.item}>
                                            <div className={styles.infoText}>References available upon request</div>
                                        </div>
                                }
                            </div>
                        </div>
                    }

                    {/* <!-- References end --> */}
                </div>
                {/* <!-- RightSide end --> */}
            </div>
            {/* <!-- resume body end --> */}
        </div >
    );
});

export default Vivien;

const SkillLevels = ({ level = 3 }) => {
    let val = level;
    let arr = [];
    for (let x = 0; x < val; x++) {
        arr.push(<div className={`${styles.levelItem}  ${styles.levelActive}`}></div>)
    }
    for (let x = 0; x < 5 - val; x++) {
        arr.push(<div className={`${styles.levelItem}`}></div>)
    }
    return (
        <>
            {
                arr.map((item, index) => {
                    return <Fragment key={index}>{item}</Fragment>
                })
            }
        </>
    )
}