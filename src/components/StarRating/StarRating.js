import React from 'react';
import DOMPurify from 'dompurify';


import styles from './StarRating.module.css';

const StarRating = ({ level }) => {
    let point;

    switch (level) {
        case 1:
            point = '&#9733;'.repeat(1);
            point += '&#9734;'.repeat(4)
            break;
        case 2:
            point = '&#9733;'.repeat(2);
            point += '&#9734;'.repeat(3)
            break;
        case 3:
            point = '&#9733;'.repeat(3);
            point += '&#9734;'.repeat(2)
            break;
        case 4:
            point = '&#9733;&nbsp;'.repeat(4);
            point += '&#9734;'.repeat(1)
            break;
        case 5:
            point = '&#9733;'.repeat(5);
            break;
        default:
            point = '&#9733;'.repeat(3);
            point += '&#9734;'.repeat(2)
            break;
    }
    return (
        // <span style={{ fontSize: '5px', letterSpacing: '7px' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(point) }}></span>
        <span className={styles.star} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(point) }}></span>

    );
};

export default StarRating;

