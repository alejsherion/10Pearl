import React, { useEffect, Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getEditClientAction, editClientAction } from '../actions/ClientsAction';
// Devextreme
import Form, { Item, RequiredRule, Label, ButtonItem } from 'devextreme-react/form';

const EditClient = ({ match, history }) => {

    const { nit } = match.params;

    const dispatch = useDispatch();
    const editClient = (client) => dispatch(editClientAction(client));
    // State
    const { client, error } = useSelector(state => state.clients);
    const { isSuccessfull } = useSelector(state => state.clients);

    // Mask Rule
    const rules = { 'X': /[02-9]/ };
    // Buttons options
    const buttonOptions = {
        text: 'Edit Client',
        type: 'success',
        useSubmitBehavior: true
    };

    const onFormSubmit = (e) => {
        e.preventDefault()

        editClient(client);

        //Redirect
        history.push('/');
    }

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
                    <form action={'Save-Client'} onSubmit={onFormSubmit} >
                        <Form
                            id={'editClient'}
                            formData={client}
                            colCount={2}
                            labelLocation={'top'}
                        // onFieldDataChanged={onFieldDataChanged}
                        >
                            <ButtonItem horizontalAlignment={'center'} colSpan={2} buttonOptions={buttonOptions} />

                            <Item dataField={'nit'} caption={'Nit'} colSpan={2} editorOptions={{ readOnly: true }}>
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'firstName'} caption={'First Name'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'secondName'} caption={'Second Name'} />
                            <Item dataField={'firstLastName'} caption={'First Last Name'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'secondLastName'} caption={'Second Last Name'} />
                            {/* <Item dataField={'fullName'} caption={'Full Name'} colSpan={2} editorOptions={{ readOnly: true }}>
                                <RequiredRule message={'Requerido'} />
                            </Item> */}
                            <Item dataFiled={'birthDate'} editorType={'dxDateBox'} editorOptions={{ width: '100%' }}>
                                <Label text={'Date of birth'} />
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'address'} caption={'Address'} colSpan={2}>
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'phone'} caption={'Phone'} editorOptions={{ mask: '+000 (X00) 000-0000', maskRules: rules }} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'city'} caption={'City'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'state'} caption={'State'}>
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'country'} caption={'Country'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'creditLimit'} caption={'Credit Limit'} editorType={'dxNumberBox'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>

                        </Form>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default EditClient;