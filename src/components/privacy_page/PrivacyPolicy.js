'use client'
import Link from 'next/link';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <h1>Privacy Policy for {process.env.NEXT_PUBLIC_APP_NAME}</h1>
            <p className={styles.updateDate}><strong>Last Updated: April 30, 2025</strong></p>

            <p>At {process.env.NEXT_PUBLIC_APP_NAME} ({process.env.NEXT_PUBLIC_APP_DOMAIN}), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, including our resume-building and virtual interview preparation tools. By using our website, you agree to the terms of this Privacy Policy.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect information from you in the following ways:</p>
            <h3>a. Personal Information</h3>
            <p>When you sign up for a subscription or use our services, we may collect:</p>
            <ul>
                <li><strong>Contact Information</strong>: Email address, first name, last name.</li>
                <li><strong>Account Information</strong>: Password (stored securely in encrypted form).</li>
                <li><strong>Payment Information</strong>: Billing details processed securely through our payment provider, Stripe (we do not store your credit card information).</li>
            </ul>
            <h3>b. Usage and Analytics Data</h3>
            <p>We use cookies and similar technologies to collect non-personal information about your interactions with our website, including:</p>
            <ul>
                <li><strong>Device Information</strong>: IP address, browser type, operating system, and device identifiers.</li>
                <li><strong>Usage Data</strong>: Pages visited, time spent on the site, clicks, and other interactions.</li>
                <li><strong>Advertising Data</strong>: Information about ads you view or click, collected through Google Ads and Google Tag Manager.</li>
            </ul>
            <h3>c. Cookies and Tracking Technologies</h3>
            <p>We use cookies to enhance your experience, analyze site performance, and deliver personalized ads. You can manage your cookie preferences through our consent banner, which appears when you first visit our site. For more details, see Section 5 (Cookies and Consent).</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
                <li>To provide and improve our services, such as creating resumes and offering virtual interview practice.</li>
                <li>To process payments and manage your subscription through Stripe.</li>
                <li>To analyze website usage and performance using Google Analytics.</li>
                <li>To deliver personalized ads and measure ad performance through Google Ads.</li>
                <li>To communicate with you, including sending account-related emails or updates.</li>
                <li>To comply with legal obligations and protect our rights.</li>
            </ul>

            <h2>3. Sharing Your Information</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
                <li><strong>Service Providers</strong>:
                    <ul>
                        <li><strong>Stripe</strong>: To process payments securely. Stripe's Privacy Policy applies to their data processing (<Link href="https://stripe.com/privacy" target="_blank">https://stripe.com/privacy</Link>).</li>
                        <li><strong>Google</strong>: For analytics (Google Analytics) and advertising (Google Ads, Google Tag Manager). Google's Privacy Policy applies (<Link href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</Link>).</li>
                    </ul>
                </li>
                <li><strong>Legal Requirements</strong>: If required by law, we may disclose your information to comply with legal processes or protect our rights.</li>
            </ul>

            <h2>4. Cookies and Consent</h2>
            <p>Our website uses cookies and similar technologies to enhance functionality, analyze usage, and provide personalized ads. When you first visit our site, a consent banner allows you to:</p>
            <ul>
                <li>Accept all cookies.</li>
                <li>Decline non-essential cookies.</li>
                <li>Customize your preferences for analytics, advertising, and personalized ads.</li>
            </ul>
            <p>You can change your cookie preferences at any time by [revisiting the consent banner or contacting us]. We use Google's Consent Mode to ensure that data collection respects your preferences. By default, we disable cookies for analytics and advertising until you provide consent.</p>

            <h2>5. Data Storage and Security</h2>
            <ul>
                <li><strong>Storage</strong>: Personal information (e.g., email, name) is stored securely on our servers. Payment data is processed and stored by Stripe. Analytics and advertising data may be stored by Google.</li>
                <li><strong>Retention</strong>: We retain your personal information for as long as your account is active or as needed to provide services. Analytics data is retained according to Google's policies.</li>
                <li><strong>Security</strong>: We use industry-standard measures (e.g., encryption, secure servers) to protect your data. However, no method of transmission over the internet is 100% secure.</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
                <li><strong>Access</strong>: Request a copy of the data we hold about you.</li>
                <li><strong>Correction</strong>: Request corrections to inaccurate data.</li>
                <li><strong>Deletion</strong>: Request deletion of your data.</li>
                <li><strong>Opt-Out</strong>: Opt out of personalized ads or analytics.</li>
                <li><strong>Data Portability</strong>: Request your data in a machine-readable format.</li>
            </ul>
            <p>To exercise these rights, contact us at <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT}`}>{process.env.NEXT_PUBLIC_EMAIL_CONTACT}</Link> . We will respond within the timeframes required by law (e.g., 30 days for GDPR).</p>

            <h2>7. International Data Transfers</h2>
            <p>{process.env.NEXT_PUBLIC_APP_NAME} operates globally, and your data may be transferred to and processed in countries outside your region, including the United States. We ensure that such transfers comply with applicable data protection laws, using safeguards like Standard Contractual Clauses.</p>

            <h2>8. Third-Party Links</h2>
            <p>Our website may contain links to third-party sites (e.g., Stripe, Google). We are not responsible for the privacy practices of these sites. Please review their privacy policies.</p>

            <h2>9. Children's Privacy</h2>
            <p>Our services are not intended for individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected such information, contact us to have it removed.</p>

            <h2>10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date.</p>

            <h2>11. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <ul>
                <li><strong>Email</strong>: <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT}`}>{process.env.NEXT_PUBLIC_EMAIL_CONTACT}</Link></li>
                {/* <li><strong>Address</strong>: [Optional,  ]</li> */}
            </ul>

            <p>By using {process.env.NEXT_PUBLIC_APP_NAME}, you acknowledge that you have read and understood this Privacy Policy.</p>
        </div>
    );
};

export default PrivacyPolicy;

