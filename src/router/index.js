import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const index = () => import('@/views/Index');//懒加载模式引入路由
const home = () => import('@/components/home/Home');
const exerciseMonitor = () => import('@/components/userHealth/ExerciseMonitor');
const exerciseAnalyse = () => import('@/components/userHealth/ExerciseAnalyse');
const exerciseVerify = () => import('@/components/userHealth/ExerciseVerify');

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            {
                path: '/home',
                name: '主页',
                component: home
            },
            {
                path: '/exerciseMonitor',
                name: '健康监测',
                component: exerciseMonitor
            },
            {
                path: '/exerciseAnalyse',
                name: '健康分析',
                component: exerciseAnalyse
            },
            {
                path: '/exerciseVerify',
                name: '运动校验',
                component: exerciseVerify
            },
        ]
    }
]

const router = new VueRouter({
    routes
});

export default router;
