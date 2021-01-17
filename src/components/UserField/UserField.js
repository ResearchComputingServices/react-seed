import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout, NotFound } from '..';
import Form from './Form';
import {
    useForm,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';

function UserField({ match }) {
    const rights = {
        create: '*',
        update: '*',
        delete: '*',
        export: '*',
    };

    const entity = 'userField';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);

    const {
        data,
        loading,
        error,
        setData,
    } = useFormData(entity, id);

    const actions = useFormActions(entity, 'demographic questionnaire field');

    const buttons = useFormButtons(id, {
        ...actions,
        create: async data => {
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
            }
        },
        update: async data => {
            const result = await actions.update(data);
            if (!_.isNil(result)) {
                setData(result);
            }
        },
    }, rights, data.immutable, data.unremovable);

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Demographic Field`}
                />
            ));

    return (
        <Layout
            error={error}
            loading={loading}
            unmountOnLoad
        >
            {getForm(id)}
        </Layout>
    );
}

UserField.propTypes = { match: PropTypes.object.isRequired };

export default UserField;
