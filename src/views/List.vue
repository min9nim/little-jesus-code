<template lang="pug">
  .main
    h3 출석한 친구들
    .list
      .student(v-for="point in $store.state.points")
        el-tag {{studentMap[point.owner].name}}
</template>

<script lang="ts">
import createLogger from 'if-logger'

const logger = createLogger().addTags('List.vue')
export default {
  name: 'v-list',
  data() {
    const studentMap = this.$store.getters.studentMap
    return {
      studentMap,
    }
  },
}
</script>
<style scoped lang="stylus">
.main {
  margin: 10px;

  .student {
    margin: 5px;
    display: inline-block;
  }
}
</style>
