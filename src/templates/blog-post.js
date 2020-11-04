import React from 'react'
import { graphql,Link } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from '../components/layout'
import Img from 'gatsby-image'
import SEO from '../components/seo'

export const query = graphql
    `
    query($slug: String!) {
        contentfulBlogPost(slug: { eq: $slug }) {
          title
          pdate(formatString: "Do MMMM, YYYY")
          image {
            fluid(maxWidth: 750) {
              ...GatsbyContentfulFluid
            }
          }
          body {
            json
          }
        }
      }
    `;
const BlogPost = (props) => 
{
    const options = {
        renderNode: {
          "embedded-asset-block": node => {
            const alt = node.data.target.fields.title["en-US"]
            const url = node.data.target.fields.file["en-US"].url
            return <img alt={alt} src={url} />
          },
        },
      }
    return (
       <Layout>
           <SEO title={props.data.contentfulBlogPost.title}/>
           <Link to="/blog">Visit the Blog Page</Link>
           <div className="content">
               <h1>{props.data.contentfulBlogPost.title}</h1>
               <span className="meta">Posted on: {props.data.contentfulBlogPost.pdate}</span>
               {props.data.contentfulBlogPost.image && (
                   <Img 
                        className="featured"
                        fluid={props.data.contentfulBlogPost.image.fluid}
                        title={props.data.contentfulBlogPost.title}
                        />
               )}
               {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
           </div>
       </Layout>
    )
}

export default BlogPost
