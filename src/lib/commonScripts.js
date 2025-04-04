import DOMPurify from "isomorphic-dompurify";

export const preventEnterButton = (e) => {
    if (e.code == 'Enter') {
        e.preventDefault();
    }
}

export const sanitizeInput = (dirtyString) => {
    let cleanString = DOMPurify.sanitize(dirtyString, {
        ALLOWED_TAGS: ['b', 'i', 'a', '<br>'],
        ALLOWED_ATTR: ['style', 'href']
    });
    return cleanString;
}

export const formatText = (stringToFormat, type = 'null') => {
    let newLineRegex = /\n/g;
    let httpsRegex = /(http[s]?:\/\/)+/gim;
    let formatted = stringToFormat.trim().replaceAll(newLineRegex, '</br>').replaceAll(httpsRegex, '');
    if (type == 'link') {
        // clean whitespaces in links
        let whiteSpaceRegex = /(\s)+/g;
        formatted = formatted.replaceAll(whiteSpaceRegex, '');
    }

    return formatted
}

export const getDataFromFunctionsEndpoint = async (endPoint, options) => {
    let resp = null;
    try {

        if (process.env.NODE_ENV == "development") {
            resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${endPoint}`, options);

        } else {
            resp = await fetch(`https://${endPoint}-${process.env.NEXT_PUBLIC_FUNC_SUFFIX}`, options);
        }
    } catch (error) {
        return null
    }
    return resp
}