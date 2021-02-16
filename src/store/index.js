import { createStore } from 'vuex'

export default createStore({
  state: {
    firstPlayer:"", 
    secondPlayer:""
  },
  mutations: {
    savePlayersName: (state, payload) => {
      state.firstPlayer = payload.firstPlayer
      state.secondPlayer = payload.secondPlayer
    }
  },
  actions: {
  },
  modules: {
  }
})
