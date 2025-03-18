import React, { use } from 'react';
import { Box, Card, Avatar, Button, } from "@chakra-ui/react";
import Link from "next/link";
import { ProviderUI } from '@/app/providers';

const BlogPost = ({ post }) => {

    const data = use(post);
    const reg = /\n\n/g

    return (
        <ProviderUI>

            {
                !data
                    ? <Box>
                        <Box>Post not found..</Box>
                        <Link href='/blog'> <Button variant={'plain'} colorPalette={'teal'} paddingX={2} size={['sm', 'sm']} >back to Blog</Button></Link>
                    </Box>
                    : <Card.Root w={['full', 'lg', '3xl']} my={6} p={3} >

                        {/* <Image src={`https://picsum.photos/id/${index * 13}/300/200`}
                height="200px"
                fit='cover' /> */}

                        <Card.Body gap="2">
                            <Avatar.Root size='2xl' shape="rounded">
                                <Avatar.Image src={`https://picsum.photos/id/${11}/200/300?blur`} />
                                <Avatar.Fallback name="Nue Camp" />
                            </Avatar.Root>
                            <Card.Title mt="2" textAlign={'center'} fontSize='3xl' my={3}>{data.title}</Card.Title>
                            {
                                data.text &&
                                data.text.split(reg).map((text, ind) => {
                                    return (
                                        <Card.Description key={ind}> {text}</Card.Description>
                                    )
                                })
                            }

                        </Card.Body>
                        <Card.Footer justifyContent='space-between'>
                            <Box>{new Date(data.id).toDateString()}</Box>
                            <Link href='/blog'> <Button colorPalette={'teal'} paddingX={2} size={['sm', 'md']} >Close</Button></Link>

                        </Card.Footer>
                    </Card.Root>}
        </ProviderUI>
    );
};

export default BlogPost;