import { Box, Text } from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML, } from 'draft-convert';
import * as DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';

const TextEditor = ({ state, onChangeCallback }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(convertFromHTML(state.value))
    );

    const [convertedContent, setConvertedContent] = useState(null);

    const sanitizeMarkup = ((data) => {
        // return { __html: DOMPurify.sanitize(data) }
        return DOMPurify.sanitize(data);
    });
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const applyChanges = () => {
        if ((convertedContent && convertedContent !== ' ' && convertedContent !== '')) {
            if (convertedContent === '<p></p>') {
                onChangeCallback('')
            } else {
                onChangeCallback(sanitizeMarkup(convertedContent));
            }
        }
    }

    return (
        <Box my={state.label === '' ? '3' : '0'} w={'100%'} px='8px' minW={'200px'}>

            {state.label && <Text color={'gray.500'} px={2} mx={3} mb={'-2px'} fontSize={'xs'} fontWeight={'semibold'}>{state.label}</Text>}
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                toolbarClassName="toolbar-class"
                editorClassName="editor-class"
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