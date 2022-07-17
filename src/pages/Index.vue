<template>
  <q-page>
    <q-card class="q-box q-mt-16 q-mh-24">
      <div class="text-h6 q-pt-16 q-pl-16">运行状态</div>
      <q-card-section>
        <div class="row">
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="red" text-color="white" icon="fa-solid fa-database"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">服务器</div>
                <div class="text-subtitle2 text-weight-bold">{{ server }}</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="green" text-color="white" icon="fa-solid fa-location-arrow"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">状态</div>
                <div class="text-subtitle2 text-weight-bold">{{ state }}</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="orange" text-color="white" icon="fa-solid fa-battery-full"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">行者电量</div>
                <div class="text-subtitle2 text-weight-bold">{{ battery_car }}</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="blue" text-color="white" icon="fa-solid fa-battery-full"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">鹰眼电量</div>
                <div class="text-subtitle2 text-weight-bold">{{ battery_drone }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {checkAuthorizeQRCode, checkServer, getState} from "src/request/api";
import store from "src/store";

export default {
  name: 'PageIndex',
  data: () => ({
    server: '',
    state: '',
    battery_car: '',
    battery_drone: '',
  }),
  methods: {
    checkServer() {
      checkServer().then(res => {
        if (res.data.code === 1) {
          this.server = '已连接'
        } else {
          this.server = '连接失败'
        }
      })
    },
    getState() {
      if (store.state.deviceCode !== '') {
        getState(store.state.deviceCode).then(res => {
          const mRes = res
          if (mRes.data.code === 1) {
            this.state = mRes.data.data.state
            this.battery_car = mRes.data.data.battery_car
            this.battery_drone = mRes.data.data.battery_drone
          } else {
            this.state = '获取失败'
            this.battery_car = '获取失败'
            this.battery_drone = '获取失败'
          }
        })
      }
    }
  },
  mounted() {
    document.title = "瞩暮行者维护端"
    setInterval(() => {
      setTimeout(() => {
        this.checkServer()
        this.getState()
      }, 0)
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>

.q-box {
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 10%) !important;
}
</style>
