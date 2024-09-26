import { sanitize } from "isomorphic-dompurify";

const sanitizeString = (dirtyString) => {
    let cleanString = sanitize(dirtyString);

    return cleanString;
}

export default sanitizeString 
