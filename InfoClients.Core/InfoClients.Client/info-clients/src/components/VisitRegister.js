import React, { useEffect, useState, Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { saveVisitAction } from '../actions/VisitsAction';
// Devextreme
import Form, { Item, RequiredRule, Label, ButtonItem } from 'devextreme-react/form';
import 'devextreme-react/text-area';

const VisitRegister = ({ match, history }) => {

    const { nit } = match.params;

    const dispatch = useDispatch();
    const saveVisit = dispatch(saveVisitAction(visit));

    // State
    const { isSuccessfull, error } = useSelector(state => state.clients);
    const [visit, setVisit] = useState({});

    // Buttons options
    const buttonOptions = {
        text: 'Register Visit',
        type: 'success',
        useSubmitBehavior: true
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        saveVisit(visit);
    }

    useEffect(() => {
        setVisit({...visit, nit : nit});
    }, [nit]);

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
                            formData={visit}
                            colCount={2}
                            labelLocation={'top'}
                        // onFieldDataChanged={onFieldDataChanged}
                        >
                            <ButtonItem horizontalAlignment={'center'} colSpan={2} buttonOptions={buttonOptions} />

                            <Item dataField={'nit'} caption={'Nit'} colSpan={2} editorOptions={{ readOnly: true }}>
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'salesRepresentative'} caption={'Sales Representative'} colSpan={2}>
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataFiled={'visitDate'} editorType={'dxDateBox'} editorOptions={{ width: '100%' }}>
                                <Label text={'Visit Date'} />
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'net'} caption={'Net'} editorType={'dxNumberBox'} >
                                <RequiredRule message={'Requerido'} />
                            </Item>
                            <Item dataField={'description'} caption={'Description'} editorType={'dxTextArea'}  colSpan={2}>
                                <RequiredRule message={'Requerido'} />
                            </Item>
                        </Form>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default VisitRegister;