import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes.filter(post => 
    !post.fields.slug.includes('internal')
  )

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ 
        listStyle: `none`,
        maxWidth: '650px',
        margin: '0 auto'
      }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: '#1a1a1a',
                  marginBottom: '2rem'
                }}
              >
                <header>
                  <h2 style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: '1.8rem',
                    fontWeight: 'normal',
                    marginBottom: '0.5rem',
                    color: '#000'
                  }}>
                    <Link 
                      to={post.fields.slug} 
                      itemProp="url"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={e => e.target.style.color = '#666'}
                      onMouseLeave={e => e.target.style.color = '#000'}
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small style={{ 
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: '0.9rem', 
                    color: '#444',
                    marginBottom: '2rem',
                    display: 'block'
                  }}>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                    style={{
                      fontFamily: '"Courier New", Courier, monospace',
                      marginBottom: '1.5rem'
                    }}
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { 
        fileAbsolutePath: { 
          regex: "/content/blog/"
        } 
      }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
