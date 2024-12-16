import React from 'react';

import styles from './StarRating.module.css';
import sanitizeString from '@/lib/sanitizeString';

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

        <>
            {
                !customSize
                    ? <span className={styles.item} dangerouslySetInnerHTML={{ __html: sanitizeString(point) }}></span>
                    : <span className={styles.item} style={{ fontSize: `${customSize}` }} dangerouslySetInnerHTML={{ __html: sanitizeString(point) }}></span>
            }
        </>

    );
};

export default StarRating;

