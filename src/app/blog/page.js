import BlogAllPosts from '@/components/blog_page/BlogAllPosts';
import { Suspense } from 'react';

export default async function Blog_Page() {
    const data = fetch(`${process.env.NEXT_PUBLIC_APP_DATABASE_BLOG_URL}.json`, {
        next: { revalidate: 3600 }
    })
        .then((resp) => resp.json())
        .then((data) => data)
        .catch((error) => {
            console.log(error);
        });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogAllPosts data={data} />
        </Suspense>
    );
}
