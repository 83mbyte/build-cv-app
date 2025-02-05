

import { Box, Link } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { formatText, preventEnterButton, sanitizeInput } from '@/lib/commonScripts';

import { optionsForEditableFields } from '@/lib/defaults';

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
    // const themeColor = useSelector(state => state.erditorSettings.themeColor);
    const currentFont = useSelector(state => state.fontSettings.currentFont);

    let linkStyle = {
        fontSize: size,
        fontFamily: currentFont ? currentFont : 'body',
        cursor: isEditable && 'text',
        fontWeight: fontWeight,
        contentEditable: isEditable,
        border: '0px solid red',
        lineHeight: 1.5,
        marginBottom: 0,
        color: '#0a0a0b'

    }

    let linkVariant;

    const updateData = (name, ref) => {
        let cleanString;
        if (ref.current.innerText.length > 1) {
            cleanString = sanitizeInput(ref.current.innerText);
        }
        if ((ref.current.textContent != '' && ref.current.textContent.length > 0) && name) {
            let formattedText = formatText(cleanString)
            onChangeCallback(name, formattedText)
        } else {
            onChangeCallback(name, defaultValue)
            ref.current.textContent = defaultValue;
        }
    }

    switch (variant) {
        case 'a':
            linkVariant = <Link
                {...options}
                {...linkStyle}
                ref={fieldRef}
                href={`http://${href}`}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => updateData(name, fieldRef)}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}

            />
            break;
        case 'mailto':
            linkVariant = <Link
                {...options}
                {...linkStyle}
                ref={fieldRef}
                href={`mailto:${href}`}
                marginTop={'0'}
                // variant={'plain'}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => updateData(name, fieldRef)}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}

            />
            break;
        case 'tel':
            linkVariant = <Link
                {...options}
                {...linkStyle}
                ref={fieldRef}
                href={`tel:${href}`}
                marginTop={'0'}
                // variant={'plain'}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => updateData(name, fieldRef)}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}

            />
            break;

        default:
            break;
    }

    return (
        <Box _hover={{ backgroundColor: 'gray.100', borderRadius: 'sm' }} w='full' paddingX={'0.5'} lineHeight={1}>
            {/* <Box _hover={{ backgroundColor: 'gray.100' }} w='full' lineHeight={1}> */}
            <motion.div layout>
                {linkVariant}
            </motion.div>
        </Box>
    );
};

export default CustomLink;