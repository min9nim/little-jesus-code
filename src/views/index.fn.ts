import {createComponent, onBeforeMount, onMounted, watch, reactive} from '@vue/composition-api'
import {codeMap} from '../biz/codeMap'
import moment from 'moment'
import Swal from 'sweetalert2'
import {req} from '../utils'
import {qStudents, qCheckAttendance} from '../biz/query'
import {go} from 'mingutils'
import {prop, find, propEq} from 'ramda'
import intervalCall from 'interval-call'
import createLogger from 'if-logger'

const ALERT_TIMER = 2000

export function useCheck({state, root}) {
  return async function() {
    const logger = createLogger().addTags('check')
    const l = logger.addTags('check')
    if (!state.input) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'The code is empty',
        showConfirmButton: true,
        timer: ALERT_TIMER,
      })
      return
    }
    // const name = isNaN(Number(this.input)) ? this.input : codeMap[this.input]
    let student
    if (isNaN(Number(state.input))) {
      student = root.$store.state.students.find(propEq('name', state.input))
    } else {
      student = root.$store.state.students.find(propEq('no', state.input))
    }
    if (!student) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'The name of code(' + state.input + ') is not found',
        showConfirmButton: true,
        timer: ALERT_TIMER,
      })
      state.input = ''
      return
    }
    l.info('matched:', student.name, student._id)
    const result = await req(qCheckAttendance, {
      owner: student._id,
      date: moment()
        .startOf('week')
        .format('YYYYMMDD'),
    })
    l.info('result =', result.checkAttendance)
    state.list = [{name: student.name, time: moment().format('HH:mm:ss')}, ...state.list]
    state.input = ''
    Swal.fire({
      icon: 'success',
      title: 'Welcome ' + student.name + ':)',
      text: '출석체크 완료~*',
      showConfirmButton: true,
      timer: ALERT_TIMER,
    })
  }
}
