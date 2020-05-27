<template>
    <div class="main">
        <div class="left-container">
            <div class="main-title" @click="goHome">行走监测系统</div>
            <div class="menu">
                <Menu :theme="theme3" active-name="1" @on-select="selectMenu">
                    <MenuGroup :title="item.title" v-for="(item, key) in menu_list" :key="key">
                        <MenuItem :name="item_copy.name" v-for="(item_copy, key_copy) in item.children" :key="key_copy">
                            <Icon :type="item_copy.icon"/>
                            {{ item_copy.des }}
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </div>
        </div>
        <div class="right-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    // import home from "./home/Home.vue"; // 右侧详情界面

    export default {
        name: "index",
        data() {
            return {
                theme3: 'light',
                menu_list: [
                    {
                        title: '健康管理',
                        children: [
                            {
                                name: '01',
                                icon: 'md-document',
                                des: '健康监测',
                                path: 'exerciseMonitor',
                            },
                            {
                                name: '02',
                                icon: 'md-document',
                                des: '健康分析',
                                path: 'exerciseAnalyse',
                            },
                            // {
                            //     name: '03',
                            //     icon: 'md-document',
                            //     des: '运动校验',
                            //     path: 'exerciseVerify',
                            // },
                        ]
                    },
                    // {
                    //     title: '内容管理',
                    //     children: [
                    //         {
                    //             name: '11',
                    //             icon: 'md-document',
                    //             des: 'xxx',
                    //             path: 'exerciseMonitor',
                    //         },
                    //         {
                    //             name: '12',
                    //             icon: 'md-document',
                    //             des: 'xxx',
                    //             path: 'exerciseMonitor',
                    //         },
                    //     ]
                    // },
                    // {
                    //     title: '统计分析',
                    //     children: [
                    //         {
                    //             name: '21',
                    //             icon: 'md-heart',
                    //             des: 'xxx',
                    //             path: 'exerciseMonitor',
                    //         },
                    //         {
                    //             name: '22',
                    //             icon: 'md-leaf',
                    //             des: 'xxx',
                    //             path: 'exerciseMonitor',
                    //         },
                    //     ]
                    // },
                ],
                active_menu: '',
            }
        },
        created() {

        },
        methods: {

            goHome() {
                let path = '/home';

                if (this.active_menu !== '') {

                    this.active_menu = '';
                    this.$router.push({path: path});
                }
            },

            /**
             * 选择菜单,跳转对应的页面
             * @param name
             */
            selectMenu(name) {
                let self = this;
                let path = '';

                if (name !== self.active_menu) {

                    for (let i = 0; i < self.menu_list.length; i++) {

                        let arr = self.menu_list[i].children;
                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j].name === name) {
                                path = arr[j].path;
                                self.$router.push({path: path});
                                self.active_menu = name;
                                return;
                            }
                        }
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

    .main {

        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        height: 100%;

        .left-container {

            width: 240px;
            height: 100%;

            .main-title {
                padding: 20px 0;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
            }

            .menu {
                height: calc(100% - 70px);
                box-shadow: 5px 0 5px rgba(0,0,0,.05);
            }
        }

        .right-container {
            /*padding: 30px 24px 0;*/
            /*margin: 70px 24px 0;*/
        }
    }

</style>
