import React, { Fragment } from 'react';
import { Chart, Series, ArgumentAxis, CommonSeriesSettings, Export, Legend,
         Margin, Title, Subtitle, Tooltip, Grid
} from 'devextreme-react/chart';

const ClientChart = () => {

    const countriesInfo = [{
        country: 'Jan',
        1075211187: 59.8
    }, {
        country: 'Feb',
        1075211187: 74.2
    }, {
        country: 'Mar',
        1075211187: 40
    }, {
        country: 'Apr'
    }, {
        country: 'May',
        1075211187: 19
    }, {
        country: 'Jun',
        1075211187: 6.1
    }];

    const customizeTooltip = (arg) => {
        return { text: arg.valueText };
    }

    return (
        <Fragment>
            <div id={'chart-demo'}>
                <Chart
                    palette={'Violet'}
                    dataSource={countriesInfo}
                >
                    <CommonSeriesSettings
                        argumentField={'country'}
                        type={'line'}
                    />
                    <Series valueField={'1075211187'} name={'Alejandro'} />
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
                    <Title text={'Expend per visit'}/>
                    <Tooltip
                        enabled={true}
                        customizeTooltip={customizeTooltip}
                    />
                </Chart>
            </div>
        </Fragment>
    );
}

export default ClientChart;