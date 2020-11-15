import React from "react";
import Link from "next/link";
import Helmet from 'react-helmet';
import { metas, links, htmlAttributes, baseUrl } from '../../seo/meta';

function IndexPage(props) {

  const pageMetas = () => {
    const meta = [
      {
        property: 'og:description',
        content: `jarf.me | Joshua King's Blog - My personal place to talk about tech.}`,
      },
      {
        name: 'description',
        content: `jarf.me | Joshua King's Blog - My personal place to talk about tech.`,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${baseUrl}/images/profilepic.jpg` },
      {
        property: 'og:url',
        content: `${baseUrl}/blog/main`,
      },
      { property: 'og:title', content: `jarf.me | Joshua King's Blog` },
    ];
    meta.concat(metas);
    return meta;
  };
  
  const pageLinks = () => {
    const link = [{ rel: 'canonical', href: `${baseUrl}/blog/main` }];
    link.concat(links);
    return link;
  }

  return (
    <div>
      <h1>Rambling on tech</h1>
      <ul>
        {props.blogs.map((blog, idx) => {
          return (
            <div>
              <Helmet
                { ...htmlAttributes }
                title="jarf.me | Joshua King's Blog"
                meta={pageMetas()}
                link={pageLinks()}
              />
              <li key={blog.id}>
                <Link href={`/blog/${blog.slug}`}>
                  <a>{blog.title}</a>
                </Link>
                <div dangerouslySetInnerHTML={{__html: blog.content }}/>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/blog-content`, "utf-8");

  const blogs = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/blog-content/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data, content } = matter(rawContent);

      return { ...data, content, id: uuid() };
    });

  return {
    props: { blogs },
  };
}

export default IndexPage;