// import { sanitize } from "isomorphic-dompurify";
import sanitizeHtml from 'sanitize-html';


const sanitizeString = (dirtyString) => {
    let cleanString = sanitizeHtml(dirtyString, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'div', 'br'],
        allowedAttributes: {
            a: ['href', 'name', 'target'],
            // currently isn't allowed IMG itself by default, but
            // these attributes would make sense if we did.
            img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading']
        },
    });

    return cleanString;
}

export default sanitizeString 
