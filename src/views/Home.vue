<template>
  <main>
    <section>
      <div class="date">{{today}}</div>
      <div class="title">
        <h1>QR 코드 입력</h1>
      </div>
      <div class="code">
        <div class="label">CODE:</div>
        <div class="input">
          <input ref="input" v-model="input" id="code" @keyup.enter="check" />
        </div>
        <div class="btn">
          <button @click="check">저장</button>
        </div>
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
import createLogger from 'if-logger'

const logger = createLogger().addTags('Home.vue')

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
    }
  },
  async mounted() {
    const l = logger.addTags('mounted')
    l.info('start')
    this.$refs.input.focus()
  },

  methods: {
    check: intervalCall(500)(async function() {
      const l = logger.addTags('check')
      if (!this.input) {
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
      if (isNaN(Number(this.input))) {
        student = this.$store.state.students.find(propEq('name', this.input))
      } else {
        student = this.$store.state.students.find(propEq('no', this.input))
      }
      if (!student) {
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
      l.info('matched:', student.name, student._id)
      const result = await req(qCheckAttendance, {
        owner: student._id,
        date: moment()
          .startOf('week')
          .format('YYYYMMDD'),
      })
      l.info('result =', result.checkAttendance)
      this.list = [{name: student.name, time: moment().format('HH:mm:ss')}, ...this.list]
      this.input = ''
      Swal.fire({
        icon: 'success',
        title: 'Welcome ' + student.name + ':)',
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
    margin: 0 20px;
    flex-direction: column;

    .date {
      font-size: 24px;
      font-weight: bold;
      color: #888;
      text-align: right;
    }

    .title {
      h1 {
        font-size: 60px;
        margin: 30px;
        color: #555;
      }
    }

    .code {
      display: flex;
      align-items: center;
      justify-content: center;

      .label {
        margin-right: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #555;
      }

      .input {
        margin-left: 5px;

        input {
          width: 200px;
          height: 30px;
        }
      }

      .btn {
        margin-left: 5px;

        button {
          width: 50px;
          height: 35px;
          cursor: pointer;
        }
      }
    }

    .result {
      flex: 1;
      overflow: auto;
      margin-top: 70px;

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