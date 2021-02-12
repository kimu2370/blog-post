import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const ripple = keyframes`
    from, 20%, 53%, 80%, to {
        transform: translateY(0);
    }

    40%, 43% {
        transform: translateY(-10px);
    }

    70% {
        transform: translateY(-5px);
    }

    90% {
        transform: translateY(-2px);
    }
`;

const Container = styled.div`
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
`;

const OuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: 78vh;
`;

const SubTitle = styled.p`
    padding: 0;
    margin-top: 1rem;
    font-size: 1.4rem;
`;

const NameHeader = styled.h1`
    font-size: 3.5rem;
    margin-bottom: 0;
`;

const Description = styled.p`
    margin-top: 3rem;
    animation: ${ripple} 1s ease infinite;
`;

const LandingBio = ({ theme }) => (
    <StaticQuery
        query={graphql`
            query LandingSiteTitleQuery {
                site {
                    siteMetadata {
                        title
                        subtitle
                        description
                    }
                }
            }
        `}
        render={(data) => (
            <OuterContainer>
                <Container theme={theme}>
                    <NameHeader>{data.site.siteMetadata.title}</NameHeader>
                    <SubTitle>{data.site.siteMetadata.subtitle}</SubTitle>
                    <Description>{`" ${data.site.siteMetadata.description} "`}</Description>
                </Container>
            </OuterContainer>
        )}
    />
);

NameHeader.propTypes = {
    siteTitle: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
};

NameHeader.defaultProps = {
    siteTitle: ``,
    subtitle: ``,
    description: ``,
};

export default LandingBio;
