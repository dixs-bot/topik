import { getPostBySlug, getPosts } from '@/lib/wp-api';
import { articleSchema } from '@/utils/seo';

export async function generateMetadata({params}) {
    const post = await getPostBySlug(params.slug);
    return {
        title: post.title.rendered + ' - BeritaKini',
        description: post.excerpt.rendered.replace(/<[^>]*>/g,'').substring(0,160),
        openGraph: { title: post.title.rendered, images: [post._embedded['wp:featuredmedia']?.[0]?.source_url] },
        twitter: { card: 'summary_large_image' }
    };
}

export default async function ArticlePage({params}) {
    const post = await getPostBySlug(params.slug);
    return (
        <article>
            <h1 dangerouslySetInnerHTML={{__html:post.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html:post.content.rendered}} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema(post))}} />
        </article>
    );
}
