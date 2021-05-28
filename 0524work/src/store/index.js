import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: localStorage.getItem('id') ? localStorage.getItem('id') : '',
    user: {
      username: '',
      password: '',
      school: '',
      nickname: '',
      age: '',
      gender: '',
      avatar: ''
    },
    jifen: '',
  },
  mutations: {
    changeId (state, id) {
      state.id = id;
      localStorage.setItem('id', JSON.stringify(state.id));
    },
    changeJifen(state, jifen){
      state.jifen = jifen;
    }

  },
  actions: {
  },
  modules: {
  }
})
