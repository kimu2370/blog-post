import React from "react";

import LandingBio from "../components/landing-bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import theme from "../components/theme";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <LandingBio theme={theme} />
    </Layout>
);

export default IndexPage;
