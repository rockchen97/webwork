<template>
    <div>
        <div class="center-top">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                
                <el-menu-item index="1" @click="goTo('/user/center/info')">个人信息</el-menu-item>
                
                <el-menu-item index="2" @click="goTo('/user/center/record')">兑换记录</el-menu-item>

                
            </el-menu>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'center',
    data() {
        return {
            activeIndex: '1',
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goTo(path){
          this.$router.replace(path)
      }
    },
}
</script>

<style lang="scss" scoped>
.center-top{
    margin-top: 10px;
}

</style>