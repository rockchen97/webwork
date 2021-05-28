<template>
    <div class="box">
        <div class="left"></div>
        <div class="right">
            <div class="top">
                <h3 class="top-tit">商品管理</h3>
                <el-button type="primary" plain class="topbtn" @click="clear()">退出</el-button>
            </div>
            <div class="proList">
                <el-button type="primary" icon="el-icon-edit" class="addBtn" @click="newItemVisible=true">增加</el-button>
                <div class="list">
                    <el-table :data="proList" border style="width: 100%" :key="infoKey">
                        <el-table-column prop="_id" label="ID" width="200"></el-table-column>
                        <el-table-column prop="name" label="商品名称" width="400"></el-table-column>
                        <el-table-column prop="img" label="商品图片" width="200">
                            <template slot-scope="scope">
                                <img :src="scope.row.image" alt="" style="width: 180px; height; 120px">
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="250">
                            <template slot-scope="scope">
                                <el-button  @click="handleClick(scope.row, scope.$index), dialogFormVisible = true" icon="el-icon-edit">编辑</el-button>
                                <el-popconfirm
                                confirm-button-text='删除'
                                @confirm="delItem(scope.row)"
                                cancel-button-text='暂时不用'
                                icon="el-icon-info"
                                icon-color="red"
                                title="这件商品确定删除吗？">
                                <el-button type="danger" icon="el-icon-delete" slot="reference" >删除</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 增加商品弹框 -->
        <el-dialog title="新增商品" :visible.sync="newItemVisible">
            <el-form :model="newItem">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="newItem.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="newItem.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品图片地址" :label-width="formLabelWidth">
                    <el-input v-model="newItem.image" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newItemVisible = false">取 消</el-button>
                <el-button type="primary" @click="addItem(), newItemVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹框 -->
        <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
            <el-form :model="item">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="item.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="item.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" :label-width="formLabelWidth">
                    <el-input v-model="item.image" autocomplete="off"></el-input>
                    <!-- https://by-image.oss-cn-shanghai.aliyuncs.com/yfront/static/home/new/pic_dating1_sy.png -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeItem(), dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { get, put, post, del} from '../utils/fetch.js'
export default {
    name: 'management',
    data() {
        return {
            proList: [
                {
                _id: '',
                name: '',
                price: '',
                image: ''
                },
            ],
            newItem: {
                name: '',
                price: '',
                image: ''
            },
            item: {
                _id: '',
                name: '',
                price: '',
                image: ''
            },
            dialogFormVisible: false,
            newItemVisible: false,
            formLabelWidth: '120px',
            index: '',
            infoKey: true,
        }
    },
    created() {
        this.getList();
        
    },
    methods: {
        // 退出函数
        clear(){
            window.localStorage.removeItem('id');
            location.reload();
        // this.$router.go(0);
        },
        async getList(){
            const data = await get('/admin/shopList');
            console.log('获取的data===>',data);
            this.proList = JSON.parse(JSON.stringify(data))
            // this.proList = Object.assign(data)
        },
        handleClick(row, index){
            // console.log('this.row==>',row);
            // console.log('this row.index==>',index);
            // console.log(this.proList)
            this.index = index;
            // this.item = JSON.parse(JSON.stringify(row))
            this.item.name = row.name
            this.item._id = row._id
            this.item.price = row.price
            this.item.image = row.image
            console.log('赋值后的item==>',this.item) 
        },
        changeItem(){
            
            this.proList[this.index] = JSON.parse(JSON.stringify(this.item))
            // console.log('更改后的item==>',this.item) 
            // console.log('更改后的proList==>',this.proList)
            this.infoKey = !this.infoKey;
            put('/admin/shopItem', {
                data: this.item
            })
        },
        async addItem() {
            await post('/admin/shopItem', this.newItem);
            await this.getList();
            this.infoKey = !this.infoKey;
            
        },
        async delItem(row){
            console.log('id--->',row._id)
            await del('/admin/shopItem', {id: row._id})
            await this.getList();
            this.infoKey = !this.infoKey;
        },

    },
}
</script>


<style lang="scss" scoped>
    
    .box{
        height: auto;
        position: relative;
        
        .left{
            width: 50px;
            height: 900px;
            left: 0;
            position: absolute;
            background-color: black;
            z-index: 1;
            margin: 0; 
        }
        .right{
            height: auto;
            position: relative;
            right: 0;

            .top{
                width: 100%;
                height: 60px;
                position: absolute;
                top: 0;
                box-shadow: 0 0 5px 2px rgb(192, 191, 191);
                .top-tit{
                    line-height: 60px;
                    margin: 0 0 0 70px;
                }
                .topbtn{
                    position: absolute;
                    right: 70px;
                    top: 10px;
                }
            }
            .proList{
                width: 100%;
                height: 600px;
                top: 60px;
                position: absolute;
                
                .addBtn{
                    top: 20px;
                    left: 70px;
                    position: absolute;
                }
                .list{
                    top: 80px;
                    left: 70px;
                    position: absolute;
                }
            }
        }
    }
</style>