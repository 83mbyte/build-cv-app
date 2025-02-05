
import { Text, Box } from '@chakra-ui/react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { formatText, preventEnterButton, sanitizeInput } from '@/lib/commonScripts';
import { optionsForEditableFields } from '@/lib/defaults';
import { motion } from 'motion/react';

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

    const themeColor = useSelector(state => state.editorSettings.themeColor);
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
        lineHeight: 1.5,
        marginBottom: 0,
    }
    let textVariant;

    const updateData = (name, ref) => {
        let cleanString;
        if (ref.current.innerText.length > 1) {
            cleanString = sanitizeInput(ref.current.innerText);
        }
        if ((ref.current.textContent != '' && ref.current.textContent.length > 0)) {
            let formattedText = formatText(cleanString)
            onChangeCallback(name, formattedText)
        } else {
            onChangeCallback(name, defaultValue)
            ref.current.textContent = defaultValue;
        }
    }


    textVariant = <Text
        {...options}
        {...textStyle}
        ref={fieldRef}
        as={variant}
        defaultValue={defaultValue}
        onKeyDown={(e) => !allowEnter && preventEnterButton(e)}
        onBlur={() => updateData(name, fieldRef)}
        dangerouslySetInnerHTML={{ __html: value ? value : defaultValue }}

    />

    return (
        <Box _hover={{ backgroundColor: 'gray.100', borderRadius: 'sm' }} w='full' paddingX={'0.5'}>
            <motion.div>
                {textVariant}
            </motion.div>
        </Box>
    );
};

export default CustomText;