import React from 'react';
import { Layout } from './components/Layout';
import { AuthPanel } from './components/AuthPanel';
import { SeoContent } from './components/SeoContent';

const App: React.FC = () => {
    return (
        <Layout current="auth">
            <AuthPanel />
            <SeoContent page="auth" />
        </Layout>
    );
};

export default App;
