import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { swap } from '@/utils'
export default new Vuex.Store({
    state: {
        curComponent: null,
        curComponentZindex: null,
        componentData: [],
        canvasSize: {
            width: 1200,
            height: 600
        },
        menuTop: 0,
        menuLeft: 0,
        menuShow: false,
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
            this.commit('hideMenu')
        },
        addComponent(state, component) {
            state.componentData.push(component)
        },
        setCurComponentData(state, data = []) {
            Vue.set(state, 'componentData', data)
        },
        setCanvasSize(state, obj = { width: 1200, height: 600 }) {
            Vue.set(state, 'canvasSize', obj)
        },
        addAnimation({ curComponent }, animation) {
            curComponent.animations.push(animation)
        },
        removeAnimation({ curComponent }, index) {
            curComponent.animations.splice(index, 1)
        },
        addEvent({ curComponent }, { event, param }) {
            curComponent.events.push({ event, param })
        },
        removeEvent({ curComponent }, index) {
            curComponent.events.splice(index, 1)
        },
        modefiyCanvasSize({ canvasSize }, width, height) {
            canvasSize.width = width;
            canvasSize.height = height;
        },
        clearComponentData(state, data = []) {
            Vue.set(state, 'componentData', data)
        },
        showContexeMenu(state, { left, top }) {
            state.menuShow = true;
            state.menuLeft = left;
            state.menuTop = top;
        },
        deleteComponent(state) {
            state.componentData.splice(state.curComponentZindex, 1)
            state.menuShow = false
        },
        hideMenu(state) {
            state.menuShow = false
        },
        upComponent({ componentData, curComponentZindex }, _vue) {
            if (curComponentZindex < componentData.length - 1) {
                swap(componentData, curComponentZindex, componentData.length - 1)
                this.commit('setCurComponent', { //设置CurComponent  为空触发视图更新
                    component: null,
                    zIndex: null
                })
                this.commit('hideMenu')
            } else {
                _vue.$message.info('到顶了')
            }
        },
        downComponent({ componentData, curComponentZindex }, _vue) {
            if (curComponentZindex>0){
                swap(componentData, curComponentZindex, 0)
                this.commit('setCurComponent', { 
                    component: null,
                    zIndex: null
                })
                this.commit('hideMenu')
            }else{
                _vue.$message.info('到底了')
            }
        },
        AddComponentZindex({ componentData, curComponentZindex }, _vue){
            if (curComponentZindex < componentData.length-1){
                swap(componentData, curComponentZindex, curComponentZindex+1)
                this.commit('setCurComponent', {
                    component: null,
                    zIndex: null
                })
                this.commit('hideMenu')
            }else{
                _vue.$message.info('到顶了')
            }
        },
        decreaseComponentZindex({ componentData, curComponentZindex }, _vue){
            if (curComponentZindex > 0) {
                swap(componentData, curComponentZindex, curComponentZindex - 1)
                this.commit('setCurComponent', {
                    component: null,
                    zIndex: null
                })
                this.commit('hideMenu')
            } else {
                _vue.$message.info('到顶了')
            }
        }
    }
})