<template>
    <div class="attr-box">
        <el-tabs v-model="name">
            <el-tab-pane label="属性" name="first">
                <Attrlist v-if="curComponent" />
                <span v-else>请选择组件</span>
            </el-tab-pane>
            <el-tab-pane label="动画" name="second">
                <Animatecom v-if="curComponent"></Animatecom>
                <span v-else>请选择组件</span>
                <div class="tagstyle" v-if="curComponent">
                    <el-tag v-for="(item,index) in curComponent.animations" :key="index" closable
                        @close="removeAnimation(index)">
                        {{item}}
                    </el-tag>
                </div>
            </el-tab-pane>
            <el-tab-pane label="事件" name="third">
                <EventHandle v-if="curComponent"></EventHandle>
                 <span v-else>请选择组件</span>
                  <div class="tagstyle" v-if="curComponent">
                    <el-tag v-for="(item,index) in curComponent.events" :key="index" closable
                        @close="removeEvents(item,index)">
                        {{item.event}}
                    </el-tag>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Attrlist from "@/components/rightComponent/attrList.vue";
import Animatecom from "@/components/rightComponent/animatecom.vue";
import EventHandle from '@/components/rightComponent/eventHandle.vue'
export default {
    data() {
        return {
            name: "first",
            eventsArr:[]
        };
    },
    components: {
        Attrlist,
        Animatecom,
        EventHandle
    },
    mounted(){
        // console.log(this.curComponent.events);
        //this.eventsArr =this.curComponent.events&& Object.keys(this.curComponent.events)
    },
    methods: {
        removeAnimation(index) {
            this.$store.commit("removeAnimation", index);
        },
        removeEvents(event,index){
            //  this.eventsArr.splice(index,1)
            this.$store.commit("removeEvent", event);
        }
    },
    computed: mapState(["curComponent"]),
};
</script>

<style lang="less" scoped>
.attr-box {
    height: 100%;
    width: 100%;
    .tagstyle {
        text-align: center;
        padding: 5px;
        margin-top: 5px;
    }
}
</style>