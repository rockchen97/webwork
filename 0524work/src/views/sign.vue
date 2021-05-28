<template>
    <div class="login">
        <h3 class="title">后端注册</h3>
        <div>
            <el-form :model="user" :rules="rules" ref="user" label-width="80px" class="demo-user">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>   
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="学校" prop="school">
                    <el-input v-model="user.school"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="user.nickname"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="user.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="user.gender" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>


                <div class="loginMsg">
                    <span class="msg">已有账号？</span> <router-link to="/login" class="a-login">点击这里登录</router-link>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('user')">立即注册</el-button>
                    <el-button @click="resetForm('user')">重新输入</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import {post} from '../utils/fetch.js'
export default {
    name: 'login',
    data() {
      return {
        user: {
          username: '',
          password: '',
          school: '',
          nickname: '',
          age: '',
          gender:''
          
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '请输入学校', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.open();
            console.log(this.user)
            post('/user/regist',this.user)
            this.$router.push('/login');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open() {
        this.$message({
          message: '恭喜你，注册成功，马上跳转至登录界面...',
          type: 'success'
        });
      },
    }
}

</script>

<style lang="scss" scoped>
    .login{
        width: 400px;
        height: auto;
        top: 50px;
        padding: 20px;
        box-shadow:0 0 5px 2px #999;
        border-radius: 25px;
        position: relative;
        margin: 0 auto;
        text-align: center;

        .title{
            margin: 20px auto;
        };
        .loginMsg{
            margin-bottom: 20px;
            .msg{
                font-size: 12px;
                color: #8f9090;
            }
            .a-login{
                text-decoration: none;
                font-size: 12px;
                color: #505050;
            }
        }

    }
</style>