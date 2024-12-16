
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';

import {
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnBulletList,
    BtnUndo, BtnRedo,
    BtnNumberedList,
    Editor,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';
import './TextEditor.css';

import sanitizeString from '@/lib/sanitizeString';

const TextEditor = ({ state, onChangeCallback, heightSize }) => {
    const variantBreakpointFont = useBreakpointValue(
        {
            base: '0.875rem',
            md: '1rem',
        }, { ssr: false }

    )
    function onChange(e) {
        let cleanString;
        if ((e.target.value).length > 3) {
            cleanString = sanitizeString(e.target.value);
            onChangeCallback(cleanString);
        } else {
            onChangeCallback(e.target.value);
        }
    }

    return (
        <Box my={state?.label === '' ? '3' : '0'} w={'100%'} px={[0, 0]}>

            {state?.label && <Text color={'gray.500'} px={2} mx={3} mb={'-2px'} fontSize={'xs'} fontWeight={'semibold'}>{state.label}</Text>}
            <EditorProvider>
                <Editor
                    value={state.value}
                    onChange={onChange}
                    tagName='p'
                    style={heightSize && { minHeight: heightSize }}
                    containerProps={{ style: { fontSize: variantBreakpointFont } }}
                >
                    <Toolbar style={{ fontSize: '1rem' }} >
                        <BtnUndo />
                        <BtnRedo />

                        <Toolbar_Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />

                        <Toolbar_Separator />
                        <BtnNumberedList style={{ marginLeft: '10px' }} />
                        <BtnBulletList />
                    </Toolbar>
                </Editor>

            </EditorProvider>
        </Box>
    );
};

export default TextEditor;

const Toolbar_Separator = () => {
    return (
        <div style={{
            backgroundColor: 'rgb(226, 232, 240)',
            width: '1px',
            height: '100%'
        }}>&nbsp;</div>
    )
}