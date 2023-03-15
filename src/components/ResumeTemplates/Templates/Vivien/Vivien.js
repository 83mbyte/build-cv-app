import React, { forwardRef, Fragment } from 'react';
import styles from './Vivien.module.css';

const Vivien = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image }
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
                        <div className={`${styles.personName} ${styles.bold}`}>{personDetails.name.firstName.value} {personDetails.name.lastName.value}</div>
                        <div className={styles.personJobTitle}>{personDetails.position.jobTitle && personDetails.position.jobTitle.value}</div>
                    </div>

                    <div className={styles.contact}>
                        <div className={styles.contactAddress}>{`${personDetails.address.city.value}, ${personDetails.address.country.value}`}</div>
                        <div className={styles.contactPhoneEmail}>
                            <div>
                                <a href={`tel:${personDetails.contacts.phone.value}`}>{personDetails.contacts.phone.value}</a>
                            </div>
                            {
                                (personDetails.contacts.email.value !== '' && personDetails.contacts.phone.value !== '')
                                && <div>-</div>
                            }
                            <div>
                                <a href={`mailto:${personDetails.contacts.email.value}`}>{personDetails.contacts.email.value}</a>
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
                        skills.isSectionVisible
                        && <div className={styles.sectionContainer} id='skills'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Skills</div>
                            <div className={styles.sectionBody}>
                                {
                                    skills.data.length > 0
                                    && skills.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`skill_${index}`}>
                                                <div>{el.skill.value}</div>
                                                {
                                                    !skills.isSwitchChecked &&
                                                    <div className={styles.levelContainer}>
                                                        <SkillLevels level={el.level.value} />
                                                    </div>
                                                }
                                                {/* <div className={styles.levelContainer}>
                                                    <div className={`${styles.levelItem} ${styles.levelActive}`}></div>
                                                    <div className={`${styles.levelItem} ${styles.levelActive}`}></div>
                                                    <div className={styles.levelItem}></div>
                                                    <div className={styles.levelItem}></div>
                                                    <div className={styles.levelItem}></div>
                                                </div> */}
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
                        languages.isSectionVisible &&
                        <div className={styles.sectionContainer} id='lang'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Languages</div>
                            <div className={styles.sectionBody}>
                                {
                                    languages.data.length > 0
                                    && languages.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`language_${index}`}>
                                                <div>{el.language.value}</div>
                                                <div className={styles.langLevel}>
                                                    {
                                                        el.level.value !== '' && el.level.value !== 'Select level' &&
                                                        <div className={styles.infoText}>{`/${el.level.value}/`}</div>
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
                        websoclinks.isSectionVisible
                        && <div className={styles.sectionContainer} id='links'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Links</div>
                            <div className={styles.sectionBody}>
                                {
                                    websoclinks.data.length > 0
                                    && websoclinks.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`link_${index}`}>
                                                <div><a href={el.link.value} target={'_blank'} rel="noreferrer">{el.label.value}</a></div>
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
                        hobbies.isSectionVisible
                        && <div className={styles.sectionContainer} id='hobbies'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Hobbies</div>
                            <div className={styles.sectionBody}>
                                {
                                    hobbies.data.value !== ''
                                    && <div className={styles.item}>
                                        <div>{hobbies.data.value}</div>
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
                        summary.isSectionVisible &&
                        <div className={styles.sectionContainer}>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Profile</div>
                            <div className={styles.sectionBody}>
                                {
                                    summary.data.value !== '' &&
                                    <div className={styles.item}>
                                        <div dangerouslySetInnerHTML={{ __html: summary.data.value }} >
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {/* <!-- Summary end  --> */}

                    {/* <!-- Education --> */}
                    {
                        education.isSectionVisible
                        &&
                        <div className={styles.sectionContainer} id='education'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Education</div>
                            <div className={styles.sectionBody}>
                                {
                                    education.data.length > 0
                                    && education.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`education_${index}`}>
                                                {
                                                    el.degree.value === ''
                                                        ? <div className={styles.bold}>
                                                            {`${el.title.value}, ${el.location.value}`}
                                                        </div>
                                                        :
                                                        <div className={styles.bold}>
                                                            {`${el.degree.value}'s, ${el.title.value}, ${el.location.value}`}
                                                        </div>
                                                }
                                                <div className={styles.infoText}>{el.period.value}</div>
                                                {
                                                    el.wysiwyg.value !== '' &&
                                                    <div dangerouslySetInnerHTML={{ __html: el.wysiwyg.value }} >
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
                        courses.isSectionVisible &&
                        <div className={styles.sectionContainer} id='courses'>
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Courses</div>
                            <div className={styles.sectionBody}>
                                {
                                    courses.data.length > 0
                                    && courses.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`course_${index}`}>
                                                <div className={styles.bold}>{`${el.course.value}, ${el.institution.value}`}</div>
                                                <div className={styles.itemRow}>
                                                    <div className={styles.infoText}>{el.period.value}</div>
                                                    {
                                                        (el.certificate.value !== '') &&
                                                        <>
                                                            <div>,</div>
                                                            <div className={styles.infoText}>
                                                                <a href={el.certificate.value} target="_blank"
                                                                    rel="noreferrer" >Link to certificate</a>
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

                    {employmentHistory.isSectionVisible &&
                        <div className={styles.sectionContainer} id="employment">
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>Employment History</div>
                            <div className={styles.sectionBody}>
                                {
                                    employmentHistory.data.length > 0 &&
                                    employmentHistory.data.map((el, index) => {
                                        return (
                                            <div className={styles.item} key={`employment_${index}`}>
                                                <div className={styles.bold}>
                                                    {`${el.title.value}, ${el.employer.value}, ${el.location.value}`}
                                                </div>
                                                <div className={styles.infoText}>1989 - 2000</div>
                                                {
                                                    el.wysiwyg.value !== '' &&
                                                    <div dangerouslySetInnerHTML={{ __html: el.wysiwyg.value }}>
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
                        references.isSectionVisible &&
                        <div className={styles.sectionContainer} id="references">
                            <div className={`${styles.sectionTitle} ${styles.bold}`}>References</div>
                            <div className={styles.sectionBody}>
                                {
                                    !references.isSwitchChecked
                                        ?
                                        <>
                                            {
                                                references.data.length > 0 &&
                                                references.data.map((el, index) => {
                                                    return (
                                                        <div className={styles.item} key={`reference_${index}`}>
                                                            <div>{`${el.referentName.value} from ${el.company.value}`}</div>
                                                            <div className={styles.itemRow}>
                                                                {
                                                                    el.phone.value !== ''
                                                                    &&
                                                                    <div>
                                                                        <a href={`tel:${el.phone.value}`} className={styles.phone}>{el.phone.value}</a>
                                                                    </div>
                                                                }
                                                                {
                                                                    el.phone.value !== '' && el.email.value !== ''
                                                                    &&
                                                                    <div>-</div>
                                                                }
                                                                <div>
                                                                    <a href={`mailto:${el.email.value}`}>{el.email.value}</a>
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

const SkillLevels = ({ level }) => {
    let val = 3;
    switch (level) {
        case 'Novice':
            val = 1;
            break;
        case 'Beginner':
            val = 2;
            break;
        case 'Skillful':
            val = 3;
            break;
        case 'Experienced':
            val = 4;
            break;
        case 'Expert':
            val = 5;
            break;
        default:
            val = 3;
    }
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