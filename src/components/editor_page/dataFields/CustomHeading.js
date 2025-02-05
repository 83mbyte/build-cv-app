
import { Heading, Box } from '@chakra-ui/react';
import React, { useRef } from 'react';
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

    switch (variant) {
        case 'h1':
            headingVariant = <Heading
                {...options}
                ref={fieldRef}
                as={variant}
                contentEditable={isEditable}
                size={size[!isEditable ? 1 : 0]}
                color={`${themeColor}.400`}
                fontFamily={currentFont ? currentFont : 'heading'}
                fontWeight={fontWeight}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => { updateData(name, fieldRef) }}
                defaultValue={defaultValue}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
            />
            break;
        case 'h2':
            headingVariant = <Heading
                {...options}
                ref={fieldRef}
                as={variant}
                contentEditable={isEditable}
                size={size[!isEditable ? 1 : 0]}
                // color={`${themeColor}.300`}
                fontFamily={currentFont ? currentFont : 'heading'}
                fontWeight={fontWeight}
                textTransform={'uppercase'}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => { updateData(name, fieldRef) }}
                defaultValue={defaultValue}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
            />
            break;
        case 'h3':
            headingVariant = <Heading
                {...options}
                ref={fieldRef}
                as={variant}
                contentEditable={isEditable}
                size={size[!isEditable ? 1 : 0]}
                color={`${themeColor}.400`}
                fontFamily={currentFont ? currentFont : 'heading'}
                fontWeight={fontWeight}
                textTransform={'capitalize'}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => { updateData(name, fieldRef) }}
                defaultValue={defaultValue}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
            />
            break;
        case 'h4':
            headingVariant = <Heading
                {...options}
                ref={fieldRef}
                as={variant}
                contentEditable={isEditable}
                size={size[!isEditable ? 1 : 0]}
                // color={`${themeColor}.300`}
                fontFamily={currentFont ? currentFont : 'heading'}
                fontWeight={fontWeight}
                // textTransform={'uppercase'}
                onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
                onBlur={() => { updateData(name, fieldRef) }}
                defaultValue={defaultValue}
                dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
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