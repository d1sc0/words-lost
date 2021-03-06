import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

const BlogPage = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const posts = data.posts.edges

  return (
    <Layout>
      <SEO
        title="Blog"
        description="Posts, stories, thoughts and reflections from Stuart Mackenzie"
      />
      <div className="row py-5 justify-content-md-center mx-4">
        <div className="col col-md-8 pb-5">
          <h2 className="list-post-title">&frasl;&frasl; Blog Posts</h2>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article key={node.frontmatter.slug} className="post-summary">
                <div className="row">
                  <div className="col-sm-8">
                    <h3>
                      <Link
                        className="highlight"
                        to={`/blog/${node.frontmatter.slug}`}
                      >
                        {title}
                      </Link>
                    </h3>
                  </div>
                  <div className="col-sm text-sm-right">
                    <small className="list-post-date">
                      {node.frontmatter.date}
                    </small>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p
                      className="post-excerpt"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </div>
                </div>
              </article>
            )
          })}
          <div className="post-nav">
            <div className="row">
              {!isFirst && (
                <div className="col">
                  <Link to={`/blog/${prevPage}`} rel="prev">
                    &lt;&lt; Previous Page
                  </Link>
                </div>
              )}
              {!isLast && (
                <div className="col text-right">
                  <Link to={`/blog/${nextPage}`} rel="next">
                    Next Page &gt;&gt;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
            description
          }
        }
      }
    }
  }
`

export default BlogPage
