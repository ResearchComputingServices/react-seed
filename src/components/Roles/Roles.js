import React from 'react';
import { Layout } from '..';
import EnumerationsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Roles() {
    const rights = {
        create: [],
        export: [],
        import: [],
        read: [],
    };
    const actions = useGridActions('roles');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout my={4}>
            <EnumerationsGrid {...buttons} />
        </Layout>
    );
}
