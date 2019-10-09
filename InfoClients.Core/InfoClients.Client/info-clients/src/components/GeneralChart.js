import React, { Fragment, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getChartInfoClientsAction } from '../actions/ClientsAction';
// Devextreme
import { Chart, Series, CommonSeriesSettings, Legend, Margin, ArgumentAxis, Title, Export, Tooltip,Grid } from 'devextreme-react/chart';

const GeneralChart = () => {

    const dispatch = useDispatch();
    const getClientsChartInfo = () => dispatch(getChartInfoClientsAction());

    const { clients, chartInfo, error } = useSelector(state => state.clients);

    const customizeTooltip = (arg) => {
        return { text: `$ ${arg.valueText}` };
    }

    useEffect(() => {
        getClientsChartInfo();
    }, []);

    return (
        <Fragment>
            {
                error ? <div className="font-weight-bold alert alert-danger text-center mt-4">{error.message}</div> : null
            }
            <h3 className="text-center">General Charts Reports</h3>
            {
                clients.length > 0 && chartInfo.length > 0
                ?
                <div id={'chart-client'}>
                    <Chart
                        palette={'Violet'}
                        dataSource={chartInfo}
                    >
                        <CommonSeriesSettings
                            argumentField={'Date'}
                            type={'line'}
                        />
                        {
                            clients.map(function(item) {
                                return <Series key={item.nit} valueField={item.nit} name={item.fullName} />;
                            })
                        }
                        <Margin bottom={20} />
                        <ArgumentAxis
                            valueMarginsEnabled={false}
                            discreteAxisDivisionMode={'crossLabels'}
                        >
                            <Grid visible={true} />
                        </ArgumentAxis>
                        <Legend
                            verticalAlignment={'bottom'}
                            horizontalAlignment={'center'}
                            itemTextPosition={'bottom'}
                        />
                        <Export enabled={true} />
                        <Title text={'Expend per visit'} />
                        <Tooltip
                            enabled={true}
                            customizeTooltip={customizeTooltip}
                        />
                    </Chart>
                </div>
                : null
            }
            
        </Fragment>
    );
}

export default GeneralChart;