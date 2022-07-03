<template>
  <div id="q-app" class="q-main-root">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
@import "src/css/quasar.variables.scss";

.q-main-root {
  background: $gray;
}
</style>
