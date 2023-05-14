import React from 'react';
import DOMPurify from 'dompurify';


import styles from './StarRating.module.css';

const StarRating = ({ level, type, customSize = null }) => {
    let point;
    let itemEmpty;
    let itemFilled;

    if (type === 'square') {
        itemEmpty = '&#9723;';
        itemFilled = '&#9724;';

    }
    else if (type === 'circle') {
        itemEmpty = '&#9675;';
        itemFilled = '&#9673;';
    }
    else {
        itemEmpty = '&#9734;';
        itemFilled = '&#9733;';
    }

    point = itemFilled.repeat(level) + itemEmpty.repeat(5 - level)

    return (
        // <span style={{ fontSize: '5px', letterSpacing: '7px' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(point) }}></span>
        <>
            {
                !customSize
                    ? <span className={styles.item} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(point) }}></span>
                    : <span className={styles.item} style={{ fontSize: `${customSize}` }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(point) }}></span>
            }
        </>

    );
};

export default StarRating;

