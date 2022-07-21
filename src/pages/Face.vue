<template>
  <q-page>
    <div class="q-col-gutter-md row items-start q-pl-lg q-pr-lg q-pb-lg">
      <div v-for="i in pictureList"
           :key="i.path"
           class="col-3">
        <q-img
          :src="i.path"
          style="border-radius: 12px">
          <div class="absolute-bottom text-center">
            <div class="text-center text-subtitle2 text-weight-bold">{{ i.name }}</div>
            <q-btn round dense size="xs" flat icon="fa-solid fa-trash-can" @click="deletePicture(i.path)"
                   style="padding: 8px"/>
          </div>
        </q-img>
      </div>
    </div>
    <input type="file" accept="image/*" style="display: none" ref="input" @change="upload"/>
    <q-btn @click="onUploadClick" round color="red" size="lg"
           style="position: absolute;left:0;right: 0;bottom: 40px;margin:0 auto;"
           icon="upload"/>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar color="negative" icon="fa-solid fa-circle-exclamation" text-color="white"/>
          <span class="q-ml-sm">确定移除该地图吗？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" flat label="取消"/>
          <q-btn v-close-popup color="primary" flat label="确定" @click="deletePictureOnConfirm"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">请命名照片</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="currentName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确定" @click="onUploadConfirm" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import address, {deletePictures, getPictures, uploadPictures} from "src/request/api";

import store from "src/store";

export default {
  name: 'PageIndex',
  data: () => ({
    pictureList: [],
    confirm: false,
    prompt: false,
    currentPath: '',
    currentName: '',
  }),
  methods: {
    deletePictureOnConfirm() {
      let data = new FormData();
      data.append('path', this.currentPath.replace(address + '/', ''));
      deletePictures(data).then(() => {
        this.getPictures()
      })
    },
    deletePicture(path) {
      this.confirm = true
      this.currentPath = path
    },
    getPictures() {
      getPictures(store.state.deviceCode).then(res => {
        this.pictureList = []
        const list = res.data.data
        for (const i in list) {
          this.pictureList.push({
            name: list[i]['name'],
            path: address + '/' + list[i]['path'],
          })
        }
      })
    },
    onUploadClick() {
      this.prompt = true
    },
    onUploadConfirm() {
      this.$refs.input.dispatchEvent(new MouseEvent('click'))
    },
    upload(e) {
      const file = this.$refs.input.files[0];
      let data = new FormData();
      data.append('name', this.currentName);
      data.append('device_code', store.state.deviceCode);
      data.append('file', file);
      uploadPictures(data).then(() => {
        this.getPictures()
      })
      e.target.value = ""
    }
  },
  mounted() {
    this.getPictures()
  }
}
</script>
<style lang="scss" scoped>
</style>
