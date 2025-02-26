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


        <ContactBlockWrapper editableFields={editableFields} layoutNumber={layoutNumber} themeColor={themeColor}>

            {/* location */}
            <ContactItem type='text' iconCode={itemDetails['location'].iconCode} name={itemDetails['location'].name} defaultValue={itemDetails['location'].defaultValue} value={contactData['location']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* phone */}
            <ContactItem type='text' iconCode={itemDetails['phone'].iconCode} name={itemDetails['phone'].name} defaultValue={itemDetails['phone'].defaultValue} value={contactData['phone']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* email */}
            <ContactItem type='text' iconCode={itemDetails['email'].iconCode} name={itemDetails['email'].name} defaultValue={itemDetails['email'].defaultValue} value={contactData['email']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* webpage */}
            <ContactItem type='text' iconCode={itemDetails['web'].iconCode} name={itemDetails['web'].name} defaultValue={itemDetails['web'].defaultValue} value={contactData['web']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

        </ContactBlockWrapper>
    );
};

export default ContactBlock;

const ContactItem = ({ type = 'text', linkType = 'a', iconCode, name, defaultValue, value, editableFields, fontSize, themeColor, onChangeHandler, }) => {

    let itemVariant;
    if (type == 'link') {
        itemVariant = <CustomLink
            variant={linkType}
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

        <ContactItemWrapper editableFields={editableFields} iconCode={iconCode} fontSize={fontSize.p} themeColor={themeColor}  >
            {itemVariant}
        </ContactItemWrapper>
    )
}

const ContactBlockWrapper = ({ editableFields, layoutNumber, themeColor, children }) => {

    if (editableFields) {
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
                {children}
            </Stack>
        )
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: layoutNumber == 0 ? 'row' : 'column',
                    justifyContent: layoutNumber == 0 && 'space-between',
                    padding: '0.25rem',
                    borderRadius: '0.5rem',
                    gap: layoutNumber == 0 ? '0.5rem' : '1rem',
                }}
            >
                {children}
            </div>
        )
    }
}

const ContactItemWrapper = ({ editableFields, themeColor, iconCode, fontSize, children }) => {
    const colorsPDF = {
        blue: '#60a5fa',
        green: '#4ade80',
        red: '#f87171',
        purple: '#c084fc',
        orange: '#fb923c',
        gray: '#a1a1aa',
        black: '#000000'
    }
    if (editableFields) {
        return (
            <HStack bg='' minW={'22%'}>
                <Text
                    fontSize={fontSize.p}
                    fontWeight={'600'}
                    color={`${themeColor}.400`}
                    dangerouslySetInnerHTML={{ __html: iconCode }}
                    marginBottom={0}
                />
                {children}

            </HStack>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', minWidth: '22%', gap: '0.5rem', alignItems: 'center', backgroundColor: '' }}>
                <div><p style={{ marginBottom: '0px', fontWeight: 600, color: colorsPDF[themeColor], fontSize: fontSize[1] }}
                    dangerouslySetInnerHTML={{ __html: iconCode }}
                /></div>
                <div  >{children}</div>
            </div>
        )
    }
}