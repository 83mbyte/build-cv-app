import { Box, Text } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';

import sanitizeString from '@/lib/sanitizeString';

const TextEditor = ({ state, onChangeCallback, heightSize = null }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(convertFromHTML(state.value))
    );

    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    useEffect(() => {
        if (state.value) {
            setEditorState(EditorState.createWithContent(convertFromHTML(state.value)))
        }
    }, [state.value])

    const applyChanges = () => {
        if ((convertedContent && convertedContent !== ' ' && convertedContent !== '')) {
            if (convertedContent === '<p></p>' || convertedContent === '<p> </p>') {
                onChangeCallback('')
            } else {
                onChangeCallback(sanitizeString(convertedContent));
            }
        }
    }

    return (
        <Box my={state.label === '' ? '3' : '0'} w={'100%'} px={[1, 0]} minW={'200px'}>

            {state.label && <Text color={'gray.500'} px={2} mx={3} mb={'-2px'} fontSize={'xs'} fontWeight={'semibold'}>{state.label}</Text>}
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                toolbarClassName="toolbar-class"
                editorClassName={heightSize ? 'editor-class coverLetter' : 'editor-class'}
                ariaLabel='textEditorLabel'
                toolbar={{
                    options: ['inline', 'list', 'history'],
                    separator: '|',
                    inline: {
                        inDropdown: false,
                        options: ['bold', 'italic', 'underline', 'strikethrough']
                    },
                    list: {
                        inDropdown: false,
                        options: ['unordered', 'ordered',]
                    },

                    fontSize: {
                        options: [10, 11, 12, 14, 16, 18, 24],
                    },
                }}
                onBlur={applyChanges}
            />
        </Box >
    );
};

export default TextEditor;