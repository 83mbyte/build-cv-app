import React from 'react';
import DOMPurify from 'dompurify';
// import { MdStar } from "react-icons/md";

const StarRating = ({ level }) => {
    let point;
    switch (level) {
        case 'Novice':
            point = '&#9733;'.repeat(1);
            point += '&#9734;'.repeat(4)
            break;
        case 'Beginner':
            point = '&#9733;'.repeat(2);
            point += '&#9734;'.repeat(3)
            break;
        case 'Skillful':
            point = '&#9733;'.repeat(3);
            point += '&#9734;'.repeat(2)
            break;
        case 'Experienced':
            point = '&#9733;&nbsp;'.repeat(4);
            point += '&#9734;'.repeat(1)
            break;
        case 'Expert':
            point = '&#9733;'.repeat(5);
            break;
        default:
            point = '&#9733;'.repeat(3);
            point += '&#9734;'.repeat(2)
            break;
    }
    return (
        <span style={{ fontSize: '10px', letterSpacing: '7px' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(point) }}></span>
        // <span><MdStar /></span>
    );
};

export default StarRating;

