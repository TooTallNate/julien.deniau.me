import { LoaderFunction } from 'remix';
import { getPosts } from '~/post';
import type { Post } from '~/post';

function createRssItem(post: Post): string {
  const link = `https://julien.deniau.me/posts/${post.slug}`;

  return `<item>
  <title>${post.title}</title>
  <link>${link}</link>
  <guid>${link}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  ${post.emphasis ? `<description>${post.emphasis}</description>` : ''}
  ${
    post.image
      ? `<image>
    <url>https://julien.deniau.me${post.image}</url>
    <title>${post.title}</title>
    <link>${link}</link>
  </image>`
      : ``
  }
</item>`;
}

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await getPosts();

  const rss = `<?xml version="1.0" encoding="utf-8"?>
    <rss
      version="2.0"
      xml:base="https://julien.deniau.me/"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xml:lang="fr-fr"
    >
      <channel>
        <link>https://julien.deniau.me/</link>
        <title>Julien Deniau's blog</title>
        <description>All my blog posts</description>
        ${posts.map(createRssItem)}
      </channel>
    </rss>
  `;

  return new Response(rss, {
    status: 200,
    headers: {
      // 'Content-Type': 'application/rss+xml',
      'Content-Type': 'application/xhtml+xml',
    },
  });
};
