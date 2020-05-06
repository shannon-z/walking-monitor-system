<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "ExerciseMonitor",
        data() {
            return {

            }
        },
        mounted() {
            let val = 0.7;
            const option = {
                backgroundColor: "#062a44",
                series: [{
                    type: 'gauge',
                    radius: '60%',
                    min: 0,
                    max: 1,
                    startAngle: 225,
                    endAngle: -45,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 0,
                            color: [1, '#fff']
                        }
                    }, //仪表盘轴线
                    axisTick: {
                        show: true,
                        splitNumber: 9,
                        lineStyle: {
                            color: '#fff',
                        },
                        length: -8
                    }, //刻度样式
                    splitLine: {
                        show: true,
                        length: 5,
                        lineStyle: {
                            color: '#fff'
                        }
                    }, //分隔线样式
                    detail: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: '#fff',
                    }
                },
                    {
                        type: 'gauge',
                        radius: '45%',
                        center: ['50%', '50%'],
                        startAngle: 225,
                        endAngle: -45,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 10,
                                color: [
                                    [0, '#FFC700'],
                                    [val / 1, '#FFC700'], // 数据
                                    [1, '#999999']
                                ]

                            }
                        },
                        //分隔线样式。
                        splitLine: {
                            show: false,
                            length: -20,
                            // lineStyle: {
                            //     color: '#fff'
                            // }
                        }, //分隔线样式
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                            splitNumber: 9,
                            // lineStyle: {
                            //     color: '#fff',
                            // },
                            length: -8
                        }, //刻度样式
                        pointer: {
                            show: false
                        },
                        title: {
                            show: true,
                            offsetCenter: [0, '-26%'], // x, y，单位px
                            textStyle: {
                                color: '#fff',
                                fontSize: 16
                            }
                        },
                        //仪表盘详情，用于显示数据。
                        detail: {
                            show: true,
                            offsetCenter: [0, '16%'],
                            color: '#ffffff',
                            formatter: function (params) {
                                return params + 'm/s'
                            },
                            textStyle: {
                                fontSize: 22
                            }
                        },
                        data: [{
                            name: "当前行走速度",
                            value: val
                        }]
                    }
                ]
            };
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
