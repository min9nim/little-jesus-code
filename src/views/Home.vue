<template>
  <main>
    <section>
      <div class="title">
        <h1>어린이부 출석체크({{today}})</h1>
      </div>
      <div class="code">
        <span>CODE:</span>
        <input ref="input" class="input" v-model="input" id="code" @keyup.enter="check" />
      </div>
      <div class="result">
        <div class="item" v-for="(item, idx) in list" :key="idx">
          <div class="name">{{item.name}}</div>-
          <span>{{item.time}}</span>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import {codeMap} from '../biz/codeMap'
import moment from 'moment'
import Swal from 'sweetalert2'
import {req} from '../utils'
import {qStudents, qCheckAttendance} from '../biz/query'
import {go} from 'mingutils'
import {prop, find, propEq} from 'ramda'
import intervalCall from 'interval-call'

const ALERT_TIMER = 2000

export default {
  name: 'index-page',
  data: () => {
    return {
      list: [],
      input: '',
      today: moment()
        .startOf('week')
        .format('YYYY-MM-DD'),
      students: [],
    }
  },
  async mounted() {
    this.$refs.input.focus()
    const result = await req(qStudents)
    this.students = result.students
  },
  methods: {
    check: intervalCall(500)(async function() {
      const logger = global.logger.addTags('check')
      const name = isNaN(Number(this.input)) ? this.input : codeMap[this.input]
      const studentId = go(this.students, find(propEq('name', name)), prop('_id'))
      logger.verbose(name, studentId)
      if (!studentId) {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'The name of code(' + this.input + ') is not found',
          showConfirmButton: true,
          timer: ALERT_TIMER,
        })
        this.input = ''
        return
      }
      const result = await req(qCheckAttendance, {
        owner: studentId,
        date: moment()
          .startOf('week')
          .format('YYYYMMDD'),
      })
      logger.info('result =', result.checkAttendance)
      this.list = [{name, time: moment().format('HH:mm:ss')}, ...this.list]
      this.input = ''
      Swal.fire({
        icon: 'success',
        title: 'Welcome ' + name + ':)',
        text: '출석체크 완료~*',
        showConfirmButton: true,
        timer: ALERT_TIMER,
      })
    }),
  },
}
</script>
<style lang="stylus" scoped>
main {
  section {
    display: flex;
    margin: 20px;
    flex-direction: column;
    .title {
      margin-bottom: 20px;
    }
    .code {
      span {
        margin-right: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #555;
      }
    }
    .input {
      width: 200px;
      height: 30px;
    }
    .result {
      flex: 1;
      overflow: auto;
      margin-top: 20px;
      .item {
        margin-bottom: 10px;
        .name {
          display: inline-block;
          width: 100px;
          font-size: 20px;
          font-weight: bold;
          color: #555;
        }
      }
    }
  }
}
</style>