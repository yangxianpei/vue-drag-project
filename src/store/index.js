import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curComponent: null,
    curComponentZindex: null,
    componentData: []
  },
  mutations: {
    setCurComponent(state, { component, zIndex }) {
      state.curComponent = component;
      state.curComponentZindex = zIndex;
      console.log(state.curComponent);
    },
    modifyCurComponentStyle({ curComponent }, { left, top, width, height }) {
      if (left) curComponent.left = left;
      if (top) curComponent.top = top;
      if (width) curComponent.width = width;
      if (height) curComponent.height = height;
    },
    addComponent(state, component) {
      state.componentData.push(component)
    }
  }
})
