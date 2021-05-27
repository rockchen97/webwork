<template>
    <div>
        <div class="loginBox">
            <div class="leftImg">
                <img src="../images/auth.png" alt="" class="showImg">
            </div>
            <div class="userLogin">
                <h3 class="tit">用户登录</h3>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>

                    <div class="sign2Msg">
                        <span class="msg2">还未注册？</span> <router-link to="/sign2" class="a-sign2">点击这里注册</router-link>
                    </div>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重新输入</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
    name:'login2',
    data() {
      return {
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
            // console.log('登录信息',this.ruleForm);
            this.login();
            // console.log('sotre中user',this.$store.state.user);
            // this.$router.push('/home');
          } else {
            this.close();
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
            console.log('id-->',this.$store.state.id);
            this.open();
            this.$router.push('/user');
          }).catch( err=> {
              console.log("login err", err);
              this.close();
          })
      },
      
    
    },
}
</script>

<style scoped lang="scss">
.loginBox{
    width: 800px;
    height: auto;
    margin: 50px auto 0;
    box-shadow: 0 0 5px -1px #666;
    border-radius: 10px;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    
    .leftImg{
        width: 340px;
        position: relative;
        
        .showImg{
            width: 300px;
            height: 400px;
            margin: 20px;
        }
    }

    .userLogin{
        width: 400px;
        text-align: center;
        .sign2Msg{
            margin-bottom: 20px;
            .msg2{
                font-size: 12px;
                color: #8f9090;
            }
            .a-sign2{
                text-decoration: none;
                font-size: 12px;
                color: #505050;
            }
        }
    }

}
</style>