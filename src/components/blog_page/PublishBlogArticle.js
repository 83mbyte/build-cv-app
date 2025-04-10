import { app } from '@/__firebase/__firebaseConf';
import { getDataFromFunctionsEndpoint, sanitizeInput } from '@/lib/commonScripts';
import { Card, Input, Textarea, Field, Stack, Button, Alert, CloseButton } from '@chakra-ui/react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const auth = getAuth(app);

const PublishBlogArticle = () => {

    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        // manage userLogged state
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user && user.uid && user.accessToken) {

                auth.currentUser.getIdTokenResult(user.accessToken)
                    .then((idTokenResult) => {
                        setUserLogged({
                            userId: user.uid,
                            accessToken: user.accessToken,
                            email: user.email,
                            role: idTokenResult?.claims.admin ? 'admin' : 'user',
                        });
                    })
            } else {

                setUserLogged(null)
            }

            setIsLoadingUserData(false);
        })

        return () => unsubscribe();
    }, []);

    return (
        <>
            {
                isLoadingUserData || !userLogged
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