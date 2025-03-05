

import { Box, Link } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { formatText, preventEnterButton, sanitizeInput } from '@/lib/commonScripts';

import { fontsFamilyPDF, optionsForEditableFields } from '@/lib/defaults';

const options = { ...optionsForEditableFields };

const CustomLink = ({
    variant = 'a',
    href = '#',
    isEditable = true,
    size,
    fontWeight = 400,
    defaultValue,
    allowEnter = false,
    name = null,
    value = null,
    onChangeCallback
}) => {
    const fieldRef = useRef(null);

    const currentFont = useSelector(state => state.fontSettings.currentFont);

    let linkStyle = {
        fontSize: size,
        fontFamily: currentFont ? currentFont : 'body',
        cursor: isEditable && 'text',
        fontWeight: fontWeight,
        contentEditable: isEditable,
        border: '0px solid red',
        lineHeight: 1,
        // marginBottom: 0,
        color: '#0a0a0b'
    }


    let linkStylePDF = {
        fontSize: size[1],
        fontFamily: fontsFamilyPDF[currentFont],
        cursor: isEditable && 'text',
        fontWeight: fontWeight,
        contentEditable: isEditable,
        border: '0px solid red',
        // lineHeight: 1,
        lineHeight: 1.5,
        letterSpacing: '1px',
        color: '#0a0a0b',
        wordBreak: 'break-word',
        // marginTop: '5px',
        // backgroundColor: 'red', 
    }

    let linkVariant;

    const updateData = (name, ref) => {
        let cleanString;
        if (ref.current.innerText.length > 1) {
            cleanString = sanitizeInput(ref.current.innerText);
        }
        if ((ref.current.textContent != '' && ref.current.textContent.length > 0) && name) {
            let formattedText = formatText(cleanString, 'link')
            onChangeCallback(name, formattedText)
        } else {
            onChangeCallback(name, defaultValue)
            ref.current.textContent = defaultValue;
        }
    }

    switch (variant) {
        case 'a':
            isEditable
                // return as editable
                ? linkVariant = <Link
                    {...options}
                    {...linkStyle}
                    ref={fieldRef}
                    href={`http://${href}`}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => updateData(name, fieldRef)}>{defaultValue}</Link>

                // return as not editable to render pdf
                : linkVariant =
                <a ref={fieldRef}
                    href={`http://${href}`}
                    style={{ ...linkStylePDF }}
                    spellCheck={false}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }
                    }
                />
            break;
        case 'mailto':
            isEditable
                ? linkVariant = <Link
                    {...options}
                    {...linkStyle}
                    ref={fieldRef}
                    href={`mailto:${href}`}
                    marginTop={'0'}
                    // variant={'plain'}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => updateData(name, fieldRef)} >{defaultValue}</Link>
                : linkVariant =

                <a ref={fieldRef}
                    href={`mailto:${href}`}
                    style={{ ...linkStylePDF }}
                    spellCheck={false}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
                />
            break;
        case 'tel':
            isEditable
                ? linkVariant = <Link
                    {...options}
                    {...linkStyle}
                    ref={fieldRef}
                    href={`tel:${href}`}
                    marginTop={'0'}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => updateData(name, fieldRef)}>{defaultValue}</Link>
                : linkVariant =

                <a ref={fieldRef}
                    href={`tel:${href}`}
                    style={{ ...linkStylePDF }}
                    spellCheck={false}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
                />
            break;

        default:
            break;
    }

    useEffect(() => {

        if (fieldRef && isEditable && value) {
            fieldRef.current.innerHTML = value;
        }
    }, [value]);


    if (isEditable) {
        return (
            <Box _hover={{ backgroundColor: 'gray.100', borderRadius: 'sm' }} w='full' paddingX={'0.5'}>
                <motion.div layout>
                    {linkVariant}
                </motion.div>
            </Box >
        );
    } else {
        return (
            <div style={{ width: '100%', paddingInline: '0.125rem', display: 'flex', alignItems: 'baseline' }}  >
                {/* <motion.div layout style={{ alignItems: 'end', backgroundColor: 'red' }}> */}
                {linkVariant}
                {/* </motion.div> */}
            </div>
        );
    }


};

export default CustomLink;