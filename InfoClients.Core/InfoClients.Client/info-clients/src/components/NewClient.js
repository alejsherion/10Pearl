import React, { useState, useEffect, Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// React Router dom
// import { useHistory } from 'react-router-dom';
// Devextreme
import Form, { SimpleItem, RequiredRule, Label, ButtonItem } from 'devextreme-react/form';
// Actons
import { saveClientAction } from '../actions/ClientsAction';

const NewClient = ({ history }) => {

    const dispatch = useDispatch('');
    const setClient = (client) => dispatch(saveClientAction(client));

    // State
    const [client, saveClient] = useState({});
    // const client = {};
    const { isSuccessfull, error } = useSelector(state => state.clients);
    
    // Mask Rule
    const rules = { 'X': /[02-9]/ };
    // Buttons options
    const buttonOptions = {
        text: 'Register',
        type: 'success',

        onClick: e => {
            if (!e.validationGroup.validate().isValid){
                return;
            }

            setClient(client);
        }
    };

    const dateOptions = {
        dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
        width: '100%'
    };
    
    const editorOptionsPrice = {
        format: '$ #,##0.##'
    };

    const editorOptionsPercentage = {
        min: 1,
        max: 100,
        format: '#0 %'
    }

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

            //saveClient({ ...client, fullName: fName });
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
                        id={'NewClient'}
                        formData={client}
                        colCount={2}
                        labelLocation={'top'}
                        onFieldDataChanged={onFieldDataChanged}
                    >
                        <ButtonItem horizontalAlignment={'center'} buttonOptions={buttonOptions} colSpan={2} />

                        <SimpleItem dataField={'nit'} caption={'Nit'} colSpan={2}>
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
                        <SimpleItem dataField={'fullName'} caption={'Full Name'} colSpan={2} editorOptions={{ readOnly: true }} />
                        <SimpleItem dataField={'birthDate'} editorType={'dxDateBox'} editorOptions={dateOptions} >
                            <Label text={'Date of birth'} />
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'address'} caption={'Address'} colSpan={2} />
                        <SimpleItem dataField={'phone'} caption={'Phone'} editorOptions={{ mask: '+00 (X00) 000-0000', maskRules: rules }} />
                        <SimpleItem dataField={'city'} caption={'City'} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'state'} caption={'State'} />
                        <SimpleItem dataField={'country'} caption={'Country'} />
                        <SimpleItem dataField={'creditLimit'} caption={'Credit Limit'} editorType={'dxNumberBox'} editorOptions={editorOptionsPrice}>
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'visitPercentage'} caption={'Visit Percentage'} editorType={'dxNumberBox'} editorOptions={editorOptionsPercentage}>
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>

                    </Form>
                </div>
            </div>
        </Fragment>
    );
}

export default NewClient;