import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';
import { getPost, Post } from '~/post';
import styles from '~/styles/posts/$slug.css';
import hljs from 'highlight.js';
import { useEffect } from 'react';
// import highligtStyle from 'highlight.js/styles/base16/dracula.css';
import highligtStyle from '~/styles/highlight-dracula.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: highligtStyle,
    },
  ];
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug');

  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<Post>();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      {post.image && (
        <div
          className="post__image"
          style={{
            backgroundImage: `url(${post.image})`,
          }}
        >
          {post.imageCredit && (
            <span
              className="post__image-credit"
              dangerouslySetInnerHTML={{ __html: post.imageCredit }}
            />
          )}
        </div>
      )}

      <div className="post">
        <h1>{post.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </>
  );
}
