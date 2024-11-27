import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import Chart from 'react-apexcharts';


const ScoresChart = ({ details }) => {

    const [chartState, setChartState] = useState(() => {

        if (!details) {
            return null
        }

        return (
            {
                options: {
                    chart: {
                        id: 'answers-details',
                        type: 'bar',
                        animations: {
                            enabled: true,
                            speed: 1000,
                            animateGradually: {
                                enabled: true,
                                delay: 100
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 500
                            }
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    legend: {
                        show: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        },

                    },
                    fill: {
                        opacity: 1,

                    },
                    tooltip: {

                        x: {
                            show: true,
                            format: 'string',
                            formatter: (number) => {
                                return 'Question #' + number
                            }
                        },
                        y: {
                            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                                if (series[0][dataPointIndex] == -1) {
                                    return 'Incorrect Answer'
                                }
                                if (series[0][dataPointIndex] == 1) {
                                    return 'Acceptable Answer'
                                }
                                if (series[0][dataPointIndex] == 2) {
                                    return 'Excellent Answer'
                                }
                                return 'No data'
                            }
                        },
                    },

                    xaxis: {
                        categories: Object.keys(details),

                        title: {
                            text: 'question',
                            offsetX: 0,
                            offsetY: -15,
                            style: {
                                color: 'gray',
                                fontSize: '11px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-title',
                            },
                        }
                    },
                    yaxis: {
                        show: true,
                        stepSize: 1,
                        min: -1,
                        max: 2,
                        title: {
                            text: 'score',
                            rotate: -90,
                            offsetX: 8,
                            offsetY: 0,
                            style: {
                                color: 'gray',
                                fontSize: '11px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-title',
                            },
                        },



                    },
                    colors: [({ value, seriesIndex, w }) => {
                        if (value == -1) {
                            return '#FF5B61'
                        }
                        if (value == 1) {
                            return '#FFBF00'
                        }
                        if (value === 2) {
                            return '#50C878'
                        }
                    }],
                },

                series: [{
                    name: 'score',
                    data: Object.values(details),
                }]
            }
        )
    });



    return (

        <Box w={'100%'} height={'300px'} padding={1} mb={3}>
            {
                chartState &&
                <Chart options={chartState.options} series={chartState.series} type='bar' width={'100%'} height={'100%'} />
            }
        </Box>
    )
};

export default ScoresChart;