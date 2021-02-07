import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Content = styled.div`
    margin: 0 auto;
    max-width: 860px;
    padding: 1.45rem 1.0875rem;
`;

const HeaderDate = styled.h3`
    margin-top: 10px;
    color: #606060;
`;

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkdownContent = styled.div`
    a {
        color: black;
        margin-left: 15px;
        text-decoration: none;
        display: inline-block;
        position: relative;

        ::after {
            content: "";
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #8bb7f5;
            transform-origin: bottom right;
            transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }

        :hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }

    a > code:hover {
        text-decoration: underline;
    }
`;

export default ({ data }) => {
    const post = data.markdownRemark;
    return (
        <Layout>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <Content>
                <h1>{post.frontmatter.title}</h1>
                <HeaderDate>{post.frontmatter.date}</HeaderDate>
                <MarkdownContent
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </Content>
        </Layout>
    );
};

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            excerpt(pruneLength: 160)
            frontmatter {
                date(formatString: "YYYY년 MM월 DD일")
                path
                title
            }
        }
    }
`;
