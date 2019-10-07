import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getClientsAction, deleteClientAction } from '../actions/ClientsAction';
// Devextreme
import DataGrid, { Column, SearchPanel, Paging } from 'devextreme-react/data-grid';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faChartPie, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// Sweet alert
import Swal from 'sweetalert2';

const Clients = (props) => {

    const dispatch = useDispatch();
    const deleteClient = (nit) => dispatch(deleteClientAction(nit));

    const loading = useSelector(state => state.clients.loading);
    const error = useSelector(state => state.clients.error);
    const clients = useSelector(state => state.clients.clients);

    const history = useHistory();

    const goNewClient = () => { history.push('/client'); }
    const goGeneralCharts = () => { history.push('/chart') }
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
            <FontAwesomeIcon className="m-2" icon={faMoneyBill} title={'Register Visit'} onClick={() => history.push(`/visit/${row.data.nit}`)} />
            <FontAwesomeIcon className="m-2" icon={faChartPie} title={'View Chart'} onClick={() => history.push(`/chart/${row.data.nit}`)} />
            <FontAwesomeIcon className="m-2" icon={faPen} title={'Update'} onClick={() => history.push(`/client/${row.data.nit}`)} />
            <FontAwesomeIcon className="m-2" icon={faTrash} title={'Delete'} onClick={() => removeClient(row.data.nit)} />
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

    useEffect(() => {
        const loadClients = () => dispatch(getClientsAction());
        loadClients();
    }, []);

    return (
        <Fragment>
            {
                loading
                    ? <h1>Loading...</h1>
                    : null
            }
            {
                error
                    ? <div className="font-weight-bold alert alert-danger text-center mt-4">AN ERROR OCCURRED</div>
                    : null
            }

            <DataGrid
                dataSource={clients}
                showBorders={true}
                onToolbarPreparing={onToolbarPreparing}
            >
                <SearchPanel visible={true} highlightCaseSensitive={true} />

                <Column dataField={'fullName'} caption={'Full Name'} />
                <Column dataField={'phone'} caption={'Phone'} width={100} />
                <Column dataField={'city'} caption={'City'} width={100} />
                <Column dataField={'state'} caption={'State'} width={100} />
                <Column dataField={'country'} caption={'Country'} width={100} />
                <Column dataField={'creditLimit'} caption={'Credit Limit'} width={150} alignment={'right'} format={'currency'} />
                <Column cellRender={cellRender} width={100} />

                {/* <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} /> */}
                <Paging defaultPageSize={10} />
            </DataGrid>
        </Fragment>
    );
}

export default Clients;