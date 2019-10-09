import React, { Fragment, useEffect } from 'react';
// Devextreme
import { Chart, Series, ArgumentAxis, CommonSeriesSettings, Export, Legend, Margin, Title, Subtitle, Tooltip, Grid } from 'devextreme-react/chart';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getChartInfoClientAction, getEditClientAction } from '../actions/ClientsAction';

const ClientChart = ({match}) => {

    const { nit } = match.params;

    const dispatch = useDispatch();
    const getChartInfoClient = (nit) => dispatch(getChartInfoClientAction(nit));
    const getClient = (nit) => dispatch(getEditClientAction(nit))

    const { client, chartInfo, error } = useSelector(state => state.clients);

    const customizeTooltip = (arg) => {
        return { text: `$ ${arg.valueText}` };
    }

    useEffect(() => {
        getClient(nit);
        getChartInfoClient(nit);
    }, [nit])

    return (
        <Fragment>
            {
                error ? <div className="font-weight-bold alert alert-danger text-center mt-4">{error.message}</div> : null
            }
            {
                client
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
                        <Series valueField={client.nit} name={client.name} />
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
                        <Title text={'Expend per visit'}>
                            <Subtitle text={`${client.fullName}`}/>
                            {/* <Subtitle text={`${client.nit}`}/> */}
                        </Title>
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

export default ClientChart;