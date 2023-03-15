import React, { forwardRef } from 'react';
import styles from './Lndn.module.css';

const Lndn = forwardRef(({ data }, ref) => {
    const { personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, image }
        = data;

    const createString = (arraySections) => {
        let arr = [];
        arraySections.forEach(section => {
            Object.keys(section).forEach((item) => {
                if (section[item].value && section[item].value !== '') {
                    arr.push(section[item].value)
                }
            })
        });
        return arr
    }
    return (
        <div className={styles.resumeContainer} name="lndn" ref={ref}>
            {/* <!-- header container --> */}
            <div className={styles.headerContainer}>
                <div className={`${styles.person} ${styles.bold}`}>{personDetails.name.firstName.value} {personDetails.name.lastName.value}{personDetails.position.jobTitle.value && personDetails.position.jobTitle.value !== '' && `, ${personDetails.position.jobTitle.value}`}</div>
                <div className={styles.contacts}>
                    <div>{createString([personDetails.contacts]).join(', ')}</div>
                    <div>{createString([personDetails.address]).join(', ')}</div>
                </div>
            </div>
            {/* <!-- header container end --> */}

            {/* <!-- resume body --> */}
            {/* <!-- Links --> */}
            {
                websoclinks.isSectionVisible && websoclinks.data.length > 0 &&
                <div className={styles.sectionContainer} id="links">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Links</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div>
                                    {
                                        websoclinks.data.map((elem, index) => {
                                            if (index < websoclinks.data.length - 1) {
                                                return <a href={elem.link.value} target={'_blank'} rel={'noreferrer'} key={`link_${index}`}>{`${elem.label.value},`}</a>
                                            } else {
                                                return <a href={elem.link.value} target={'_blank'} rel={'noreferrer'} key={`link_${index}`}>{`${elem.label.value}`}</a>
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

            {/* <!-- Education --> */}
            {
                education.isSectionVisible &&
                <div className={styles.sectionContainer} id="education">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Education</div>
                        </div>
                        {
                            education.data && education.data.length > 0 &&
                            education.data.map((elem, index) => {

                                return (
                                    <div className={styles.sectionBodyRow} key={`education_${index}`}>
                                        <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                            <div>{elem.period.value}</div>
                                        </div>
                                        <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                            <div className={styles.item}>
                                                <div className={styles.spaceBetween}>
                                                    <div className={`${styles.itemName} ${styles.bold}`}>
                                                        {
                                                            elem.degree.value && elem.degree.value !== ''
                                                                ? <> {`${elem.degree.value}'s degree, ${elem.title.value}`}</>
                                                                : <> {elem.title.value} </>
                                                        }
                                                    </div>
                                                    {
                                                        elem.location.value && elem.location.value !== '' &&
                                                        <div className={styles.itemDescr}>{elem.location.value}</div>
                                                    }
                                                </div>
                                                {
                                                    elem.wysiwyg.value && elem.wysiwyg.value !== '' &&
                                                    <div>
                                                        <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: elem.wysiwyg.value }}></p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {/* <!-- Education end  --> */}

            {/* <!-- Skills --> */}
            {
                skills.isSectionVisible &&
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
                                                    <div className={`${styles.itemName} ${styles.bold}`}>{elem.skill.value}</div>
                                                    {
                                                        !skills.isSwitchChecked &&
                                                        <div className={styles.itemDescr}>{elem.level.value}</div>
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
                courses.isSectionVisible && courses.data.length > 0 &&
                <div className={styles.sectionContainer} id="courses">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Courses</div>
                        </div>
                        {
                            courses.data.map((elem, index) => {
                                return (
                                    <div className={styles.sectionBodyRow} key={`course_${index}`}>
                                        <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                            <div>{elem.period.value}</div>
                                        </div>
                                        <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                            <div className={styles.item}>
                                                <div className={`${styles.itemName} ${styles.bold}`}>{elem.course.value}{elem.institution.value !== '' && `, ${elem.institution.value}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {/* <!-- Courses end --> */}

            {/* <!-- Employment history --> */}
            {
                employmentHistory.isSectionVisible && employmentHistory.data.length > 0 &&
                <div className={styles.sectionContainer} id="employment">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Employment History</div>
                        </div>
                        {
                            employmentHistory.data.map((elem, index) => {
                                return (
                                    <div className={styles.sectionBodyRow} key={`employmentHistory_${index}`}>
                                        <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                            <div>{elem.period.value}</div>
                                        </div>
                                        <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                            <div className={styles.item}>
                                                <div className={styles.spaceBetween}>
                                                    <div className={`${styles.itemName} ${styles.bold}`}>
                                                        {elem.title.value}{elem.employer.value !== '' && `, ${elem.employer.value}`}
                                                    </div>
                                                    {
                                                        elem.location.value && elem.location.value !== '' &&
                                                        <div className={styles.itemDescr}>{elem.location.value}</div>
                                                    }
                                                </div>
                                                {
                                                    elem.wysiwyg.value && elem.wysiwyg.value !== '' &&
                                                    <div>
                                                        <p className={styles.itemDescr} dangerouslySetInnerHTML={{ __html: elem.wysiwyg.value }}></p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {/* <!-- Employment history end --> */}

            {/* <!-- Languages --> */}
            {
                languages.isSectionVisible &&
                <div className={styles.sectionContainer} id="lang">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Languages</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={`${styles.sectionBodyRow} ${styles.columnWrap} ${styles.spaceBetween}`}>

                                    {
                                        languages.data.map((elem, index) => {
                                            return (
                                                <div className={`${styles.item} ${styles.spaceBetween}`} key={`language_${index}`}>
                                                    <div className={`${styles.itemName} ${styles.bold}`}>{elem.language.value}</div>
                                                    {
                                                        elem.level.value !== 'Select level' && elem.level.value !== '' &&
                                                        <div className={styles.itemDescr}>{elem.level.value}</div>
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
            {/* <!-- Languages end --> */}

            {/* <!-- References --> */}
            {
                references.isSectionVisible &&
                <div className={styles.sectionContainer} id="references">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>References</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                {
                                    !references.isSwitchChecked
                                        ? <>
                                            {
                                                references.data.length > 0 &&
                                                references.data.map((elem, index) => {
                                                    return <div className={styles.item}>
                                                        <div className={`${styles.itemName} ${styles.bold}`}>Alx from Google.com Ltd</div>
                                                        <div className={`${styles.sectionBodyRow} ${styles.alignCenter}`}>
                                                            <div>
                                                                Phone: <a href="/" className={styles.phone}>2324234</a>
                                                            </div>
                                                            <div className={styles.shortSeparator}></div>
                                                            <div>Email: <a href="/">exa@ma.com</a></div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </>
                                        : <>
                                            <div className={styles.item}>
                                                <div className={styles.itemDescr}>References available upon request</div>
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
                hobbies.isSectionVisible && hobbies.data.value !== '' &&
                <div className={styles.sectionContainer} id="hobbies">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Hobbies</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div>
                                    {hobbies.data.value}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* Hobbies end */}

            {/* <!-- resume body end--> */}
        </div >
    );
});

export default Lndn;