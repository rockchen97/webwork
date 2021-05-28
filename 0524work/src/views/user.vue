<template>
    <div class="box">
        <div class="left-btn">
            <div class="avatar-img">
                <img :src=user.avatar alt="" class="avatar">
            </div>
            <div class="nick">昵称：{{user.nickname}}</div>
                <router-link to="/user/center">
                    <div class="center-btn" @click="change(1)" :class="num===1?'changeBtn':'listBtn'">个人中心</div>
                </router-link>
            <router-link to="/user/mall">
                <div class="center-btn2 " @click="change(2)" :class="num===2?'changeBtn':'listBtn'">积分商城</div>
            </router-link>
            <router-link to="/login2">
                <div class="center-btn3" @click="change(3), clear()" :class="num===3?'changeBtn':'listBtn'">退出</div>
            </router-link>
            
        </div>
        <div class="right-box">
            <div class="user-title">
                <h4 class="tit">{{this.title}}</h4>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user',
    data() {
        return {
            num: 1,
            titleList: ['个人中心','积分商城'],
            title: '个人中心',
            user: {}
        }
    },
    created(){
        this.getLocal()
    },
    methods: {
        clear(){
            window.localStorage.removeItem('id');
            location.reload();
        // this.$router.go(0);
        },
        getLocal(){
            this.user = JSON.parse(localStorage.getItem('user'))
            console.log(this.user)
        },
        change(index) {
            this.num = index
            this.title = this.titleList[index-1]
        }
    },
}
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
        color: white;
    }
    .box{
       position: relative;
       display: flex;

        .right-box{
            width: 70%;
            right: 0;
            position: relative;
            .user-title{
                height: 60px;
                box-shadow: 0px 0px 5px 0px gray;
                position: relative;
                .tit{
                    margin: 0;
                    line-height: 70px;
                    position: absolute;
                    left: 40px;
                }
            }
        }

       .left-btn{
        width: 30%;
        height: 800px;
        left: 0;
        background-color: rgb(60, 60, 60);
        position: relative;
        .nick{
            text-align: center;
            color: white;
            margin: 35px auto 20px;

        };
        .avatar-img{
            width: 100%;
            height: 150px;
            text-align: center;
            position: relative;
            .avatar{
                width: 80px;
                height: 80px;
                top: 80px;
                margin:90px auto 0;
                display: inline-block;
                border-radius: 50%;
            }
        };

        .listBtn{
            width: 100%;
            height: 60px;
            color: white;
            text-align: center;
            line-height: 60px;
        }
        .changeBtn{
            width: 100%;
            height: 60px;
            color: white;
            text-align: center;
            line-height: 60px;
            background-color: darkviolet;
        }
        .listBtn:hover{
            background-color: rgb(120, 120, 120);
        }
        .center-btn{
            position: absolute;
            top: 220px;
        }
        .center-btn2{
            position: absolute;
            top: 280px;
        }
        .center-btn3{
            position: absolute;
            top: 340px;
        }
        

    } 
}
</style>