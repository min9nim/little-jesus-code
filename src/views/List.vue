<template lang="pug">
  .main
    h4 이번 주 출석한 친구들({{$store.state.points.length}})
    .list
      .student(v-for="point in $store.state.points")
        el-tag {{$store.getters.studentMap[point.owner].name}}
</template>

<script lang="ts">
import createLogger from 'if-logger'
import {resetCaches} from 'graphql-tag'
import {reactive, computed} from '@vue/composition-api'

const logger = createLogger().addTags('List.vue')
export default {
  name: 'v-list',
  // setup(props, {root}) {
  //   const state = reactive({
  //     studentMap: computed(() => root.$store.getters['studentMap']),
  //   })
  // },
}
</script>
<style scoped lang="stylus">
.main {
  margin: 10px;

  h4 {
    margin: 0 0 10px 0;
  }

  .student {
    margin: 3px 5px;
    display: inline-block;
  }
}
</style>
