import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { FormContainer, Button } from '..';
import Form, { useStyles as useFormStyles } from '../Form';
import SetTemporaryPasswordModal from './SetTemporaryPasswordModal';
import { ApiPicklistField } from '../Form/fields';

function UserForm({
    title,
    data,
    layout,
    dynamicLayout,
    dynamicData,
    onAddDemographicField,
    disableAddDemographicField,
    selectedDemographicFieldsFilter,
    buttons,
    controls,
    onSetTemporaryPassword,
}) {
    const formClasses = useFormStyles();
    const configureSections = () => {
        const sections = [
            {
                layout: dynamicLayout,
                data: dynamicData,
                append: (
                    <>
                        {!_.isNil(data.id) && (
                            <SetTemporaryPasswordModal
                                className={formClasses.field}
                                onSetTemporaryPassword={onSetTemporaryPassword}
                            />
                        )}
                        <Box
                            alignItems='center'
                            display='flex'
                            justifyContent='flex-end'
                        >
                            <Box width={380}>
                                <ApiPicklistField
                                    controls={controls}
                                    field={{
                                        name: 'selectedDemographicField',
                                        label: 'User Fields',
                                        type: 'api-picklist-multiple',
                                        entity: 'userField',
                                        filter: selectedDemographicFieldsFilter,
                                    }}
                                />
                                <Box
                                    mr={2}
                                    mt={1}
                                >
                                    <Button
                                        color='primary'
                                        disabled={disableAddDemographicField}
                                        onClick={onAddDemographicField}
                                        size='small'
                                        variant='contained'
                                    >
                                        Add Demographic Field
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </>
                ),
            },
        ];
        return sections;
    };
    return (
        <FormContainer title={title}>
            <Form
                buttons={buttons}
                controls={controls}
                data={data}
                layout={layout}
                sections={configureSections()}
            />
        </FormContainer>
    );
}

UserForm.propTypes = {
    title: PropTypes.string,
    onSetTemporaryPassword: PropTypes.func,
    data: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    dynamicData: PropTypes.object.isRequired,
    dynamicLayout: PropTypes.array.isRequired,
    onAddDemographicField: PropTypes.func.isRequired,
    selectedDemographicFieldsFilter: PropTypes.func.isRequired,
    disableAddDemographicField: PropTypes.bool.isRequired,
    buttons: PropTypes.array,
    controls: PropTypes.object.isRequired,
};

UserForm.defaultProps = {
    title: 'User',
    buttons: [],
    onSetTemporaryPassword: undefined,
};

export default UserForm;
