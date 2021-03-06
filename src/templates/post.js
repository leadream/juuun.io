import React from "react"
import { Link, withPrefix, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import './post.styl'

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const cover = post.frontmatter.cover ? withPrefix(`heroes/${post.frontmatter.cover}`) : ''
    const bgImageStyle = cover ? {backgroundImage: `url(${cover})`} : {}
    const bgColor = post.frontmatter.color || '#333'
    const { demo, demoText } = post.frontmatter
    const hasDemo = !!demo
    const isLinkDemo = hasDemo ? demo.indexOf('http') > -1 : true
    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="layout-post">
          <div className="post-banner">
            <div
              className="banner-background"
              style={{backgroundColor: bgColor, ...bgImageStyle}}
            />
            <div className="banner-text">
              <div className="container">
                <h1>{post.frontmatter.title}</h1>
                <h4>{post.frontmatter.date}</h4>
              </div>
            </div>
          </div>
          <div className="container">
            {
              hasDemo &&
              <div className="post-demo">
                  <h3>
                    {
                      isLinkDemo ?
                      <a href={demo} target='_blank' rel="noopener noreferrer">
                        {demoText || demo}
                      </a> :
                      <img src={withPrefix(demo)} alt="demo"/>
                    }
                  </h3>
              </div>
            }
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            <ul className="post-footer">
              {
                previous &&
                <li className="footer-nav footer-nav-prev">
                  <span>上一篇：</span>
                  <Link to={previous.fields.slug} rel="prev">
                    {previous.frontmatter.title}
                  </Link>
                </li>
              }
              {
                next &&
                <li className="footer-nav footer-nav-next">
                  <span>下一篇：</span>
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title}
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
        color
        cover
        demo
        demoText
      }
    }
  }
`
