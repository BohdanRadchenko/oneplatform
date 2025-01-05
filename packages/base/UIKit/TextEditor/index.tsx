import React, { FC, useMemo, useEffect, useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { getStyles } from "./styles";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from "html-to-draftjs";

interface IProps {
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
};

export const TextEditor: FC<IProps> = ({ value, disabled, placeholder, onChange }) => {
    const styles = useMemo(() => getStyles(), []);
    const blocksFromHtml = htmlToDraft(value || '');
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createWithContent(contentState)
    });

    useEffect(() => {
        onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }, []);

    const onEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        onChange(draftToHtml(convertToRaw(newEditorState.getCurrentContent())))
    }

    const uploadCallback = (file: any, callback: any) => {
        return new Promise((resolve, reject) => {
            const reader = new window.FileReader();
            reader.onloadend = async () => {
                const form_data = new FormData();
                form_data.append("files", file);
                const res = await uploadFile(form_data);
                resolve({ data: { link: res[0].url } });
            };
            reader.readAsDataURL(file);
        });
    };

    const uploadFile = async (formData: FormData) => {
        try {
            const accessToken = globalThis.localStorage.getItem("accessToken");
            const response = await fetch('', {
            // const response = await fetch('https://pizzawaydev.pp.ua/api/file/add-files/', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            });

            if (!response.ok) {
                throw new Error('File upload failed');
            };

            return response.json();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const config = {
        image: {
            uploadCallback: uploadCallback,
            alt: { present: true, mandatory: false },
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
        },
        options: ['inline', 'fontSize', 'fontFamily', 'image', 'link', 'colorPicker', 'list', 'textAlign'],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        link: { inDropdown: true },
    };

    return (
        <div>
            <Editor
                readOnly={disabled}
                placeholder={placeholder || ''}
                toolbar={config}
                editorState={editorState}
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                handlePastedText={() => false}
                editorStyle={styles.editor as React.CSSProperties}
                toolbarStyle={styles.toolbar as React.CSSProperties}
                toolbarClassName="rdw-option-active"
            />
        </div>
    );
};
