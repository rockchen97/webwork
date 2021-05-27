<template>
    <div class="box">
        <div class="item" v-for="(item, index) in recordList" :key="index">
            <div class="item-name">
                {{item.name}}
            </div>
            <div class="extime">{{item.exchangeDate | formatDate}}</div>
        </div>
    </div>
</template>

<script>
import { get } from '../utils/fetch.js'
export default {
    name: 'record',
    data() {
        return {
            recordList: [],
            timeDate:new Date()
        }
    },
    created(){
        this.getExList()
    },
    methods: {
        async getExList(){
            let id = JSON.parse(localStorage.getItem('id'))
            const data = await get('/shop/exchangedRecord',id)
            console.log(data)
            this.recordList = JSON.parse(JSON.stringify(data))
        },
        
        
    },
    filters: {
        
        formatDate: function (val) {
            var padDate=function(va){
                va=va<10?'0'+va:va;
                return va
            }
            var value=new Date(val);
            var year=value.getFullYear();
            var month=padDate(value.getMonth()+1);
            var day=padDate(value.getDate());
            var hour=padDate(value.getHours());
            var minutes=padDate(value.getMinutes());
            var seconds=padDate(value.getSeconds());
            return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
 
        },
    },
    
}
</script>

<style lang="scss" scoped>
    
    .item{
        width: 100%;
        height: 80px;
        margin: 40px 0px 10px;
        position: relative;
        .item-name{
            width: 600px;
            height: 60px;
            margin-left: 40px;
            position: absolute;
            left: 0;
            color: #4e4e4e;
            font-size: 16px;
            
        };
        .extime{
            width: 170px;
            height: 60px;
            margin-right: 40px;
            position: absolute;
            left: 700px;
            color: #bbbbbb;
        };
    }
</style>
