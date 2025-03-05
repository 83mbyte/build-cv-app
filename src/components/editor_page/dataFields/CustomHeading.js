
import { Heading, Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';

import { formatText, preventEnterButton, sanitizeInput } from '@/lib/commonScripts';
import { colorsPDF, fontsFamilyPDF, optionsForEditableFields } from '@/lib/defaults';

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
        h1_pdf: {
            fontWeight: fontWeight,
            wordBreak: 'break-word',
            color: colorsPDF[themeColor],
            fontSize: size[1],
            fontFamily: fontsFamilyPDF[currentFont],
            padding: 0,
            margin: 0,
            lineHeight: 1.5,
        },
        h2: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            // color:`${themeColor}.300`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight,
            textTransform: 'uppercase',
        },
        h2_pdf: {
            fontWeight: fontWeight,
            wordBreak: 'break-word',
            fontSize: size[1],
            fontFamily: fontsFamilyPDF[currentFont],
            textTransform: 'uppercase',
            padding: 0,
            margin: 0,
            lineHeight: 1.5,
            letterSpacing: '1px',
        },
        h3: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            color: `${themeColor}.400`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight,
            textTransform: 'capitalize',
        },
        h3_pdf: {
            color: colorsPDF[themeColor],
            fontSize: size[1],
            fontFamily: fontsFamilyPDF[currentFont],
            fontWeight: fontWeight,
            textTransform: 'capitalize',
            padding: 0,
            margin: 0,
            letterSpacing: '1px',

        },
        h4: {
            contentEditable: isEditable,
            size: size[!isEditable ? 1 : 0],
            // color:`${themeColor}.300`,
            fontFamily: currentFont ? currentFont : 'heading',
            fontWeight: fontWeight,
            // textTransform:'uppercase',
        },
        h4_pdf: {
            fontSize: size[1],
            fontFamily: fontsFamilyPDF[currentFont],
            fontWeight: fontWeight,
            padding: 0,
            margin: 0,
            letterSpacing: '1px',
        },
    }

    useEffect(() => {

        if (fieldRef && isEditable && value) {
            fieldRef.current.innerHTML = value
        }
    }, [value]);

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
                >{defaultValue}</Heading>

                // return as not editable to render pdf
                : headingVariant =
                <h2
                    ref={fieldRef}
                    style={{
                        ...styleHeading.h1_pdf
                    }}
                    as={'h2'}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
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
                    onBlur={() => { updateData(name, fieldRef) }}>{defaultValue}</Heading>

                : headingVariant =
                <h2
                    ref={fieldRef}
                    style={{
                        ...styleHeading.h2_pdf
                    }}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
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
                    onBlur={() => { updateData(name, fieldRef) }} >{defaultValue}</Heading>

                : headingVariant =
                <h3
                    ref={fieldRef}
                    style={{
                        ...styleHeading.h3_pdf
                    }}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
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
                    onBlur={() => { updateData(name, fieldRef) }}>{defaultValue}</Heading>

                : headingVariant =
                <h4
                    ref={fieldRef}
                    style={{
                        ...styleHeading.h4_pdf
                    }}
                    dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
                />
            break;

        default:
            break;
    }

    if (isEditable) {
        return (
            <Box _hover={{ backgroundColor: 'gray.100', borderRadius: 'sm' }} w='full' paddingX={'0.5'}>
                <motion.div layout>
                    {headingVariant}
                </motion.div>
            </Box >
        );
    } else {
        return (
            <div style={{ width: '100%', paddingInline: '0.125rem', }}  >
                <motion.div layout>
                    {headingVariant}
                </motion.div>
            </div >
        );
    }
};

export default CustomHeading;