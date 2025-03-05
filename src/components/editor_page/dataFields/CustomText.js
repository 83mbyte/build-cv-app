
import { Text, Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { formatText, preventEnterButton, sanitizeInput } from '@/lib/commonScripts';
import { optionsForEditableFields } from '@/lib/defaults';
import { fontsFamilyPDF } from '@/lib/resumeFonts';

const options = { ...optionsForEditableFields };


const CustomText = ({
    variant = 'p',
    size = 'md',
    isEditable = true,
    allowEnter = false,
    fontWeight = 400,
    defaultValue,
    name = null,
    value = null,
    onChangeCallback
}) => {

    const currentFont = useSelector(state => state.fontSettings.currentFont);

    const fieldRef = useRef(null);

    const textStyle = {
        contentEditable: isEditable,
        cursor: isEditable && 'text',
        fontSize: size[!isEditable ? 1 : 0],
        // color: `${themeColor}.500`,
        border: '0px solid black',
        fontFamily: currentFont ? currentFont : 'body',
        fontWeight: fontWeight,
        // lineHeight: 2,
        marginBottom: 0,
    }
    const textStylePDF = {
        contentEditable: isEditable,
        cursor: isEditable && 'text',
        fontSize: size[!isEditable ? 1 : 0],
        border: '0px solid black',
        // fontFamily: currentFont ? currentFont : 'body',
        fontFamily: fontsFamilyPDF[currentFont],
        fontWeight: fontWeight,
        lineHeight: 1.5,
        letterSpacing: '1px',
        // marginBottom: 0,
        wordBreak: 'break-word',
        margin: 0

    }
    let textVariant;



    const updateData = (name, ref) => {
        let cleanString;
        if (ref.current.innerText.length > 1) {
            cleanString = sanitizeInput(ref.current.innerText);
        }
        if ((ref.current.textContent != '' && ref.current.innerText.length > 0)) {
            let formattedText = formatText(cleanString)
            onChangeCallback(name, formattedText)
        } else {
            onChangeCallback(name, defaultValue)
            ref.current.textContent = defaultValue;
        }
    }

    useEffect(() => {

        if (fieldRef && isEditable && value) {
            fieldRef.current.innerHTML = value
        }
    }, [value]);

    isEditable
        // return as editable
        ? textVariant = <Text
            {...options}
            {...textStyle}
            ref={fieldRef}
            as={variant}
            onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
            onBlur={() => updateData(name, fieldRef)}
        >{defaultValue}</Text>

        // return as not editable to render pdf
        : textVariant =
        <p
            spellCheck={false}
            style={{ ...textStylePDF }}
            ref={fieldRef}
            dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}
        />

    if (isEditable) {
        return (
            <Box _hover={{ backgroundColor: 'gray.100', borderRadius: 'sm' }} w='full' paddingX={'0.5'}>
                <motion.div layout>
                    {textVariant}
                </motion.div>
            </Box >
        );
    } else {
        return (
            <div style={{ width: '100%', paddingInline: '0.125rem' }}  >
                <motion.div layout>
                    {textVariant}
                </motion.div>
            </div >
        );
    }
};

export default CustomText;