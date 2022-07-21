<template>
  <q-page>
    <div class="q-col-gutter-md row items-start q-pl-lg q-pr-lg q-pb-lg">
      <div v-for="i in mapList"
           :key="i.path"
           class="col-3">
        <q-img
          :src="i.path"
          style="border-radius: 12px">
          <div class="absolute-bottom text-center">
            <q-btn class="q-ml-md  text-subtitle2 text-weight-bold" flat label="删除" @click="deleteMap(i.path)"/>
          </div>
        </q-img>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar color="negative" icon="fa-solid fa-circle-exclamation" text-color="white"/>
          <span class="q-ml-sm">确定移除该地图吗？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" flat label="取消"/>
          <q-btn v-close-popup color="primary" flat label="确定" @click="deleteMapOnConfirm"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import address, {deleteMap, getMap} from "src/request/api";

import store from "src/store";

export default {
  name: 'PageIndex',
  data: () => ({
    mapList: [],
    confirm: false,
    currentPath: ''
  }),
  methods: {
    deleteMapOnConfirm() {
      let data = new FormData();
      data.append('path', this.currentPath.replace(address + '/', '').replace('.png', '.pgm'));
      deleteMap(data).then(() => {
        this.getMap()
      })
    },
    deleteMap(path) {
      this.confirm = true
      this.currentPath = path
    },
    getMap() {
      getMap(store.state.deviceCode).then(res => {
        this.mapList = []
        const list = res.data.data
        for (const i in list) {
          this.mapList.push({
            path: address + '/' + list[i]['path'].replace('.pgm', '.png'),
          })
        }
      })
    }
  },
  mounted() {
    this.getMap()
  }
}
</script>
<style lang="scss" scoped>
</style>
