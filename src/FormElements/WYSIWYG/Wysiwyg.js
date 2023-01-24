import { Box } from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML, } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './wysiwyg.css';
import { fetchAPI } from '../../API/api';

const Wysiwyg = ({ state, user }) => {
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
        if ((convertedContent && convertedContent !== ' ' && convertedContent !== '') && user && state.path) {
            fetchAPI.putData(user, state.path, sanitizeMarkup(convertedContent))
        }
    }

    return (
        <Box my='3' w={'100%'} px='3px' minW={'200px'}>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                toolbarClassName="toolbar-class"
                editorClassName="editor-class"
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
        </Box>
    );
};

export default Wysiwyg;