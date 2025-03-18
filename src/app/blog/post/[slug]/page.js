
import BlogPost from '@/components/blog_page/BlogPost';
import React, { Suspense } from 'react';


export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Blog page`,
    description: `${process.env.NEXT_PUBLIC_APP_NAME} -  'Lorem ipsum '}`,
    // manifest: './icons/site.webmanifest',
}
export default async function Post_Page({ params }) {
    const { slug } = await params;


    const data = fetch(`${process.env.NEXT_PUBLIC_APP_DATABASE_BLOG_URL}/${slug}.json`, {
        cache: 'force-cache',
    })
        .then((resp) => resp.json())
        .then((data) => data)
        .catch((error) => {
            console.log(error);
        });

    return (
        <Suspense>
            <BlogPost post={data} />
        </Suspense>

    );
};

