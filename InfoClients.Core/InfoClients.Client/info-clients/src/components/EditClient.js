import React, { useEffect, Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getEditClientAction, editClientAction } from '../actions/ClientsAction';
// Devextreme
import Form, { SimpleItem, RequiredRule, Label, ButtonItem } from 'devextreme-react/form';

const EditClient = ({ match, history }) => {

    const { nit } = match.params;

    const dispatch = useDispatch();
    const editClient = (client) => dispatch(editClientAction(client));
    // State
    const { client, error, isSuccessfull } = useSelector(state => state.clients);

    // Mask Rule
    const rules = { 'X': /[02-9]/ };
    // Buttons options
    const buttonOptions = {
        text: 'Edit Client',
        type: 'success',
        onClick: e => {
            if (!e.validationGroup.validate().isValid) {
                return;
            }
            
            editClient(client);
        }
    };
    const dateOptions = {
        dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
        width: '100%'
    };

    useEffect(() => {
        dispatch(getEditClientAction(nit))
    }, [dispatch, nit])

    useEffect(() => {
        if (isSuccessfull) {
            //Redirect
            history.push('/');
        }
    }, [isSuccessfull]);

    return (
        <Fragment>
            {
                error ? <div className="font-weight-bold alert alert-danger text-center mt-4">{error.message}</div> : null
            }

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Form
                        id={'editClient'}
                        formData={client}
                        colCount={2}
                        labelLocation={'top'}
                    >
                        <ButtonItem horizontalAlignment={'center'} colSpan={2} buttonOptions={buttonOptions} />

                        <SimpleItem dataField={'nit'} caption={'Nit'} colSpan={2} editorOptions={{ readOnly: true }}>
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'firstName'} caption={'First Name'} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'secondName'} caption={'Second Name'} />
                        <SimpleItem dataField={'firstLastName'} caption={'First Last Name'} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'secondLastName'} caption={'Second Last Name'} />
                        <SimpleItem dataField={'birthDate'} editorType={'dxDateBox'} editorOptions={dateOptions} >
                            <Label text={'Date of birth'} />
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'address'} caption={'Address'}/>
                        <SimpleItem dataField={'phone'} caption={'Phone'} editorOptions={{ mask: '+00 (X00) 000-0000', maskRules: rules }} />
                        <SimpleItem dataField={'city'} caption={'City'} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'state'} caption={'State'}/>
                        <SimpleItem dataField={'country'} caption={'Country'} />
                        <SimpleItem dataField={'creditLimit'} caption={'Credit Limit'} editorType={'dxNumberBox'} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'visitPercentage'} caption={'Visit Percentage'} editorType={'dxNumberBox'} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>

                    </Form>
                </div>
            </div>
        </Fragment>
    );
}

export default EditClient;