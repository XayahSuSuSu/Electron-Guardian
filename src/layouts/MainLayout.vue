<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-black q-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          瞩暮行者
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      bordered
      dense
      content-class="bg-grey-1"
    >
      <q-list dense>
        <div class="q-mt-md q-mb-md">
          <div class="flex flex-direction-horizontal flex-center-vertical q-ml-md">
            <q-avatar font-size="36px" icon="fa-solid fa-user"/>
            <div class="flex-direction-vertical q-ml-md">
              <q-item-label class="text-h6 ">
                admin
              </q-item-label>
              <q-item-label class="text-grey-8 text-subtitle2 ">
                超级管理员
              </q-item-label>
            </div>
            <q-btn round dense size="xs" flat icon="fa-solid fa-arrow-right-from-bracket"
                   style="margin-right: 6px;padding: 12px;margin-left: auto"/>
          </div>
        </div>
        <q-separator/>
        <div class="q-mt-xs q-pl-xs q-pr-xs">
          <q-item
            clickable
            v-ripple
            :key="i.title"
            v-for="i in menu"
            :active="menuActive === i.title"
            @click="menuActive = i.title"
            class="menu-item q-mt-xs"
            active-class="menu-item-active"
          >
            <q-item-section avatar>
              <q-icon :name="i.icon" size="xs"/>
            </q-item-section>
            <q-item-section>{{ i.title }}</q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>
    <q-dialog v-model="alert" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">设备授权</div>
        </q-card-section>

        <q-card-section>
          <q-img width="300px" height="300px" :src="qrCode"/>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import store from 'src/store/index'
import address, {checkAuthorizeQRCode, getAuthorizeQRCode} from "src/request/api";

const menuList = [
  {
    title: '主页',
    icon: 'fa-solid fa-house',
  },
  {
    title: '设备管理',
    icon: 'fa-solid fa-desktop',
  },
];

export default {
  name: 'MainLayout',
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      menu: menuList,
      menuActive: '主页',
      alert: true,
      qrCode: '',
      qrId: '',
      refreshTime: 1000
    }
  },
  methods: {},
  mounted() {
    this.alert = store.state.deviceCode === ''
    if (this.alert)
      getAuthorizeQRCode().then(res => {
        const mRes = res
        this.qrCode = address + "/" + mRes.data.data.url
        this.qrId = mRes.data.data.id
      })
  },
  created() {
    const check = setInterval(() => {
      setTimeout(() => {
        checkAuthorizeQRCode(this.qrId).then(res => {
          const deviceCode = res.data.data['device_code']
          if (deviceCode !== '') {
            store.commit('setDeviceCode', deviceCode)
            console.log(store.state.deviceCode)
            this.alert = false
            clearInterval(check)
          }
        })
      }, 0)
    }, this.refreshTime)

  }
}
</script>
<style lang="scss" scoped>
@import "src/css/quasar.variables.scss";

.q-toolbar {
  background: $gray;
}

.menu-item {
  border-radius: 32px
}

.menu-item-active {
  color: #3476d3;
  background: #e5effa;
  border-radius: 32px
}
</style>
