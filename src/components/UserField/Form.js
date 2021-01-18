import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '..';
import Form from '../Form';

function UserFieldForm({
    title,
    data,
    layout,
    buttons,
    controls,
}) {
    return (
        <FormContainer title={title}>
            <Form
                buttons={buttons}
                controls={controls}
                data={data}
                layout={layout}
            />
        </FormContainer>
    );
}

UserFieldForm.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
    layout: PropTypes.array.isRequired,
    controls: PropTypes.object.isRequired,
    buttons: PropTypes.array,
};

UserFieldForm.defaultProps = {
    title: 'User Field',
    data: {},
    buttons: [],
};

export default UserFieldForm;
