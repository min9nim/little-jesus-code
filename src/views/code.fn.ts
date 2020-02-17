import {reactive} from '@vue/composition-api'
import {IStudent} from '../biz/type'
import {req} from '@/utils'
import {qUpdateStudent} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'
import createLogger from 'if-logger'

const logger = createLogger().addTags('code.fn.ts')

export interface IState {
  loading: boolean
  inputVisible: boolean
  newStudentName: string
}

export function useState(): IState {
  return reactive<IState>({
    loading: false,
    inputVisible: false,
    newStudentName: '',
  })
}

export function useHandleInputConfirm(state: IState, root) {
  return async () => {
    try {
      if (state.newStudentName) {
        state.loading = true
        root.$store.dispatch('addStudent', {name: state.newStudentName})
        state.loading = false
        // @ts-ignore
        Notification.success({
          message: state.newStudentName + ' 어린이 추가 완료',
          position: 'bottom-right',
        })
      }
      state.inputVisible = false
      state.newStudentName = ''
    } catch (e) {
      state.loading = false
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}

export function useHandleStudentClick({root, refs}: any) {
  return (student: IStudent) => {
    // @ts-ignore
    logger.addTags('useHandleStudentClick').debug(student)
    student.editable = true
    root.$nextTick(() => {
      // console.log(refs, student._id, refs[student._id])
      refs[student._id][0].$refs.input.focus()
    })
  }
}

export function useHandleStudentNameConfirm(state: IState) {
  return async (student: IStudent) => {
    try {
      if (student.no) {
        student.loading = true
        await req(qUpdateStudent, {_id: student._id, no: student.no})
        student.loading = false
        // @ts-ignore
        Notification.success({
          message: student.name + '의 코드값(' + student.no + ') 수정 완료',
          position: 'bottom-right',
        })
      }
      student.editable = false
    } catch (e) {
      state.loading = false
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}
