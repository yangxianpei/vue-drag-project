import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componentsID:0,
    componentData:[]
  },
  mutations: {
    increment(state) {
      state.componentsID++
    },
    addComponent(state,d){
      console.log(d);
      state.componentData.push(d)
    }
  }
})
