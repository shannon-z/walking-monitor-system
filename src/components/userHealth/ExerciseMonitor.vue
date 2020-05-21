<template>
    <div class="main">
        <div class="btn-container">
            <div class="track-btn">
                <Button type="primary" @click="clearTrack" :disabled="full_track_disabled">展示全路径</Button>
            </div>
            <div class="track-btn">
                <Button type="primary" @click="showHalf" :disabled="half_track_disabled">展示近20个点路径</Button>
            </div>
            <div class="track-btn">
                <Button type="primary" @click="clearTrack">清除</Button>
            </div>
        </div>
        <div class="top-container">
            <div class="track-container">
                <div id="main" style="width: 750px;height: 600px"></div>
            </div>

            <div class="vel-container">
                <div id="left_vel" style="width: 350px;height: 200px"></div>
                <div id="total_vel" style="width: 350px;height: 200px"></div>
                <div id="right_vel" style="width: 350px;height: 200px"></div>
            </div>
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
                right_vel_option: {},
                left_vel_option: {},
                interval: '',
                track_list: [],
                track_data: [],

                position_list: [],
                vel_list: [],
                left_vel_list: [],
                right_vel_list: [],

                num: 0,

                val: 0,

                full_track_flag: true,
                clear_track_flag: false,
                half_track_flag: false,

                full_track_disabled: true,
                half_track_disabled: false,


            }
        },
        created() {
            this.track_list = trackData;
        },
        mounted() {
            let self = this;
            // let self = this

            let ros = new this.$roslib.Ros({
                url: 'ws://192.168.246.146:9090'
            })
            ros.on('connection', function () {
                console.log('Connected to websocket server.')
            })
            ros.on('error', function (error) {
                console.log('Error connecting to websocket server: ', error)
            })

            ros.on('close', function () {
                console.log('Connection to websocket server closed.')
            })
            let vel = new this.$roslib.Topic({
                ros: ros,
                name: '/people_velocity',
                messageType: 'std_msgs/String'
            })

            self.drawPosition();

            vel.subscribe(function (message) {
                console.log('Received message on ' + vel.name + ': ' + message.data)
                // document.getElementById("bar").innerHTML = message.data;
                self.msg = message.data;
                let strs = message.data.split(',');
                console.log(strs);

                self.convertData(message.data.split(','));

                // console.log('self.position_list');
                // console.log(self.position_list);

                // self.convertData().then(() => {
                //     self.drawPosition();
                // });


                self.$axios({
                    url: '/Lidar/',
                    method: 'post',
                    responseType: 'json', // 默认的
                    data: {
                        person_id: strs[0],
                        step_length: strs[3],
                        person_left_vel: strs[4],
                        person_right_vel: strs[5],
                        stamp: strs[6]
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    console.log(response)
                    console.log(response.data)
                })
                // $.ajax({
                //     type: 'POST',
                //     url: '/Lidar/',
                //     dataType: 'json',
                //     data: {
                //         'person_id': strs[0],
                //         'step_length': strs[3],
                //         'person_left_vel': strs[4],
                //         'person_right_vel': strs[5],
                //         'stamp': strs[6]
                //     },
                //     async: false,
                //     success: function (data) {
                //     }
                // });

                // listener.unsubscribe();
            })
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


            showHalf() {
                clearInterval(this.interval);
                this.half_track_flag = true;
                this.full_track_flag = false;

                this.half_track_disabled = true;
                this.full_track_disabled = false;

                this.option.series.data = [];
                this.option.series.markLine.data = [];

                this.drawPosition();
            },

            clearTrack() {
                clearInterval(this.interval);
                this.full_track_flag = true;
                this.half_track_flag = false;

                this.full_track_disabled = true;
                this.half_track_disabled = false;

                this.option.series.data = [];
                this.option.series.markLine.data = [];

                this.drawPosition();
            },

            convertData(arr) {
                // const promise = new Promise((resolve, reject) => {
                //     this.position_list = [];
                //     this.vel_list = [];
                //     this.left_vel_list = [];
                //     this.right_vel_list = [];
                    // if (this.track_list.length) {
                    //
                    //     this.position_list = [];
                    //     this.vel_list = [];
                    //     this.left_vel_list = [];
                    //     this.right_vel_list = [];
                    //
                    //     for (let i = 0; i < this.track_list.length; i++) {
                    //         let obj = this.track_list[i];
                    //
                    //         this.position_list.push([obj.x, obj.y]);
                    //         this.vel_list.push(obj.vel);
                    //         this.left_vel_list.push(obj.leftvel);
                    //         this.right_vel_list.push(obj.rightvel);
                    //     }
                    //     resolve();
                    // } else {
                    //     reject();
                    // }
                    if (arr.length === 9) {

                        // for (let i = 0; i < this.track_list.length; i++) {
                        //     let obj = this.track_list[i];

                            this.position_list.push([arr[7], arr[8]]);
                            this.vel_list.push(arr[4]+arr[5]);
                            this.left_vel_list.push(arr[4]);
                            this.right_vel_list.push(arr[5]);
                        // }
                        // resolve();
                    // } else {
                        // reject();
                    }
                // });

                // return promise;
            },

            drawPosition() {
                let self = this;
                let myChart = this.$echarts.init(document.getElementById('main'));
                let vel_chart = this.$echarts.init(document.getElementById('total_vel'));
                let left_vel_chart = this.$echarts.init(document.getElementById('left_vel'));
                let right_vel_chart = this.$echarts.init(document.getElementById('right_vel'));
                let data = this.position_list;


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
                            ],
                            lineStyle: {
                                color: '#ccc',
                                type: 'dotted',
                                width: 0.5,
                            },
                        },

                    },
                };

                self.vel_option = {

                    backgroundColor: "#062a44",
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        min: 0,
                        max: 5,
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
                            length: -10
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
                            min: 0,
                            max: 5,
                            radius: '55%',
                            center: ['50%', '50%'],
                            startAngle: 225,
                            endAngle: -45,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 10,
                                    color: [
                                        [0, '#FFC700'],
                                        // [self.val, '#FFC700'], // 数据
                                        [0, '#FFC700'], // 数据
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
                                    fontSize: 10
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
                                    fontSize: 12
                                }
                            },
                            data: [{
                                name: "当前行走速度",
                                value: 0,
                                // value: self.val
                            }]
                        }
                    ]
                };

                self.left_vel_option = JSON.parse(JSON.stringify(self.vel_option));
                self.left_vel_option.series[1].data[0].name = '左脚行走速度';

                self.right_vel_option = JSON.parse(JSON.stringify(self.vel_option));
                self.right_vel_option.series[1].data[0].name = '右脚行走速度';


                let i = 0;
                self.interval = setInterval(() => {
                    // console.log(self.num);
                    if (self.num <= data.length && data.length > 0) {
                        let obj = {
                            value: data[self.num],
                            symbol: 'pin',
                            symbolSize: 20,
                            itemStyle: {
                                color: '#2f4554'
                            }
                        };

                        if (self.num > 0) {


                            if (self.half_track_flag) {
                                console.log('i' + i);
                                if (i < 20) {
                                    self.option.series.data[i] = {
                                        value: data[self.num - 1],
                                        symbol: 'circle',
                                        symbolSize: 5,
                                        itemStyle: {
                                            color: '#61a0a8'
                                        }
                                    };
                                } else {
                                    self.option.series.data[20] = {
                                        value: data[self.num],
                                        symbol: 'circle',
                                        symbolSize: 5,
                                        itemStyle: {
                                            color: '#61a0a8'
                                        }
                                    };

                                    self.option.series.data.shift();
                                    self.option.series.markLine.data.shift();
                                }
                            }

                            if (self.full_track_flag) {

                                self.option.series.data[i] = {
                                    value: data[self.num - 1],
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    itemStyle: {
                                        color: '#61a0a8'
                                    }
                                };
                            }

                            i++;


                            let coord_list = [];
                            coord_list.push({coord: data[self.num - 1]});
                            coord_list.push({coord: data[self.num]});

                            self.option.series.markLine.data.push(coord_list);
                        }

                        self.option.series.data.push(obj);

                        if (self.vel_list[self.num]) {
                            //初始化vel_option
                            self.val = parseFloat(self.vel_list[self.num].slice(0, 5));
                            self.vel_option.series[1].data[0].value = self.val;
                            self.vel_option.series[1].axisLine.lineStyle.color[1][0] = parseFloat((parseFloat(self.vel_list[self.num])/5).toString().slice(0, 5));

                            let left_val = parseFloat(self.left_vel_list[self.num].slice(0, 5));
                            self.left_vel_option.series[1].data[0].value = left_val;
                            self.left_vel_option.series[1].axisLine.lineStyle.color[1][0] = parseFloat((parseFloat(self.left_vel_list[self.num])/5).toString().slice(0, 5));

                            let right_val = parseFloat(self.right_vel_list[self.num].slice(0, 5));
                            self.right_vel_option.series[1].data[0].value = right_val;
                            self.right_vel_option.series[1].axisLine.lineStyle.color[1][0] = parseFloat((parseFloat(self.right_vel_list[self.num])/5).toString().slice(0, 5));
                        }
                    }


                    self.num++;
                    myChart.setOption(self.option);
                    vel_chart.setOption(self.vel_option);
                    left_vel_chart.setOption(self.left_vel_option);
                    right_vel_chart.setOption(self.right_vel_option);

                }, 500);

            },

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

        .btn-container {

            width: 200px;
            display: flex;
            flex-direction: row;

            .track-btn {
                margin-left: 60px;
            }
        }

        .top-container {

            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .track-container {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .vel-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }


</style>
