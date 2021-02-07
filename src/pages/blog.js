import React from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Content = styled.div`
    margin: 0 auto;
    max-width: 860px;
    padding: 1.45rem 1.0875rem;
`;

const ArticleDate = styled.h5`
    display: inline;
    color: #606060;
`;

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.3rem auto;
    > a {
        background-color: rgba(139, 183, 245, 0.5);
        text-decoration: none;
        padding: 0 1rem;
        border-radius: 1rem;
    }
    > a:not(:last-child) {
        margin-right: 0.5rem;
    }
`;

const StyledLink = styled(Link)`
    :hover {
        color: #8bb7f5;
    }
`;

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <SEO title="Blog" />
            <Content>
                {data.allMarkdownRemark.edges
                    .filter(({ node }) => {
                        const rawDate = node.frontmatter.rawDate;
                        const date = new Date(rawDate);
                        return date < new Date();
                    })
                    .map(({ node }) => {
                        console.log("node >>>>", node);
                        return (
                            <div key={node.id}>
                                <StyledLink
                                    to={node.frontmatter.path}
                                    css={css`
                                        text-decoration: none;
                                        color: inherit;
                                    `}
                                >
                                    <h2>{node.frontmatter.title}</h2>
                                </StyledLink>
                                <div>
                                    <ArticleDate>
                                        {node.frontmatter.date}
                                    </ArticleDate>
                                    <Tags>
                                        {node.frontmatter.tags.map(
                                            (item, idx) => (
                                                <a key={idx}>{`${item}`}</a>
                                            )
                                        )}
                                    </Tags>
                                </div>
                                <p>{node.excerpt}</p>
                            </div>
                        );
                    })}
            </Content>
        </Layout>
    );
};

export default IndexPage;

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { draft: { eq: false } } }
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "YYYY년 MM월 DD일")
                        rawDate: date
                        path
                        tags
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`;
