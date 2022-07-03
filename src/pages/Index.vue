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
                <div class="text-subtitle1">小鹰电量</div>
                <div class="text-subtitle2 text-weight-bold">90%</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
<style lang="scss" scoped>

.q-box {
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 10%) !important;
}
</style>
