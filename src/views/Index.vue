<template>
  <main>
    <section>
      <div class="date">{{state.today}}</div>
      <div class="title">
        <h1>QR 코드 입력</h1>
      </div>
      <div class="code">
        <div class="label">CODE:</div>
        <div class="input">
          <input ref="input" v-model="state.input" id="code" @keyup.enter="check" />
        </div>
        <div class="btn">
          <button @click="check">저장</button>
        </div>
      </div>
      <div class="result">
        <div class="item" v-for="(item, idx) in state.list" :key="idx">
          <div class="name">{{item.name}}</div>-
          <span>{{item.time}}</span>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
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
import {useCheck} from './index.fn'

const logger = createLogger().addTags('Index.vue')

interface IState {
  list: Array<{name: string; time: string}>
  input: string
  today: string
}
export default {
  name: 'index-page',
  setup(props, {root}) {
    const state = reactive<IState>({
      list: [],
      input: '',
      today: moment()
        .startOf('week')
        .format('YYYY-MM-DD'),
    })
    const check = useCheck({state, root})
    onMounted(async () => {
      const l = logger.addTags('mounted')
      l.info('start')
      root.$refs.input.focus()
    })
    return {
      state,
      check: intervalCall(500)(check),
    }
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