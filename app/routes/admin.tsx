import { Outlet, Link, useLoaderData } from '@remix-run/react';
import { getPosts } from '~/post';
import type { PostWithHTML } from '~/post';
import adminStyles from '~/styles/admin.css';

export const loader = () => {
  return getPosts();
};

export const links = () => {
  return [{ rel: 'stylesheet', href: adminStyles }];
};

export default function Admin() {
  const posts = useLoaderData<PostWithHTML[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
