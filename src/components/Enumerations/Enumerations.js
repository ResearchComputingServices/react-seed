import React from 'react';
import { Layout } from '..';
import EnumerationsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Enumerations() {
    const rights = {
        create: '*',
        export: '*',
        import: '*',
    };
    const actions = useGridActions('enumerations');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout my={4}>
            <EnumerationsGrid {...buttons} />
        </Layout>
    );
}
