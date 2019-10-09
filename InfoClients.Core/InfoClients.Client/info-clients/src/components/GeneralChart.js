import React, { Fragment, useEffect, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllVisitAction } from '../actions/VisitsAction';
// Devextreme
import { Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';
// Bootstrap
import { ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';

const GeneralChart = () => {

    const dispatch = useDispatch();
    const getAllVisits = () => dispatch(getAllVisitAction());

    const { visits } = useSelector(state => state.visits);
    const { clients } = useSelector(state => state.clients);

    let visitChart = [];
    let expenseVisitChart = [];

    const maleAgeData = [{
        state: 'Germany',
        young: 6.7,
        middle: 28.6,
        older: 5.1
    }, {
        state: 'Japan',
        young: 9.6,
        middle: 43.4,
        older: 9
    }, {
        state: 'Russia',
        young: 13.5,
        middle: 49,
        older: 5.8
    }, {
        state: 'USA',
        young: 30,
        middle: 90.3,
        older: 14.5
    }];

    const [openVpC, setOpenVpC] = useState(false);
    const [openEpViC, setOpenEpViC] = useState(false);

    const customizeTooltip = arg => ({
        text: `${arg.seriesName} years: ${arg.valueText}`
    });

    useEffect(() => {
        getAllVisits();
    }, []);

    useEffect(() => {
        if (visits.length === 0 || clients.length === 0) {
            return;
        }

        visitChart = clients.map(c => {
            return ({
                clientName: c.firstName,
                visitsCount: visits.filter(v => v.clientNit === c.nit).length
            })
        });
        expenseVisitChart = clients.map(c => {
            return ({
                clientName: c.firstName,
                minimumValue: visits.filter(v => v.clientNit === c.nit && v.visitTotal < 1000).length,
                middleValue: visits.filter(v => v.clientNit === c.nit && v.visitTotal >= 1000 && v.visitTotal < 10000).length,
                maxValue: visits.filter(v => v.clientNit === c.nit && v.visitTotal >= 10000).length
            })
        })
        console.log(visitChart);
        console.log(expenseVisitChart);
    }, [visits]);

    return (
        <Fragment>
            <h3 className="text-center">General Charts Reports</h3>
            <ListGroup className="mt-2" >
                <ListGroupItem aria-controls="chart" aria-expanded={openVpC} onClick={() => setOpenVpC(!openVpC)}>
                    Visit per Client
                </ListGroupItem>
                <Collapse in={openVpC} className="justify-content-center m-4">
                    <Chart id={'chart'} dataSource={visitChart}>
                        <Series
                            valueField={'visitsCount'}
                            argumentField={'clientName'}
                            name={'Visit per Client'}
                            type={'bar'}
                            color={'#ffaa66'} />
                        <Export enabled={true} />
                    </Chart>
                </Collapse>
                <ListGroupItem aria-controls="chart2" aria-expanded={openEpViC} onClick={() => setOpenEpViC(!openEpViC)}>
                    Expense per Visit in Client
                </ListGroupItem>
                <Collapse in={openEpViC} className="justify-content-center">
                    <Chart id={'chart2'} dataSource={expenseVisitChart}>
                        <CommonSeriesSettings argumentField={'clientName'} type={'stackedBar'} />
                        <Series
                            valueField={'minimumValue'}
                            name={'x<$1.000'}
                        />
                        <Series
                            valueField={'middleValue'}
                            name={'$1.000<=x<$10.000'}
                        />
                        <Series
                            valueField={'maxValue'}
                            name={'$10.000<=x'}
                        />
                        <ValueAxis position={'right'}>
                            <Title text={'Thousands'} />
                        </ValueAxis>
                        <Legend
                            verticalAlignment={'bottom'}
                            horizontalAlignment={'center'}
                            itemTextPosition={'top'}
                        />
                        <Export enabled={true} />
                        <Tooltip
                            enabled={true}
                            location={'edge'}
                            customizeTooltip={customizeTooltip}
                        />
                    </Chart>
                </Collapse>
            </ListGroup>
        </Fragment>
    );
}

export default GeneralChart;