<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input class="input" clearable placeholder="请输入用户名"></el-input>
      <el-input class="input" clearable show-password placeholder="请输入密码"></el-input>
      <div class="btn-login" >
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
      login(){
          this.$router.push("/")
      }
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(left, #563544, #2F3D60);
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.con {
  width: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.input {
  margin-bottom: 20px;
}
.btn-login {
  text-align: center;
}
</style>