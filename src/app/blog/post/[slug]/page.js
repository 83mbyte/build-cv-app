import BlogPost from '@/components/blog_page/BlogPost';
import React, { Suspense } from 'react';

async function getPost(slug) {
    try {
        console.log('slug', slug);
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_DATABASE_BLOG_URL}/${slug}.json`);
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error('Failed to fetch post:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The post you are looking for does not exist.',
        };
    }

    return {
        title: `${post.title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description: post.text.substring(0, 160),
        alternates: {
            canonical: `/blog/post/${slug}`,
        },
    };
}

export default async function Post_Page({ params }) {
    const { slug } = await params;

    const dataPromise = getPost(slug);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogPost post={dataPromise} />
        </Suspense>
    );
}
