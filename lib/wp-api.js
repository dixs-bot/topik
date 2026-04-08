const WP_URL = 'https://situsanda.com/wp-json/wp/v2';

export async function getPosts({page=1, perPage=12, category, search}={}) {
    const params = new URLSearchParams({_embed:true, page, per_page:perPage});
    if(category) params.set('categories', category);
    if(search) params.set('search', search);
    const res = await fetch(`${WP_URL}/posts?${params}`, {next:{revalidate:300}});
    return { posts: await res.json(), total: res.headers.get('X-WP-Total') };
}

export async function getPostBySlug(slug) {
    const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`, {next:{revalidate:300}});
    const posts = await res.json();
    return posts[0] || null;
}

export async function getCategories() {
    const res = await fetch(`${WP_URL}/categories?per_page=50`);
    return res.json();
}
