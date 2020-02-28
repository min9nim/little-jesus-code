import Vue from 'vue'
import Vuex from 'vuex'
import {IStudent} from '../biz/type'
import {removeById, idEqual} from 'mingutils'
import propEq from 'ramda/es/propEq'
import createLogger from 'if-logger'

const logger = createLogger().addTags('vuex')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: '',
    students: [] as IStudent[],
    points: [] as any[],
    indexList: [] as any[],
  },
  mutations: {
    setStudents(state, students) {
      state.students = students
    },
    addStudent(state, student) {
      state.students.push(student)
    },
    removeStudent(state: any, studentId) {
      state.students = removeById(studentId)(state.students)
    },
    setPoints(state, points) {
      state.points = points
    },
    check(state, _id) {
      const student = state.students.find(idEqual(_id))
      if (!student) {
        logger.addTags('check').warn('student is not found')
        return
      }
      student.checked = true
    },
    setIndexList(state, list) {
      state.indexList = list
    },
    appendIndexList(state, item) {
      state.indexList.push(item)
    },
    prependIndexList(state, item) {
      state.indexList.unshift(item)
    },
  },
  getters: {
    studentMap(state) {
      return state.students.reduce((acc: any, value: any) => {
        acc[value._id] = value
        return acc
      }, {})
    },
  },
  actions: {},
  modules: {},
})
