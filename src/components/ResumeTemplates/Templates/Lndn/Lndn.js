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
                websoclinks.isSectionVisible &&
                <div className={styles.sectionContainer} id="links">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Links</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div><a href="/">GitHub</a> / <a href="/">GitHub</a></div>
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
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div>1989-2000</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={styles.item}>
                                    <div className={styles.spaceBetween}>
                                        <div className={`${styles.itemName} ${styles.bold}`}>SoftWaterUni</div>
                                        <div className={styles.itemDescr}>Sofia</div>
                                    </div>
                                    <div>
                                        <p className={styles.itemDescr}>Lorem ipsum aos inczias ai siiw abcu. Fad9 askkna .</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    <div className={`${styles.item} ${styles.spaceBetween}`}>
                                        <div className={`${styles.itemName} ${styles.bold}`}>HTML</div>
                                        <div className={styles.itemDescr}>Expert Control</div>
                                    </div>
                                    <div className={`${styles.item} ${styles.spaceBetween}`}>
                                        <div className={`${styles.itemName} ${styles.bold}`}>HTML</div>
                                        <div className={styles.itemDescr}>Expert</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Skills end --> */}

            {/* <!-- Courses --> */}
            {
                courses.isSectionVisible &&
                <div className={styles.sectionContainer} id="courses">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Courses</div>
                        </div>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div>1989-2000</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={styles.item}><div className={`${styles.itemName} ${styles.bold}`}>SoftWaterUni</div></div>
                            </div>
                        </div>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div>1989-2000</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={styles.item}>
                                    <div className={`${styles.itemName} ${styles.bold}`}>
                                        JavaScript Advanced, ReCSoft, Amsterdam
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- Courses end --> */}

            {/* <!-- Employment history --> */}
            {
                employmentHistory.isSectionVisible &&
                <div className={styles.sectionContainer} id="employment">
                    <div className={styles.sectionBody}>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionTitle} ${styles.upperCase}`}>Employment History</div>
                        </div>
                        <div className={styles.sectionBodyRow}>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_25}`}>
                                <div>Jan 20 - Feb 21</div>
                            </div>
                            <div className={`${styles.sectionBodyColumn} ${styles.column_75}`}>
                                <div className={styles.item}>
                                    <div className={styles.spaceBetween}>
                                        <div className={`${styles.itemName} ${styles.bold}`}>Developer Alex Soft Ltd</div>
                                        <div className={styles.itemDescr}>Holland</div>
                                    </div>
                                    <div>
                                        <p className={styles.itemDescr}>Lorem ipsum aos inczias ai siiw abcu. Fad9 askkna .</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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

                                    <div className={`${styles.item} ${styles.spaceBetween}`}>
                                        <div className={`${styles.itemName} ${styles.bold}`}>Russian</div>
                                        <div className={styles.itemDescr}>Native Speaker</div>
                                    </div>
                                    <div className={`${styles.item} ${styles.spaceBetween}`}>
                                        <div className={`${styles.itemName} ${styles.bold}`}>English</div>

                                    </div>
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
                                <div className={styles.item}>
                                    <div className={`${styles.itemName} ${styles.bold}`}>Alx from Google.com Ltd</div>
                                    <div className={`${styles.sectionBodyRow} ${styles.alignCenter}`}>
                                        <div>
                                            Phone: <a href="/" className={styles.phone}>2324234</a>
                                        </div>
                                        <div className={styles.shortSeparator}></div>
                                        <div>Email: <a href="/">exa@ma.com</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <!-- References end --> */}

            {/* <!-- resume body end--> */}
        </div >
    );
});

export default Lndn;