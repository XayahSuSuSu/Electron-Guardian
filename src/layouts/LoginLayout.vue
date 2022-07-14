<template>
  <q-layout class="q-pt-24 q-pb-24">
    <q-card class="flex flex-direction-vertical flex-center-vertical q-box q-mh-24">
      <q-img :src="logo" class="q-mt-48" style="height: 80px; width: 160px"/>
      <div class="text-h5 login-title q-mt-24">登录</div>
      <q-input v-model="username" class="q-mt-12" label="用户名"/>
      <q-input v-model="password" type="password" class="q-mt-12" label="密码"/>
      <q-btn round padding="md" size="md" color="negative" class="q-mv-24" @click="openMainWindow"
             icon="fa-solid fa-arrow-right-to-bracket"/>
    </q-card>
    <q-dialog v-model="error" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fa-solid fa-circle-exclamation" color="negative" text-color="white"/>
          <span class="q-ml-sm">{{ msg }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
import logo from "src/assets/logo.png"
import {ipcRenderer} from 'electron'
import {login} from "src/request/api";
import crypto from "crypto";

export default {
  name: 'LoginLayout',
  components: {},
  data() {
    return {
      logo: logo,
      username: '',
      password: '',
      error: false,
      msg: ''
    }
  },
  methods: {
    saveAccount() {
      const saveDate = new Date()
      const saveDay = 7
      saveDate.setTime(saveDate.getTime() + 24 * 60 * 60 * 1000 * saveDay)
      window.document.cookie = 'username' + '=' + this.username + ';path=/;expires=' + saveDate.toGMTString()
      window.document.cookie = 'password' + '=' + this.password + ';path=/;expires=' + saveDate.toGMTString()
    },
    getAccount() {
      const cookies = window.document.cookie.split('; ')
      for (const i in cookies) {
        const item = cookies[i].split('=')
        if (item[0] === 'username') {
          this.username = item[1]
        } else if (item[0] === 'password') {
          this.password = item[1]
        }
      }
    },
    openMainWindow() {
      const md5 = crypto.createHash("md5");
      md5.update(this.password);
      let data = new FormData();
      data.append('username', this.username);
      data.append('password', md5.digest('hex'));
      login(data).then(res => {
        const mRes = res
        if (mRes.data.code === 1) {
          this.saveAccount()
          ipcRenderer.send('closeLoginWindow')
          ipcRenderer.send('openMainWindow')
        } else {
          // 登录失败
          this.error = true
          this.msg = mRes.data.msg
        }
      })
    }
  },
  mounted() {
    document.title = "登录"
    this.getAccount()
  }
}
</script>
<style lang="scss" scoped>
@import "src/css/quasar.variables.scss";

.q-toolbar {
  background: $gray;
}

.q-box {
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 10%) !important;
}

.login-title {
  display: flex;
  align-items: center;
  color: #000000;
}

.login-title:before {
  border-bottom: 5px solid #ed2553;
  content: '';
  width: 48px;
  display: block;
  margin: 0.5em 1rem;
  height: 1px;
}

.login-title:after {
  border-bottom: 5px solid #ed2553;
  content: '';
  width: 48px;
  display: block;
  margin: 0.5em 1rem;
  height: 1px;
}
</style>
