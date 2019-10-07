import React, { useState, useEffect, Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// React Router dom
// import { useHistory } from 'react-router-dom';
// Devextreme
import Form, { Item, RequiredRule, Label, ButtonItem } from 'devextreme-react/form';
// Actons
import { saveClientAction } from '../actions/ClientsAction';

const NewClient = ({ history }) => {

    const dispatch = useDispatch('');
    const setClient = (client) => dispatch(saveClientAction(client));

    // const history = useHistory();

    // State
    const [client, saveClient] = useState({});
    const { isSuccessfull } = useSelector(state => state.clients);
    // Mask Rule
    const rules = { 'X': /[02-9]/ };
    // Buttons options
    const buttonOptions = {
        text: 'Register',
        type: 'success',
        useSubmitBehavior: true
    };

    // get data from store
    const error = useSelector((state) => state.clients.error);

    // event for Set Fullname 
    const onFieldDataChanged = (e) => {
        if (e.value === undefined || e.value === null) {
            return;
        }

        let fName = '';
        if (e.dataField === 'firstName') {
            fName = e.value;
            if (client.secondName !== undefined) { fName = fName + ' ' + client.secondName; }
            if (client.firstLastName !== undefined) { fName = fName + ' ' + client.firstLastName; }
            if (client.secondLastName !== undefined) { fName = fName + ' ' + client.secondLastName; }

            saveClient({ ...client, fullName: fName });
        }
        if (e.dataField === 'secondName') {
            if (client.firstName !== undefined) { fName = fName + ' ' + client.firstName; }
            if (fName === '') { fName = e.value; } else { fName = fName + ' ' + e.value; }
            if (client.firstLastName !== undefined) { fName = fName + ' ' + client.firstLastName; }
            if (client.secondLastName !== undefined) { fName = fName + ' ' + client.secondLastName; }

            saveClient({ ...client, fullName: fName });
        }
        if (e.dataField === 'firstLastName') {
            if (client.firstName !== undefined) { fName = fName + ' ' + client.firstName; }
            if (client.secondName !== undefined) { fName = fName + ' ' + client.secondName; }
            if (fName === '') { fName = e.value; } else { fName = fName + ' ' + e.value; }
            if (client.secondLastName !== undefined) { fName = fName + ' ' + client.secondLastName; }

            saveClient({ ...client, fullName: fName });
        }
        if (e.dataField === 'secondLastName') {
            if (client.firstName !== undefined) { fName = fName + ' ' + client.firstName; }
            if (client.secondName !== undefined) { fName = fName + ' ' + client.secondName; }
            if (client.firstLastName !== undefined) { fName = fName + ' ' + client.firstLastName; }
            if (fName === '') { fName = e.value; } else { fName = fName + ' ' + e.value; }

            saveClient({ ...client, fullName: fName });
        }
    }
    
    // event form for save
    const onFormSubmit = (e) => {
        e.preventDefault();

        setClient(client);
    }

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
                            id={'NewClient'}
                            formData={client}
                            colCount={2}
                            labelLocation={'top'}
                            onFieldDataChanged={onFieldDataChanged}
                        >
                            <ButtonItem horizontalAlignment={'center'} colSpan={2} buttonOptions={buttonOptions} />

                            <Item dataField={'nit'} caption={'Nit'} colSpan={2}>
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
                            <Item dataField={'fullName'} caption={'Full Name'} colSpan={2} editorOptions={{ readOnly: true }} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataFiled={'birthDate'} editorType={'dxDateBox'} editorOptions={{ width: '100%' }} >
                                <Label text={'Date of birth'} />
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'address'} caption={'Address'} colSpan={2} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'phone'} caption={'Phone'} editorOptions={{ mask: '+000 (X00) 000-0000', maskRules: rules }} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'city'} caption={'City'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'state'} caption={'State'} >
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

export default NewClient;