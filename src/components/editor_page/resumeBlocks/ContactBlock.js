import { HStack, Stack, Text, } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { setResumeContactData } from '@/redux/resume/contactBlockSlice';

import CustomLink from '../dataFields/CustomLink';
import CustomText from '../dataFields/CustomText';


const itemDetails = {
    location: {
        iconCode: `&#9906;`,
        name: 'location',
        defaultValue: 'city/country',
    },
    phone: {
        iconCode: '&#9990',
        name: 'phone',
        defaultValue: '123456789',
    },
    email: {
        iconCode: '&#64',
        name: 'email',
        defaultValue: 'mail@example.com',
    },
    web: {
        iconCode: '&#9741',
        name: 'web',
        defaultValue: 'example.com',
    }
}

const ContactBlock = ({ editableFields, layoutNumber }) => {
    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const contactData = useSelector(state => state.resumeContact);
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const dispatch = useDispatch();

    const onChangeHandler = (name, value,) => {
        dispatch(setResumeContactData({ name, value }));
    }
    return (

        <Stack
            bg=''
            w='full'
            flexDirection={layoutNumber == 0 ? 'row' : 'column'}
            gap={layoutNumber == 0 ? 2 : 4}
            justifyContent={layoutNumber == 0 && 'space-between'}
            _hover={{ outlineStyle: 'solid', outlineColor: `${themeColor}.100`, outlineWidth: '1px' }}
            padding={1} borderRadius={'lg'}
        >
            {/* location */}
            <ContactItem type='text' iconCode={itemDetails['location'].iconCode} name={itemDetails['location'].name} defaultValue={itemDetails['location'].defaultValue} value={contactData['location']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* phone */}
            <ContactItem type='text' iconCode={itemDetails['phone'].iconCode} name={itemDetails['phone'].name} defaultValue={itemDetails['phone'].defaultValue} value={contactData['phone']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* email */}
            <ContactItem type='link' iconCode={itemDetails['email'].iconCode} name={itemDetails['email'].name} defaultValue={itemDetails['email'].defaultValue} value={contactData['email']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* webpage */}
            <ContactItem type='link' iconCode={itemDetails['web'].iconCode} name={itemDetails['web'].name} defaultValue={itemDetails['web'].defaultValue} value={contactData['web']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />
        </Stack>
    );
};

export default ContactBlock;

const ContactItem = ({ type = 'text', iconCode, name, defaultValue, value, editableFields, fontSize, themeColor, onChangeHandler, }) => {

    let itemVariant;
    if (type == 'link') {
        itemVariant = <CustomLink
            variant={'a'}
            size={fontSize.p}
            fontWeight={'400'}
            defaultValue={defaultValue}
            name={name}
            href={value}
            value={value}
            isEditable={editableFields}
            onChangeCallback={(name, value) => onChangeHandler(name, value)}
        />
    } else {
        itemVariant = <CustomText
            variant={'p'}
            size={fontSize.p}
            fontWeight={'400'}
            defaultValue={defaultValue}
            name={name}
            value={value}
            isEditable={editableFields}
            onChangeCallback={(name, value) => onChangeHandler(name, value)}
        />
    }

    return (
        <HStack bg='' minW={'22%'}>
            <Text
                fontSize={fontSize.p}
                fontWeight={'600'}
                color={`${themeColor}.400`}
                dangerouslySetInnerHTML={{ __html: iconCode }}
                marginBottom={0}
            />
            {itemVariant}

        </HStack>
    )
}