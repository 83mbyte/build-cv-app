import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

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

const TextEditor = ({ state, onChangeCallback }) => {

    const [html, setHtml] = useState(() => {
        if (state?.value) {
            return state.value
        } else {
            return ''
        }
    });

    function onChange(e) {
        setHtml(e.target.value);
    }

    const applyChanges = () => {
        if (html && html !== '') {
            let cleanString = sanitizeString(html);
            onChangeCallback(cleanString);
        }
    }

    return (
        <Box my={state?.label === '' ? '3' : '0'} w={'100%'} px={[0, 0]}>

            {state?.label && <Text color={'gray.500'} px={2} mx={3} mb={'-2px'} fontSize={'xs'} fontWeight={'semibold'}>{state.label}</Text>}
            <EditorProvider>
                <Editor value={html} onChange={onChange} onBlur={applyChanges} tagName='p'>
                    <Toolbar  >
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