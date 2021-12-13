<template lang="">
<Toast/>
    <div class="login-bg">

        <div class="login-box">
  <h2>Register</h2>
  <form @submit.prevent="userLogin">
    <div class="user-box">
      <input type="text" name="" required="" v-model="name">
      <label>Name</label>
    </div>
    <div class="user-box">
      <input type="text" name="" required="" v-model="username">
      <label>User Name</label>
    </div>
    <div class="user-box">
      <input type="text" name="" required="" v-model="email">
      <label>Email</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="" v-model="password">
      <label>Password</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="" v-model="confirmPassword">
      <label>Confirm Password</label>
    </div>
    

    <a href="#" @click="userRegister">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
</div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      api: process.env.VUE_APP_API_LOGIN,
      email: "",
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    ...mapState([
      // ...
      "status",
    ]),
  },
  methods: {
    ...mapActions(["register"]),
    async userRegister() {
      //console.log(this.api);
      if (this.confirmPassword !== this.password) {
        this.$toast.add({
          severity: "error",
          summary: "password not matched",
          life: 3000,
        });
      } else {
        let user = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
        };
        await this.register(user)
          .then(() => {
            this.$router.push("/login");
            this.$toast.add({
              severity: "success",
              summary: "Login Succesful",
              life: 3000,
            });
          })
          .catch((err) => {
            //console.log(err)
            this.$toast.add({
              severity: "error",
              summary: "Registration failed",
              life: 3000,
            });
          });
      }
    },
  },
};
</script>
<style lang="css">
/*html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}*/
.login-bg {
  margin: auto;
  padding: 57px;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
  /*background: linear-gradient(#141e30, #243b55d6);*/
  padding-bottom: 57px;
  width: 500px;
  border-radius: 12px;
  margin-top: 5%;
}
.login-box {
  margin: auto;
  /*width: 400px;*/
  padding: 40px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>