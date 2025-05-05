'use client';
import React, { use } from 'react';
import { Box, Text, Stack, Card, Avatar, Button } from '@chakra-ui/react';
import { ProviderUI } from '@/app/providers';
import Link from 'next/link';

import { LuArrowRight } from 'react-icons/lu';

const BlogAllPosts = ({ data }) => {
    const posts = use(data);

    return (
        <ProviderUI>
            <Stack alignItems={'center'} justifyContent={'center'} p={3} overflowY={'scroll'} minHeight={'100%'} direction={'column'}>
                {posts &&
                    // sort descending order , from new to old posts
                    Object.entries(posts)
                        .map(([slug, data]) => ({ slug, ...data }))
                        .sort((a, b) => b.id - a.id)
                        .map((item, index) => {
                            return <BlogCard key={index} index={index} data={item} />;
                        })}
            </Stack>
        </ProviderUI>
    );
};

export default BlogAllPosts;

const BlogCard = ({ data, index }) => {
    const reg = /\n\n/g;
    const textArray = data.text.split(reg);
    const randomImageId = index + 11;
    return (
        <Card.Root w={['full', 'lg', '3xl']} my={2} p={3} shadow={'lg'}>
            {/* <Image src={`https://picsum.photos/id/${index * 13}/300/200`}
                height="200px"
                fit='cover' /> */}

            <Card.Body gap='2' px={[2, 6]}>
                <Avatar.Root size='2xl' shape='rounded'>
                    <Avatar.Image src={`https://picsum.photos/id/${randomImageId}/100?blur`} />
                    <Avatar.Fallback name={`${randomImageId}_image`} />
                </Avatar.Root>
                <Card.Title mt='2' textAlign={'center'} fontSize={['xl', '3xl']} my={3}>
                    <Link href={{ pathname: `/blog/post/${data.slug}`, query: { imageId: randomImageId } }}>{data.title}</Link>
                </Card.Title>
                <Text lineClamp={'3'} fontSize={['sm', 'md']}>{data.text}</Text>
            </Card.Body>
            <Card.Footer justifyContent='space-between'>
                <Box fontSize={['xs', 'sm']}>{new Date(data.id).toDateString()}</Box>
                <Link href={{ pathname: `/blog/post/${data.slug}`, query: { imageId: randomImageId } }}>
                    <Button variant={'plain'} colorPalette={'teal'} paddingX={2} size={['xs', 'sm']}>
                        Read more
                        <LuArrowRight />
                    </Button>
                </Link>
            </Card.Footer>
        </Card.Root>
    );
};
