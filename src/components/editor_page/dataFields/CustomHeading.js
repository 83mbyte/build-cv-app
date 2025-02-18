
import { Heading, Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';

import { formatText, preventEnterButton, sanitizeInput } from '@/lib/commonScripts';
import { optionsForEditableFields } from '@/lib/defaults';

const options = { ...optionsForEditableFields };

const CustomHeading = ({
    variant = 'h1',
    size = 'xl',
    isEditable = true,
    allowEnter = false,
    fontWeight = 600,
    defaultValue,
    name = null,
    value = null,
    onChangeCallback
}) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const currentFont = useSelector(state => state.fontSettings.currentFont);

    const fieldRef = useRef(null);
    let headingVariant;

    const updateData = (name, ref) => {
        let cleanString;
        if (ref.current.innerText.length > 0) {
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

    const styleHeading = {
        h1: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            color: `${themeColor}.400`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight
        },
        h2: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            // color:`${themeColor}.300`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight,
            textTransform: 'uppercase',
        },
        h3: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            color: `${themeColor}.400`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight,
            textTransform: 'capitalize',
        },
        h4: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            // color:`${themeColor}.300`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight,
            // textTransform:'uppercase',
        },
    }

    useEffect(() => {
        // put defaultValue to editable field on load
        if (fieldRef && isEditable) {
            fieldRef.current.innerText = defaultValue
        }
    }, []);

    switch (variant) {
        case 'h1':
            isEditable
                // return as editable
                ? headingVariant = <Heading
                    {...options}
                    {...styleHeading.h1}
                    ref={fieldRef}
                    as={variant}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => { updateData(name, fieldRef) }}
                >{ }</Heading>

                // return as not editable to render pdf
                : headingVariant = <Heading
                    {...options}
                    {...styleHeading.h1}
                    ref={fieldRef}
                    as={variant}
                    dangerouslySetInnerHTML={{ __html: value && value }}
                />
            break;
        case 'h2':
            isEditable
                ? headingVariant = <Heading
                    {...options}
                    {...styleHeading.h2}
                    ref={fieldRef}
                    as={variant}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => { updateData(name, fieldRef) }}>{ }</Heading>

                : headingVariant = <Heading
                    {...options}
                    {...styleHeading.h2}
                    ref={fieldRef}
                    as={variant}
                    dangerouslySetInnerHTML={{ __html: value && value }}
                />
            break;
        case 'h3':
            isEditable
                ? headingVariant = <Heading
                    {...options}
                    {...styleHeading.h3}
                    ref={fieldRef}
                    as={variant}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => { updateData(name, fieldRef) }} >{ }</Heading>

                : headingVariant = <Heading
                    {...options}
                    {...styleHeading.h3}
                    ref={fieldRef}
                    as={variant}
                    dangerouslySetInnerHTML={{ __html: value && value }}
                />
            break;
        case 'h4':
            isEditable
                ? headingVariant = <Heading
                    {...options}
                    {...styleHeading.h4}
                    ref={fieldRef}
                    as={variant}
                    onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                    onBlur={() => { updateData(name, fieldRef) }}>{ }</Heading>

                : headingVariant = <Heading
                    {...options}
                    {...styleHeading.h4}
                    ref={fieldRef}
                    as={variant}
                    dangerouslySetInnerHTML={{ __html: value && value }}
                />
            break;

        default:
            break;
    }

    return (
        <Box _hover={{ backgroundColor: 'gray.100', borderRadius: 'sm' }} w='full' paddingX={'0.5'}>
            <motion.div layout>
                {headingVariant}
            </motion.div>
        </Box>
    );
};

export default CustomHeading;