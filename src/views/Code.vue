<template lang="pug">
v-code(:students="$store.state.students")
</template>

<script lang="ts">
import {VCode} from '@mgsong/lj-common'
import '@mgsong/lj-common/dist/lj.css'

export default {
  name: 'v-code-wrapper',
  components: {VCode},
}
</script>
<style scoped lang="stylus"></style>
