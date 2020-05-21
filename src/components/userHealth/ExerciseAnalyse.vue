<template>
    <div>
        <div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>
        <div id="stepLineBox" style="width: 90%;height: 70vh;"> </div>
    </div>
<!--    <div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>-->
<!--    <div id="stepLineBox" style="width: 90%;height: 30vh;"> </div>-->
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "ExerciseAnalysis",
        data() {
            return {
                nowDate: "",    // 当前日期
            };
        },
        mounted(){
            let self = this;
            var vectorData={};
            var listhour=[];
            var listvel=[];
            var listhour1=[];
            var listvel1=[];
            this.getDate();
            var chartLine = echarts.init(document.getElementById('chartLineBox'));
            console.log(document.getElementById('stepLineBox'))
            var stepLine = echarts.init(document.getElementById('stepLineBox'));
            console.log(this.nowDate);

            let instance = this.$axios.create({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    //     'Content-Type': 'application/json'
                },
                // responseType: 'json', // 默认的
            })
            instance.post('http://127.0.0.1:8000/Lidar/analyse',{
                data_today: this.nowDate
            }).then(function (response) {
                // vectorData=response.data
                // vectorData=JSON.parse(response)
                vectorData=eval(response.data)
                listhour=vectorData.hour
                listvel=vectorData.vel
                listhour1.splice(0,listhour1.length)
                listvel1.splice(0,listvel1.length)
                for(var i=0;i<listhour.length;i++)
                {
                    listhour1.push(listhour[i]);
                    listvel1.push(listvel[i]);
                }

                chartLine.setOption({
                    tooltip: {              //设置tip提示
                        trigger: 'axis'
                    },
                    legend: {               //设置区分（哪条线属于什么）
                        data:['行人速度']
                    },
                    color: ['#5395d0'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
                    xAxis: [{                //设置x轴
                        type: 'category',
                        boundaryGap: false,     //坐标轴两边不留白
                        data: listhour,
                        name: 'Time',           //X轴 name
                        nameTextStyle: {        //坐标轴名称的文字样式
                            color: '#5672d2',
                            fontSize: 16,
                            padding: [0, 0, 0, 20]
                        },
                        axisLine: {             //坐标轴轴线相关设置。
                            lineStyle: {
                                color: '#5672d2',
                            }
                        }
                    }],
                    yAxis: {
                        name: '速度',
                        nameTextStyle: {
                            color: '#5672d2',
                            fontSize: 16,
                            padding: [0, 0, 10, 0]
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5672d2',
                            }
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            name: '行人速度',
                            data: listvel,
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    color: '#5395d0',
                                }
                            },
                        }
                    ]
                });
                stepLine.setOption({
                    tooltip: {              //设置tip提示
                        trigger: 'axis'
                    },
                    legend: {               //设置区分（哪条线属于什么）
                        data:['行人步长']
                    },
                    color: ['#5395d0'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
                    xAxis: [{                //设置x轴
                        type: 'category',
                        boundaryGap: false,     //坐标轴两边不留白
                        data: listhour,
                        name: 'Time',           //X轴 name
                        nameTextStyle: {        //坐标轴名称的文字样式
                            color: '#5672d2',
                            fontSize: 16,
                            padding: [0, 0, 0, 20]
                        },
                        axisLine: {             //坐标轴轴线相关设置。
                            lineStyle: {
                                color: '#5672d2',
                            }
                        }
                    }],
                    yAxis: {
                        name: '步长',
                        nameTextStyle: {
                            color: '#5672d2',
                            fontSize: 16,
                            padding: [0, 0, 10, 0]
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5672d2',
                            }
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            name: '行人步长',
                            data: vectorData.step,
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    color: '#5395d0',
                                }
                            },
                        }
                    ]
                });
            });
        },
        methods: {
            currentTime() {
                setInterval(this.getDate, 1000);
            },
            getDate: function() {
                var _this = this;
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();

                if (mm < 10) {
                    mm = '0' + mm.toString();
                }
                // let week = new Date().getDay();
                // let hh = new Date().getHours();
                // let mf =
                //     new Date().getMinutes() < 10
                //         ? "0" + new Date().getMinutes()
                //         : new Date().getMinutes();
                // if (week == 1) {
                //     this.nowWeek = "星期一";
                // } else if (week == 2) {
                //     this.nowWeek = "星期二";
                // } else if (week == 3) {
                //     this.nowWeek = "星期三";
                // } else if (week == 4) {
                //     this.nowWeek = "星期四";
                // } else if (week == 5) {
                //     this.nowWeek = "星期五";
                // } else if (week == 6) {
                //     this.nowWeek = "星期六";
                // } else {
                //     this.nowWeek = "星期日";
                // }
                // _this.nowTime = hh + ":" + mf;
                _this.nowDate = yy + "-" + mm + "-" + dd;
            }
        },
        beforeDestroy: function() {
            if (this.getDate) {
                // console.log("销毁定时器")
                clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
            }
        }
    }
</script>

<style scoped>

</style>
