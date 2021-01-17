import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { FormContainer } from '..';
import Form from '../Form';

const enumerationValuesTableStyle = {
    width: '98%',
    minWidth: 450,
    padding: 20,
};
function EnumerationForm({
    title,
    data,
    layout,
    values,
    onValueAdd,
    onValueUpdate,
    onValueDelete,
    buttons,
    controls,
}) {
    return (
        <FormContainer title={title} >
            <Form
                buttons={buttons}
                controls={controls}
                data={data}
                layout={layout}
                sections={[{
                    layout: [{
                        type: 'raw',
                        content: (
                            <Box
                                alignItems='center'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                my='5'
                            >
                                <MaterialTable
                                    columns={[{ field: 'text' }]}
                                    data={values}
                                    editable={{
                                        onRowAdd: onValueAdd,
                                        onRowUpdate: onValueUpdate,
                                        onRowDelete: onValueDelete,
                                    }}
                                    icons={{
                                        Add: props => (
                                            <Add
                                                {...props}
                                                color='primary'
                                            />
                                        ),
                                    }}
                                    localization={{
                                        body: {
                                            addTooltip: 'Add Enumeration Value',
                                            editRow: { deleteText: 'Are you sure?' },
                                        },
                                    }}
                                    style={enumerationValuesTableStyle}
                                    title='Enumeration Values'
                                />
                            </Box>
                        ),
                    }],
                }]}
            />
        </FormContainer>
    );
}

EnumerationForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    values: PropTypes.array,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
    onValueAdd: PropTypes.func,
    onValueUpdate: PropTypes.func,
    onValueDelete: PropTypes.func,
};

EnumerationForm.defaultProps = {
    title: 'Enumeration Question',
    data: {},
    values: [],
    buttons: [],
    onValueAdd: undefined,
    onValueUpdate: undefined,
    onValueDelete: undefined,
};

export default EnumerationForm;
