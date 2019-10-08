import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getClientsAction, deleteClientAction } from '../actions/ClientsAction';
// Devextreme
import DataGrid, { Column, SearchPanel, Paging,GroupPanel, Grouping, LoadPanel } from 'devextreme-react/data-grid';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faChartPie, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// Sweet alert
import Swal from 'sweetalert2';

const Clients = ({history}) => {

    const dispatch = useDispatch();
    const deleteClient = (nit) => dispatch(deleteClientAction(nit));
    const loadClients = () => dispatch(getClientsAction());

    const {clients, error} = useSelector(state => state.clients);

    // const history = useHistory();
    
    const refreshGrid = () => loadClients();
    const goNewClient = () => history.push('/client');
    const goGeneralCharts = () => history.push('/chart');
    const removeClient = (nit) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                deleteClient(nit);
            }
        })
    }

    const cellRender = (row) => (
        <div>
            <FontAwesomeIcon className="m-2 pointer" icon={faMoneyBill} title={'Register Visit'} onClick={() => history.push(`/visit/${row.data.nit}`)} />
            <FontAwesomeIcon className="m-2 pointer" icon={faChartPie} title={'View Chart'} onClick={() => history.push(`/chart/${row.data.nit}`)} />
            <FontAwesomeIcon className="m-2 pointer" icon={faTrash} title={'Delete'} onClick={() => removeClient(row.data.nit)} />
        </div>
    )

    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.push({
            location: 'after',
            widget: 'dxButton',
            options: {
                text: 'ADD CLIENT',
                type: 'success',
                icon: 'plus',
                onClick: goNewClient
            }
        }, {
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'refresh',
                onClick: refreshGrid
            }
        }, {
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'View General Charts',
                type: 'info',
                icon: 'chart',
                onClick: goGeneralCharts
            }
        });
    }
    // Event double click in grid
    const onRowDblClick = (e) => history.push(`/client/${e.data.nit}`);

    useEffect(() => {        
        loadClients();
    }, []);

    return (
        <Fragment>
            {
                error
                    ? <div className="font-weight-bold alert alert-danger text-center mt-4">AN ERROR OCCURRED</div>
                    : null
            }

            <DataGrid
                dataSource={clients}
                onToolbarPreparing={onToolbarPreparing}
                onRowDblClick={onRowDblClick}
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

                <Column dataField={'fullName'} caption={'Full Name'} />
                <Column dataField={'phone'} caption={'Phone'} width={120} />
                <Column dataField={'city'} caption={'City'} width={100} />
                <Column dataField={'state'} caption={'State'} width={100} />
                <Column dataField={'country'} caption={'Country'} width={100} />
                <Column dataField={'creditLimit'} caption={'Credit Limit'} width={150} alignment={'right'} format={'currency'} />
                <Column cellRender={cellRender} width={100} />

                <Paging defaultPageSize={10} />
            </DataGrid>
        </Fragment>
    );
}

export default Clients;