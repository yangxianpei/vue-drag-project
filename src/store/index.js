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
        },
        modifyCurComponentStyle({ curComponent }, { left, top, width, height }) {
            if (left) curComponent.style.left = left;
            if (top) curComponent.style.top = top;
            if (width) curComponent.style.width = width;
            if (height) curComponent.style.height = height;
        },
        addComponent(state, component) {
            state.componentData.push(component)
        },
        addAnimation({ curComponent }, animation) {
            curComponent.animations.push(animation)
        },
        removeAnimation({ curComponent }, index) {
            curComponent.animations.splice(index, 1)
        },
        addEvent({ curComponent }, {event,param}){
            curComponent.events.push({ event, param })
        },
        removeEvent({ curComponent },index){
            curComponent.events.splice(index, 1)
        }
    }
})