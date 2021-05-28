<template>
    <div class="login">
        <h3 class="title">后端登录</h3>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>

                <div class="signMsg">
                    <span class="msg">还未注册？</span> <router-link to="/sign" class="a-sign">点击这里注册</router-link>
                </div>

                <el-form-item>
                  <!--  -->
                    <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重新输入</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    name: 'login',
    data() {
      return {
        id: '',
        user: {},
        ruleForm: {
          username: '',
          password: '',
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
          
        }
      };
    },
    methods: {
    ...mapMutations(['changeId']),
      
      // 设置登录条件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
            // console.log('sotre中user',this.$store.state.user);
            // this.$router.push('/home');
          } else {
            this.close();
            console.log('错误，重新填写');
            return false;
          }
        });
      },
      // 清除输入框
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // success弹框
      open() {
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        });
      },
      close() {
        this.$message({
          message: '密码或用户名错误，请重新填写',
          type: 'error'
        });
      },
      // 本地缓存user数据
      storage(){
        localStorage.setItem("user", JSON.stringify(this.$store.state.user));
        
      },
      // login
      login () {
        axios({
            url: 'http://49.235.98.65:3000/user/login',
            method: 'POST',
            data : this.ruleForm,
            haders: {
            // user: '60a89d3756ae60584bb0b37b'
            // 'content-type' : 'application/x-www-form-urlencoded'
            }
        }).then( res=> {
            // console.log('login 结果', res);
            console.log('login user', res.data);
            // console.log('login id', res.data.user._id);
            this.$store.state.user.username = JSON.parse(JSON.stringify(res.data.user.username))
            this.$store.state.user.password = JSON.parse(JSON.stringify(res.data.user.password))
            this.$store.state.user.nickname = JSON.parse(JSON.stringify(res.data.user.nickname))
            this.$store.state.user.age = JSON.parse(JSON.stringify(res.data.user.age))
            this.$store.state.user.school = JSON.parse(JSON.stringify(res.data.user.school))
            this.$store.state.user.gender = JSON.parse(JSON.stringify(res.data.user.gender))
            this.$store.state.user.avatar = JSON.parse(JSON.stringify(res.data.user.avatar))
            this.id =JSON.parse(JSON.stringify(res.data.user._id))
            this.$store.state.id =JSON.parse(JSON.stringify(res.data.user._id))
            this.storage();
            this.changeId({id: res.data.user._id});
            this.open();
            console.log('id-->',this.$store.state.id);
            this.$router.push('/management');
          }).catch( err=> {
            this.close();
              console.log("login err", err);
          })
      },
      
    }
}

</script>

<style lang="scss" scoped>
    .login{
        width: 400px;
        height: auto;
        top: 100px;
        padding: 20px;
        box-shadow:0 0 5px 2px #999;
        border-radius: 25px;
        position: relative;
        margin: 0 auto;
        text-align: center;
        .title{
            margin: 20px auto;
        };
        .signMsg{
            margin-bottom: 20px;
            .msg{
                font-size: 12px;
                color: #8f9090;
            }
            .a-sign{
                text-decoration: none;
                font-size: 12px;
                color: #505050;
            }
        }

    }
</style>