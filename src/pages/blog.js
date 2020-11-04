import React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const GQLQUERY = graphql `
query  {
  allContentfulBlogPost(sort: {fields: pdate, order: DESC}) {
    edges {
      node {
        id
        title
        slug
        pdate
        image {
          fluid {
            src
          }
        }
        excerpt {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  }
}

`;

const SecondPage = () =>{
  const data = useStaticQuery(GQLQUERY)
  
  return (
  <Layout>
    <SEO title="Blog" />
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
    <ul className="post">
      {data.allContentfulBlogPost.edges.map((edge)=>{
        return (
          <li className="post" key={edge.node.id}>
            <h2>
              <Link to={`/blog/${edge.node.slug}/` }>{edge.node.title}</Link>
            </h2>
            <div className="meta">
              <span>Posted on : {edge.node.pDate}</span>
            </div>
            {edge.node.image && (
              <Img
                className="featured"
                fluid={edge.node.image.fluid}
                alt={edge.node.title}/>
            )}
            <p className="excerpt">{edge.node.excerpt.childMarkdownRemark.excerpt}</p>
            <button className="button">
              <Link to={`/blog/${edge.node.slug}/`}>Read More...</Link>
            </button>
          </li>
        )
      })}
    </ul>
  </Layout>
)
  }
export default SecondPage
