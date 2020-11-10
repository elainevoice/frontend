import React from 'react';

import { Route, RouteProps } from 'react-router-dom';

interface RouteModuleProps extends RouteProps {
    layout: React.ComponentType
}

const RouteModule = ({layout: Layout, path, component, ...rest}: RouteModuleProps) => (
    <Layout>
        <Route path={path} component={component} {...rest}></Route>
    </Layout>
);

export default RouteModule;