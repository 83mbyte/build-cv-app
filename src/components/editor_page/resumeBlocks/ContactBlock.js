import { HStack, Icon, Stack } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { setResumeContactData } from '@/redux/resume/contactBlockSlice';

import CustomLink from '../dataFields/CustomLink';
import CustomText from '../dataFields/CustomText';

import { LuMapPin, LuAtSign, LuPhone, LuLink } from "react-icons/lu";


const itemDetails = {
    location: {
        icon: <LuMapPin />,
        iconCode: `&#9906;`,
        name: 'location',
        defaultValue: 'city/country',
    },
    phone: {
        icon: <LuPhone />,
        iconCode: '&#9990',
        name: 'phone',
        defaultValue: '123456789',
    },
    email: {
        icon: <LuAtSign />,
        iconCode: '&#64',
        name: 'email',
        defaultValue: 'mail@example.com',
    },
    web: {
        icon: <LuLink />,
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
            <ContactItem type='text' icon={itemDetails['location'].icon} name={itemDetails['location'].name} defaultValue={itemDetails['location'].defaultValue} value={contactData['location']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* phone */}
            <ContactItem type='text' icon={itemDetails['phone'].icon} name={itemDetails['phone'].name} defaultValue={itemDetails['phone'].defaultValue} value={contactData['phone']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* email */}
            <ContactItem type='link' linkType='mailto' icon={itemDetails['email'].icon} name={itemDetails['email'].name} defaultValue={itemDetails['email'].defaultValue} value={contactData['email']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

            {/* webpage */}
            <ContactItem type='link' icon={itemDetails['web'].icon} name={itemDetails['web'].name} defaultValue={itemDetails['web'].defaultValue} value={contactData['web']} editableFields={editableFields} themeColor={themeColor} fontSize={fontSize} onChangeHandler={onChangeHandler} />

        </ContactBlockWrapper>
    );
};

export default ContactBlock;

const ContactItem = ({ type = 'text', linkType = 'a', icon, name, defaultValue, value, editableFields, fontSize, themeColor, onChangeHandler, }) => {

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

        <ContactItemWrapper editableFields={editableFields} icon={icon} fontSize={fontSize.p} themeColor={themeColor}  >
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
                wrap={'wrap'}
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
                    flexWrap: 'wrap'
                }}
            >
                {children}
            </div>
        )
    }
}

const ContactItemWrapper = ({ editableFields, themeColor, icon, fontSize, children }) => {
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
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Icon fontSize={fontSize[1]} style={{ height: fontSize[1], }} color={`${themeColor}.400`}>
                        {icon}
                    </Icon>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', margin: 0, paddding: 0 }}>{children}</div>

            </HStack>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', minWidth: '22%', gap: '0.5rem', alignItems: 'center' }}>

                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Icon fontSize={fontSize[1]} style={{ height: fontSize[1], color: colorsPDF[themeColor] }}>
                        {icon}
                    </Icon>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', margin: 0, paddding: 0 }}>{children}</div>

            </div>
        )
    }
}

