<template lang="pug">
#app
  #nav
    el-tabs(v-model="state.activeName" @tab-click="handleClick")
      el-tab-pane(label="출석체크" name="/")
      el-tab-pane(label="코드매핑" name="/code")
  router-view  
</template>
<script lang="ts">
import {reactive, onMounted, onBeforeMount} from '@vue/composition-api'
import Vue from 'vue'
import {req} from './utils'
import {qStudents} from './biz/query'
import createLogger from 'if-logger'

const logger = createLogger({tags: ['App.vue']})

export default {
  setup(props: any, {root}: any) {
    const state = reactive({
      loading: false,
      activeName: location.pathname,
    })
    onBeforeMount(() => {
      // initialize({root, state})
    })
    onMounted(async () => {
      const result = await req(qStudents)
      logger.addTags('mounted').debug('result.students', result.students)
      root.$store.commit('setStudents', result.students)
    })
    return {
      state,
      handleClick(tab: any, event: any) {
        if (location.pathname === tab.name) {
          return
        }
        root.$router.push(tab.name)
      },
    }
  },
}
</script>
<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style lang="stylus" >
#nav {
  text-align: center;

  a {
    margin: 0 5px;
    font-weight: bold;
    color: #2c3e50;
  }

  a.router-link-exact-active {
    color: #42b983;
  }

  .el-tabs__item {
    padding: 0 10px;
    height: 35px;
  }
}

.home {
  .form {
    .item {
      .el-radio__label {
        font-size: 14px;
      }
    }
  }
}

#app {
  .el-card {
    // border: 5px solid #f1f1f1;
    .el-card__header {
      padding: 10px 10px;
      background-color: #f9f9f9;
    }

    .el-card__body {
      padding: 10px 10px;
    }
  }

  .el-input--prefix .el-input__inner {
    cursor: pointer;
  }

  .el-table__header {
    thead {
      tr {
        th {
          background-color: #f9f9f9;
        }
      }
    }
  }
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
