import { getDataFromFunctionsEndpoint, sanitizeInput } from '@/lib/commonScripts';
import { Card, Input, Textarea, Field, Stack, Button, Alert, CloseButton } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const PublishBlogArticle = () => {
    const userLogged = useSelector(state => state.auth.data);

    return (
        <>
            {
                !userLogged
                    ? <div style={{ paddingTop: '50px' }}>please <Link href='/login'>login</Link></div>
                    : userLogged.role === 'admin' && <AddBlogItemArea userLogged={userLogged} />
            }
        </>
    );
};

export default PublishBlogArticle;


const AddBlogItemArea = ({ userLogged }) => {
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const buttonPublishHandler = async () => {
        setIsLoading(true)
        const title = sanitizeInput(titleRef.current.value);
        const text = sanitizeInput(textRef.current.value);
        if (userLogged && title.length > 0 && text.length > 0) {
            try {

                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, text, accessToken: userLogged.accessToken }),
                };
                const resp = await getDataFromFunctionsEndpoint('blogPublish', options);
                if (resp) {

                    let data = await resp.json();
                    if (!data.success) {
                        throw new Error(data.error)
                    }

                } else {
                    throw new Error('No server response');
                }
                setIsLoading(false)
            } catch (error) {
                setError(error.message ?? 'unable to create blog item');
                setIsLoading(false);
            }
        }
        setIsLoading(false);
    }

    return (

        <Card.Root w={['full', 'lg']}>
            <Card.Body>
                <Stack>
                    <Field.Root>
                        <Field.Label>Title</Field.Label>
                        <Input placeholder="some title" ref={titleRef} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Text</Field.Label>
                        <Textarea placeholder="text" ref={textRef} />
                    </Field.Root>
                    {
                        error &&
                        // show error message
                        <Alert.Root status={'error'} title={error} size="sm" alignItems={'center'}>
                            <Alert.Indicator />
                            <Alert.Content >
                                <Alert.Title>{error}</Alert.Title>
                            </Alert.Content>
                            <CloseButton size={'2xs'} pos="relative" top={'-1'} onClick={() => setError(null)} />
                        </Alert.Root>

                    }
                    <Button loading={isLoading} colorPalette={'teal'} onClick={() => buttonPublishHandler()}>Publish it!</Button>
                </Stack>
            </Card.Body>
        </Card.Root>

    )
}