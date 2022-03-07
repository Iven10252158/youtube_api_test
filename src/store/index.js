import { createStore } from 'vuex'
import ws from './ws.js'

export default createStore({
  state: {
    scaleBlock: false
  },
  mutations: {
    scaleBlock (state) {
      // console.log('boolean', boolean)
      state.scaleBlock = !state.scaleBlock
    }
  },
  actions: {
    scaleBlock ({ commit }, boolean) {
      commit('scaleBlock')
    }
  },
  getters: {
    scaleBlock (state) {
      return state.scaleBlock
    }
  },
  modules: {
    ws
  }
})
