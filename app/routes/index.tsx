import { Link, LoaderFunction, useLoaderData } from 'remix';
import { getPosts, Post } from '~/post';

type Talk = {
  title: string;
  description?: string;
  url: string;
  urlText: string;
  secondaryUrl?: string;
  secondaryUrlText?: string;
  image?: string;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return {
    posts,
    talks: [
      {
        title: 'Les libs js, watch-module, les dependances et le reste',
        // description: 'A personal website',
        url: '/js-lib-watch-module-dependencies/',
        urlText: 'Slides',
      },
      {
        title: 'TypeScript',
        url: '/typescript/',
        urlText: 'Slides',
        image: '/images/typescript.png',
      },
      {
        title: 'Nouveautés de ReactJS 2019-2020',
        url: '/react-2019-2020/',
        urlText: 'Slides',
        image: '/images/react-2019-2020.png',
      },
      {
        title: "Explorez votre code avec de l'analyse statique",
        description: 'Explore your code with static analysis',
        url: '/phpstan',
        urlText: 'Français',
        image: '/images/phpstan.png',
        secondaryUrl: '/phpstan/?lang=en',
        secondaryUrlText: 'English',
      },
      {
        title: 'Git for (semi-)humans (in french)',
        image: '/images/git-t-shirt-293.png',
        url: 'https://www.youtube.com/watch?v=0TseOakTXIA',
        urlText: 'Vidéo',
        secondaryUrl:
          'https://docs.google.com/presentation/d/1W0ihaS0Mwi7SUzzK016rkYgZ6pTahABA8fsfdU9nLnQ/pub?start=false&loop=false&delayms=3000&slide=id.p',
        secondaryUrlText: 'Slides',
      },
      {
        title: "Retour d'expérience sur un an avec Elasticsearch",
        image: '/images/mapado-elasticsearch.jpeg',
        url: '/retour-es/',
        urlText: 'Slides',
      },
      {
        title: 'Développeurs, améliorez votre UX !',
        image: '/images/ux-discussion.jpg',
        url: '/dev-ux/',
        urlText: 'Slides',
      },
    ],
  };
};

export default function Index() {
  const { talks, posts } = useLoaderData<{ talks: Talk[]; posts: Post[] }>();

  return (
    <>
      {/*  Intro */}
      <section id="intro" className="wrapper style1 fullscreen fade-up">
        <div className="inner">
          <h1>Hi! I'm Julien Deniau.</h1>
          <p>I am a french web developer and sometimes, I talk about things.</p>
          <ul className="actions">
            <li>
              <a href="#talks" className="button scrolly">
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/*  talks */}
      <section id="talks" className="wrapper style2 spotlights">
        {talks.map((talk: Talk) => (
          <section key={talk.url}>
            {talk.image && (
              <a href={talk.url ?? '#'} className="image">
                <img
                  src={talk.image}
                  alt=""
                  data-position="center center"
                  data-size="contain"
                  data-repeat="no-repeat"
                />
              </a>
            )}
            <div className="content">
              <div className="inner">
                <h2>{talk.title}</h2>
                {talk.description && <p>{talk.description}</p>}
                <ul className="actions">
                  <li>
                    <a href={talk.url} className="button">
                      {talk.urlText}
                    </a>
                  </li>
                  {talk.secondaryUrl && (
                    <li>
                      <a href={talk.secondaryUrl} className="button">
                        {talk.secondaryUrlText}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/*  blog */}
      <section id="blog" className="wrapper style3 fade-up">
        <div className="inner">
          <h2>My blog posts</h2>
          {/* <p>
              Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam
              turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus,
              lacus eget hendrerit bibendum, urna est aliquam sem, sit amet
              imperdiet est velit quis lorem.
            </p> */}
          <div className="features">
            {posts.map((post) => (
              <section key={post.slug}>
                {post.icon && (
                  // some example icons: code, lock, cog, desktop, link, gem, …
                  <span className={`icon solid major fa-${post.icon}`}></span>
                )}
                <h3>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.emphasis && <p>{post.emphasis}</p>}

                <Link to={`/posts/${post.slug}`} className="button">
                  Read post
                </Link>
              </section>
            ))}
          </div>
          <ul className="actions">
            <li>
              <a href="/posts/" className="button">
                See all blog posts
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/*  contact */}
      <section id="contact" className="wrapper style1 fade-up">
        <div className="inner">
          <h2>Get in touch</h2>
          <p>
            Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam
            turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus,
            lacus eget hendrerit bibendum, urna est aliquam sem, sit amet
            imperdiet est velit quis lorem.
          </p>
          <div className="split style1">
            <section>
              {/* <form method="post" action="#">
                  <div className="fields">
                    <div className="field half">
                      <label htmlFor="name">Name</label>
                      <input type="text" name="name" id="name" />
                    </div>
                    <div className="field half">
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                      <label htmlFor="message">Message</label>
                      <textarea name="message" id="message" rows={5}></textarea>
                    </div>
                  </div>
                  <ul className="actions">
                    <li>
                      <a href="" className="button submit">
                        Send Message
                      </a>
                    </li>
                  </ul>
                </form> */}
            </section>
            <section>
              <ul className="contact">
                {/* <li>
                    <h3>Address</h3>
                    <span>
                      12345 Somewhere Road #654
                      <br />
                      Nashville, TN 00000-0000
                      <br />
                      USA
                    </span>
                  </li>
                  <li>
                    <h3>Email</h3>
                    <a href="#">user@untitled.tld</a>
                  </li>
                  <li>
                    <h3>Phone</h3>
                    <span>(000) 000-0000</span>
                  </li> */}
                <li>
                  <h3>Social</h3>
                  <ul className="icons">
                    <li>
                      <a
                        href="https://twitter.com/j_deniau"
                        className="icon brands fa-twitter"
                      >
                        <span className="label">Twitter</span>
                      </a>
                    </li>
                    {/* <li>
                        <a href="#" className="icon brands fa-facebook-f">
                          <span className="label">Facebook</span>
                        </a>
                      </li> */}
                    <li>
                      <a
                        href="https://github.com/jdeniau"
                        className="icon brands fa-github"
                      >
                        <span className="label">GitHub</span>
                      </a>
                    </li>
                    {/* <li>
                        <a href="#" className="icon brands fa-instagram">
                          <span className="label">Instagram</span>
                        </a>
                      </li> */}
                    <li>
                      <a
                        href="https://www.linkedin.com/in/juliendeniau/"
                        className="icon brands fa-linkedin-in"
                      >
                        <span className="label">LinkedIn</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
