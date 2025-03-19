'use client'

import { ProviderRedux, ProviderUI } from "@/app/providers"
import PublishBlogArticle from "@/components/blog_page/PublishBlogArticle"

export default function Publish_Page() {

    return (

        <ProviderUI>
            <ProviderRedux>
                <PublishBlogArticle />
            </ProviderRedux>
        </ProviderUI>

    )
} 