<template lang="pug">
  .main(v-loading="state.loading")
    h4 이번 주 출석 현황({{state.checkedCount}}/{{$store.state.students.length}})
    .list
      .student(v-for="(student, idx) in $store.state.students" :key="idx")
        el-tag(:type="student.checked ? '' : 'info'") {{student.name}}
</template>

<script lang="ts">
import createLogger from 'if-logger'
import {reactive, computed, watch} from '@vue/composition-api'
import moment from 'moment'
import {propEq, length, filter} from 'ramda'
import {go} from 'mingutils'

const logger = createLogger().addTags('List.vue')
export default {
  name: 'v-list',
  setup(props, {root}) {
    const state = reactive({
      loading: true,
      checkedCount: computed(() =>
        go(root.$store.state.students, filter(propEq('checked', true)), length),
      ),
      today: moment()
        .startOf('week')
        .format('MM/DD'),
    })
    watch(
      () => root.$store.state.students.length,
      () => {
        if (root.$store.state.students.length > 0) {
          state.loading = false
        }
      },
    )
    return {
      state,
    }
  },
}
</script>
<style scoped lang="stylus">
.main {
  margin: 10px;

  h4 {
    margin: 0 0 10px 0;
  }

  .student {
    margin: 3px 10px 3px 0;
    display: inline-block;
  }
}
</style>
