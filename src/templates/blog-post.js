import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  React.useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("charset", "utf-8");
      document.head.appendChild(script);
    }
  }, [post.html]);

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
        style={{
          maxWidth: '650px',
          margin: '0 auto',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: '#1a1a1a'
        }}
      >
        <header>
          <h1 
            itemProp="headline"
            style={{
              fontSize: '1.8rem',
              fontWeight: 'normal',
              marginBottom: '0.5rem',
              color: '#000'
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#444',
            marginBottom: '2rem' 
          }}>
            {post.frontmatter.date}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          style={{
            '& p': {
              marginBottom: '1.5rem'
            },
            '& h2': {
              fontSize: '1.4rem',
              fontWeight: 'normal',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            '& h3': {
              fontSize: '1.2rem',
              fontWeight: 'normal',
              marginTop: '1.5rem',
              marginBottom: '1rem'
            }
          }}
        />
        <hr style={{ 
          margin: '2rem 0',
          border: 'none',
          borderTop: '1px solid #ddd'
        }} />
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            maxWidth: '650px',
            margin: '2rem auto',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.9rem'
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
