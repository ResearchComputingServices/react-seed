import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DownloadIcon from '@material-ui/icons/GetApp';
import UploadIcon from '@material-ui/icons/Publish';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { FileUploader, Button, Grid } from '..';

export const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
        maxWidth: '100%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    filterApplied: {
        borderColor: '#1b8a16',
        color: '#1b8a16',
    },
}));

function AdministratorGrid({
    className,
    style,
    title,
    onRowClick,
    onCreate,
    onImport,
    onExport,
    onFilter,
    entity,
    options,
    fetch,
    importFileTypes,
    tableRef: tableRefProp,
    filterApplied,
}) {
    const classes = useStyles();
    const fileMappings = {
        xlsx: [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        txt: [
            'text/plain',
        ],
    };
    const tableRef = tableRefProp || React.createRef(null);
    return (
        <Box
            className={clsx(classes.root, className)}
            style={style}
        >
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box
                    display='flex'
                    pb={2}
                >
                    {_.isFunction(onCreate)
                    && (
                        <Box mr={1}>
                            <Button
                                color='primary'
                                onClick={onCreate}
                                variant='contained'
                            >
                                Create
                            </Button>
                        </Box>
                    )}
                    {_.isFunction(onImport)
                    && (
                        <FileUploader
                            acceptedFiles={_.reduce(
                                importFileTypes,
                                (accumulator, acceptedFileType) => accumulator.concat(fileMappings[acceptedFileType] || []), [],
                            )}
                            as={({ handleOpen }) => (
                                <Box mr={1}>
                                    <Button
                                        color='primary'
                                        onClick={handleOpen}
                                        startIcon={<UploadIcon />}
                                        variant='contained'
                                    >
                                        Import
                                    </Button>
                                </Box>
                            )}
                            onUpload={async (...args) => {
                                await onImport(...args);
                                tableRef.current && tableRef.current.onQueryChange();
                            }}
                        />
                    )}
                    {_.isFunction(onExport)
                    && (
                        <Box mr={1}>
                            <Button
                                color='primary'
                                onClick={onExport}
                                startIcon={<DownloadIcon />}
                                variant='contained'
                            >
                                Export
                            </Button>
                        </Box>
                    )}
                </Box>
                {_.isFunction(onFilter) && (
                    <Button
                        className={clsx({ 'administrator-grids-applied-filter': filterApplied })}
                        color='primary'
                        onClick={onFilter}
                        startIcon={<FilterListIcon />}
                        variant='outlined'
                    >
                        {`${filterApplied ? 'Change' : 'Apply'} Filter`}
                    </Button>
                )}
            </Box>
            <Grid
                entity={entity}
                fetch={fetch}
                onRowClick={onRowClick}
                options={options}
                tableRef={tableRef}
                title={title}
            />
        </Box>
    );
}

AdministratorGrid.propTypes = {
    entity: PropTypes.string.isRequired,
    title: PropTypes.string,
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onImport: PropTypes.func,
    onExport: PropTypes.func,
    onFilter: PropTypes.func,
    options: PropTypes.object,
    importFileTypes: PropTypes.array,
    fetch: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    filterApplied: PropTypes.bool,
    tableRef: PropTypes.object,
};

AdministratorGrid.defaultProps = {
    title: '',
    onRowClick: undefined,
    onCreate: undefined,
    onImport: undefined,
    onExport: undefined,
    onFilter: undefined,
    filterApplied: false,
    fetch: undefined,
    importFileTypes: ['xlsx'],
    options: {},
    style: undefined,
    className: '',
    tableRef: undefined,
};

export default AdministratorGrid;
