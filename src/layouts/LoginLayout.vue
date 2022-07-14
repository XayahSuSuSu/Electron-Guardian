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
  </q-layout>
</template>
<script>
import logo from "src/assets/logo.png"
import {ipcRenderer} from 'electron'

export default {
  name: 'LoginLayout',
  components: {},
  data() {
    return {
      logo: logo,
      username: '',
      password: ''
    }
  },
  methods: {
    openMainWindow() {
      ipcRenderer.send('closeLoginWindow')
      ipcRenderer.send('openMainWindow')
    }
  },
  mounted() {
    document.title = "登录"
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
