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
                <div class="text-subtitle2 text-weight-bold">已连接</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="green" text-color="white" icon="fa-solid fa-location-arrow"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">状态</div>
                <div class="text-subtitle2 text-weight-bold">居家</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="orange" text-color="white" icon="fa-solid fa-battery-full"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">行者电量</div>
                <div class="text-subtitle2 text-weight-bold">80%</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex flex-direction-horizontal">
              <q-avatar rounded color="blue" text-color="white" icon="fa-solid fa-battery-full"/>
              <div class="flex-direction-vertical q-ml-8">
                <div class="text-subtitle1">鹰眼电量</div>
                <div class="text-subtitle2 text-weight-bold">90%</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-img id="code"/>
  </q-page>
</template>

<script>
import {BrowserQRCodeSvgWriter} from "@zxing/library";
import crypto from 'crypto'

export default {
  name: 'PageIndex',
  data: () => ({}),
  methods: {
    createCodeFn() {
      const codeWriter = new BrowserQRCodeSvgWriter();
      const timestamp = Date.now()
      const md5 = crypto.createHash("md5");
      md5.update(timestamp.toString());
      const code = md5.digest('hex');
      const device = {
        'timestamp': timestamp,
        'code': code
      }
      codeWriter.writeToDom("#code", JSON.stringify(device), 300, 300);
    },
  },
  mounted() {
    document.title = "瞩暮行者维护端"
    this.createCodeFn()
  }

}
</script>
<style lang="scss" scoped>

.q-box {
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 10%) !important;
}
</style>
