<template lang="pug">
  main
    section
      .date {{state.today}} 일요일
      .title
        h1 QR코드 입력
      .code
        .label CODE:
        .input
          el-input(ref="input" v-model="state.input" :autofocus="true" placeholder="QR코드 입력" @change="check")
        .btn
          el-button(@click="check") 저장
      #result.result
        el-timeline
          el-timeline-item(v-for="(item, index) in $store.state.indexList" :key="index" placement="bottom" :icon="item.icon" :type="item.type" :color="item.color" :size="item.size" :timestamp="item.time") {{item.name}}
</template>
<script lang="ts">
import {onMounted, reactive} from '@vue/composition-api'
import moment from 'moment'
import intervalCall from 'interval-call'
import createLogger from 'if-logger'
import {useCheck} from './index.fn'

const logger = createLogger().addTags('Index.vue')

interface IState {
  input: string
  today: string
}
export default {
  name: 'index-page',
  setup(props, {root, refs}: any) {
    const state = reactive<IState>({
      input: '',
      today: moment()
        .startOf('week')
        .format('YYYY-MM-DD'),
    })
    const check = useCheck({state, root})
    onMounted(async () => {
      logger.verbose('mounted')
      refs.input.$refs.input.focus()
      const resultDom = document.getElementById('result')
      if (!resultDom) {
        throw Error('resultDom is not found')
      }
      resultDom.style.height = document.documentElement.clientHeight - 350 + 'px'
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
      text-align: center;

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
      }
    }

    .result {
      // flex: 1;
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
<style lang="stylus">
.el-timeline {
  .el-timeline-item__tail {
    left: 9px;
  }

  .el-timeline-item__node--large {
    width: 25px;
    height: 25px;
  }

  .el-timeline-item__icon {
    font-size: 20px;
    font-font-weight: 600;
  }

  .el-timeline-item__wrapper {
    padding-left: 36px;
    padding-top: 3px;

    .el-timeline-item__content {
      font-size: 20px;
      // font-weight: bold;
    }

    .el-timeline-item__timestamp {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>