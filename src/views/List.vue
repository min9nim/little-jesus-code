<template lang="pug">
  .main
    h4 이번 주 출석한 친구들({{$store.state.points.length}}/{{$store.state.students.length}})
    .list
      .student(v-for="(student, idx) in $store.state.students" :key="idx")
        el-tag(:type="student.checked ? '' : 'info'") {{student.name}}
</template>

<script lang="ts">
import createLogger from 'if-logger'
import {reactive, computed} from '@vue/composition-api'

const logger = createLogger().addTags('List.vue')
export default {
  name: 'v-list',
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
