<template>
    <div class="main">
        <div class="track-container">
            <div id="main" style="width: 800px;height: 600px"></div>
            <div id="total_vel" style="width: 600px;height: 400px"></div>
        </div>
        <div class="vel-container">
            <!--            <div id="left_vel" style="width: 340px;height: 400px"></div>-->

            <!--            <div id="right_vel" style="width: 340px;height: 400px"></div>-->
        </div>

    </div>
</template>

<script>
    import trackData from '../../../static/track'

    export default {
        name: 'ExerciseMonitor',
        data() {
            return {
                option: {},
                vel_option: {},
                interval: '',
                track_list: trackData,

                position_list: [],
                vel_list: [],
                left_vel_list: [],
                right_vel_list: [],

                num: 0,

                val: 0,
            }
        },
        mounted() {
            let self = this;
            self.convertData().then(() => {
                self.drawPosition();
            });
            // let self = this
            //
            // let ros = new this.$roslib.Ros({
            //     url: 'ws://192.168.246.143:9090'
            // })
            // ros.on('connection', function () {
            //     console.log('Connected to websocket server.')
            // })
            // ros.on('error', function (error) {
            //     console.log('Error connecting to websocket server: ', error)
            // })
            //
            // ros.on('close', function () {
            //     console.log('Connection to websocket server closed.')
            // })
            // let vel = new this.$roslib.Topic({
            //     ros: ros,
            //     name: '/people_velocity',
            //     messageType: 'std_msgs/String'
            // })
            // let strs = new Array()
            //
            // vel.subscribe(function (message) {
            //     console.log('Received message on ' + vel.name + ': ' + message.data)
            //     // document.getElementById("bar").innerHTML = message.data;
            //     self.msg = message.data
            //     strs = message.data.split(',')
            //     this.$axios({
            //         url: '/Lidar/',
            //         method: 'post',
            //         responseType: 'json', // 默认的
            //         data: {
            //             person_id: strs[0],
            //             step_length: strs[3],
            //             person_left_vel: strs[4],
            //             person_right_vel: strs[5],
            //             stamp: strs[6]
            //         },
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //     // .then(function (response) {
            //     //     console.log(response)
            //     //     console.log(response.data)
            //     // })
            //     // $.ajax({
            //     //     type: 'POST',
            //     //     url: '/Lidar/',
            //     //     dataType: 'json',
            //     //     data: {
            //     //         'person_id': strs[0],
            //     //         'step_length': strs[3],
            //     //         'person_left_vel': strs[4],
            //     //         'person_right_vel': strs[5],
            //     //         'stamp': strs[6]
            //     //     },
            //     //     async: false,
            //     //     success: function (data) {
            //     //     }
            //     // });
            //
            //     // listener.unsubscribe();
            // })
            // let loc = new this.$roslib.Topic({
            //     ros: ros,
            //     name: '/people_location',
            //     messageType: 'std_msgs/String'
            // })
            // loc.subscribe(function (message) {
            //     console.log('Received message on ' + loc.name + ': ' + message.data)
            //     // listener.unsubscribe();
            // })

        },
        methods: {
            convertData() {
                const promise = new Promise((resolve, reject) => {

                    if (this.track_list.length) {

                        this.position_list = [];
                        this.vel_list = [];
                        this.left_vel_list = [];
                        this.right_vel_list = [];

                        for (let i = 0; i < this.track_list.length; i++) {
                            let obj = this.track_list[i];

                            this.position_list.push([obj.x, obj.y]);
                            this.vel_list.push(obj.vel);
                            this.left_vel_list.push(obj.leftvel);
                            this.right_vel_list.push(obj.rightvel);
                        }
                        resolve();
                    } else {
                        reject();
                    }
                });

                return promise;
            },

            drawPosition() {
                let self = this;
                let myChart = this.$echarts.init(document.getElementById('main'));
                let vel_chart = this.$echarts.init(document.getElementById('total_vel'));
                let data = this.position_list;
                // let data = [
                //     [2.441611, 0.444826],
                //     [-0.659487, 3.111284],
                //     [-0.459601, -2.618005],
                //     [2.17768, 2.387793],
                //     [-2.920969, 2.917485],
                //     [-0.028814, -4.168078],
                //     [3.625746, 2.119041],
                //     [-3.912363, 1.325108],
                //     [-0.551694, -2.814223],
                //     [2.855808, 3.483301],
                //     [-3.594448, 2.856651],
                //     [0.421993, -2.372646],
                //     [1.650821, 3.407572],
                //     [-2.082902, 3.384412],
                //     [-0.718809, -2.492514],
                //     [4.513623, 3.841029],
                //     [-4.822011, 4.607049],
                //     [-0.656297, -1.449872],
                //     [1.919901, 4.439368],
                //     [-3.287749, 3.918836],
                //     [-1.576936, -2.977622],
                //     [3.598143, 1.97597],
                //     [-3.977329, 4.900932],
                //     [-1.79108, -2.184517],
                //     [3.914654, 3.559303],
                //     [-1.910108, 4.166946],
                //     [-1.226597, -3.317889],
                //     [1.148946, 3.345138],
                //     [-2.113864, 3.548172],
                //     [0.845762, -3.589788],
                //     [2.629062, 3.535831],
                //     [-1.640717, 2.990517],
                //     [-1.881012, -2.485405],
                //     [4.606999, 3.510312],
                //     [-4.366462, 4.023316],
                //     [0.765015, -3.00127],
                //     [3.121904, 2.173988],
                //     [-4.025139, 4.65231],
                //     [-0.559558, -3.840539],
                //     [4.376754, 4.863579],
                //     [-1.874308, 4.032237],
                //     [-0.089337, -3.026809],
                //     [3.997787, 2.518662],
                //     [-3.082978, 2.884822],
                //     [0.845235, -3.454465],
                //     [1.327224, 3.358778],
                //     [-2.889949, 3.596178],
                //     [-0.966018, -2.839827],
                //     [2.960769, 3.079555],
                //     [-3.275518, 1.577068],
                //     [0.639276, -3.41284]
                // ];

                self.option = {
                    xAxis: {},
                    yAxis: {},
                    series: {
                        symbolSize: 10,
                        data: [
                            // [0, 0]
                        ],
                        type: 'scatter',
                        markLine: {
                            data: [
                                // [
                                //     {
                                //         coord: [3.275154, 2.957587],
                                //     },
                                //     {
                                //         coord: [-3.344465, 2.603513],
                                //     }
                                // ]
                            ]
                        }
                    },
                };

                self.vel_option = {
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
                                        [self.val, '#FFC700'], // 数据
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
                                // value: '2'
                                value: self.val
                            }]
                        }
                    ]
                };


                let i = 0;
                self.interval = setInterval(() => {
                    // console.log(i);
                    if (i <= data.length) {
                        let obj = {
                            value: data[i],
                            symbol: 'pin',
                            symbolSize: 20,
                            itemStyle: {
                                color: '#2f4554'
                            }
                        };
                        if (i > 0) {
                            self.option.series.data[i - 1] = {
                                value: data[i - 1],
                                symbol: 'circle',
                                symbolSize: 10,
                                itemStyle: {
                                    color: '#61a0a8'
                                }
                            };

                            let coord_list = [];
                            coord_list.push({coord: data[i - 1]});
                            coord_list.push({coord: data[i]});

                            self.option.series.markLine.data.push(coord_list);
                        }
                        self.option.series.data.push(obj);
                    }

                    //初始化vel_option
                    self.val = parseFloat(self.vel_list[i].slice(0, 5));
                    self.vel_option.series[1].data[0].value = self.val;
                    self.vel_option.series[1].axisLine.lineStyle.color[1][0] = self.val;

                    i++;
                    // self.num++;
                    myChart.setOption(self.option);
                    vel_chart.setOption(self.vel_option);

                }, 1000);

            },

            drawVelChart() {
                let self = this;
                // console.log(self.vel_list);
                if (self.num < self.vel_list.length) {

                    // let val = 0.7;


                }

            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        display: flex;
        flex-direction: column;

        .track-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .vel-container {
            display: flex;
            justify-content: center;
        }
    }


</style>
