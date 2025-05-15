import React from 'react';

const EmailEmptyBlock = () => {
    return (
        <div style={{ fontSize: '11px' }}>
            {/* This empty component will be loaded in case lack of 'EmailClaimsBlock' component */}
            ...
        </div>
    );
};

export default EmailEmptyBlock;