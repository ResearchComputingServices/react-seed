import React from 'react';
import UserFieldTypesGrid from './Grid';
import { Layout } from '..';
import { useGridActions, useGridButtons } from '../../hooks';

export default function UserFieldTypes() {
    const rights = {
        create: '*',
        export: '*',
        import: '*',
    };
    const actions = useGridActions('userFieldTypes');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout my={4}>
            <UserFieldTypesGrid {...buttons} />
        </Layout>
    );
}
