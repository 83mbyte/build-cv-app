
import React from 'react';

import FooterContainer from '@/components/Footer/FooterContainer';

const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Authentication page`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} - AI-powered Resume Builder.`,
}


const Auth_Layout = ({ children }) => {
    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',

        }}
        >
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flex: 1, }}>
                {children}
            </div>

            <div style={{ width: '100%' }}>
                <FooterContainer />
            </div>

        </div>
    );
};

export default Auth_Layout;