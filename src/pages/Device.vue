<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="设备管理（模拟）"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width/>
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" round flat dense @click="showQRCode(props)" icon="fa-solid fa-qrcode"/>
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-btn @click="addDevice" round color="red" size="lg"
           style="position: absolute;left:0;right: 0;bottom: 40px;margin:0 auto;"
           icon="add"/>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">出厂二维码</div>
        </q-card-section>
        <q-card-section>
          <q-img width="300px" height="300px" :src="qrCode"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import api, {addDevice, getDevices} from "src/request/api";
import address from "src/request/api";

export default {
  name: 'PageIndex',
  data: () => ({
    columns: [
      {
        name: 'factoryDate',
        required: true,
        label: '出厂日期',
        align: 'left',
        field: 'factoryDate',
        sortable: true
      },
      {name: 'deviceCode', align: 'center', label: '设备码', field: 'deviceCode'},
      {name: 'bindState', align: 'center', label: '绑定状态', field: 'bindState', sortable: true},
    ],
    data: [],
    alert: false,
    qrCode: ''
  }),
  methods: {
    getDevices() {
      this.data = []
      getDevices().then(res => {
        const deviceList = res.data.data
        for (const i in deviceList) {
          this.data.push({
            factoryDate: deviceList[i]['factory_date'],
            deviceCode: deviceList[i]['device_code'],
            bindState: deviceList[i]['bind_state'],
            qrCodePath: deviceList[i]['qrcode_path']
          })
        }
      })
    },
    addDevice() {
      addDevice().then(res => {
        this.getDevices()
      })
    },
    showQRCode(props) {
      this.alert = true
      this.qrCode = address + "/" + props.row.qrCodePath
    }
  },
  mounted() {
    document.title = "瞩暮行者维护端"
    this.getDevices()
  }

}
</script>
<style lang="scss" scoped>

.q-box {
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 10%) !important;
}
</style>
