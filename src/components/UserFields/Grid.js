import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '..';

function userFieldsGrid({
    onCreate,
    onExport,
    onRowClick,
}) {
    const format = item => {
        item.userFieldType = _.get(item, 'userFieldType.name');
        return item;
    };
    return (
        <AdministratorGrid
            entity='userFields'
            onCreate={onCreate}
            onExport={onExport}
            onRowClick={onRowClick}
            options={{ format }}
            title='User Fields'
        />
    );
}

userFieldsGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onRowClick: PropTypes.func,
};

userFieldsGrid.defaultProps = {
    onCreate: undefined,
    onExport: undefined,
    onRowClick: undefined,
};

export default userFieldsGrid;
