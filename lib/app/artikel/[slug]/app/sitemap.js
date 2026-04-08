import { getPosts } from '@/lib/wp-api';

export default async function sitemap() {
    const {posts} = await getPosts({perPage:100});
    return posts.map(p => ({
        url: `https://beritakini.id/artikel/${p.slug}`,
        lastModified: new Date(p.modified),
        changeFrequency: 'daily',
        priority: p.categories?.includes(1) ? 0.9 : 0.7
    }));
}
