import React, { forwardRef } from 'react';

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
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>details</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>address</div>
                                <div>Sofia, Bulgaria</div>
                            </div>
                            <div className={styles.item}>
                                <div className={`${styles.upperCase} ${styles.bold}`}>phone</div>
                                <div>+359 89 9889557</div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- details end --> */}

                    {/* <!-- Links --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>Links</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <div>
                                    <a href="https://github.com/83mbyte?tab=repositories"
                                    >GitHub</a
                                    >
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div>
                                    <a href="https://github.com/83mbyte?tab=repositories"
                                    >Personal Website</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Links end --> */}

                    {/* <!-- Skills --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>Skills</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <div>HTML</div>
                            </div>
                            <div className={styles.item}>
                                <div>CSS</div>
                            </div>
                            <div className={styles.item}>
                                <div>JavaScript</div>
                            </div>
                            <div className={styles.item}>
                                <div>React</div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Skills end --> */}
                </div>

                {/* <!-- right side --> */}
                <div className={styles.rightSide}>
                    {/* <!-- profile --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>profile</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Soluta corporis aperiam, nobis quisquam iusto mollitia quasi
                                    quaerat dicta vero, voluptatem temporibus, eaque quidem
                                    perferendis quis excepturi? Sint ex molestias dolore?
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- profile end --> */}

                    {/* <!-- Education --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>education</div>
                        <div className={styles.sectionBody}>
                            <div className={styles.item}>
                                <div className={styles.itemRow}>
                                    <div className={styles.firstColumn}>
                                        <div className={styles.bold}>Secondary/High School</div>
                                        <div className={styles.infoText}>1989 - 2000</div>
                                    </div>

                                    <div className={styles.secondColumn}>
                                        <div className={styles.infoText}>Brest, Belarus</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemRow}>
                                    <div className={styles.firstColumn}>
                                        <div className={styles.bold}>
                                            bachelor's degree, Belarusian State University of
                                            Informatics and Radioelectronics
                                        </div>
                                        <div className={styles.infoText}>Sep 2000 - May 2005</div>
                                    </div>

                                    <div className={styles.secondColumn}>
                                        <div className={styles.infoText}>Minsk, Belarus</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Education end--> */}

                    {/* <!-- Employment History --> */}
                    <div className={styles.sectionContainer}>
                        <div className={styles.sectionTitle}>Employment History</div>
                        <div className={styles.sectionBody}>
                            {/* <!-- Employment history item --> */}
                            <div className={styles.item}>
                                <div className={styles.itemRow}>
                                    <div className={styles.firstColumn}>
                                        <div className={styles.bold}>Developer, AlexSoft Ltd.</div>
                                        <div className={styles.infoText}>Sep 2000 - May 2005</div>
                                    </div>
                                    <div className={styles.secondColumn}>
                                        <div className={styles.infoText}>Minsk, Belarus</div>
                                    </div>
                                </div>
                                <p>
                                    Soluta corporis aperiam, nobis quisquam iusto mollitia quasi
                                    quaerat dicta vero, voluptatem temporibus
                                </p>
                            </div>
                            {/* <!-- Employment history item end --> */}
                            <div className={styles.item}>
                                <div className={styles.itemRow}>
                                    <div className={styles.firstColumn}>
                                        <div className={styles.bold}>Developer, AlexSoft Ltd.</div>
                                        <div className={styles.infoText}>Sep 2003 - 2006</div>
                                    </div>
                                    <div className={styles.secondColumn}>
                                        <div className={styles.infoText}>Minsk, Belarus</div>
                                    </div>
                                </div>
                                <p>
                                    Aperiam, nobis quisquam voluptatem temporibus, iusto mollitia
                                    quasi quaerat dicta vero
                                </p>
                            </div>
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