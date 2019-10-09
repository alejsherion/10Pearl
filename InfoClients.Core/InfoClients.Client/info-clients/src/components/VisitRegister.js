import React, { useEffect, useState, Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { saveVisitAction, getVisitAction } from '../actions/VisitsAction';
import { getSalesRepresentativeAction } from '../actions/SalesRepresentativeAction';
// Devextreme
import Form, { SimpleItem, RequiredRule, Label, ButtonItem } from 'devextreme-react/form';
import DataGrid, {GroupPanel,Grouping, LoadPanel, SearchPanel, Column, Paging, Lookup} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';


const VisitRegister = ({ match, history }) => {

    const { nit } = match.params;

    const dispatch = useDispatch();
    const saveVisit = visit => dispatch(saveVisitAction(visit));
    const loadVisits = nit => dispatch(getVisitAction(nit));
    const loadSalesRepresentatives = () => dispatch(getSalesRepresentativeAction());

    // State
    const { isSuccessfull, error, visits } = useSelector(state => state.visits);
    const {salesRepresentatives} = useSelector(state => state.salesRepresentative);
    const [visit, setVisit] = useState({});

    // Buttons options
    const buttonOptions = {
        text: 'Register Visit',
        type: 'success',
        onClick: e => {
            if (!e.validationGroup.validate().isValid){
                return;
            }

            saveVisit(visit);
        }
    };

    const dateOptions = {
        dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
        width: '100%'
    };

    const editorOptionsPrice = {
        format: '$ #,##0.##'
    };

    useEffect(() => {
        setVisit({...visit, nit : nit, clientNit: nit});
    }, [nit]);

    useEffect(() => {
        if (isSuccessfull) {
            //Redirect
            history.push('/');
        }
    }, [isSuccessfull]);

    useEffect(() => {
        loadVisits(nit);
        loadSalesRepresentatives();
    }, [])

    return (
        <Fragment>
            {
                error ? <div className="font-weight-bold alert alert-danger text-center mt-4">{error.message}</div> : null
            }

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Form
                        id={'editClient'}
                        formData={visit}
                        colCount={2}
                        labelLocation={'top'}
                    >
                        <ButtonItem horizontalAlignment={'center'} colSpan={2} buttonOptions={buttonOptions} />

                        <SimpleItem dataField={'nit'} caption={'Nit'} colSpan={2} editorOptions={{ readOnly: true }}>
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'salesRepresentativeId'} editorType={'dxSelectBox'} 
                                    editorOptions={{ items: salesRepresentatives, displayExpr: 'name', valueExpr: 'id' }} colSpan={2}>
                            <Label text={'Sales Representative'} />
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'visitDate'} editorType={'dxDateBox'} editorOptions={dateOptions}>
                            <Label text={'Visit Date'} />
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'net'} caption={'Net'} editorType={'dxNumberBox'} editorOptions={editorOptionsPrice} >
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                        <SimpleItem dataField={'description'} caption={'Description'} editorType={'dxTextArea'}  colSpan={2}>
                            <RequiredRule message={'Requerido'} />
                        </SimpleItem>
                    </Form>
                </div>
                <div className="col-md-8 mt-3">
                    <h3>Registered Visits</h3>
                    <DataGrid
                        dataSource={visits}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnReordering={true}
                        showColumnLines={true}
                        rowAlternationEnabled={true}
                        hoverStateEnabled={true}
                        columnAutoWidth={true}
                    >
                        <GroupPanel visible={true} />
                        <Grouping autoExpandAll={false} />
                        <LoadPanel
                                enabled={true}
                                shading={true}
                                showPane={true}
                                shadingColor={'rgba(0,0,0,0.4)'} />

                        <SearchPanel visible={true} highlightCaseSensitive={true} />

                        <Column dataField={'salesRepresentativeId'} caption={'Sales Representative'} width={180}>
                            <Lookup dataSource={salesRepresentatives} displayExpr={'name'} valueExpr={'id'}/>
                        </Column>
                        <Column dataField={'visitDate'} caption={'Visit Date'} dataType={'date'} width={100} />
                        <Column dataField={'net'} caption={'Net'} width={120} dataType={'number'} format={'currency'} alignment={'right'}/>
                        <Column dataField={'description'} caption={'Description'} />
                    
                        <Paging defaultPageSize={10} />
                    </DataGrid>
                </div>
            </div>
        </Fragment>
    );
}

export default VisitRegister;