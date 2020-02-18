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
          <el-input ref="input" v-model="state.input" :autofocus="true" @change="check" />
        </div>
        <div class="btn">
          <el-button @click="check">저장</el-button>
        </div>
      </div>
      <div class="result">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in state.list"
            :key="index"
            placement="bottom"
            :icon="item.icon"
            :type="item.type"
            :color="item.color"
            :size="item.size"
            :timestamp="item.time"
          >{{item.name}}</el-timeline-item>
        </el-timeline>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import {onMounted, reactive} from '@vue/composition-api'
import moment from 'moment'
import intervalCall from 'interval-call'
import createLogger from 'if-logger'
import {useCheck} from './index.fn'

const logger = createLogger().addTags('Index.vue')

interface IState {
  // list: Array<{name: string; time: string}>
  list: any[]
  input: string
  today: string
}
export default {
  name: 'index-page',
  setup(props, {root}) {
    const state = reactive<IState>({
      list: [
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
        {
          name: '송하니',
          time: 'February 19th 07:36:51',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check',
        },
      ],
      input: '',
      today: moment()
        .startOf('week')
        .format('YYYY-MM-DD'),
    })
    const check = useCheck({state, root})
    onMounted(async () => {
      const l = logger.addTags('mounted')
      l.info('start')
      // root.$refs.input.$refs.input.focus()
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