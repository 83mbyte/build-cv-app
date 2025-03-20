'use client'

import { ProviderUI } from '@/app/providers';
import { Flex, VStack, Heading, Button, Card, Field, Input, Textarea, createListCollection, Alert, CloseButton } from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";

import { motion } from 'motion/react';

import FooterContainer from '../footerCopyright/FooterContainer';
import { useRef, useState } from 'react';
import { authData, contactUsData } from '@/lib/content-lib';
import { sanitizeInput } from '@/lib/commonScripts';

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

const ContactUsContainer = () => {
    return (
        <ProviderUI>
            <VStack bg='' w={'full'} justifyContent={'space-between'} minHeight={'100vh'} p={1} >
                <Heading as='h1' color={'teal'} my={5}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Heading>
                <motion.div
                    style={{ width: '100%' }}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4 } }}
                >
                    <Flex bg='' flex={1} alignItems={'center'} direction={'column'} justifyContent={'center'} w='full'>

                        <Card.Root w={['full', 'xl']}>
                            <Card.Header>
                                <Card.Title>Contact</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ContactForm />
                            </Card.Body>
                        </Card.Root>
                    </Flex>
                </motion.div>

                <FooterContainer />
            </VStack>
        </ProviderUI>

    );
};

export default ContactUsContainer;

const ContactForm = () => {

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const messageRef = useRef(null);

    const [emailError, setEmailError] = useState(false);
    const [formAlert, setFormAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [charsCount, setCharsCount] = useState(0);
    const [reason, setReason] = useState('feedback');

    const validateEmail = (value) => {

        if (!value.match(emailPattern)) {
            setEmailError(true)
        } else {
            if (emailError) {
                setEmailError(false)
            }
        }
    }


    const contactReasons = createListCollection({
        items: [
            { label: "Feedback ", value: "feedback" },
            { label: "Resume Questions", value: "resumeQuestion" },
            { label: "Site Issues ", value: "siteIssues" },
            { label: "Payment Help", value: "paymentHelp" },
            { label: "Partnerships", value: "partnership" },
            { label: "Other ", value: "other" },
        ],
    })

    const generateTimeId = () => {
        const beatifyDate = (originalDate) => {

            if (originalDate < 10) {
                return `0${originalDate}`
            }
            return originalDate;
        }

        let today = new Date();
        let year = today.getFullYear();
        let month = beatifyDate(today.getMonth() + 1);
        let day = beatifyDate(today.getDate());
        let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();

        return (`${year}-${month}-${day}-${time}`)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formAlert) {
            setFormAlert(null);
        }
        const email = emailRef.current.value;

        let message;
        if ((messageRef.current.value).length > 3) {
            message = sanitizeInput(messageRef.current.value);
        } else {
            message = messageRef.current.value;
        }
        let name;
        if ((nameRef.current.value).length > 3) {
            name = sanitizeInput(nameRef.current.value);
        } else {
            name = nameRef.current.value;
        }

        try {
            if (!emailError && email && (message.length > 0 && charsCount <= 800)) {

                let resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/contactForm`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reason, id: generateTimeId(), name, email, message }),
                });

                if (resp) {
                    let data = await resp.json();
                    if (!data.success) {
                        throw new Error(data.error)
                    } else {
                        setFormAlert({ type: 'success', message: 'Thank you. Message has been sent.' });
                        nameRef.current.value = '';
                        messageRef.current.value = '';
                        emailRef.current.value = '';
                        nameRef.current.value = '';
                    }
                }

            } else {
                throw new Error('Unable to send data. Please check  your message once again.')
            }
        } catch (error) {
            setFormAlert({ type: 'error', message: error.message });
            setIsLoading(false);
        }
        setIsLoading(false);
    }
    return (
        <form onSubmit={(e) => submitHandler(e)}>
            <VStack>

                {
                    formAlert &&
                    <Alert.Root status={formAlert.type} title={formAlert.message} alignItems={'center'}>
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>{formAlert.message}</Alert.Title>
                        </Alert.Content>
                        <CloseButton size={'2xs'} pos="relative" onClick={() => setFormAlert(null)} />
                    </Alert.Root>
                }

                <Field.Root invalid={emailError} required>
                    <Field.Label fontSize={['xs', 'sm']}>
                        Email
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input size={['sm', 'md']} placeholder="me@example.com"
                        _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }}
                        ref={emailRef}
                        onBlur={() => validateEmail(emailRef.current.value)} />
                    <Field.ErrorText>{authData?.login.form.email.errorText ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>
                <Field.Root >
                    <Field.Label fontSize={['xs', 'sm']}>Your Name</Field.Label>
                    <Input type='text' _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }} size={['xs', 'md']} ref={nameRef} />
                </Field.Root>
                <Field.Root >
                    <Field.Label fontSize={['xs', 'sm']}>Reason for Contact</Field.Label>
                    <SelectRoot size={['xs', 'md']} collection={contactReasons} positioning={{ sameWidth: true, placement: "bottom" }}
                        id='customSelect'
                        defaultValue={['feedback']}
                        onValueChange={(e) => {
                            setReason(e.value[0]);
                        }}
                    >
                        <SelectTrigger >
                            <SelectValueText placeholder="Default" />
                        </SelectTrigger>
                        <SelectContent portalled={false} width="full"  >
                            {contactReasons.items.map((item) => (
                                <SelectItem item={item} key={item.value} _hover={{ opacity: 0.5 }} cursor={'pointer'}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                </Field.Root>
                <Field.Root invalid={charsCount > 800} required>
                    <Field.Label fontSize={['xs', 'sm']}>Message  <Field.RequiredIndicator /></Field.Label>
                    <Textarea autoresize size={['xs', 'md']} placeholder="put your message"
                        _focusVisible={{ outline: '1px solid teal', border: '1px solid teal' }}
                        minH={['100px', '150px']}
                        maxLength={1200}
                        ref={messageRef}
                        onChange={() => {
                            setCharsCount(messageRef.current.value.length);
                        }}
                    />
                    <Field.ErrorText>{contactUsData?.maxCharsCountError ?? 'Lorem ipsum'}</Field.ErrorText>
                </Field.Root>
                <Button colorPalette={'teal'} w='full' disabled={emailError} type={'submit'} loading={isLoading} loadingText='Sending..'>Send</Button>
            </VStack>
        </form>
    )
}