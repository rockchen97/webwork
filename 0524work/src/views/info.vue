<template>
    <div class="info-box">
        <div class="user-avatar">
            <img :src=user.avatar alt="avatar" class="ava-img">
        </div>
        <div class="user-info">
            <div class="half-info">
                <div class="info-item">姓名：{{user.username}}</div>
                <div class="info-item">昵称：{{user.nickname}}</div>
                <div class="info-item">密码：******
                    <el-button type="text" style="margin-left:10px" @click="dialogFormVisible = true">修改</el-button>
                </div>
            </div>
            <div class="half-info">
                <div class="info-item">学校：{{user.school}}</div>
                <div class="info-item">性别：{{sex}}</div>
            </div>
        </div>

        <!-- 修改密码弹框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { put } from '../utils/fetch.js'
export default {
    name: 'info',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {

        user: {},
        sex:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
                
        ruleForm: {
        pass: '',
        checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    created(){
        this.getLocal()
        this.getSex()
    },
    methods: {
        getLocal(){
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        // 显示性别
        getSex(){
            this.sex = this.user.gender=='0' ? '女' : '男'
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('密码已经修改，请重新登录！');
                    put('/user/changePassword',{
                        oldPassword: this.user.password,
                        newPassword: this.ruleForm.checkPass
                    });
                    this.clear();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 清除缓存
        clear(){
            localStorage.removeItem('id');
            localStorage.removeItem('user');
            location.reload();
        // this.$router.go(0);
        },
    },
}
</script>

<style scoped lang="scss">
.info-box{
    margin: 10px;
    
    position: relative;
    display: flex;
    .user-avatar{
        width: 250px;
        height: 400px;
        text-align: center;
        
        .ava-img{
            width: 90px;
            height: 90px;
            margin: 20px auto;
            border-radius: 50%;
        }
    };
    .user-info{
        width: 400px;
        height: 400px;
        position: relative;
        display: flex;
        .half-info{
            width: 200px;
            height: 400px;
            .info-item{
                margin: 20px 40px 10px 15px;
            }
        }
    }
}
</style>