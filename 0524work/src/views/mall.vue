
<template>
    <div class="record-box">
        <div class="jifen">
            积分：{{jifen}}
        </div>
        <h3 style="margin: 20px 40px;">商城</h3>
        <div class="pro-list">
            <div class="pro-item" v-for="(item, index) in proList" :key="index">
                <img :src=item.image alt="pro" class="pro-img">
                <p class="pro-name">{{item.name}}</p>
                <p class="pro-price"><i class="el-icon-coin"></i>{{item.price}}积分</p>
                <el-button size="mini" round class="pro-btn" @click="exchange(index)">兑换</el-button>
            </div>
            
        </div>
    </div>
</template>

<script>
import { get, put } from '../utils/fetch.js'
export default {
    name: 'mall',
    data() {
        return {
            jifen:'',
            proList: [],
        }
    },
    created(){
        this.getProList()
        this.getJifen()
    },
    methods: {
        // 获取积分余额
        getJifen(){
            
            if(JSON.parse(localStorage.getItem('jifen')) == ''){
                this.jifen = 500
            }else{
                this.jifen = JSON.parse(localStorage.getItem('jifen'))
            }
        },
        // 兑换商品
        exchange(index){
            let id = this.proList[index]._id
            let price = this.proList[index].price
            if(this.jifen >= price){
                this.jifen = this.jifen - price;
                localStorage.setItem('jifen', JSON.stringify(this.jifen));
                this.$store.commit('changeJifen', this.jifen)
                put('/shop/exchange', {id});
            }else{
                alert('积分余额不足！')
            }
        },
        // 获取商品列表
        async getProList() {
            const data = await get('/shop/shopList');
            
            this.proList = JSON.parse(JSON.stringify(data));
        }
    },
}
</script>

<style scoped lang="scss">
.record-box{
    width: auto;
    height: auto;
    position: relative;
    .jifen{
        width: 900px;
        height: 200px;
        margin: 20px 40px;
        background-image: url(../images/back.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        color: white;
        text-align: center;
        line-height: 200px;
        font-size: 30px;
    }
    .pro-list{
        width: 900px;
        height: auto;
        position: relative;
        flex-wrap: wrap;
        margin: 20px 40px;
        float: left;
        .pro-item{
            width: 200px;
            height: 300px;
            margin: 0px 20px 10px 0px;
            display: inline-block;
            position: relative;
            box-shadow: 0 0 10px 1px #e3e4e5;
            border-radius: 10px;
            .pro-img{
                width: 200px;
                height: 220px;
                position: absolute;
                border-radius: 10px;
            };
            .pro-name{
                width: 200px;
                height: 30px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin: 0 5px;
                top: 230px;
                position: absolute;
            }
            .pro-price{
                position: absolute;
                margin-left: 10px;
                bottom: 0;
                left: 0;
                color: lightskyblue;
            };
            .pro-btn{
                position: absolute;
                margin-right: 10px;
                bottom: 10px;
                right: 0;
            }
            
        }
    }
}
</style>