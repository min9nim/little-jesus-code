<template lang="pug">
.home(v-loading='state.loading')
  h3 코드매핑({{$store.state.students.length}})
  .students
    .student(v-for="(student, index) in $store.state.students" :key="student._id" v-loading="student.loading")
      el-input.input-student-name(
        v-show="student.editable"
        v-model="student.name"
        :ref="student._id"
        size="mini"
        @keyup.enter.native="handleStudentNameConfirm(student)"
        @blur="handleStudentNameConfirm(student)"
      )
      el-tag.studentName(
        v-show="!student.editable"
        @click="handleStudentClick(student)"
      ) {{student.name}}
  .new-student
    el-input.input-new-tag(
      v-if="state.inputVisible"
      v-model="state.newStudentName"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="$refs.saveTagInput.blur"
      @blur="handleInputConfirm"
    )
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {
  useState,
  IState,
  useHandleInputConfirm,
  useHandleStudentClick,
  useHandleStudentNameConfirm,
} from './code.fn'
import {remove, equals, propEq, eqProps} from 'ramda'
import {exclude} from 'mingutils'
import useIntervalCall from 'interval-call'

const intervalCall = useIntervalCall(1000)

export default {
  name: 'v-student',
  setup(props: any, {root, refs}: any) {
    const state: IState = useState()
    // @ts-ignore
    const handleStudentClick = useHandleStudentClick({root, refs})
    // @ts-ignore
    const handleInputConfirm = useHandleInputConfirm(state, root)
    const handleStudentNameConfirm = useHandleStudentNameConfirm(state)
    return {
      state,
      handleInputConfirm,
      handleStudentNameConfirm: intervalCall(handleStudentNameConfirm),
      handleStudentClick,
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  h3 {
    margin-top: 0;
  }

  // margin: 0 10px;
  padding: 5px;
  text-align: left;

  .students {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .student {
      display: inline-block;
      margin: 3px 4px;

      .input-student-name {
        display: inline-block;
        width: 70px;
        height: 32px;
        margin-left: 0;
        vertical-align: bottom;
      }

      .studentName {
        cursor: pointer;

        h4 {
          margin: 10px 0 3px 0;
        }
      }
    }
  }

  .new-student {
    margin: 10px 10px 0 3px;

    .input-new-tag {
      width: 90px;
      margin-left: 0;
      vertical-align: bottom;
    }
  }
}
</style>
