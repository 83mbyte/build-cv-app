'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';

import { consentBannerData } from '@/lib/content-lib';
import styles from './CookieConsentStyle.module.css'
import StyledCheckbox from '../styledCheckbox/StyledCheckbox';

const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState({
        analytics_storage: false,
        ad_storage: false,
        ad_user_data: false,
        ad_personalization: false,
    });

    // Checks if user fulfilled consent banner question
    useEffect(() => {
        const savedConsent = localStorage.getItem(`${process.env.NEXT_PUBLIC_APP_NAME}-consent`);
        if (!savedConsent) {
            setIsVisible(true); // show consent banner if no stored data
        } else {
            const parsedConsent = JSON.parse(savedConsent);
            setConsent(parsedConsent);
            // updating Consent Mode while page load if data stored
            if (typeof window.gtag === 'function') {
                window.gtag('consent', 'update', {
                    analytics_storage: parsedConsent.analytics_storage ? 'granted' : 'denied',
                    ad_storage: parsedConsent.ad_storage ? 'granted' : 'denied',
                    ad_user_data: parsedConsent.ad_user_data ? 'granted' : 'denied',
                    ad_personalization: parsedConsent.ad_personalization ? 'granted' : 'denied',
                });
            }
        }
    }, []);

    // checkbox checks handler
    const handleConsentChange = (key) => {
        setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // AccpetAll handler
    const handleAcceptAll = () => {
        const newConsent = {
            analytics_storage: true,
            ad_storage: true,
            ad_user_data: true,
            ad_personalization: true,
        };
        localStorage.setItem(`${process.env.NEXT_PUBLIC_APP_NAME}-consent`, JSON.stringify(newConsent));
        setConsent(newConsent);
        setIsVisible(false);
        setShowSettings(false);
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
            });
        }
    };

    // Decline handler
    const handleDecline = () => {
        const newConsent = {
            analytics_storage: false,
            ad_storage: false,
            ad_user_data: false,
            ad_personalization: false,
        };
        localStorage.setItem(`${process.env.NEXT_PUBLIC_APP_NAME}-consent`, JSON.stringify(newConsent));
        setConsent(newConsent);
        setIsVisible(false);
        setShowSettings(false);
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
            });
        }
    };

    // SaveSettings handler
    const handleSaveSettings = () => {
        localStorage.setItem(`${process.env.NEXT_PUBLIC_APP_NAME}-consent`, JSON.stringify(consent));
        setIsVisible(false);
        setShowSettings(false);
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                analytics_storage: consent.analytics_storage ? 'granted' : 'denied',
                ad_storage: consent.ad_storage ? 'granted' : 'denied',
                ad_user_data: consent.ad_user_data ? 'granted' : 'denied',
                ad_personalization: consent.ad_personalization ? 'granted' : 'denied',
            });
        }
    };


    return (
        <AnimatePresence mode='wait'>
            {
                isVisible
                    ? <motion.div
                        initial={{ x: 300, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                type: 'spring',
                                stiffness: 40, delay: 1.5
                            }
                        }}
                        exit={{
                            x: -600,
                            opacity: 0,
                            transition: {
                                type: 'spring',
                                stiffness: 50,
                            }
                        }}
                        className={styles.container}
                        layout
                    >
                        <motion.div className={styles.content} layout='position' key={'consentContent'}>
                            {
                                showSettings
                                    ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} key={'manageTab'} >
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                                <h2>{consentBannerData.settingsTab.h2 || `Manage Cookie Preferences`}</h2>

                                                <ul className={styles.checkboxList}>
                                                    <CheckBoxGroup handleConsentChange={handleConsentChange} consent={consent} />
                                                </ul>

                                                <div className={styles.buttons}>
                                                    <button onClick={handleSaveSettings} className={styles.save}>
                                                        {consentBannerData.settingsTab.save || `Save Settings`}
                                                    </button>
                                                    <button onClick={() => setShowSettings(false)} className={styles.cancel}>
                                                        {consentBannerData.settingsTab.cancel || `Cancel`}
                                                    </button>
                                                </div>
                                            </div>

                                        </motion.div>
                                    )
                                    : (
                                        // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} key={'mainTab'}>
                                        <>
                                            <p>
                                                {consentBannerData.mainText || 'We use cookies and similar technologies to enhance your experience, analyze site performance, and provide personalized ads. You can manage your preferences or accept all cookies to continue. Visit our '}
                                                <Link href="/privacy-policy" target='_blank'>
                                                    {consentBannerData.learnMore || `privacy policy page`}
                                                </Link >
                                            </p>
                                            <div className={styles.buttons}>
                                                <button onClick={handleAcceptAll} className={styles.accept}>
                                                    {consentBannerData.acceptAll || `Accept All`}
                                                </button>
                                                <button onClick={handleDecline} className={styles.decline}>
                                                    {consentBannerData.decline || `Decline`}
                                                </button>
                                                <button onClick={() => setShowSettings(true)} className={styles.settings}>
                                                    {consentBannerData.settings || ` Settings`}
                                                </button>
                                            </div>
                                        </>
                                    )}
                        </motion.div>

                    </motion.div>
                    : null   // do not show banner
            }
        </AnimatePresence>
    );
}

export default CookieConsentBanner;


const checkboxItems = [
    {
        labelValue: consentBannerData.settingsTab.items.analytics.label || 'Analytics',
        consentKey: 'analytics_storage',
        descriptionText: consentBannerData.settingsTab.items.analytics.description || `Allows us to collect anonymized data about how you use our website to improve its performance and functionality.`
    },
    {
        labelValue: consentBannerData.settingsTab.items.advertising.label || 'Advertising',
        consentKey: 'ad_storage',
        descriptionText: consentBannerData.settingsTab.items.advertising.description || `Enables storage of cookies for advertising purposes, such as tracking ad performance and conversions.`
    },
    {
        labelValue: consentBannerData.settingsTab.items.adUserData.label || 'Ad User Data',
        consentKey: 'ad_user_data',
        descriptionText: consentBannerData.settingsTab.items.adUserData.description || `Permits sharing of your data with advertising partners to deliver relevant ads based on your interests.`
    },
    {
        labelValue: consentBannerData.settingsTab.items.adPersonalization.label || 'Ad Personalization',
        consentKey: 'ad_personalization',
        descriptionText: consentBannerData.settingsTab.items.adPersonalization.description || `Allows us to show you personalized ads tailored to your preferences and behavior.`
    },
]

const CheckBoxGroup = ({ handleConsentChange, consent }) => {

    return (
        <>
            {
                checkboxItems.map((item, index) => {

                    return (
                        <li key={index}>
                            <label className={styles.labelStyle}>
                                <StyledCheckbox isChecked={consent[item.consentKey]} onChangeHandler={() => handleConsentChange(item.consentKey)} />
                                {item.labelValue}
                            </label>
                            <p className={styles.checkBoxDescription}>{item.descriptionText}</p>
                        </li>
                    )
                })
            }
        </>
    )
}