import React from 'react';
import { Layout } from '../components/Layout';
import { FakeEmailGenerator } from '../components/FakeEmailGenerator';
import { SeoContent } from '../components/SeoContent';

const EmailApp: React.FC = () => {
    return (
        <Layout current="email">
            <FakeEmailGenerator />
            <SeoContent page="email" />
        </Layout>
    );
};

export default EmailApp;
